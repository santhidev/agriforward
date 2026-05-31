// PROTOTYPE — throwaway interactive terminal app for Purchase Order state machine sanity check.
// Run with: npm start
// No persistence, minimal error handling, clearly marked as throwaway.

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function ask(q: string): Promise<string> {
  return new Promise((resolve) => rl.question(q, resolve));
}

type State =
  | "Draft"
  | "Open"
  | "AwaitingSellerConfirm"
  | "PaymentPending"
  | "Contract"
  | "QualityPending"
  | "ReadyForPickup"
  | "InTransit"
  | "Fulfilled"
  | "Cancelled"
  | "Disputed";

type DeliveryOption = "SelfPickup" | "PlatformLogistics";

interface Offer {
  seller: string;
  price: number;
}

interface PO {
  id: number;
  buyer: string;
  product: string;
  quantity: number;
  deliveryOption: DeliveryOption;
  state: State;
  offers: Offer[];
  selectedOffer: Offer | null;
  buyerPaid: boolean;
  sellerPaid: boolean;
  sellerDeposit: number;
  qcResult: "Pending" | "Pass" | "Fail";
  timeouts: Record<string, number>;
}

let pos: PO[] = [];
let nextId = 1;

function calcDeposit(price: number): number {
  return Math.min(Math.round(price * 0.05), 1000);
}

function clearTimeouts(po: PO) {
  po.timeouts = {};
}

function showFullState(po: PO) {
  console.log("\n========== FULL PO STATE ==========");
  console.log(`ID:              #${po.id}`);
  console.log(`Buyer:           ${po.buyer}`);
  console.log(`Product:         ${po.product}`);
  console.log(`Quantity:        ${po.quantity}`);
  console.log(`Delivery:        ${po.deliveryOption}`);
  console.log(`State:           ${po.state}`);
  console.log(`Offers (${po.offers.length}):`);
  po.offers.forEach((o, i) => {
    const sel = po.selectedOffer === o ? " [SELECTED]" : "";
    console.log(`  [${i}] ${o.seller} @ ${o.price} THB${sel}`);
  });
  console.log(`Buyer Paid:      ${po.buyerPaid}`);
  console.log(`Seller Paid:     ${po.sellerPaid}`);
  console.log(`Seller Deposit:  ${po.sellerDeposit} THB`);
  console.log(`QC Result:       ${po.qcResult}`);
  console.log(`Active Timeouts:`);
  const keys = Object.keys(po.timeouts);
  if (keys.length === 0) console.log(`  (none)`);
  keys.forEach((k) => console.log(`  - ${k}: ${po.timeouts[k]}h remaining`));
  console.log("===================================\n");
}

function findPO(id: number): PO | undefined {
  return pos.find((p) => p.id === id);
}

function assertState(po: PO, ...states: State[]) {
  if (!states.includes(po.state)) {
    throw new Error(
      `Invalid state. Current: ${po.state}, required: ${states.join(" / ")}`,
    );
  }
}

function assertNotTerminal(po: PO) {
  if (
    po.state === "Cancelled" ||
    po.state === "Fulfilled" ||
    po.state === "Disputed"
  ) {
    throw new Error(`PO is in terminal state ${po.state}`);
  }
}

// ------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------

function createPO(
  buyer: string,
  product: string,
  quantity: number,
  delivery: DeliveryOption,
) {
  const po: PO = {
    id: nextId++,
    buyer,
    product,
    quantity,
    deliveryOption: delivery,
    state: "Draft",
    offers: [],
    selectedOffer: null,
    buyerPaid: false,
    sellerPaid: false,
    sellerDeposit: 0,
    qcResult: "Pending",
    timeouts: {},
  };
  pos.push(po);
  console.log(`Created PO #${po.id}`);
  showFullState(po);
}

function submitOffer(poId: number, seller: string, price: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  if (po.buyer === seller)
    throw new Error("Buyer cannot also be seller on the same PO");
  assertState(po, "Open");
  po.offers.push({ seller, price });
  console.log(`Offer submitted by ${seller} @ ${price} THB on PO #${po.id}`);
  showFullState(po);
}

function publishPO(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "Draft");
  po.state = "Open";
  po.timeouts["ExpirePoJob"] = 48;
  console.log(`PO #${po.id} published -> Open`);
  showFullState(po);
}

function selectOffer(poId: number, offerIndex: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "Open");
  if (offerIndex < 0 || offerIndex >= po.offers.length)
    throw new Error("Invalid offer index");
  po.selectedOffer = po.offers[offerIndex];
  po.sellerDeposit = calcDeposit(po.selectedOffer.price);
  po.state = "AwaitingSellerConfirm";
  clearTimeouts(po);
  po.timeouts["AutoRejectSellerJob"] = 24;
  console.log(
    `Selected offer [${offerIndex}] on PO #${po.id} -> AwaitingSellerConfirm`,
  );
  showFullState(po);
}

function sellerConfirm(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "AwaitingSellerConfirm");
  if (!po.selectedOffer) throw new Error("No offer selected");
  po.state = "PaymentPending";
  clearTimeouts(po);
  po.timeouts["AutoCancelJob"] = 48;
  console.log(`Seller confirmed on PO #${po.id} -> PaymentPending`);
  showFullState(po);
}

function payBuyerEscrow(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "PaymentPending");
  po.buyerPaid = true;
  console.log(`Buyer paid 100% escrow on PO #${po.id}`);
  tryAdvanceToContract(po);
  showFullState(po);
}

function paySellerDeposit(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "PaymentPending");
  po.sellerPaid = true;
  console.log(`Seller paid deposit (${po.sellerDeposit} THB) on PO #${po.id}`);
  tryAdvanceToContract(po);
  showFullState(po);
}

function tryAdvanceToContract(po: PO) {
  if (po.buyerPaid && po.sellerPaid) {
    po.state = "Contract";
    clearTimeouts(po);
    console.log(`Both parties paid -> Contract`);
  }
}

function deliverToHub(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "Contract");
  po.state = "QualityPending";
  console.log(`Delivered to Hub on PO #${po.id} -> QualityPending`);
  showFullState(po);
}

function qcPass(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "QualityPending");
  po.qcResult = "Pass";
  if (po.deliveryOption === "SelfPickup") {
    po.state = "ReadyForPickup";
    po.timeouts["AutoConfirmPickupJob"] = 168; // 7 days
    console.log(`QC Pass + SelfPickup -> ReadyForPickup`);
  } else {
    po.state = "InTransit";
    console.log(`QC Pass + PlatformLogistics -> InTransit`);
  }
  showFullState(po);
}

function qcFail(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "QualityPending");
  po.qcResult = "Fail";
  // Full refund to buyer, deposit returned to seller
  if (po.buyerPaid) {
    console.log(`Refunded buyer ${po.selectedOffer?.price ?? 0} THB`);
    po.buyerPaid = false;
  }
  if (po.sellerPaid) {
    console.log(`Returned seller deposit ${po.sellerDeposit} THB`);
    po.sellerPaid = false;
  }
  po.state = "Cancelled";
  clearTimeouts(po);
  console.log(`QC Fail -> Cancelled (refunds processed)`);
  showFullState(po);
}

function buyerPickup(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "ReadyForPickup");
  po.state = "Fulfilled";
  clearTimeouts(po);
  console.log(`Buyer picked up PO #${po.id} -> Fulfilled`);
  showFullState(po);
}

function buyerReceive(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertState(po, "InTransit");
  po.state = "Fulfilled";
  clearTimeouts(po);
  console.log(`Buyer received PO #${po.id} -> Fulfilled`);
  showFullState(po);
}

function dispute(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertNotTerminal(po);
  po.state = "Disputed";
  clearTimeouts(po);
  console.log(`Dispute raised on PO #${po.id} -> Disputed (admin must decide)`);
  showFullState(po);
}

function cancelPO(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  assertNotTerminal(po);
  if (po.buyerPaid) {
    console.log(`Refunded buyer ${po.selectedOffer?.price ?? 0} THB`);
    po.buyerPaid = false;
  }
  if (po.sellerPaid) {
    console.log(`Returned seller deposit ${po.sellerDeposit} THB`);
    po.sellerPaid = false;
  }
  po.state = "Cancelled";
  clearTimeouts(po);
  console.log(`PO #${po.id} manually cancelled`);
  showFullState(po);
}

function switchDelivery(poId: number, option: DeliveryOption) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  const allowed: State[] = [
    "Draft",
    "Open",
    "AwaitingSellerConfirm",
    "PaymentPending",
    "Contract",
  ];
  if (!allowed.includes(po.state)) {
    throw new Error(
      `Cannot switch delivery after Contract. Current: ${po.state}`,
    );
  }
  if (po.deliveryOption === "PlatformLogistics" && option === "SelfPickup") {
    throw new Error("Cannot switch from PlatformLogistics to SelfPickup");
  }
  po.deliveryOption = option;
  console.log(`Delivery option switched to ${option} on PO #${po.id}`);
  showFullState(po);
}

// ------------------------------------------------------------------
// Timeouts
// ------------------------------------------------------------------

function runTimeoutJob(po: PO, job: string) {
  console.log(`[TIMEOUT] Running ${job} on PO #${po.id}`);
  switch (job) {
    case "ExpirePoJob": {
      if (po.state !== "Open") return;
      po.state = "Cancelled";
      clearTimeouts(po);
      console.log(` -> PO expired -> Cancelled`);
      break;
    }
    case "AutoRejectSellerJob": {
      if (po.state !== "AwaitingSellerConfirm") return;
      po.selectedOffer = null;
      po.sellerDeposit = 0;
      po.state = "Open";
      clearTimeouts(po);
      po.timeouts["ExpirePoJob"] = 48;
      console.log(` -> Seller auto-rejected. PO returned to Open.`);
      break;
    }
    case "AutoCancelJob": {
      if (po.state !== "PaymentPending") return;
      if (po.buyerPaid) {
        console.log(` -> Refunding buyer ${po.selectedOffer?.price ?? 0} THB`);
        po.buyerPaid = false;
      }
      if (po.sellerPaid) {
        console.log(
          ` -> Forfeiting seller deposit ${po.sellerDeposit} THB to platform`,
        );
        po.sellerPaid = false;
      }
      po.state = "Cancelled";
      clearTimeouts(po);
      console.log(` -> AutoCancel -> Cancelled`);
      break;
    }
    case "AutoConfirmPickupJob": {
      if (po.state !== "ReadyForPickup") return;
      po.state = "Fulfilled";
      clearTimeouts(po);
      console.log(` -> Auto-confirmed pickup -> Fulfilled`);
      break;
    }
    default:
      console.log(`Unknown job ${job}`);
  }
  showFullState(po);
}

function advanceTime(hours: number) {
  console.log(`Advancing time by ${hours} hours...`);
  for (const po of pos) {
    for (const job of Object.keys(po.timeouts)) {
      po.timeouts[job] -= hours;
      if (po.timeouts[job] <= 0) {
        runTimeoutJob(po, job);
      }
    }
  }
  console.log("Time advance complete.\n");
}

function triggerTimeoutNow(poId: number) {
  const po = findPO(poId);
  if (!po) throw new Error("PO not found");
  const jobs = Object.keys(po.timeouts);
  if (jobs.length === 0) throw new Error("No active timeouts on this PO");
  console.log("Active timeout jobs:");
  jobs.forEach((j, i) => console.log(`  [${i}] ${j}`));
  // We'll handle the selection in the menu layer
  return jobs;
}

// ------------------------------------------------------------------
// Menu
// ------------------------------------------------------------------

async function menu() {
  while (true) {
    console.log(
      "╔══════════════════════════════════════════════════════════════╗",
    );
    console.log(
      "║   AgriForward PO State Machine — PROTOTYPE TERMINAL        ║",
    );
    console.log(
      "╚══════════════════════════════════════════════════════════════╝",
    );
    console.log(`Active POs: ${pos.length}`);
    pos.forEach((po) => {
      const sel = po.selectedOffer ? `| ${po.selectedOffer.seller}` : "";
      console.log(`  #${po.id} | ${po.state.padEnd(22)} | ${po.buyer} ${sel}`);
    });
    console.log("");
    console.log("--- Actions ---");
    console.log("1.  Create PO");
    console.log("2.  Publish PO (Draft -> Open)");
    console.log("3.  Submit seller offer");
    console.log("4.  Select offer");
    console.log("5.  Seller confirm");
    console.log("6.  Pay buyer escrow");
    console.log("7.  Pay seller deposit");
    console.log("8.  Deliver to Hub");
    console.log("9.  QC Pass");
    console.log("10. QC Fail");
    console.log("11. Buyer Pickup (Self-Pickup)");
    console.log("12. Buyer Receive (Logistics)");
    console.log("13. Raise Dispute");
    console.log("14. Cancel PO");
    console.log("15. Switch delivery option");
    console.log("16. Show full PO state");
    console.log("--- Time ---");
    console.log("17. Advance time (hours)");
    console.log("18. Trigger timeout job NOW");
    console.log("0.  Quit");
    console.log("");

    const choice = (await ask("Choice: ")).trim();
    try {
      switch (choice) {
        case "1": {
          const buyer = await ask("Buyer name: ");
          const product = await ask("Product: ");
          const qty = parseInt(await ask("Quantity: "), 10);
          const del = (
            await ask("Delivery [SelfPickup / PlatformLogistics]: ")
          ).trim() as DeliveryOption;
          createPO(
            buyer,
            product,
            qty,
            del === "PlatformLogistics" ? "PlatformLogistics" : "SelfPickup",
          );
          break;
        }
        case "2": {
          const id = parseInt(await ask("PO ID: "), 10);
          publishPO(id);
          break;
        }
        case "3": {
          const id = parseInt(await ask("PO ID: "), 10);
          const seller = await ask("Seller name: ");
          const price = parseInt(await ask("Offer price (THB): "), 10);
          submitOffer(id, seller, price);
          break;
        }
        case "4": {
          const id = parseInt(await ask("PO ID: "), 10);
          const po = findPO(id);
          if (!po) {
            console.log("PO not found");
            break;
          }
          console.log("Offers:");
          po.offers.forEach((o, i) =>
            console.log(`  [${i}] ${o.seller} @ ${o.price} THB`),
          );
          const idx = parseInt(await ask("Select offer index: "), 10);
          selectOffer(id, idx);
          break;
        }
        case "5": {
          const id = parseInt(await ask("PO ID: "), 10);
          sellerConfirm(id);
          break;
        }
        case "6": {
          const id = parseInt(await ask("PO ID: "), 10);
          payBuyerEscrow(id);
          break;
        }
        case "7": {
          const id = parseInt(await ask("PO ID: "), 10);
          paySellerDeposit(id);
          break;
        }
        case "8": {
          const id = parseInt(await ask("PO ID: "), 10);
          deliverToHub(id);
          break;
        }
        case "9": {
          const id = parseInt(await ask("PO ID: "), 10);
          qcPass(id);
          break;
        }
        case "10": {
          const id = parseInt(await ask("PO ID: "), 10);
          qcFail(id);
          break;
        }
        case "11": {
          const id = parseInt(await ask("PO ID: "), 10);
          buyerPickup(id);
          break;
        }
        case "12": {
          const id = parseInt(await ask("PO ID: "), 10);
          buyerReceive(id);
          break;
        }
        case "13": {
          const id = parseInt(await ask("PO ID: "), 10);
          dispute(id);
          break;
        }
        case "14": {
          const id = parseInt(await ask("PO ID: "), 10);
          cancelPO(id);
          break;
        }
        case "15": {
          const id = parseInt(await ask("PO ID: "), 10);
          const opt = (
            await ask("New delivery [SelfPickup / PlatformLogistics]: ")
          ).trim() as DeliveryOption;
          switchDelivery(id, opt);
          break;
        }
        case "16": {
          const id = parseInt(await ask("PO ID: "), 10);
          const po = findPO(id);
          if (!po) console.log("PO not found");
          else showFullState(po);
          break;
        }
        case "17": {
          const h = parseInt(await ask("Hours to advance: "), 10);
          advanceTime(h);
          break;
        }
        case "18": {
          const id = parseInt(await ask("PO ID: "), 10);
          const jobs = triggerTimeoutNow(id);
          if (jobs && jobs.length > 0) {
            const jIdx = parseInt(await ask("Job index to trigger: "), 10);
            const po = findPO(id);
            if (po && jobs[jIdx]) {
              runTimeoutJob(po, jobs[jIdx]);
            }
          }
          break;
        }
        case "0": {
          console.log("Exiting prototype.");
          rl.close();
          return;
        }
        default:
          console.log("Invalid choice.");
      }
    } catch (e: any) {
      console.log("ERROR:", e.message);
    }
    await ask("\nPress Enter to continue...");
    console.clear && console.clear();
  }
}

menu();

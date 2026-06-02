import { inngest } from "../client";

export const autoRejectSellerJob = inngest.createFunction(
  { id: "auto-reject-seller-job", triggers: [{ event: "po/offer-selected" }] },
  async ({ event, step }) => {
    await step.sleep("wait-24-hours", "24h");
    // TODO: auto-reject if seller never confirms
    return { message: "Auto reject checked" };
  },
);

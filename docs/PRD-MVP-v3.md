# Product Requirements Document — AgriForward MVP v3.0

> เอกสารนี้สร้างขึ้นหลังจาก `grill-with-docs` session และ prototyping โดยสังเคราะห์ business model pivot จาก traditional marketplace มาเป็น **"แพลตฟอร์มฟรี + คิดเงินที่ค่าขนส่งและตรวจสอบคุณภาพ"**

---

## Problem Statement

ตลาดเกษตรกรรม B2B ในประเทศไทยขาดช่องทางที่เชื่อถือได้ในการเชื่อมต่อระหว่างผู้ซื้อ (โรงงานแปรรูป ผู้ส่งออก ผู้ค้าส่ง) กับผู้ขาย (ชาวไร่ สหกรณ์) ปัญหาหลักที่พบคือ:

1. **ความไว้วางใจ** — ผู้ซื้อ-ขายไม่รู้จักกัน กลัวถูกโกง ไม่กล้าจ่ายเงินล่วงหน้า หรือส่งสินค้าก่อนได้รับเงิน
2. **คุณภาพไม่สม่ำเสมอ** — ไม่มีการตรวจสอบมาตรฐานกลาง ทำให้เกิดข้อพิพาทบ่อยครั้ง
3. **โลจิสติกส์ซับซ้อน** — การขนส่งสินค้าเกษตรมีความยุ่งยาก ต้องใช้ความเชื่อใจระหว่างฝ่ายว่าสินค้าจะถึงตามสภาพที่ตกลง
4. **ความเสี่ยงทางการเงิน** — ระบบเครดิต/ผ่อนชำระต้องใช้ใบอนุญาต nano-finance ที่มีความเสี่ยงทางกฎหมายสูงสำหรับสตาร์ทอัพ

**จากมุมมองผู้ใช้:**
- **Buyer** ต้องการมั่นใจว่าจะได้รับสินค้าตามมาตรฐานที่ตกลง โดยไม่ต้องจ่ายเงินก่อนรับสินค้าโดยไม่มีการันตี
- **Seller** ต้องการมั่นใจว่าหากส่งมอบสินค้าตามตกลงแล้ว จะได้รับเงินแน่นอน
- **แพลตฟอร์ม** ต้องการสร้างรายได้ที่ยั่งยืนโดยไม่พึ่ง commission จากดีล (ซึ่งทำให้แพลตฟอร์มต้องเข้าใกล้การเป็น nano-finance)

---

## Solution

**AgriForward** เป็น B2B agricultural marketplace ที่เปลี่ยนโมเดลจาก "เก็บ commission จากดีล" มาเป็น **"แพลตฟอร์มเปิดกว้างและฟรี คิดเงินเฉพาะบริการขนส่งและตรวจสอบคุณภาพ"**

### หลักการสำคัญ
1. **ใช้แพลตฟอร์มฟรี** — ไม่มีค่าธรรมเนียม commission ใดๆ
2. **จ่ายเฉพาะถ้าอยากให้เราส่ง** — Self-Pickup ที่ Hub ฟรี ใช้บริการขนส่งของแพลตฟอร์มเสียเงินเพิ่ม
3. **แพลตฟอร์มควบคุมคุณภาพ** — ตรวจสอบสินค้าที่ Hub ก่อนส่งมอบ Buyer ทุกครั้ง
4. **เงินสดเต็มจำนวนใน escrow** — ไม่มีเครดิต ไม่มีผ่อนชำระ ลดความเสี่ยงทางกฎหมาย
5. **มัดจำผู้ขาย 5% (สูงสุด 1,000 บาท)** — ป้องกันการ ghost หลังถูกเลือก

### Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + tRPC
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Supabase Auth (OTP + Email)
- **Storage:** Supabase Storage (รูปภาพข้อพิพาท)
- **Background Jobs:** Inngest (timeout jobs)
- **Hosting:** Vercel + Supabase

---

## User Stories

### Authentication & Identity
1. ในฐานะผู้ใช้ใหม่ ฉันต้องการสมัครบัญชีด้วยเบอร์โทรศัพท์และ OTP เพื่อให้การสมัครรวดเร็วและปลอดภัย
2. ในฐานะผู้ใช้ ฉันต้องการบัญชีแบบ Dual-Role (ทั้ง Buyer และ Seller) เพื่อให้สามารถซื้อและขายได้ในแอปเดียวกัน
3. ในฐานะระบบ ฉันต้องการป้องกันไม่ให้ผู้ใช้เสนอราคาหรือเลือก Offer ของตัวเอง เพื่อป้องกันการฉ้อโกง
4. ในฐานะผู้ใช้ ฉันต้องการกรอกข้อมูลโปรไฟล์ (ชื่อบริษัท/ฟาร์ม ที่อยู่ เบอร์โทร) เพื่อให้คู่ค้าเห็นความน่าเชื่อถือ

### Product Catalog
5. ในฐานะ Admin ฉันต้องการจัดการ Catalog สินค้า (Category → Product 2 ระดับ) เพื่อให้ผู้ขายเลือกขายได้ตามมาตรฐานเดียวกัน
6. ในฐานะ Seller ฉันต้องการเลือกสินค้าจาก Catalog ที่ระบบกำหนด แทนการสร้างสินค้าใหม่เอง เพื่อความสม่ำเสมอของข้อมูล

### Purchase Order (Buyer)
7. ในฐานะ Buyer ฉันต้องการสร้าง Purchase Order ระบุสินค้า จำนวน ราคาเป้าหมาย และเลือกวิธีรับสินค้า เพื่อประกาศความต้องการ
8. ในฐานะ Buyer ฉันต้องการเห็นข้อความชัดเจนว่า **"ใช้แพลตฟอร์มฟรี — จ่ายเฉพาะถ้าอยากให้เราส่ง"** เพื่อให้เข้าใจโมเดลราคา
9. ในฐานะ Buyer ฉันต้องการเลือก **Self-Pickup (ฟรี)** เป็นค่าเริ่มต้น และสามารถเปลี่ยนเป็น **Platform Logistics (เสียเงิน)** ได้ก่อนสินค้าถึง Hub
10. ในฐานะ Buyer ฉันต้องการเห็นค่าขนส่งประมาณการทันทีเมื่อเลือก Platform Logistics เพื่อประกอบการตัดสินใจ
11. ในฐานะ Buyer ฉันต้องการดูรายการ PO ทั้งหมดของฉัน พร้อมสถานะปัจจุบัน เพื่อติดตามความคืบหน้า
12. ในฐานะ Buyer ฉันต้องการยกเลิก PO ที่อยู่ในสถานะ Draft หรือ Open เพื่อแก้ไขความต้องการ

### Offer (Seller)
13. ในฐานะ Seller ฉันต้องการดู PO ที่เปิดรับ Offer เพื่อหาโอกาสขาย
14. ในฐานะ Seller ฉันต้องการยื่น Offer พร้อมระบุราคา จำนวน และหมายเหตุ เพื่อเสนอขาย
15. ในฐานะ Seller ฉันต้องการเห็นการคำนวณมัดจำ 5% (สูงสุด 1,000 บาท) ทันทีที่กรอกราคา เพื่อรู้ต้นทุนล่วงหน้า
16. ในฐานะ Seller ฉันต้องการได้รับแจ้งเตือนเมื่อมีคนเลือก Offer ของฉัน เพื่อตอบสนองภายใน 24 ชม.
17. ในฐานะ Seller ฉันต้องการตอบรับหรือปฏิเสธ Offer ที่ถูกเลือก เพื่อความชัดเจนในการทำสัญญา
18. ในฐานะ Seller ฉันต้องการถอน Offer ที่ยังไม่ถูกเลือก (และได้รับเงินมัดจำคืนเต็มจำนวน) เพื่อแก้ไขข้อผิดพลาด

### Payment & Escrow
19. ในฐานะ Buyer ฉันต้องการจ่ายเงิน 100% ของมูลค่าสินค้า + ค่าขนส่ง (ถ้ามี) ผ่าน Payment Gateway เพื่อให้เงินเข้า escrow
20. ในฐานะ Seller ฉันต้องการจ่ายเงินมัดจำ 5% (สูงสุด 1,000 บาท) เพื่อยืนยันการเข้าร่วมดีล
21. ในฐานะระบบ ฉันต้องการแช่เงินทั้งหมดไว้ใน escrow จนกว่าดีลจะสำเร็จหรือถูกยกเลิก เพื่อปกป้องทั้งสองฝ่าย
22. ในฐานะระบบ ฉันต้องการยกเลิก PO อัตโนมัติหาก Buyer ไม่จ่ายเงินภายใน 48 ชม. (AutoCancelJob) เพื่อป้องกันการ ghosting
23. ในฐานะระบบ ฉันต้องการคืนเงิน Buyer ทั้งหมดหาก QC ไม่ผ่าน (BR-014) เพื่อรักษาความยุติธรรม
24. ในฐานะระบบ ฉันต้องการคืนเงินมัดจำ Seller เต็มจำนวนเมื่อดีลสำเร็จ เพื่อส่งเสริมการใช้แพลตฟอร์ม

### Logistics & Quality Control
25. ในฐานะ Seller ฉันต้องการส่งมอบสินค้าที่ Hub ของแพลตฟอร์ม เพื่อให้แพลตฟอร์มตรวจคุณภาพแทนการส่งตรงถึง Buyer
26. ในฐานะแพลตฟอร์ม (Hub Staff) ฉันต้องการบันทึกผลการตรวจสอบคุณภาพ (QC Pass/Fail) พร้อมหมายเหตุ เพื่อความโปร่งใส
27. ในฐานะ Buyer ที่เลือก Self-Pickup ฉันต้องการรู้ว่าสินค้าพร้อมรับที่ Hub แล้ว เพื่อวางแผนมารับ
28. ในฐานะ Buyer ที่เลือก Platform Logistics ฉันต้องการติดตามสถานะการจัดส่ง (InTransit) เพื่อรู้เวลารับสินค้า
29. ในฐานะระบบ ฉันต้องการยืนยันการรับสินค้าอัตโนมัติหาก Buyer เลือก Self-Pickup แล้วไม่มารับภายใน 7 วัน (AutoConfirmPickupJob)
30. ในฐานะระบบ ฉันต้องการยืนยันการรับสินค้าอัตโนมัติหาก Buyer เลือก Platform Logistics แล้วไม่ยืนยัน POD ภายใน 48 ชม. (AutoConfirmPodJob)

### Communication
31. ในฐานะ Buyer/Seller ฉันต้องการแสดงความคิดเห็นบน PO (Comment Thread) เพื่อสื่อสารแบบมี audit trail
32. ในฐานะผู้ใช้ ฉันไม่ต้องการแชท real-time ใน MVP เพราะ Comment Thread เพียงพอ และลดความซับซ้อน

### Dispute
33. ในฐานะ Buyer หรือ Seller ฉันต้องการยกข้อพิพาทบน PO พร้อมระบุเหตุผลและอัปโหลดรูปภาพหลักฐาน เพื่อให้ Admin ตัดสิน
34. ในฐานะระบบ ฉันต้องการระงับ PO ทันทีที่มีข้อพิพาท (Frozen) และแช่เงิน escrow ไว้จนกว่า Admin จะตัดสิน
35. ในฐานะ Admin ฉันต้องการดูข้อมูล PO, Comment Thread, และหลักฐานรูปภาพ เพื่อตัดสินข้อพิพาท (ผ่าน API ใน MVP)

### Rating & Reputation
36. ในฐานะ Buyer ฉันต้องการให้คะแนน Seller 1-5 ดาว พร้อมคอมเมนต์สั้นหลังดีลสำเร็จ เพื่อสร้างความน่าเชื่อถือ
37. ในฐานะ Seller ฉันต้องการให้คะแนน Buyer 1-5 ดาว พร้อมคอมเมนต์สั้นหลังดีลสำเร็จ เพื่อสร้างความน่าเชื่อถือ
38. ในฐานะผู้ใช้ทั่วไป ฉันต้องการดูคะแนนเฉลี่ยและจำนวนรีวิวบนโปรไฟล์ public ของ Buyer/Seller เพื่อประกอบการตัดสินใจ

### Notifications
39. ในฐานะ Seller ฉันต้องการได้รับอีเมลแจ้งเตือนเมื่อถูกเลือกใน PO เพื่อตอบสนองทันเวลา
40. ในฐานะ Buyer ฉันต้องการได้รับอีเมลแจ้งเตือนเมื่อมี Seller ยื่น Offer ใหม่บน PO ที่เปิดอยู่
41. ในฐานะผู้ใช้ ฉันต้องการเห็นการแจ้งเตือนในแอป (In-app) เพื่อติดตามเหตุการณ์สำคัญ
42. ในฐานะระบบ ฉันต้องการส่งอีเมลเตือนล่วงหน้า 3 วันก่อน PO หมดอายุ เพื่อให้ Buyer ดำเนินการทัน

---

## Implementation Decisions

### Modules to Build

1. **Auth & Identity Module**
   - Supabase Auth integration (OTP via Thai phone numbers + Email)
   - User profile management (company/farm name, address, phone)
   - Dual-role guardrails (self-offering prevention, cooldown between role switches)
   - PDPA consent tracking (one-time, irreversible)

2. **Product Catalog Module**
   - Admin-managed 2-level hierarchy: Category → Product
   - CRUD APIs restricted to Admin role
   - Read-only APIs for Buyers/Sellers

3. **Purchase Order (PO) Lifecycle Module**
   - The core domain module. Encapsulates the full state machine and all transition logic.
   - Deep module: simple interface (`po.publish()`, `po.selectOffer()`, `po.qcPass()`, etc.) hiding complex state validation, timeout scheduling, and side effects.

4. **Offer & Deposit Module**
   - Offer submission with real-time deposit calculation (5%, cap 1,000 THB)
   - Wallet/escrow integration for deposit hold/release/forfeit
   - Deposit refund rules based on outcome

5. **Payment & Escrow Module**
   - Integration with payment gateway (Omise candidate) for Buyer payment (100% + shipping)
   - Escrow ledger tracking (no actual financial ledger in MVP — gateway handles money movement, system tracks logical escrow state)
   - Refund orchestration on cancellation or QC failure

6. **Logistics & QC Module**
   - Hub delivery tracking (Seller → Hub)
   - QC inspection workflow (Pass/Fail with notes)
   - Self-Pickup vs Platform Logistics branching
   - Shipping fee calculation (flat rate or distance/weight based — TBD by Ops)

7. **Background Jobs Module (Inngest)**
   - `ExpirePoJob` (30 days after publish)
   - `AutoRejectSellerJob` (24h after AwaitingSellerConfirm)
   - `AutoCancelJob` (48h after PaymentPending)
   - `AutoConfirmPodJob` (48h after InTransit)
   - `AutoConfirmPickupJob` (7 days after ReadyForPickup)

8. **Notification Module**
   - In-app notification center
   - Email dispatch (via Resend/SendGrid candidate) for critical events
   - Event-triggered sends mapped to PO state transitions

9. **Comment Thread Module**
   - Threaded comments attached to PO
   - Audit trail (who, when, what)
   - No real-time — simple polling or on-page-load

10. **Dispute Module**
    - Dispute raising with text + image upload
    - Admin decision workflow (API-only in MVP)
    - Image storage via Supabase Storage

11. **Rating Module**
    - Mutual 1-5 star + short text review post-fulfillment
    - Average score calculation on public profile
    - Dual-role guardrails prevent self-rating

### PO State Machine (Core Decision)

The following state machine was validated through the terminal prototype. It is the authoritative flow for the MVP.

```typescript
// States
enum PoState {
  Draft = 'Draft',
  Open = 'Open',
  AwaitingSellerConfirm = 'AwaitingSellerConfirm',
  PaymentPending = 'PaymentPending',
  Contract = 'Contract',
  QualityPending = 'QualityPending',
  ReadyForPickup = 'ReadyForPickup',
  InTransit = 'InTransit',
  Fulfilled = 'Fulfilled',
  Expired = 'Expired',
  Cancelled = 'Cancelled',
  Frozen = 'Frozen',
}

// Key transitions (from prototype validation)
// Draft --publish--> Open
// Open --selectOffer--> AwaitingSellerConfirm
// Open --expire(30d)--> Expired
// AwaitingSellerConfirm --sellerConfirm--> PaymentPending
// AwaitingSellerConfirm --autoReject(24h)--> Open (forfeit 50% deposit)
// PaymentPending --paymentCaptured--> Contract
// PaymentPending --autoCancel(48h)--> Cancelled
// Contract --deliveredToHub--> QualityPending
// QualityPending --qcPass + SelfPickup--> ReadyForPickup
// QualityPending --qcPass + PlatformLogistics--> InTransit
// QualityPending --qcFail--> Cancelled (refund all)
// ReadyForPickup --buyerPickup--> Fulfilled
// ReadyForPickup --autoConfirm(7d)--> Fulfilled
// InTransit --podConfirmed--> Fulfilled
// InTransit --autoConfirm(48h)--> Fulfilled
// Any active --disputeRaised--> Frozen
// Frozen --adminDecide--> Fulfilled | Cancelled
```

### Prisma Schema Decisions (from grilling session + prototype)

```prisma
model User {
  id            String    @id @default(cuid())
  phone         String    @unique
  email         String?   @unique
  passwordHash  String?
  displayName   String
  farmName      String?
  companyName   String?
  address       String?
  role          UserRole  @default(BOTH) // BUYER | SELLER | BOTH
  isAdmin       Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  buyerOrders   PurchaseOrder[] @relation("BuyerOrders")
  offers        Offer[]
  wallet        UserWallet?
  ratingsGiven  Rating[] @relation("RatingsGiven")
  ratingsReceived Rating[] @relation("RatingsReceived")
}

model UserWallet {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  balance   Decimal  @default(0) // logical balance for deposit hold tracking
  transactions WalletTransaction[]
}

model WalletTransaction {
  id          String            @id @default(cuid())
  walletId    String
  wallet      UserWallet        @relation(fields: [walletId], references: [id])
  amount      Decimal
  type        TransactionType   // DEPOSIT_HOLD | DEPOSIT_RELEASE | DEPOSIT_FORFEIT | ESCROW_IN | ESCROW_OUT | REFUND
  offerId     String?
  orderId     String?
  createdAt   DateTime          @default(now())
}

model Category {
  id       String    @id @default(cuid())
  name     String
  products Product[]
}

model Product {
  id          String    @id @default(cuid())
  categoryId  String
  category    Category  @relation(fields: [categoryId], references: [id])
  name        String
  unit        String    // kg, ton, etc.
  orders      PurchaseOrder[]
}

model PurchaseOrder {
  id                  String          @id @default(cuid())
  buyerId             String
  buyer               User            @relation("BuyerOrders", fields: [buyerId], references: [id])
  productId           String
  product             Product         @relation(fields: [productId], references: [id])
  quantity            Decimal
  targetPrice         Decimal?
  deliveryOption      DeliveryOption  @default(SELF_PICKUP)
  shippingFee         Decimal?
  status              PoState         @default(Draft)
  qcResult            QcResult?
  qcNotes             String?
  disputeReason       String?
  disputeImages       String[]        // Supabase Storage URLs
  createdAt           DateTime        @default(now())
  publishedAt         DateTime?
  expiresAt           DateTime?
  offers              Offer[]
  comments            Comment[]
}

model Offer {
  id          String      @id @default(cuid())
  orderId     String
  order       PurchaseOrder @relation(fields: [orderId], references: [id])
  sellerId    String
  seller      User        @relation(fields: [sellerId], references: [id])
  pricePerUnit Decimal
  totalPrice  Decimal
  depositAmount Decimal
  depositPaid Boolean     @default(false)
  status      OfferStatus @default(Open)
  notes       String?
  createdAt   DateTime    @default(now())
}

model Comment {
  id        String   @id @default(cuid())
  orderId   String
  order     PurchaseOrder @relation(fields: [orderId], references: [id])
  userId    String
  content   String
  createdAt DateTime @default(now())
}

model Rating {
  id          String   @id @default(cuid())
  orderId     String   @unique
  fromUserId  String
  fromUser    User     @relation("RatingsGiven", fields: [fromUserId], references: [id])
  toUserId    String
  toUser      User     @relation("RatingsReceived", fields: [toUserId], references: [id])
  score       Int      // 1-5
  comment     String?
  createdAt   DateTime @default(now())
}

enum UserRole { BUYER SELLER BOTH }
enum DeliveryOption { SELF_PICKUP PLATFORM_LOGISTICS }
enum PoState { Draft Open AwaitingSellerConfirm PaymentPending Contract QualityPending ReadyForPickup InTransit Fulfilled Expired Cancelled Frozen }
enum OfferStatus { Open Accepted Rejected Withdrawn Fulfilled }
enum TransactionType { DEPOSIT_HOLD DEPOSIT_RELEASE DEPOSIT_FORFEIT ESCROW_IN ESCROW_OUT REFUND }
enum QcResult { PASS FAIL }
```

### API Design Decisions

- **tRPC routers** organized by domain module (auth, po, offer, payment, logistics, notification, comment, dispute, rating)
- All PO state transitions go through a single `po.transition` mutation with discriminated union input — validated against current state server-side
- Deposits and escrow tracked logically; actual money movement handled by payment gateway webhooks
- Image uploads go directly to Supabase Storage via presigned URLs; only the URL is stored in our DB

### UI/UX Decisions

- **Buyer Create PO screen:** Tested 3 prototype variations (Wizard, Dense Dashboard, Card/Conversational). Decision deferred to design review — all 3 are viable, choose based on target user sophistication.
- **Delivery option toggle:** Self-Pickup as default, clearly marked "ฟรี". Platform Logistics as secondary option with dynamic fee estimate.
- **Seller Offer screen:** Deposit calculation shown in real-time as seller types price. Warning text: "หากคุณยกเลิกหลังจากทำสัญญาแล้ว มัดจำจะถูกริบโดยแพลตฟอร์ม"

---

## Testing Decisions

### What Makes a Good Test
- Test **external behavior** (state transitions, side effects, API contracts) not implementation details (query shapes, internal helper functions).
- For the PO module: feed events/actions in, assert on final state and emitted side effects (jobs scheduled, notifications sent, wallet transactions created).

### Modules to Test
1. **PO State Machine** — highest priority. Every transition + guard condition must be tested. Use parameterized tests to cover happy paths and all rejection cases.
2. **Deposit Calculation** — boundary tests at the 1,000 THB cap.
3. **Dual-Role Guardrails** — ensure a user cannot self-offer or self-select.
4. **Auto-confirm Timeout Jobs** — mock Inngest time triggers and assert state advancement + escrow release.
5. **QC Failure Refund** — assert buyer gets 100% refund + seller deposit returned.

### Testing Approach
- **Unit tests** for pure domain logic (state machine guards, deposit calculation, shipping fee estimation).
- **Integration tests** for tRPC routers hitting a test PostgreSQL instance (via `vitest` + `@faker-js/faker` for seed data).
- **No E2E tests in MVP** — deferred due to time constraints; manual QA via the UI prototype flows.

### Prior Art
- The state machine prototype (`prototypes/state-machine-po/`) contains the transition matrix. Use it as the test case inventory.

---

## Out of Scope

| Feature | Reason | Target |
|---------|--------|--------|
| Real-time chat (SignalR) | Too complex; Comment Thread is sufficient | Post-MVP |
| Line OA notifications | Adds friction; deferred | Post-MVP |
| Credit/Installment system | Legal risk (nano-finance licensing) | Post-MVP (pending license) |
| VAT auto-invoicing | No commission = no need yet | Post-MVP |
| KYC verification | Field exists but no verification flow | Post-MVP |
| Admin Dashboard UI | Admin manages via API in MVP | Post-MVP |
| Multiple Hub locations | Single Hub assumption for MVP | Post-MVP |
| Product Variant (3rd catalog level) | Only Category → Product in MVP | Post-MVP |
| Redis cache | Eliminated to reduce complexity | — |
| Hangfire | Replaced by Inngest | — |
| SignalR | Replaced by Comment Thread | — |
| Blazor WASM | Replaced by Next.js 14 | — |

---

## Further Notes

### Business Model Philosophy
> "ใช้แพลตฟอร์มฟรี — จ่ายเฉพาะถ้าอยากให้เราส่ง"

แพลตฟอร์มไม่เก็บ commission จากดีล รายได้หลักมาจาก:
1. **ค่าขนส่ง** (Platform Logistics) — Buyer จ่ายเพิ่ม
2. **ค่าตรวจสอบคุณภาพ** — baked into logistics fee หรือ Hub processing fee
3. **มัดจำที่ถูกริบ** (edge case income, not primary)

### Key Metrics to Track (MVP)
- **GMV (Gross Merchandise Value)** — มูลค่าสินค้าผ่านแพลตฟอร์ม
- **Platform Logistics adoption rate** — % Buyer เลือกส่งถึงบ้าน vs Self-Pickup
- **QC Fail rate** — % ที่ไม่ผ่าน QC (indicates seller education needs)
- **Dispute rate** — % PO ที่มีข้อพิพาท
- **Auto-cancel rate** — % ที่ timeout จาก PaymentPending (indicates payment UX friction)

### Open Questions (TBD Before Build)
1. **Shipping fee formula** — Flat rate per PO? Per kg? Per km? Needs Ops input.
2. **Payment Gateway** — Omise confirmed as candidate; need final decision and sandbox setup.
3. **Email provider** — Resend vs SendGrid; needs deliverability test to Thai inboxes.
4. **Hub location(s)** — Single location assumption; need physical address + receiving hours.
5. **QC criteria per product** — Who defines Pass/Fail standards? Need Ops/product team input.

### Prototypes Generated
- `prototypes/state-machine-po/` — Interactive terminal app validating PO lifecycle + timeout jobs
- `prototypes/ui-variations/` — 3 UI variations for Buyer Create PO and Seller Submit Offer screens

**Decision:** Both prototypes answered their questions. The state machine feels correct after walking through edge cases. The UI variations need a stakeholder vote before locking design direction.

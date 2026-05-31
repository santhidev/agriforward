# AgriForward — Domain Context

## Glossary

| Term | Definition |
|------|------------|
| **Buyer** | ผู้ซื้อบนแพลตฟอร์ม — อาจเป็นผู้แปรรูปอาหาร ผู้ส่งออก หรือผู้ค้าส่ง |
| **Seller** | ผู้ขายบนแพลตฟอร์ม — อาจเป็นชาวไร่ สหกรณ์ หรือผู้รวบรวมผลผลิต |
| **User** | บัญชีผู้ใช้หนึ่งบัญชี ซึ่งอนุญาตให้มีบทบาททั้ง Buyer และ Seller ได้ (dual-role) |
| **Dual-Role Account** | บัญชีผู้ใช้ที่สามารถสลับบทบาทระหว่าง Buyer และ Seller ได้ โดยมีข้อจำกัดป้องกันการฉ้อโกง |

## Business Rules

### BR-001: Dual-Role Restrictions
- ผู้ใช้หนึ่งคนสามารถเป็น Buyer และ Seller ได้ในเวลาเดียวกัน (dual-role account)
- ห้ามเสนอราคา (Offer) บน Purchase Order ของตัวเอง (self-offering)
- ห้ามเลือก Offer ของตัวเอง (self-selection)
- ห้าม rate ตัวเองแม้ผ่าน PO คนละใบ
- อาจต้องมี cooldown period หากสลับบทบาทบ่อยเกินไป (ระบุใน NFR)

### BR-004: Seller Deposit
- Seller ต้องวางเงินมัดจำ 5% ของมูลค่า Offer (ไม่เกิน 1,000 บาท)
- หาก Seller ถูกเลือกแล้วปฏิเสธ หรือไม่ตอบสนองภายใน 24 ชม. → ริบ 50% ของมัดจำ (เข้าแพลตฟอร์ม)
- หาก Offer ไม่ถูกเลือก หรือ Seller ถอนตัวก่อนถูกเลือก → คืนเงินเต็มจำนวน
- หากดีลสำเร็จ (POD ยืนยัน) → คืนเงินมัดจำเต็มจำนวนให้ Seller

## Business Rules (continued)

### BR-002: Payment & Escrow Model
- แพลตฟอร์มถือเงินใน escrow (โมเดล B)
- Buyer จ่ายเงิน 100% ก่อนรับสินค้า (เงินสดเต็มจำนวน)
- ไม่มีระบบเครดิตและไม่มีการแบ่งงวดใน MVP
- Payment Gateway ยังไม่คัดเลือก (Omise เป็น candidate หนึ่ง)
- ระบบเครดิตและแบ่งงวดเป็น Post-MVP feature

### BR-005: Product Catalog
- แพลตฟอร์มเป็นผู้กำหนดรายการสินค้าให้เลือก (admin-managed catalog)
- Seller ไม่สามารถสร้างสินค้าใหม่เองได้ ต้องเลือกจาก catalog ที่ระบบกำหนด
- การเพิ่ม/แก้ไข/ลบสินค้าใน catalog ต้องทำโดย Admin เท่านั้น
- Catalog มี 2 ระดับ: Category → Product
  - เช่น `ข้าว` → `ข้าวหอมมะลิ`
  - รายละเอียดเกรด/สเปค (เช่น ความชื้น) ระบุใน Note/Description ของ Offer แทน

### BR-006: Notifications (MVP)
- MVP รองรับ 2 ช่องทาง: In-app + Email
- Line OA เป็น Post-MVP feature
- Event ที่ต้องแจ้งเตือนเร่งด่วน:
  1. Seller ถูกเลือก (ต้องตอบสนองภายใน 24 ชม.)
  2. Buyer ได้รับ Offer ใหม่บน PO ที่เปิดอยู่
  3. PO ใกล้หมดอายุ (เตือนล่วงหน้า 3 วัน)
  4. Payment สำเร็จ / ล้มเหลว
  5. POD ยืนยัน / ครบกำหนด Auto-confirm

### BR-007: Communication (MVP)
- ไม่มีแชท real-time (SignalR) ใน MVP
- ใช้ Comment Thread ผูกติดกับแต่ละ PO แทน — มี audit trail แต่ไม่ต้อง refresh หน้า
- การติดต่อด่วนให้ใช้ช่องทางนอกระบบ (โทรศัพท์/Line ส่วนตัว) แต่ระบบไม่บันทึก
- Post-MVP อาจพิจารณา SignalR real-time chat หรือ Line OA integration

### BR-008: Rating & Reputation (MVP)
- ระบบให้คะแนนแบบง่าย: 1-5 ดาว + คอมเมนต์สั้น (optional)
- Rate กันหลังดีลสำเร็จเท่านั้น (mutual rating post-fulfillment)
- แสดงคะแนนเฉลี่ยและจำนวนรีวิวบน public profile
- ไม่มีระบบ verify review หรือ ML ใน MVP
- ป้องกัน fake review ด้วย Dual-Role guardrails (ห้าม rate ตัวเอง)

### BR-009: Dispute Resolution (MVP)
- ทั้ง Buyer และ Seller สามารถยกข้อพิพาทบน PO ได้ พร้อมระบุเหตุผล (text + อัปโหลดรูปภาพ)
- เมื่อมีข้อพิพาท PO เข้าสู่สถานะ `Frozen` และเงินใน escrow ถูกแช่ไว้จนกว่า admin จะตัดสิน
- Admin ตัดสินจาก Comment Thread + หลักฐานที่ผู้ใช้อัปโหลด
- ไม่มี Admin UI ใน MVP — admin จัดการผ่าน API โดยตรง
- ผลการตัดสิน: คืนเงินให้ Buyer หรือโอนให้ Seller หรือแบ่งตามดุลยพินิจ admin

### BR-010: VAT & Invoicing (MVP)
- MVP ไม่เก็บค่าธรรมเนียม commission จากดีล
- **รายได้หลักมาจากบริการขนส่งและตรวจสอบคุณภาพ** — แพลตฟอร์มดำเนินการขนส่งและตรวจคุณภาพตามมาตรฐานเอง
- ไม่มีระบบออกใบกำกับภาษีอัตโนมัติใน MVP (ทำนอกระบบก่อน)
- Post-MVP ค่อยพิจารณาระบบ VAT อัตโนมัติ

### BR-011: Logistics & Quality Control
- แพลตฟอร์มเป็นผู้ดูแลการขนส่ง (ไม่ใช่ Seller จัดการเอง)
- แพลตฟอร์มตรวจสอบคุณภาพสินค้าตามมาตรฐานที่กำหนดก่อนส่งมอบ
- ค่าขนส่งและค่าตรวจสอบคุณภาพเป็นช่องทางรายได้หลัก
- Seller ส่งมอบสินค้าให้แพลตฟอร์ม (Hub) → แพลตฟอร์มตรวจคุณภาพ → ขนส่งให้ Buyer

### BR-012: Buyer Delivery Options
- Buyer มี 2 ทางเลือกเมื่อสร้าง PO:
  1. **รับสินค้าด้วยตัวเอง** (Self-Pickup) — **ฟรี เป็นค่าเริ่มต้น (default)**
  2. **ใช้บริการขนส่งของแพลตฟอร์ม** (Platform Logistics) — **อ็อฟชั่นเสียเงิน**
- **แนวคิดหลัก:** แพลตฟอร์มเปิดกว้างและฟรี บริการขนส่งเป็นแค่ตัวเลือกเสริม ไม่ใช่บังคับ
- Seller ต้องส่งมอบสินค้าให้แพลตฟอร์มที่ Hub เสมอ (เพื่อตรวจ QC)
  - กรณี Self-Pickup: Buyer มารับที่ Hub เอง
  - กรณี Platform Logistics: แพลตฟอร์มขนส่งถึงที่ Buyer
- การตรวจคุณภาพทำที่ Hub ก่อนส่งมอบ Buyer เสมอ (ทั้ง 2 กรณี)
- UI/UX ควรเน้น promote Self-Pickup เป็นหลัก Platform Logistics เป็นอ็อฟชั่น

### BR-013: Logistics Fee
- ค่าขนส่งเป็นบิลแยกจากราคาสินค้า (ไม่รวมใน Offer)
- Buyer จ่ายค่าขนส่งเพิ่มหลังจากเลือก Offer (หรือรวมเป็น grand total แต่แยก line item)
- แพลตฟอร์มได้รายได้โดยตรงจากค่าขนส่ง
- ค่าขนส่งคิดตามระยะทาง/น้ำหนัก หรือ flat rate ใน MVP (TBD by Ops)

### BR-014: Quality Control (QC) Failure
- ถ้าตรวจคุณภาพที่ Hub ไม่ผ่าน → ดีลถูกยกเลิกทันที
- คืนเงิน Buyer 100% (จาก escrow)
- คืนเงินมัดจำ Seller เต็มจำนวน
- ไม่มีระบบให้ Seller แก้ไข/ส่งใหม่ใน MVP (ส่งใหม่ = สร้าง Offer ใหม่)

### BR-015: Self-Pickup Auto-Confirm
- ถ้า Buyer เลือก Self-Pickup → สินค้าอยู่ที่ Hub หลัง QC ผ่าน
- ถ้า Buyer ไม่มารับภายใน 7 วัน → Auto-confirm POD
- เงิน escrow โอนให้ Seller มัดจำคืน

### BR-016: Change Delivery Option
- Buyer สามารถเปลี่ยนจาก Self-Pickup เป็น Platform Logistics ได้
- **เงื่อนไข:** ต้องเปลี่ยนก่อนสินค้าถึง Hub (หรือก่อน QC ผ่าน)
- ถ้าเปลี่ยน → Buyer ชำระ logistics fee เพิ่ม
- ถ้าสินค้าถึง Hub แล้ว (QC ผ่าน/อยู่ใน ReadyForPickup) → ไม่สามารถเปลี่ยนได้
- เปลี่ยนไม่ได้จาก Platform Logistics เป็น Self-Pickup (เพราะ logistics fee อาจถูก commit แล้ว)

## Invariants

- หนึ่ง email ต่อหนึ่งบัญชี
- หนึ่งเบอร์โทรศัพท์ต่อหนึ่งบัญชี
- PDPA consent ให้ได้ครั้งเดียวและไม่สามารถย้อนกลับได้

## Relationships

- `User` (1) — (*) `PurchaseOrder` (as Buyer)
- `User` (1) — (*) `Offer` (as Seller)
- `User` (1) — (1) `UserWallet`

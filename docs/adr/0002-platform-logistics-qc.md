# ADR-0002: แพลตฟอร์มดูแลขนส่งและตรวจคุณภาพ (Platform Logistics + QC)

## สถานะ

Accepted

## บริบท (Context)

PRD v2.0 กำหนดให้เป็น marketplace แบบดั้งเดิม — Seller จัดการขนส่งเอง และ Buyer ยืนยัน POD เอง แพลตฟอร์มเป็นแค่ตัวกลางจับคู่ (matching)

แต่ในตลาดเกษตรไทยมีปัญหา:
- Seller (ชาวไร่/สหกรณ์) ไม่มีระบบขนส่งที่เชื่อถือได้
- Buyer ไม่มั่นใจคุณภาพสินค้าจาก Seller ที่ไม่รู้จัก
- การ disputes ส่วนใหญ่เกิดจาก "ของไม่ตรงสเปค" หรือ "ส่งของเสียหาย"
- แพลตฟอร์มต้องการหารายได้จากการให้บริการ (service revenue) ไม่ใช่แค่ commission

## การตัดสินใจ (Decision)

**MVP จะเปลี่ยนแนวคิดจาก Marketplace เป็น "Platform + Logistics + QC"**

- Seller ส่งมอบสินค้าให้แพลตฟอร์มที่ Hub เสมอ (ไม่ว่า Buyer เลือกวิธีไหน)
- แพลตฟอร์มเป็นผู้ตรวจสอบคุณภาพ (QC) ที่ Hub
- แพลตฟอร์มเป็นผู้จัดการขนส่งถึง Buyer (ถ้าเลือก Platform Logistics)
- Buyer มี 2 ตัวเลือก:
  1. **มารับที่ Hub เอง (Self-Pickup)** — ฟรี
  2. **ให้แพลตฟอร์มส่ง (Platform Logistics)** — มีค่าบริการ

## ผลที่ตามมา (Consequences)

### ดี (Pros)
- **ควบคุมคุณภาพ**: QC ที่ Hub ทำให้ Buyer มั่นใจว่าได้ของตรงสเปค
- **ลดข้อพิพาท**: ปัญหา "ของไม่ตรง" ลดลงเพราะตรวจก่อนส่งมอบ
- **รายได้จากบริการ**: ค่าขนส่งเป็นรายได้ตรง ไม่ต้องพึ่ง commission
- **Differentiation**: ต่างจาก marketplace ทั่วไปที่ไม่รับผิดชอบขนส่ง
- **Standardization**: สร้างมาตรฐานคุณภาพสินค้าเกษตรในตลาด

### ไม่ดี (Cons)
- **ต้นทุนสูง**: ต้องมี Hub/คลังสินค้า พนักงาน QC รถขนส่ง
- **Complexity สูง**: State Machine ต้องมี states ใหม่ (`QualityPending`, `ReadyForPickup`, `InTransit`)
- **ความเสี่ยงทางกายภาพ**: สินค้าเสียหายที่ Hub แพลตฟอร์มรับผิดชอบ
- **Geographic limitation**: ต้องเริ่มจาก Hub ใกล้แหล่งผลิต/แหล่งบริโภค
- **Capital intensive**: ต้องลงทุนด้าน logistics ก่อนมีรายได้

## ทางเลือกอื่นที่พิจารณา (Alternatives Considered)

| ทางเลือก | เหตุผลที่ไม่เลือก |
|----------|------------------|
| **Pure Marketplace (Seller จัดการขนส่งเอง)** | ไม่แก้ปัญหาคุณภาพ/ขนส่ง แพลตฟอร์มไม่มี differentiation |
| **Third-party logistics (3PL) partner** | ยังต้อง integrate กับ 3PL API ไม่ได้ควบคุมคุณภาพเอง |
| **Platform เป็นผู้แนะนำขนส่งเท่านั้น** | ไม่ได้รายได้จากขนส่ง เป็นแค่ affiliate |

## หมายเหตุ

- การตัดสินใจนี้เพิ่ม states ใน PO State Machine: `QualityPending`, `ReadyForPickup`, `InTransit`
- Seller ไม่จำเป็นต้องรู้ว่า Buyer เลือก Self-Pickup หรือ Logistics — ทุกกรณีส่งที่ Hub เหมือนกัน
- QC Failed → คืนเงินทั้งหมด (รวมค่าขนส่งถ้าจ่ายแล้ว) → ดีลยกเลิก

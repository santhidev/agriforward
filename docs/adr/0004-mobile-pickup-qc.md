# ADR-0004: รถเคลื่อนที่เข้ารับสินค้า + QC ที่จุดรับ (Mobile Pickup + On-site QC)

## สถานะ

Accepted — Supersedes ADR-0002 (Hub-based logistics)

## บริบท (Context)

ADR-0002 กำหนดให้มี **Hub ตายตัว** — Seller ต้องส่งมอบสินค้าที่ Hub ของแพลตฟอร์ม แพลตฟอร์มตรวจ QC ที่ Hub แล้วค่อยส่งต่อให้ Buyer

แต่หลังจาก discuss กับทีม Ops พบว่า:
- **ไม่มีพื้นที่ Hub** ในปัจจุบัน — การเช่าหรือสร้าง Hub ใช้เวลาและเงินลงทุนสูง
- **Seller ส่วนใหญ่กระจัดกระจาย** — ให้ Seller ขนสินค้ามาที่ Hub ใช้เวลา/ค่าใช้จ่ายเพิ่ม
- **รถขนส่งสามารถเข้าไปรับได้** — ในตลาดเกษตรไทย รถรับซื้อเข้าไปถึงไร่/สวนเป็นปกติ
- **QC ทำที่จุดรับได้** — ผู้เชี่ยวชาญไปกับรถขนส่ง ตรวจสอบตาม checklist ที่จุดรับ

## การตัดสินใจ (Decision)

**MVP จะใช้รถขนส่งเคลื่อนที่เข้ารับสินค้าที่จุดของ Seller โดยตรง และ QC ทำที่จุดรับ**

แทนที่ Seller จะส่งมอบที่ Hub:
- **รถขนส่งเข้ารับที่จุดของ Seller** — ไม่ต้องมี Hub ตายตัว
- **ผู้เชี่ยวชาญไปกับรถ** — ตรวจสอบคุณภาพตาม checklist ที่จุดรับ
- **ถ้า QC ผ่าน** — รถนำสินค้าไปส่งต่อที่จุดของ Buyer (Self-Pickup หรือ Platform Logistics)
- **ถ้า QC ไม่ผ่าน** — ยกเลิกดีลทันทีที่จุดรับ คืนเงิน Buyer + คืน deposit Seller

การตัดสินใจนี้ยังคงรักษาหลักการสำคัญจาก ADR-0002:
- แพลตฟอร์มยังคงควบคุมคุณภาพ (QC ก่อนส่งมอบ)
- แพลตฟอร์มยังคงได้รายได้จากขนส่ง (Platform Logistics fee)
- Buyer ยังมี 2 ตัวเลือก: Self-Pickup (ฟรี) / Platform Logistics (3,000 THB)

## ผลที่ตามมา (Consequences)

### ดี (Pros)
- **ไม่ต้องลงทุน Hub** — ลด capital expenditure ลงอย่างมาก
- **Seller สะดวกขึ้น** — ไม่ต้องขนสินค้าไปส่งที่ Hub เอง
- **ลดเวลาขนส่ง** — ไม่ต้องมาแวะ Hub กลางทาง
- **ยืดหยุ่น** — รถเคลื่อนที่ไปหา Seller ได้ทุกที่ (ในระยะที่กำหนด)
- **QC ที่จุดรับ** — ตรวจสอบสดใหม่ ลดปัญหาสินค้าเสียหายระหว่างขนส่งมา Hub

### ไม่ดี (Cons)
- **ผู้เชี่ยวชาญต้องเดินทาง** — QC ไม่ได้ทำที่จุดนิ่ง ต้องเตรียมอุปกรณ์เคลื่อนที่
- **ระยะทางจำกัด** — รถไม่สามารถไปได้ทุกที่ ต้องกำหนด coverage area
- **เวลา QC ไม่แน่นอน** — ขึ้นกับ traffic และจำนวน pickup ต่อวัน
- **No central inventory** — ไม่มีจุดรวมสินค้า ต้องวางแผน route ดีๆ
- **Weather dependent** — ถ้าฝนตกที่จุดรับ QC อาจทำได้ยาก

## ความเปลี่ยนแปลงต่อระบบ (System Changes)

### PO State Machine

| State | ความหมาย (ก่อน) | ความหมาย (ใหม่) |
|-------|------------------|-----------------|
| `Contract` | รอ Seller ส่งมอบที่ Hub | รอรถถึงจุดรับสินค้า |
| `QualityPending` | Seller ส่งมอบที่ Hub แล้ว รอ QC ที่ Hub | รถถึงจุดรับแล้ว รอ QC ที่จุดรับ |
| `ReadyForPickup` | QC ผ่าน รอ Buyer มารับที่ Hub | QC ผ่าน รอ Buyer มารับที่จุดส่ง (หรือจุดรถ) |
| `InTransit` | QC ผ่าน รอส่งถึง Buyer | QC ผ่าน รถกำลังส่งถึงจุดของ Buyer |

### Prisma Schema

เพิ่ม fields ใน `PurchaseOrder`:
```prisma
  pickupAddress       String?         // จุดรับสินค้า (ใช้ Seller address ถ้า null)
  deliveryAddress     String?         // จุดส่งสินค้า (ใช้ Buyer address ถ้า null)
  shippingFee         Decimal?        // flat rate 3,000 THB ใน MVP
  shippingFeeFormula  String?         // รองรับ future: base+weight+distance
```

### UI Changes

- **ลบ**: หน้า Hub Staff dashboard (ไม่มี Hub ตายตัว)
- **เพิ่ม**: Mobile-friendly QC checklist สำหรับผู้เชี่ยวชาญที่ไปกับรถ (อาจเป็นแค่ API ใน MVP)
- **แก้ไข**: PO tracking แสดง "รถถึงจุดรับ" แทน "ถึง Hub"

## ทางเลือกอื่นที่พิจารณา (Alternatives Considered)

| ทางเลือก | เหตุผลที่ไม่เลือก |
|----------|------------------|
| **Hub ตายตัว (ADR-0002 เดิม)** | ต้องลงทุนสูง เช่าพื้นที่ จ้างพนักงาน Hub |
| **Drop-off points (จุดฝากสินค้า)** | ยังต้องมีจุดตายตัว แค่เล็กลง แต่ Seller ยังต้องขนส่งเอง |
| **Partner กับ 3PL ที่มี Hub** | ต้อง integrate API ไม่ได้ควบคุม QC เอง |

## หมายเหตุ

- การตัดสินใจนี้ไม่เปลี่ยน states ใน PO State Machine (ยังมี `QualityPending`, `ReadyForPickup`, `InTransit`) แต่เปลี่ยน **ความหมายของ transition**
- `Contract → QualityPending` ไม่ใช่ "Seller กดส่งมอบที่ Hub" แต่เป็น "รถถึงจุดรับ + พร้อม QC"
- ในอนาคตถ้ามี Hub จริง สามารถ revert กลับไปใช้ ADR-0002 ได้โดยไม่ต้องเปลี่ยน schema มาก (แค่เปลี่ยน business logic)

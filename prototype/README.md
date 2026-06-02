# AgriForward Prototype — Flat Static HTML

เวอร์ชั่น MVP สำหรับทดสอบ UX กับเกษตรกร
จุดประสงค์: เชื่อมโยงผู้ซื้อและเกษตรกรผู้ขายโดยตรง — ไม่ผ่านคนกลาง

---

## สารบัญหน้า (23 หน้า)

### Public (ไม่ต้องล็อกอิน)
| หน้า | ไฟล์ | บทบาท |
|------|------|-------|
| Landing | index.html | หน้าแรก บอกว่าเว็บนี้ทำอะไร + ปุ่มเข้าสู่ระบบ |
| เข้าสู่ระบบ | login.html | เข้าระบบด้วยเบอร์/อีเมล |
| สมัคร | register.html | สมัครบัญชีใหม่ |
| ยินยอม | consent.html | ยอมรับเงื่อนไข + ความเป็นส่วนตัว |
| แนะนำ | onboarding.html | สอนใช้แบบง่าย 3 ขั้นตอน |
| เงื่อนไข | terms.html | ข้อตกลงการใช้งาน |
| ความเป็นส่วนตัว | privacy.html | นโยบายข้อมูลส่วนบุคคล |
| ช่วยเหลือ | help.html | FAQ + ติดต่อทีมงาน |

### หลังล็อกอิน (หลัก 4 หน้า)
| หน้า | ไฟล์ | บทบาท |
|------|------|-------|
| สินค้า | products.html | หน้าแรกหลัง login — 6 ผลไม้สด + สินค้าติดตาม (watchlist) + ปุ่มซื้อ/ขายใหญ่ |
| งานของฉัน | orders.html | รวม "กำลังซื้อ" + "กำลังขาย" ในแท็บเดียว |
| ข่าวสาร | notifications.html | แจ้งเตือน match, ข้อเสนอใหม่, สถานะงาน |
| ฉัน | profile.html | โปรไฟล์ รีวิว ตั้งค่า |

### Flow ซื้อ (Buyer)
| หน้า | ไฟล์ | บทบาท |
|------|------|-------|
| สร้างงานซื้อ | create-po.html | "อยากซื้ออะไร" — แค่ 2 คำถาม: สินค้า + จำนวน |
| ดูรายละเอียดสินค้า | product-detail.html | รวม marketplace — แสดง PO ที่เปิดรับ + ปุ่ม "ฉันจะขาย" |
| ดูงาน | order-detail.html | รายละเอียด PO ที่สร้าง + ข้อเสนอที่เข้ามา + แชท |
| จ่ายเงิน | checkout.html | "จ่ายเงิน" — price-xl + ปุ่มใหญ่ + เลือกขนส่ง (มีจุดรับ-ส่งหรือจัดส่ง) |

### Flow ขาย (Seller)
| หน้า | ไฟล์ | บทบาท |
|------|------|-------|
| เสนอราคา | submit-offer.html | "จะขายเท่าไร" — ใส่ราคา + คำนวณ real-time |
| ดูข้อเสนอ | offer-detail.html | รายละเอียด offer ที่ส่งไป + สถานะ |

### อื่นๆ
| หน้า | ไฟล์ | บทบาท |
|------|------|-------|
| โปรไฟล์สาธารณะ | public-profile.html | โปรไฟล์ของผู้ใช้คนอื่น |
| รีวิว | ratings.html | ให้คะแนนและรีวิวหลังงานเสร็จ |
| กระเป๋าเงิน | wallet.html | ยอดเงิน ประวัติการเงิน ถอนเงิน |
| ตั้งค่า | settings.html | ภาษา การแจ้งเตือน ความปลอดภัย |

---

## Flow หลัก

### ซื้อ (Buyer)
products.html
  -> กด "อยากซื้อ" -> create-po.html (สร้าง PO)
  -> หรือกด "ดูราคา" -> product-detail.html (ดู PO ที่เปิดรับ + ข้อเสนอ)
  -> order-detail.html (ดูรายละเอียด PO + แชท)
  -> checkout.html (จ่ายเงิน + เลือกขนส่ง)

### ขาย (Seller)
products.html
  -> กด "อยากขาย" -> หรือเข้า product-detail.html -> กด "ฉันจะขาย"
  -> submit-offer.html (ใส่ราคา + จำนวน)
  -> orders.html (แท็บ "กำลังขาย" ติดตามสถานะ)
  -> offer-detail.html (ดูรายละเอียด + แชท)

---

## ข้อตกลงการออกแบบ

- ผู้ใช้หลักคือเกษตรกร — ซื้อง่าย ขายง่าย ปุ่มใหญ่ ภาษาง่าย ลด table
- ไม่มี Hub ตายตัว — รถขนส่งเข้ารับที่จุดของ Seller พร้อมตรวจ QC (ADR-0004)
- Delivery option อยู่ที่ checkout ไม่ใช่ตอนสร้าง PO (เพราะยังไม่รู้ราคาตกลง — BR-012)
- สินค้า MVP เริ่มต้น: ผลไม้สด 6 รายการ — ทุเรียน ละมุด มังคุด ลำใย มะม่วง มะนาว
- ไม่ใช้ศัพท์ business บน UI: PO->งาน, Offer->ข้อเสนอ/ขาย, Escrow->เงินค้ำ, Comment->คุยกัน

---

## โครงสร้างไฟล์

prototype/
  index.html              # Landing
  login.html              # เข้าสู่ระบบ
  register.html           # สมัคร
  onboarding.html         # แนะนำ
  consent.html            # ยินยอม
  terms.html              # เงื่อนไข
  privacy.html            # ความเป็นส่วนตัว
  help.html               # ช่วยเหลือ
  products.html           # หน้าหลัก — สินค้า + watchlist
  product-detail.html     # รวม marketplace
  create-po.html          # สร้างงานซื้อ
  submit-offer.html       # ส่งข้อเสนอขาย
  orders.html             # รวม orders + offers
  order-detail.html       # รายละเอียด PO
  offer-detail.html       # รายละเอียด offer
  checkout.html           # จ่ายเงิน + เลือกขนส่ง
  notifications.html      # ข่าวสาร
  profile.html            # โปรไฟล์
  public-profile.html     # โปรไฟล์คนอื่น
  ratings.html            # รีวิว
  wallet.html             # กระเป๋าเงิน
  settings.html           # ตั้งค่า
  css/
    styles.css            # CSS หลัก + utility farmer-friendly
  README.md               # ไฟล์นี้

---

## วิธีใช้

1. เปิด index.html ใน browser (ไม่ต้อง run server)
2. คลิกผ่าน flow ต่างๆ เพื่อทดสอบ UX
3. ลิงก์ทั้งหมดเป็น relative path (เช่น ./products.html)
4. ใช้ products.html เป็นหน้าแรกหลัง login (simulate login flow)

---

## ข้อจำกัด

- นี่คือ static HTML prototype — ไม่มี dynamic routing, ไม่มี backend
- product-detail.html แสดงสินค้าเดียว (ทุเรียน) เพราะเป็น static page
- ข้อมูลในตาราง/การ์ดเป็น mock data (hardcoded)
- หน้า checkout มี state แค่ครั้งเดียว (ไม่มี session storage ในตัวอย่าง)

---

สร้าง: 2026-06-02 สำหรับ AgriForward MVP
# AgriForward Design System

> แหล่งอ้างอิงเดียวสำหรับทุกคนที่ทำหน้า UI — token, component, layout, pattern ทั้งหมดอยู่ที่นี่
>
> วันที่อัปเดตล่าสุด: 2 มิ.ย. 2569

---

## 1. หลักการออกแบบ

| หลักการ | การนำไปใช้ |
|---------|-----------|
| **Farmer-First** | ภาษาไทยทั้งหมด, ใช้คำที่เกษตรกรคุ้นเคย (ดูตารางคำศัพท์ด้านล่าง) |
| **Mobile-First** | เขียน CSS สำหรับมือถือก่อน ค่อยเพิ่ม `sm:` / `lg:` สำหรับจอใหญ่ |
| **Consistency** | ใช้ CSS variable เท่านั้น — ห้าม hardcode สี/รัศมี/เงา ใน component |
| **Minimalist** | แสดงข้อมูลสำคัญ 3 อย่างต่อ card รายละเอียดเข้าไปดูในหน้า detail |
| **Touch-Friendly** | ปุ่มสำคัญ ≥ 44px สูง, BottomNav 56px นิ้วถึงง่าย |

---

## 2. คำศัพท์บน UI

| คำเทคนิค (Backend) | คำบน UI | ตัวอย่าง |
|----------------------|---------|---------|
| Purchase Order (PO) | งานซื้อ | "มี 5 งานซื้อ" |
| Offer | มาขาย / คนที่มาขาย | "3 คนขาย" |
| Comment Thread | คุยกัน | "คุยกัน" |
| Notification | ข่าวสาร | "ข่าวสาร" |
| Watchlist | ติดตามแล้ว | "ติดตามแล้ว" |
| Profile | บัญชีของฉัน | — |
| Wallet | เงินของฉัน | — |
| Dashboard | งานของฉัน | — |
| Marketplace | มีคนซื้ออะไรบ้าง | — |
| Escrow | เงินมัดจำ | "เงินมัดจำปลอดภัย" |
| QC (Quality Control) | ตรวจสอบคุณภาพ | "รอตรวจ QC" |
| Self-Pickup | รับเอง | "รับเอง (ฟรี)" |
| Platform Logistics | ส่งถึงที่ | "ส่งถึงที่ (+3000)" |
| Seller Deposit | มัดจำ 5% | "จ่ายมัดจำ 500 บาท (คืนเมื่อขายสำเร็จ)" |

---

## 3. Design Tokens

### 3.1 สี (Colors)

#### สีหลัก (Brand)

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--color-primary` | `#2f855a` | ปุ่มหลัก, brand, nav bar |
| `--color-primary-dark` | `#276749` | hover state ของ primary |
| `--color-primary-light` | `#c6f6d5` | พื้นหลัง icon container, step badge |

#### สีบทบาท (Role Colors)

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--color-buyer` | `#2563eb` | ปุ่ม "ซื้อ", badge ผู้ซื้อ |
| `--color-buyer-light` | `#dbeafe` | พื้นหลัง buyer card |
| `--color-seller` | `#16a34a` | ปุ่ม "ขาย", badge ผู้ขาย |
| `--color-seller-light` | `#dcfce7` | พื้นหลัง seller card |

**กฎ**: ปุ่ม "ซื้อ" ทุกที่ = สี `buyer`, ปุ่ม "ขาย" ทุกที่ = สี `seller` — ห้ามสลับ

#### สีสถานะ (Semantic)

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--color-danger` | `#dc2626` | ปุ่มทำลาย (ลบ, ยกเลิก), ข้อผิดพลาด |
| `--color-danger-light` | `#fee2e2` | danger hover, danger background |
| `--color-danger-dark` | `#991b1b` | (สำรอง) |
| `--color-warning` | `#d97706` | แจ้งเตือน, รอดำเนินการ |
| `--color-warning-light` | `#fef3c7` | warning background |
| `--color-success` | `#059669` | สำเร็จ, เสร็จสิ้น |
| `--color-success-light` | `#d1fae5` | success background |
| `--color-info` | `#2563eb` | ข้อมูลทั่วไป |
| `--color-info-light` | `#dbeafe` | info background |

#### สี UI (Surface)

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--background` | `#f7fafc` | พื้นหลังหน้าเว็บ (body) |
| `--surface` | `#ffffff` | พื้นหลังการ์ด, ปุ่ม secondary, modal dialog |
| `--surface-muted` | `#f1f5f9` | พื้นหลังรอง, image placeholder, tab bar, hover state |
| `--foreground` | `#1a202c` | ข้อความหลัก |
| `--muted` | `#718096` | ข้อความรอง, คำอธิบาย, date |
| `--border` | `#e2e8f0` | เส้นขอบการ์ด, divider, input border |

#### สีพิเศษ

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--color-star` | `#facc15` | ดาวเต็ม (rating) |
| `--color-star-empty` | `#d1d5db` | ดาวว่าง (rating) |

#### ⛔ ห้ามใช้

| ห้าม | ใช้แทน |
|------|--------|
| `bg-white` | `bg-[var(--surface)]` |
| `bg-gray-100` | `bg-[var(--surface-muted)]` |
| `text-gray-300` | `text-[var(--color-star-empty)]` หรือ `text-[var(--muted)]` |
| `text-yellow-400` | `text-[var(--color-star)]` |
| `text-yellow-500` | `text-[var(--color-warning)]` |
| `hover:bg-gray-50` | `hover:bg-[var(--surface-muted)]` |
| `active:bg-gray-100` | `active:bg-[var(--border)]` |

**ข้อยกเว้น**: `bg-white/5`, `bg-white/10`, `bg-white/15`, `bg-white/20`, `bg-white/70` คือ overlay opacity บน hero สีเขียว — ใช้ได้ เพราะไม่ใช่ surface color

---

### 3.2 รัศมี (Radius)

| Token | ค่า | ใช้ที่ไหน | Tailwind |
|-------|-----|-----------|----------|
| `--radius-sm` | `0.375rem` | องค์ประกอบเล็กภายใน | `rounded-[var(--radius-sm)]` |
| `--radius` | `0.5rem` | badge, chip, เล็กมาก | `rounded-[var(--radius)]` |
| `--radius-lg` | `0.75rem` | รายการใน list, toast | `rounded-[var(--radius-lg)]` |
| `--radius-xl` | `1rem` | **ปุ่ม, ช่อง input, select** | `rounded-[var(--radius-xl)]` |
| `--radius-2xl` | `1.25rem` | **การ์ด, แผง, sections** | `rounded-[var(--radius-2xl)]` |
| (built-in) | — | วงกลมรูปโปรไฟล์, badge pill | `rounded-full` |

**กฎ**: ห้ามใช้ `rounded-2xl`, `rounded-xl`, `rounded-lg`, `rounded-md` โดยตรง — ใช้ token เท่านั้น

---

### 3.3 เงา (Shadow)

| Token | ค่า | ใช้ที่ไหน |
|-------|-----|-----------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` | การ์ดปกติ, input |
| `--shadow` | `0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06)` | hover state การ์ด, dropdown |
| `--shadow-lg` | `0 10px 15px -3px ...` | modal, floating button (HelpFab), CTA สำคัญ |

---

### 3.4 ฟอนต์ (Typography)

| ขนาด | Mobile | Tablet | Desktop | ใช้ที่ไหน |
|------|--------|--------|---------|-----------|
| h1 | `text-2xl` | `sm:text-3xl` | `lg:text-4xl` | หัวข้อหลักหน้า |
| h2 | `text-xl` | `sm:text-2xl` | `lg:text-3xl` | หัวข้อ section |
| h3 | `text-base` | `sm:text-lg` | `lg:text-xl` | หัวข้อ card, sub-section |
| body | `text-sm` | `sm:text-base` | `lg:text-lg` | เนื้อหา, คำอธิบาย |
| small | `text-xs` | `sm:text-sm` | — | วันที่, ข้อมูลรอง |
| CTA button | `text-base` | `sm:text-lg` | — | ปุ่มสำคัญ |

**ฟอนต์**: `Sarabun` (Thai-first, weights 300-700) — กำหนดใน `layout.tsx`

---

### 3.5 ระยะห่าง (Spacing)

| รูปแบบ | Mobile | Desktop | ใช้ที่ไหน |
|--------|--------|---------|-----------|
| Card padding | `p-4` | `sm:p-6 lg:p-8` | ทุก card |
| Section padding | `py-12 px-4` | `lg:py-20 px-6` | ทุก section หน้า landing |
| PageContainer | `px-4 py-6` | — | ทุกหน้า (มาตรฐาน) |
| Grid gap | `gap-3` | `sm:gap-4 lg:gap-6` | product grid, card grid |
| List gap | `space-y-3` | `lg:space-y-4` | รายการใน list |

---

### 3.6 Animation

| Class | Effect | ใช้ที่ไหน |
|-------|--------|-----------|
| `animate-fade-in` | โผล่ขึ้นมา (0.3s) | หัวข้อ, ข้อความ hero |
| `animate-slide-up` | เลื่อนขึ้น (0.3s) | CTA button, toast |
| `animate-slide-down` | เลื่อนลง (0.3s) | mobile menu dropdown |
| `animate-spin` | หมุน | Spinner |
| `animate-pulse` | กระพริบ | timeline current step |
| `.skeleton-shimmer` | แสงไล่ | loading skeleton |

---

## 4. Component Library

### 4.1 UI Primitives (`src/components/ui/`)

| Component | Props สำคัญ | กฎการใช้ |
|-----------|-----------|---------|
| **Button** | `variant` primary/secondary/success/buyer/danger/ghost, `size` sm/md/lg/xl, `fullWidth`, `icon`, `href` | ปุ่มหลัก = `primary`, ซื้อ = `buyer`, ขาย = `success`, ยกเลิก = `danger` |
| **Input** | `label`, `error`, `hint`, `icon` | ทุกฟอร์มต้องมี label + error |
| **Select** | `label`, `error`, `options`, `placeholder` | — |
| **Textarea** | `label`, `error`, `hint` | — |
| **Badge** | `variant` green/yellow/red/blue/gray | สถานะ = ใช้ mapping จาก StatusBadge |
| **Card** | `onClick` (optional) | ทุก card: `rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]` |
| **CardHeader** | children | flex between, ใช้คู่ CardTitle |
| **CardTitle** | children | h3, font-semibold |
| **CardBody** | children | p-4 |
| **Spinner** | `size` sm/md/lg | loading state |
| **ProgressBar** | `value`, `max`, `label`, `showPercent` | upload progress |
| **Skeleton** / **SkeletonCard** / **SkeletonList** | — | loading placeholder |
| **EmptyState** | `icon`, `title`, `description`, `action` | ทุกหน้าที่อาจไม่มีข้อมูล |
| **Alert** | `variant` info/success/warning/danger, `title`, `action` | ข้อผิดพลาด + วิธีแก้ |
| **Modal** | `open`, `onClose`, `title`, `footer`, `size` sm/md/lg | ใช้ `<dialog>` native |
| **ConfirmDialog** | `open`, `onClose`, `onConfirm`, `title`, `variant` primary/danger, `loading` | ก่อนลบ/ยกเลิก/เลือก offer |
| **ToastProvider** + **useToast** | `toast(message, variant, action)` | แจ้งผลการทำงาน (auto-dismiss 4 วินาที) |

---

### 4.2 Layout Components (`src/components/layout/`)

| Component | รายละเอียด |
|-----------|---------|
| **Navbar** | Sticky top, สีเขียว, 4 tabs (🌿สินค้า 📋งานของฉัน 🔔ข่าวสาร 👤ฉัน), hamburger บนมือถือ |
| **BottomNav** | Fixed bottom `h-14`, แสดงบนมือถือเท่านั้น (`md:hidden`), 4 tabs เหมือน Navbar |
| **Footer** | ลิงก์: ช่วยเหลือ · เงื่อนไข · ความเป็นส่วนตัว |
| **PageContainer** | `max-w-5xl mx-auto px-4 py-6 pb-16 md:pb-0` — **`pb-16`** สำหรับ BottomNav safe area |

**กฎ**: ทุกหน้าที่มี Navbar+BottomNav ต้องใช้ `PageContainer` เพื่อไม่ให้เนื้อหาถูก BottomNav บัง

---

### 4.3 Domain Components

| โฟลเดอร์ | Components |
|----------|-----------|
| `products/` | ProductCard, ProductGrid, ProductSearch, WatchlistSection, OpenJobsBadge, StatusBadge |
| `orders/` | PoCard, OfferCard, OrderTimeline, CommentThread, CheckoutDelivery |
| `offers/` | OfferForm |
| `auth/` | LoginForm, RegisterForm, OnboardingForm |
| `notifications/` | NotificationItem |
| `profile/` | WalletBalance, RatingStars |
| `shared/` | BackButton, HelpFab |

---

## 5. Page Layout Pattern

### 5.1 โครงสร้างมาตรฐาน (ทุกหน้าหลัง login)

```
<Navbar />
<main className="flex-1">
  <PageContainer>
    <BackButton />          ← หน้าย่อยเท่านั้น
    <h1>หัวข้อ</h1>
    ...content...
  </PageContainer>
</main>
<BottomNav />               ← ซ่อนบน desktop
<HelpFab />                 ← ลอยมุมขวาล่าง
```

### 5.2 โครงสร้าง Landing Page (ไม่มี Navbar/BottomNav)

```
<section> Hero </section>
<section> Who Benefits </section>
<section> Products </section>
<section> How It Works </section>
<section> Trust </section>
<section> Bottom CTA </section>
<footer> Footer </footer>
```

---

## 6. Responsive Breakpoints

| Breakpoint | ความกว้าง | ใช้ |
|-----------|----------|------|
| (default) | < 640px | **มือถือ** — base styles |
| `sm:` | ≥ 640px | tablet portrait |
| `md:` | ≥ 768px | tablet landscape, BottomNav ซ่อน |
| `lg:` | ≥ 1024px | desktop |
| `xl:` | ≥ 1280px | desktop กว้าง |

### Grid มาตรฐาน

| ชนิด | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Product grid | `grid-cols-2` | `sm:grid-cols-3` | `lg:grid-cols-6` |
| Section cards | `grid-cols-1` | `sm:grid-cols-2` | `lg:grid-cols-3` |
| Buyer/Seller cards | `grid-cols-1` | `md:grid-cols-2` | — |
| Steps | `flex-col` | `md:grid-cols-3` | — |

---

## 7. Status Mapping (StatusBadge)

| PO Status (Backend) | คำบน UI | Badge Color |
|---------------------|---------|------------|
| Draft | ร่าง | gray |
| Open | เปิดรับ | green |
| AwaitingSellerConfirm | รอผู้ขายตอบรับ | yellow |
| PaymentPending | รอชำระเงิน | blue |
| Contract | สัญญาแล้ว | blue |
| QualityPending | รอตรวจ QC | yellow |
| ReadyForPickup | รอรับสินค้า | blue |
| InTransit | กำลังขนส่ง | blue |
| Fulfilled | สำเร็จ | green |
| Expired | หมดอายุ | gray |
| Cancelled | ยกเลิก | red |
| Frozen | ระงับ | red |

| Offer Status (Backend) | คำบน UI | Badge Color |
|------------------------|---------|------------|
| Open | เปิด | green |
| Accepted | ถูกเลือก | blue |
| Fulfilled | สำเร็จ | green |
| Rejected | ปฏิเสธ | red |
| Withdrawn | ถอนตัว | gray |

---

## 8. UX Patterns

### 8.1 ปุ่มมาตรฐาน

| บริบท | Variant | ขนาด | ตัวอย่าง |
|-------|---------|------|---------|
| ปุ่มหลักหน้า | primary | `lg` หรือ `xl` + `fullWidth` | "เปิดรับขาย", "ยืนยันจ่ายเงิน" |
| ปุ่มซื้อ | buyer | `lg` + `fullWidth` | "ซื้อ", "ฉันอยากซื้อ" |
| ปุ่มขาย | success | `lg` + `fullWidth` | "ฉันจะขาย", "ยืนยันขาย" |
| ปุ่มยกเลิก | danger | `md` | "ยกเลิกงาน", "ถอนขาย" |
| ปุ่มรอง | secondary | `md` | "ปิด", "ยกเลิก" |
| ปุ่มเล็กใน card | primary / buyer / success | `sm` | "ดูรายละเอียด" |

### 8.2 ข้อความผิดพลาด (Heuristic 1.9)

ทุก error message ต้อง:
1. อธิบายอะไรผิด (ภาษาเกษตรกร)
2. บอกวิธีแก้

| กรณี | ข้อความ |
|------|---------|
| รหัสผ่านผิด | "รหัสผ่านไม่ถูกต้อง → กด 'ลืมรหัสผ่าน' เพื่อตั้งใหม่" |
| OTP หมดอายุ | "OTP หมดอายุแล้ว → กด 'ส่ง OTP ใหม่'" |
| เงินไม่พอ | "ยอดเงินไม่พอ (ขาอีก 350 บาท) → เติมเงินที่ เงินของฉัน" |
| ส่ง offer ซ้ำ | "คุณยื่นขายงานนี้แล้ว → ดูงานขายของคุณ" |
| ไม่มีข้อมูล | EmptyState: icon + title + description + action link |

### 8.3 ConfirmDialog ก่อนทำลาย (Heuristic 1.5)

| กรณี | title | content |
|------|------|---------|
| ยกเลิกงานซื้อ | "ยกเลิกงานซื้อ?" | "ยกเลิก '{ชื่อสินค้า} {จำนวน} กก.'? เงินมัดจำของคนขายจะถูกคืน" |
| เลือก offer | "เลือกคนขาย?" | "เลือก {ชื่อ} ราคา {ราคา} บาท/กก.? คนขายคนอื่นจะถูกปฏิเสธ" |
| ถอนขาย | "ถอนขาย?" | "ถอนขายจากงานนี้? คุณจะได้เงินมัดจำคืน" |
| ปฏิเสธ PDPA | "ปฏิเสธข้อมูลส่วนตัว?" | "หากปฏิเสธ คุณจะไม่สามารถใช้งาน AgriForward ได้" |
| ออกจากระบบ | "ออกจากระบบ?" | "คุณต้องการออกจากระบบหรือไม่?" |

### 8.4 Loading States (Heuristic 1.1)

| สถานการณ์ | Component |
|----------|-----------|
| โหลดหน้า list | `SkeletonCard` × 3 หรือ `SkeletonList` |
| โหลดรูปภาพ | `Skeleton` className `h-20 w-20 rounded-full` |
| Submit ฟอร์ม | `Spinner` ในปุ่ม + disabled |
| สถานะ PO | `OrderTimeline` + `StatusBadge` |
| Countdown | "รอตอบรับอีก XX:XX ชม." + badge เหลือง |

---

## 9. ไฟล์รูปภาพสินค้า

| สินค้า | Path | แหล่งที่มา |
|--------|------|----------|
| ทุเรียน | `/images/products/durian.jpg` | Unsplash |
| ละมุด | `/images/products/langsat.jpg` | Pexels |
| มังคุด | `/images/products/mangosteen.jpg` | Unsplash |
| ลำใย | `/images/products/longan.jpg` | Pexels |
| มะม่วง | `/images/products/mango.jpg` | Pexels |
| มะนาว | `/images/products/lime.jpg` | Pexels |

**ใช้**: `<Image src="/images/products/{slug}.jpg" alt={name} fill className="object-cover" />`

---

## 10. หน้าทั้งหมด (Routes)

| Route | ชื่อหน้า | ใช้ Navbar+BottomNav |
|-------|---------|---------------------|
| `/` | Landing | ❌ |
| `/auth/login` | เข้าสู่ระบบ | ❌ |
| `/auth/register` | สมัครใช้งาน | ❌ |
| `/auth/onboarding` | กรอกข้อมูลเริ่มต้น | ❌ |
| `/auth/consent` | PDPA ยินยอม | ❌ |
| `/products` | สินค้า (Entry Point) | ✅ |
| `/products/[id]` | รายละเอียดสินค้า | ✅ |
| `/orders/new` | ตั้งราคาซื้อ | ✅ |
| `/orders` | งานของฉัน | ✅ |
| `/orders/[id]` | รายละเอียดงาน | ✅ |
| `/orders/[id]/checkout` | จ่ายเงิน | ✅ |
| `/offers/new` | ยื่นขาย | ✅ |
| `/offers/[id]` | งานขาย | ✅ |
| `/notifications` | ข่าวสาร | ✅ |
| `/profile` | บัญชีของฉัน | ✅ |
| `/wallet` | เงินของฉัน | ✅ |
| `/ratings` | คะแนน | ✅ |
| `/settings` | ตั้งค่า | ✅ |
| `/help` | ช่วยเหลือ | ✅ |
| `/terms` | เงื่อนไข | ✅ |
| `/privacy` | ความเป็นส่วนตัว | ✅ |

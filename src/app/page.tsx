import Image from "next/image";
import Link from "next/link";
import { Navbar, BottomNav, Footer } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { HelpFab } from "@/components/shared";

const products = [
  { name: "ทุเรียน", slug: "durian", color: "#f0fdf4" },
  { name: "ละมุด", slug: "langsat", color: "#fefce8" },
  { name: "มังคุด", slug: "mangosteen", color: "#fdf2f8" },
  { name: "ลำไย", slug: "longan", color: "#fff7ed" },
  { name: "มะม่วง", slug: "mango", color: "#fef3c7" },
  { name: "มะนาว", slug: "lime", color: "#ecfdf5" },
  { name: "ผักคะน้า", slug: "kale", color: "#f0fdf4" },
] as const;

const steps = [
  {
    num: "1",
    title: "เลือกสินค้า",
    desc: "เลือกผลไม้จากแพลตฟอร์ม ดูราคาตลาดแบบเรียลไทม์",
    emoji: "🔍",
  },
  {
    num: "2",
    title: "เจรจาตรงกัน",
    desc: "ผู้ซื้อตั้งราคา เกษตรกรเสนอขาย คุยกันตรง ๆ",
    emoji: "🤝",
  },
  {
    num: "3",
    title: "จ่ายปลอดภัย รับสินค้า",
    desc: "เงินมัดจำปลอดภัย ตรวจ QC ก่อนส่งมอบ",
    emoji: "🚚",
  },
] as const;

const middlemanProblems = [
  { icon: "💸", text: "โดนกดราคาซ้ำซ้อน" },
  { icon: "⏰", text: "รอเงินนานหลายวัน" },
  { icon: "🤐", text: "ไม่รู้ว่าใครซื้อ-ใครขาย" },
] as const;

const directBenefits = [
  { icon: "✅", text: "ราคายุติธรรม ทั้งสองฝ่าย" },
  { icon: "⚡", text: "จ่ายเร็ว รับเงินไว" },
  { icon: "🤝", text: "คุยตรง ไม่มีคนกลาง" },
] as const;

const trustItems = [
  {
    emoji: "🛡️",
    title: "เงินมัดจำปลอดภัย",
    desc: "เงินอยู่ในระบบมัดจำ จนกว่าจะรับสินค้าเรียบร้อย ทั้งผู้ซื้อและผู้ขายสบายใจ",
  },
  {
    emoji: "✅",
    title: "ตรวจ QC ก่อนส่งมอบ",
    desc: "แพลตฟอร์มตรวจสอบคุณภาพสินค้าทุกครั้ง ก่อนส่งถึงมือผู้ซื้อ",
  },
  {
    emoji: "🚚",
    title: "รับเองฟรี หรือส่งถึงที่",
    desc: "เลือกรับสินค้าด้วยตัวเอง หรือใช้บริการขนส่งของเรา — คุณเลือกเองได้",
  },
] as const;

const buyerSeller = [
  {
    role: "ผู้ซื้อ",
    roleIcon: "💰",
    color: "buyer" as const,
    benefits: [
      "ตั้งราคาที่ต้องการ รอเกษตรกรเสนอ",
      "ไม่ต้องผ่านนายหน้า ราคาถูกกว่า",
      "เงินมัดจำปลอดภัย ตรวจสอบได้",
    ],
  },
  {
    role: "ผู้ขาย",
    roleIcon: "🌿",
    color: "seller" as const,
    benefits: [
      "ขายตรงถึงผู้ซื้อ ราคาดีกว่า",
      "ไม่โดนกดราคาจากคนกลาง",
      "รับเงินเร็ว เมื่อส่งมอบสำเร็จ",
    ],
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-white/3" />

        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:max-w-7xl lg:px-8 md:grid-cols-2 md:pb-24 md:pt-24">
          {/* Left: Brand + Copy */}
          <div className="text-center md:text-left">
            <div className="animate-fade-in mb-5 flex items-center justify-center gap-2.5 md:justify-start lg:mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] bg-white/15 text-xl backdrop-blur-sm lg:h-12 lg:w-12 lg:text-2xl">
                🌿
              </span>
              <span className="text-2xl font-extrabold tracking-tight lg:text-3xl xl:text-4xl">
                AgriForward
              </span>
            </div>

            <h1 className="animate-fade-in mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
              ซื้อ-ขายสินค้าเกษตร
              <br />
              <span className="text-yellow-300">โดยตรง ไม่ผ่านคนกลาง</span>
            </h1>
            <p className="animate-fade-in mb-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base md:max-w-none lg:text-lg">
              บน AgriForward เชื่อมต่อเกษตรกรกับผู้ซื้อโดยตรง —
              ไม่ต้องผ่านนายหน้า ไม่ต้องถูกกดราคา ทั้งสองฝ่ายได้ราคาดีกว่า
            </p>
            <div className="animate-slide-up flex flex-col gap-3 sm:flex-row md:justify-start">
              <Button
                variant="secondary"
                size="xl"
                href="/products"
                icon={<span>🔍</span>}
                className="w-full sm:w-auto shadow-lg"
              >
                ดูสินค้า
              </Button>
              <Button
                variant="outline-light"
                size="xl"
                href="/auth/register"
                icon={<span>📝</span>}
                className="w-full sm:w-auto"
              >
                สมัครใช้งาน
              </Button>
            </div>
          </div>

          {/* Right: Problem vs Solution visual */}
          <div
            className="animate-fade-in hidden md:block"
            style={{ animationDelay: "150ms" }}
          >
            <div className="rounded-[var(--radius-2xl)] bg-white/10 p-6 backdrop-blur-sm lg:p-8">
              <div className="text-center text-sm font-semibold text-white/60 md:text-base">
                ❌ ผ่านคนกลาง
              </div>
              <div className="my-3 space-y-2 lg:my-4 lg:space-y-3">
                {middlemanProblems.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-white/5 px-4 py-2.5 text-sm text-white/80 lg:text-base"
                  >
                    <span className="text-lg">{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
              <div className="my-4 flex items-center justify-center lg:my-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-[var(--color-primary-dark)] shadow-lg lg:h-12 lg:w-12 lg:text-xl">
                  ↓
                </div>
              </div>
              <div className="text-center text-sm font-semibold text-yellow-300 md:text-base">
                ✅ ซื้อขายตรง บน{" "}
                <strong className="text-white">AgriForward</strong>
              </div>
              <div className="mt-3 space-y-2 lg:mt-4 lg:space-y-3">
                {directBenefits.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-yellow-400/10 px-4 py-2.5 text-sm font-medium text-white lg:text-base"
                  >
                    <span className="text-lg">{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO BENEFITS ===== */}
      <section className="bg-[var(--surface)] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <h2 className="mb-2 text-center text-xl sm:text-2xl font-extrabold text-[var(--foreground)] lg:text-3xl">
            ทั้งผู้ซื้อและผู้ขาย{" "}
            <span className="text-[var(--color-primary)]">
              ได้ประโยชน์เต็ม ๆ
            </span>
          </h2>
          <p className="mb-6 sm:mb-10 text-center text-sm sm:text-base text-[var(--muted)] lg:text-lg">
            บน AgriForward ไม่ผ่านคนกลาง = ราคาดีกว่า ทั้งสองฝ่าย
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {buyerSeller.map((group) => (
              <Card key={group.role} className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-3 sm:mb-5 lg:mb-6">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] text-2xl lg:h-14 lg:w-14 lg:text-3xl ${
                      group.color === "buyer"
                        ? "bg-[var(--color-buyer-light)]"
                        : "bg-[var(--color-seller-light)]"
                    }`}
                  >
                    {group.roleIcon}
                  </span>
                  <h3
                    className={`text-xl font-bold lg:text-2xl ${
                      group.color === "buyer"
                        ? "text-[var(--color-buyer)]"
                        : "text-[var(--color-seller)]"
                    }`}
                  >
                    {group.role}
                  </h3>
                </div>
                <ul className="space-y-3 lg:space-y-4">
                  {group.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-[var(--foreground)] sm:text-base lg:text-lg"
                    >
                      <span className="mt-0.5 text-base text-[var(--color-primary)]">
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS — Real photos ===== */}
      <section className="bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <h2 className="mb-2 text-center text-xl sm:text-2xl font-extrabold text-[var(--foreground)] lg:text-3xl">
            🌿 ผลไม้สดจากเกษตรกร
          </h2>
          <p className="mb-6 sm:mb-10 text-center text-sm sm:text-base text-[var(--muted)] lg:text-lg">
            เริ่มต้นด้วยผลไม้สด 6 รายการ — ซื้อขายตรงบน AgriForward ราคาดีกว่า
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {products.map((p) => (
              <Card
                key={p.slug}
                className="group flex flex-col items-center gap-2 p-3 transition-all hover:border-[var(--color-primary)] sm:gap-3 sm:p-4 lg:p-5"
              >
                <Link
                  href="/products"
                  className="flex w-full flex-col items-center gap-2 sm:gap-3"
                >
                  <div
                    className="relative h-14 w-14 overflow-hidden rounded-full transition-transform group-hover:scale-105 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                    style={{ backgroundColor: p.color }}
                  >
                    <Image
                      src={`/images/products/${p.slug}.jpg`}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <span className="text-sm font-bold text-[var(--foreground)] sm:text-base lg:text-lg">
                    {p.name}
                  </span>
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center lg:mt-10">
            <Button
              variant="primary"
              size="lg"
              href="/products"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="lg:h-5 lg:w-5"
                >
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              ดูสินค้าทั้งหมด
            </Button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-[var(--surface)] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <h2 className="mb-2 text-center text-xl sm:text-2xl font-extrabold text-[var(--foreground)] lg:text-3xl">
            ใช้งาน AgriForward ง่าย 3 ขั้นตอน
          </h2>
          <p className="mb-6 sm:mb-10 text-center text-sm sm:text-base text-[var(--muted)] lg:text-lg">
            ไม่ซับซ้อน ไม่ต้องผ่านคนกลาง
          </p>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            {steps.map((step) => (
              <Card
                key={step.num}
                className="relative flex flex-col items-center p-5 text-center sm:p-6 lg:p-10"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white shadow-md lg:h-9 lg:w-9 lg:text-base">
                    {step.num}
                  </span>
                </div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-2xl)] bg-[var(--color-primary-light)] text-3xl lg:h-20 lg:w-20 lg:text-4xl">
                  {step.emoji}
                </div>
                <h3 className="mb-1 text-base font-bold text-[var(--foreground)] sm:mb-2 sm:text-lg lg:text-xl">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm lg:text-base">
                  {step.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="bg-[var(--background)] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl lg:max-w-7xl">
          <h2 className="mb-2 text-center text-xl sm:text-2xl font-extrabold text-[var(--foreground)] lg:text-3xl">
            ทำไมต้องเชื่อมั่น AgriForward?
          </h2>
          <p className="mb-6 sm:mb-10 text-center text-sm sm:text-base text-[var(--muted)] lg:text-lg">
            ระบบคุ้มครองทั้งผู้ซื้อและผู้ขาย ทำเรื่องให้คุณสบายใจ
          </p>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {trustItems.map((item) => (
              <Card
                key={item.title}
                className="flex flex-col items-center p-5 text-center sm:p-6 lg:p-10"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[var(--radius-2xl)] bg-[var(--color-primary-light)] text-3xl lg:h-20 lg:w-20 lg:text-4xl">
                  {item.emoji}
                </div>
                <h3 className="mb-1 text-base font-bold text-[var(--foreground)] sm:mb-2 sm:text-lg lg:text-xl">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--muted)] sm:text-sm lg:text-base">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5" />
        <div className="relative mx-auto max-w-2xl text-center lg:max-w-3xl">
          <div className="mb-5 flex items-center justify-center gap-2.5 lg:mb-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] bg-white/15 text-xl backdrop-blur-sm lg:h-12 lg:w-12 lg:text-2xl">
              🌿
            </span>
            <span className="text-2xl font-extrabold tracking-tight lg:text-3xl">
              AgriForward
            </span>
          </div>
          <h2 className="mb-3 text-xl font-extrabold sm:text-2xl lg:text-3xl">
            เริ่มซื้อ-ขายตรง วันนี้
          </h2>
          <p className="mb-6 text-sm text-white/80 sm:text-base lg:text-lg">
            สมัครฟรี ไม่มีค่าใช้จ่าย — ไม่ต้องผ่านคนกลาง ราคาดีกว่าที่เคย
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="secondary"
              size="xl"
              href="/products"
              icon={<span>🔍</span>}
              className="w-full shadow-lg sm:w-auto"
            >
              ดูสินค้า
            </Button>
            <Button
              variant="outline-light"
              size="xl"
              href="/auth/register"
              icon={<span>📝</span>}
              className="w-full sm:w-auto"
            >
              สมัครใช้งาน
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <HelpFab />
    </div>
  );
}

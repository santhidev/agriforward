# AgriForward

แพลตฟอร์มซื้อขายสินค้าเกษตร B2B — ใช้ฟรี จ่ายเฉพาะค่าขนส่ง

## Tech Stack (Verified Build)

| Layer | Tech | Version |
|-------|------|---------|
| Framework | Next.js (App Router + Turbopack) | 16.2.6 |
| UI | React + Tailwind CSS v4 | 19.2.4 / ^4 |
| Language | TypeScript | ^5 |
| API | tRPC + Zod | 11.17.0 / 3.25.8 |
| ORM | Prisma | 6.6.0 |
| Database | PostgreSQL (Supabase) | — |
| Auth | Supabase Auth + `@supabase/ssr` | 2.106.2 / 0.10.3 |
| Storage | Supabase Storage | — |
| Jobs | Inngest | 4.5.0 |
| Utilities | SuperJSON + Decimal.js | 2.2.2 / 10.4.3 |

## เริ่มต้นใช้งาน

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. คัดลอก .env และกรอกค่า Supabase
#    - DATABASE_URL (PostgreSQL connection)
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
#    - SUPABASE_SERVICE_ROLE_KEY

# 3. Sync Prisma schema ไปยัง database
npx prisma db push

# 4. รัน dev server
npm run dev
```

## Scripts

| Script | คำอธิบาย |
|--------|---------|
| `npm run dev` | รัน dev server (Turbopack) |
| `npm run build` | Build สำหรับ production |
| `npm start` | รัน production server |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Sync schema ไป database |
| `npx prisma migrate dev` | รัน migration (development) |
| `npx prisma studio` | เปิด Prisma Studio |
| `npx prisma db seed` | Seed ข้อมูลเริ่มต้น |

## โครงสร้างโปรเจ็ค

```
agri5/
├── prisma/
│   └── schema.prisma          # Database schema (String แทน enum)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/
│   │   │   ├── trpc/[trpc]/   # tRPC API handler
│   │   │   └── inngest/       # Inngest handler
│   │   ├── layout.tsx         # Root layout + TRPCProvider
│   │   └── page.tsx           # Landing page
│   ├── lib/
│   │   ├── prisma.ts          # Singleton PrismaClient
│   │   ├── utils.ts           # cn() helper
│   │   ├── supabase/          # Supabase clients (browser + server)
│   │   └── trpc/              # tRPC provider + hooks
│   └── server/
│       ├── trpc.ts            # tRPC init + context + middleware
│       ├── routers/           # tRPC routers (auth, po, offer, ...)
│       └── inngest/           # Background job functions
├── docs/
│   ├── PRD-MVP-v3.md          # Product Requirements Document
│   ├── STATE-MACHINE-MVP.md   # PO + Offer state machines
│   └── adr/                   # Architecture Decision Records
└── .env.local                 # Environment variables (ไม่ commit)
```

## เอกสารที่เกี่ยวข้อง

- [PRD MVP v3.0](docs/PRD-MVP-v3.md) — ความต้องการทั้งหมด
- [State Machine](docs/STATE-MACHINE-MVP.md) — PO lifecycle + timeout jobs
- [ADR-0003](docs/adr/0003-nextjs-supabase-tech-stack.md) — เหตุผลเลือก stack + ปัญหาที่เจอ
- [ADR-0004](docs/adr/0004-mobile-pickup-qc.md) — Mobile pickup + on-site QC

## GitHub Issues

- [#1](https://github.com/santhidev/agriforward/issues/1) — PRD MVP v3.0
- [#2-#11](https://github.com/santhidev/agriforward/issues) — Implementation slices (Slice 1-10)

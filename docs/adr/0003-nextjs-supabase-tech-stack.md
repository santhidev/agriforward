# ADR-0003: เลือกใช้ Next.js + Supabase แทน Blazor + .NET สำหรับ MVP

## สถานะ

Accepted

## บริบท (Context)

PRD v2.0 กำหนด Tech Stack ไว้ดังนี้:
- **Backend**: ASP.NET Core Minimal APIs (.NET 8/9)
- **Frontend**: Blazor WASM + MudBlazor v7
- **Database**: PostgreSQL + EF Core
- **Cache/Queue**: Redis (idempotency, caching, SignalR backplane)
- **Background Jobs**: Hangfire
- **Payment**: Omise
- **Email**: SendGrid
- **Real-time**: SignalR + Redis

แต่หลังจากปรับ MVP Scope (ตัด SignalR, ตัด Line OA, ตัด real-time chat, เปลี่ยนเป็น Platform Logistics + QC) stack เดิมเริ่มมีส่วนที่เกินความจำเป็นและเพิ่มต้นทุนทั้งเวลาและเงิน

## การตัดสินใจ (Decision)

**MVP จะใช้ Tech Stack ใหม่ดังนี้:**

| ชั้น | เดิม (PRD v2.0) | ใหม่ (MVP) |
|------|------------------|-------------|
| **Frontend** | Blazor WASM + MudBlazor | **Next.js 14 (App Router) + Tailwind + shadcn/ui** |
| **Backend** | ASP.NET Core Minimal APIs | **Next.js API Routes + tRPC** |
| **Database** | PostgreSQL + EF Core | **PostgreSQL + Prisma ORM** |
| **Auth** | Custom JWT + OTP | **Supabase Auth** (มี OTP ให้เลย) |
| **Storage** | — | **Supabase Storage** (รูป dispute, เอกสาร) |
| **Cache/Queue** | Redis | **ไม่มี** (ใช้ pg_cron + Inngest แทน) |
| **Background Jobs** | Hangfire | **Inngest** |
| **Payment** | Omise | **Omise** (candidate, ยังไม่คัดเลือกขั้นสุดท้าย) |
| **Email** | SendGrid | **Resend** หรือ SendGrid |
| **Real-time** | SignalR + Redis | **ไม่มี** (ใช้ Comment Thread แทน) |
| **Hosting** | Azure/self-hosted | **Vercel (Frontend) + Supabase (Backend/DB)** |
| **Language** | C# | **TypeScript** (ทั้งสตรีค) |

## ผลที่ตามมา (Consequences)

### ดี (Pros)
- **PWA ได้ทันที**: ชาวไร่เข้าผ่านมือถือได้เหมือนแอป ไม่ต้องลง App Store
- **ลด infrastructure**: ไม่ต้องมี Redis, Hangfire server, SignalR backplane
- **Auth สำเร็จรูป**: Supabase Auth มี OTP (email + SMS ready) ให้เลย
- **File Upload สำเร็จรูป**: Supabase Storage สำหรับรูป dispute / เอกสาร
- **ค่าใช้จ่ายต่ำ**: Vercel Hobby + Supabase Free tier เอาอยู่ในระยะแรก
- **Developer หาง่าย**: JavaScript/TypeScript หาง่ายกว่า C# ในไทย
- **Deploy เร็ว**: Vercel deploy อัตโนมัติจาก Git push
- **Type-safe ทั้งสตรีค**: Prisma + tRPC + TypeScript ตั้งแต่ DB ถึง UI
- **Future-proof**: ถ้าต้องทำ Mobile App ต่อ สามารถใช้ React Native (共用 logic) ได้

### ไม่ดี (Cons)
- **ทีมต้องเรียนรู้ใหม่**: ถ้าทีมถนัด C# ต้องเปลี่ยนมา TypeScript
- **โค้ดเดิมทิ้งหมด**: ถ้ามีโค้ด .NET ไปแล้วต้อง rewrite
- **Performance**: Next.js API Routes อาจช้ากว่า .NET Minimal API ใน load สูง ๆ (แต่ MVP ยังไม่ถึง)
- **Enterprise รู้สึก "เบา"**: ถ้าต้อง scale เป็นระบบใหญ่มาก ๆ อาจต้องแยก backend ออกมา

## ทางเลือกอื่นที่พิจารณา (Alternatives Considered)

| ทางเลือก | เหตุผลที่ไม่เลือก |
|----------|------------------|
| **Blazor WASM + .NET (เดิม)** | WASM bundle ใหญ่ โหลดช้าบนมือถือ ต้องมี Redis + Hangfire |
| **Flutter + Supabase** | ดีสำหรับ mobile app แต่ Flutter Web ยังไม่สมบูรณ์เท่า Next.js |
| **Laravel + Livewire** | ดีสำหรับทีม PHP แต่เป็น SSR ไม่เหมาะกับ mobile-first |
| **Express.js + React** | ต้องจัดการ infrastructure เองเยอะ Supabase ช่วยลดได้ |

## หมายเหตุ

- การตัดสินใจนี้ส่งผลต่อการ rewrite ทั้งหมด (ถ้ามีโค้ดเดิม)
- แต่สำหรับ MVP ที่ยังไม่มีโค้ด → เป็นการเริ่มต้นที่ถูกต้อง
- Post-MVP ถ้าต้อง scale มาก ๆ สามารถแยก API ออกเป็น microservices ด้วย .NET ได้ (ใช้ Prisma ต่อกับ PostgreSQL เหมือนเดิม)

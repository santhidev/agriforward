"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { Card, CardBody } from "@/components/ui";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "เริ่มขายยังไง?",
    answer: "สมัครบัญชีผู้ขาย เลือกสินค้าที่ต้องการขาย ตั้งราคาเสนอ และรอให้ผู้ซื้อเลือกคุณ ระบบจะแจ้งเตือนเมื่อมีคนสนใจ",
  },
  {
    question: "เงินมัดจำคืออะไร?",
    answer: "เงินมัดจำคือเงินที่ผู้ขายวางไว้เพื่อยืนยันความตั้งใจขาย อัตรา 5% ของมูลค่าสินค้า (สูงสุด 1,000 บาท) จะคืนให้เมื่อการขายสำเร็จ",
  },
  {
    question: "ถ้า QC ไม่ผ่านล่ะ?",
    answer: "หากสินค้าไม่ผ่านการตรวจ QC ผู้ขายจะได้รับแจ้งเตือนพร้อมเหตุผล สามารถส่งสินค้าใหม่ที่ผ่านมาตรฐานได้ หรือยกเลิกขายและรับเงินมัดจำคืน",
  },
  {
    question: "เลือกรับของเองหรือให้ส่งถึงที่ดีกว่า?",
    answer: "ขึ้นอยู่กับความสะดวก รับเองประหยัดค่าขนส่ง ส่งถึงที่สะดวกกว่าแต่มีค่าจัดส่ง ระบบรองรับทั้งสองแบบ",
  },
  {
    question: "ยกเลิกงานซื้อได้ไหม?",
    answer: "ยกเลิกได้ก่อนที่ผู้ขายจะตอบรับ หากยกเลิกหลังตอบรับแล้ว เงินมัดจำอาจไม่ได้คืนทั้งหมด ขึ้นอยู่กับสถานการณ์",
  },
  {
    question: "ติดต่อเราได้อย่างไร?",
    answer: "ติดต่อทีมงาน AgriForward ได้ตลอดเวลาผ่านโทรศัพท์ 02-123-4567 หรืออีเมล support@agriforward.th ทีมงานจะตอบกลับภายใน 24 ชั่วโมง",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">❓ ช่วยเหลือ</h1>

        <div className="mb-4 space-y-2">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full p-4 text-left flex items-center justify-between gap-2"
              >
                <span className="text-sm font-semibold text-[var(--foreground)]">{faq.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={cn(
                    "shrink-0 text-[var(--muted)] transition-transform",
                    openIndex === index && "rotate-180"
                  )}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="border-t border-[var(--border)] px-4 pb-4 pt-2">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card>
          <CardBody>
            <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">📞 ติดต่อเรา</h2>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p>📞 โทร: <span className="font-medium text-[var(--foreground)]">02-123-4567</span></p>
              <p>📧 อีเมล: <span className="font-medium text-[var(--foreground)]">support@agriforward.th</span></p>
              <p>⏰ เวลาทำการ: <span className="font-medium text-[var(--foreground)]">จ-ศ 09:00-18:00</span></p>
            </div>
          </CardBody>
        </Card>
      </PageContainer>
      <BottomNav />
    </>
  );
}

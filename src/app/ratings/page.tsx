"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import { Card, CardBody, EmptyState } from "@/components/ui";
import { RatingStars } from "@/components/profile";
import { cn } from "@/lib/utils";

const tabs = ["ที่ได้รับ", "ที่ให้ไป"] as const;

const mockReceived = [
  { id: "1", name: "วิชัย ส.", score: 5, comment: "สินค้าดีมาก ส่งรวดเร็ว", date: "28 พ.ค. 2569" },
  { id: "2", name: "นภา ร.", score: 4, comment: "ของดี แต่แพ็คมาหน่อย", date: "25 พ.ค. 2569" },
  { id: "3", name: "ประยุทธ์ ค.", score: 5, comment: "ทุเรียนหวานมาก ขอบคุณครับ", date: "22 พ.ค. 2569" },
  { id: "4", name: "สุภาพร เจ.", score: 3, comment: "ปกติ ไม่มีอะไรพิเศษ", date: "20 พ.ค. 2569" },
];

const mockGiven = [
  { id: "5", name: "สมหวัง ข.", score: 5, comment: "ผู้ซื้อดีมาก จ่ายตรงเวลา", date: "27 พ.ค. 2569" },
  { id: "6", name: "จิตรา บ.", score: 4, comment: "สื่อสารดี รับของตรงเวลา", date: "23 พ.ค. 2569" },
];

export default function RatingsPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("ที่ได้รับ");
  const items = activeTab === "ที่ได้รับ" ? mockReceived : mockGiven;

  return (
    <>
      <Navbar />
      <PageContainer>
        <BackButton />
        <Card className="mb-4">
          <CardBody className="text-center py-4 sm:py-6">
            <div className="text-3xl sm:text-4xl mb-1">⭐</div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">4.5 <span className="text-base sm:text-lg font-normal text-[var(--muted)]">/ 5.0</span></p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <RatingStars score={4.5} size="lg" />
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">จากรีวิว {items.length} รายการ</p>
          </CardBody>
        </Card>

        <div className="mb-4 flex rounded-[var(--radius)] border border-[var(--border)] overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item) => (
              <Card key={item.id}>
                <CardBody>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[var(--foreground)]">{item.name}</span>
                    <span className="text-xs text-[var(--muted)]">{item.date}</span>
                  </div>
                  <RatingStars score={item.score} size="sm" />
                  <p className="mt-1.5 text-sm text-[var(--muted)]">{item.comment}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon="📭" title="ยังไม่มีรีวิว" description="รีวิวจะแสดงที่นี่เมื่อมีการรีวิว" />
        )}
      </PageContainer>
      <BottomNav />
    </>
  );
}

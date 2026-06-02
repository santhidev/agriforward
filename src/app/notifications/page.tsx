"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { EmptyState, Button } from "@/components/ui";
import { NotificationItem } from "@/components/notifications";

interface Notification {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    icon: "🤝",
    title: "มีคนมาขาย",
    description: "สมชาย เสนอขายทุเรียน 80 บาท/กก. สำหรับงานซื้อ #1024",
    time: "5 นาทีก่อน",
    isRead: false,
  },
  {
    id: 2,
    icon: "⏰",
    title: "ถูกเลือกแล้วกรุณาตอบรับ",
    description: "คุณถูกเลือกให้ส่งมะม่วง 50 กก. กรุณาตอบรับภายใน 24 ชม.",
    time: "1 ชั่วโมงก่อน",
    isRead: false,
  },
  {
    id: 3,
    icon: "⚠️",
    title: "งานใกล้หมดอายุ",
    description: "งานซื้อลำใย #1018 จะหมดอายุในอีก 2 วัน กรุณาดำเนินการ",
    time: "3 ชั่วโมงก่อน",
    isRead: true,
  },
  {
    id: 4,
    icon: "💰",
    title: "จ่ายเงินสำเร็จ",
    description: "ผู้ซื้อได้ชำระเงินค่าสินค้ามังคุด #1012 เรียบร้อยแล้ว",
    time: "เมื่อวาน",
    isRead: true,
  },
  {
    id: 5,
    icon: "✅",
    title: "ส่งมอบสำเร็จ",
    description: "การส่งมอบทุเรียน #1005 เสร็จสมบูรณ์ เงินมัดจำจะคืนให้คุณ",
    time: "2 วันก่อน",
    isRead: true,
  },
];

type Tab = "ทั้งหมด" | "ยังไม่อ่าน";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [tab, setTab] = useState<Tab>("ทั้งหมด");

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const filtered = useMemo(() => {
    if (tab === "ยังไม่อ่าน") return notifications.filter((n) => !n.isRead);
    return notifications;
  }, [notifications, tab]);

  const handleMarkAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    // TODO: navigate to notification detail/destination when routing is ready
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const handleNotificationClick = useCallback(
    (id: number) => {
      handleMarkAsRead(id);
      // Placeholder: navigate when a link target is defined
      // router.push(`/notifications/${id}`);
    },
    [handleMarkAsRead],
  );

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            🔔 ข่าวสาร
          </h1>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              อ่านทั้งหมด
            </Button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="mb-4 flex gap-1 rounded-[var(--radius)] bg-[var(--surface-muted)] p-1">
          {(["ทั้งหมด", "ยังไม่อ่าน"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-[var(--radius)] py-2 text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {t === "ยังไม่อ่าน" && unreadCount > 0
                ? `${t} (${unreadCount})`
                : t}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((n) => (
              <button
                key={n.id}
                type="button"
                className="w-full text-left"
                onClick={() => handleNotificationClick(n.id)}
              >
                <NotificationItem
                  icon={n.icon}
                  title={n.title}
                  description={n.description}
                  time={n.time}
                  isRead={n.isRead}
                />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📭"
            title="ไม่มีข่าวสารใหม่"
            description="ข่าวสารจะแสดงที่นี่เมื่อมีการแจ้งเตือนใหม่"
          />
        )}
      </PageContainer>
      <BottomNav />
    </>
  );
}

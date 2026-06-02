"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import {
  Card,
  CardBody,
  Button,
  Badge,
  ConfirmDialog,
  Input,
} from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

const mockProfile = {
  displayName: "สมชาย ใจดี",
  roles: ["BUYER", "SELLER"] as const,
  phone: "081-234-5678",
  farmName: "ฟาร์มสมชาย",
  companyName: "บริษัท ใจดี อะกริ",
  address: "123 ถ.เกษตร อ.เมือง จ.เชียงใหม่ 50000",
};

const quickLinks = [
  { icon: "💰", label: "เงินของฉัน", href: "/wallet" },
  { icon: "⭐", label: "คะแนน", href: "/ratings" },
  { icon: "⚙️", label: "ตั้งค่า", href: "/settings" },
  { icon: "❓", label: "ช่วยเหลือ", href: "/help" },
] as const;

const roleBadgeMap: Record<
  string,
  { label: string; variant: "blue" | "green" | "yellow" }
> = {
  BUYER: { label: "ผู้ซื้อ", variant: "blue" },
  SELLER: { label: "ผู้ขาย", variant: "green" },
  BOTH: { label: "ทั้งสอง", variant: "yellow" },
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [name, setName] = useState(mockProfile.displayName);
  const [phone, setPhone] = useState(mockProfile.phone);
  const [nameError, setNameError] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      setNameError("กรุณากรอกชื่อ");
      return;
    }
    setNameError("");
    setEditing(false);
  };

  const handleEdit = () => {
    setNameError("");
    setEditing(true);
  };

  const handleCancel = () => {
    setName(mockProfile.displayName);
    setPhone(mockProfile.phone);
    setNameError("");
    setEditing(false);
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card className="mb-4">
          <CardBody className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-2xl sm:text-3xl shrink-0">
              🧑
            </div>
            <div className="min-w-0 flex-1">
              {editing ? (
                <div className="space-y-2">
                  <Input
                    label="ชื่อ"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    error={nameError}
                  />
                  <Input
                    label="เบอร์โทร"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>
                      บันทึก
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                    {name}
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {mockProfile.roles.map((role) => (
                      <Badge key={role} variant={roleBadgeMap[role].variant}>
                        {roleBadgeMap[role].label}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">{phone}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    ฟาร์ม: {mockProfile.farmName}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    บริษัท: {mockProfile.companyName}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {mockProfile.address}
                  </p>
                  <Link
                    href="/ratings"
                    className="mt-2 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    ⭐ ดูคะแนนของฉัน
                  </Link>
                </>
              )}
            </div>
          </CardBody>
        </Card>
        {!editing && (
          <Button
            variant="secondary"
            fullWidth
            onClick={handleEdit}
            className="mb-4 h-12"
          >
            แก้ไขข้อมูล
          </Button>
        )}
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card>
                <CardBody className="flex items-center justify-between min-h-[44px]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {link.label}
                    </span>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[var(--muted)]"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
        <Button
          variant="danger"
          fullWidth
          onClick={() => setLogoutOpen(true)}
          className="mt-6 h-12"
        >
          ออกจากระบบ
        </Button>
        <ConfirmDialog
          open={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          onConfirm={() => {
            setLogoutOpen(false);
            toast("ออกจากระบบสำเร็จ", "info");
          }}
          title="ออกจากระบบ"
          confirmLabel="ออก"
          variant="danger"
        >
          คุณต้องการออกจากระบบหรือไม่?
        </ConfirmDialog>
      </PageContainer>
      <BottomNav />
    </>
  );
}

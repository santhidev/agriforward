"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ConfirmDialog,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between py-3 min-h-[44px] cursor-pointer">
      <span className="text-sm font-medium text-[var(--foreground)]">
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors min-w-[44px]",
          checked ? "bg-[var(--color-primary)]" : "bg-[var(--border)]",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-[var(--surface)] shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </label>
  );
}

export default function SettingsPage() {
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Navbar />
      <PageContainer>
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          ⚙️ ตั้งค่า
        </h1>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>การแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardBody className="pt-0">
            <Toggle
              label="แจ้งเตือนในแอป"
              checked={inApp}
              onChange={() => setInApp(!inApp)}
            />
            <div className="border-t border-[var(--border)]" />
            <Toggle
              label="แจ้งเตือนทางอีเมล"
              checked={email}
              onChange={() => setEmail(!email)}
            />
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>ความปลอดภัย</CardTitle>
          </CardHeader>
          <CardBody className="pt-0">
            <Link
              href="/settings/password"
              className="block w-full py-3 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              เปลี่ยนรหัสผ่าน
            </Link>
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>เกี่ยวกับ</CardTitle>
          </CardHeader>
          <CardBody className="pt-0 space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[var(--muted)]">เวอร์ชัน</span>
              <span className="text-sm font-medium text-[var(--foreground)]">
                1.0.0
              </span>
            </div>
            <div className="border-t border-[var(--border)]" />
            <a
              href="/terms"
              className="block py-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              เงื่อนไขการใช้งาน
            </a>
            <div className="border-t border-[var(--border)]" />
            <a
              href="/privacy"
              className="block py-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              นโยบายความเป็นส่วนตัว
            </a>
          </CardBody>
        </Card>

        <button
          onClick={() => setDeleteOpen(true)}
          className="mt-4 w-full py-3 text-center text-sm font-semibold text-[var(--color-danger)] hover:underline min-h-[44px]"
        >
          ลบบัญชี
        </button>

        <ConfirmDialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={() => setDeleteOpen(false)}
          title="ลบบัญชี"
          confirmLabel="ลบ"
          variant="danger"
        >
          การลบบัญชีเป็นการดำเนินการที่ไม่สามารถย้อนกลับได้
          ข้อมูลและประวัติทั้งหมดจะถูกลบถาวร คุณแน่ใจหรือไม่?
        </ConfirmDialog>
      </PageContainer>
      <BottomNav />
    </>
  );
}

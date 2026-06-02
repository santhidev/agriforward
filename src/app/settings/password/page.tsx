"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast, Button, Input, Card, CardBody, ProgressBar, Alert } from "@/components/ui";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";

function getPasswordStrength(pw: string): {
  label: string;
  percent: number;
  variant: "danger" | "warning" | "success";
} {
  if (pw.length === 0) return { label: "", percent: 0, variant: "danger" };
  if (pw.length < 8) return { label: "สั้นเกินไป", percent: 25, variant: "danger" };
  let score = 0;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "ปานกลาง", percent: 50, variant: "warning" };
  return { label: "แข็งแกร่ง", percent: 100, variant: "success" };
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const newPasswordValid = newPassword.length >= 8;
  const confirmPasswordValid = confirmPassword === newPassword && confirmPassword.length > 0;
  const strength = getPasswordStrength(newPassword);

  function handleSubmit() {
    setError("");

    if (!currentPassword) {
      setError("กรุณากรอกรหัสผ่านเดิม");
      return;
    }
    if (!newPassword) {
      setError("กรุณากรอกรหัสผ่านใหม่");
      return;
    }
    if (!newPasswordValid) {
      setError("รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (!confirmPassword) {
      setError("กรุณายืนยันรหัสผ่านใหม่");
      return;
    }
    if (!confirmPasswordValid) {
      setError("รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("เปลี่ยนรหัสผ่านสำเร็จ", "success");
      router.push("/settings");
    }, 1000);
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <BackButton href="/settings" />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          เปลี่ยนรหัสผ่าน
        </h1>

        <Card>
          <CardBody>
            <div className="space-y-4">
              {error && (
                <Alert variant="danger" title="เกิดข้อผิดพลาด">
                  {error}
                </Alert>
              )}

              <Input
                label="รหัสผ่านเดิม"
                type="password"
                placeholder="กรอกรหัสผ่านเดิม"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (error) setError("");
                }}
              />

              <Input
                label="รหัสผ่านใหม่"
                type="password"
                placeholder="อย่างน้อย 8 ตัวอักษร"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                }}
                error={
                  newPassword.length > 0 && !newPasswordValid
                    ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
                    : undefined
                }
              />

              {newPassword.length > 0 && (
                <ProgressBar
                  value={strength.percent}
                  showPercent
                  label={"ความแข็งแกร่ง: " + strength.label}
                />
              )}

              <Input
                label="ยืนยันรหัสผ่านใหม่"
                type="password"
                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                error={
                  confirmPassword.length > 0 && !confirmPasswordValid
                    ? "รหัสผ่านไม่ตรงกัน"
                    : undefined
                }
              />

              <Button
                variant="primary"
                fullWidth
                className="h-14"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </PageContainer>
      <BottomNav />
    </>
  );
}

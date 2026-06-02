"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Button, Alert, Spinner, useToast } from "@/components/ui";

export function LoginForm() {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const phoneValid = /^\d{10}$/.test(phone);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!phoneValid) { setError("เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"); return; }
    if (password.length < 8) { setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast("เข้าสู่ระบบสำเร็จ", "success"); }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert variant="danger" title="เข้าสู่ระบบไม่สำเร็จ">{error}</Alert>}
      <Input label="เบอร์โทรศัพท์" type="tel" placeholder="0XX XXX XXXX" maxLength={10} value={phone}
        onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setPhone(v); if (error) setError(""); }}
        error={phone.length > 0 && !phoneValid ? "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก" : undefined} inputMode="numeric" />
      <div className="relative">
        <Input label="รหัสผ่าน" type={showPassword ? "text" : "password"} placeholder="รหัสผ่าน 8 ตัวอักษรขึ้นไป" value={password}
          onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }} />
        <button type="button" className="absolute right-3 top-[38px] min-h-[44px] min-w-[44px] flex items-center justify-center text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          onClick={() => setShowPassword(!showPassword)}>{showPassword ? "ซ่อน" : "แสดง"}</button>
      </div>
      <div className="text-right"><span className="text-sm text-[var(--muted)]">ลืมรหัสผ่าน?</span></div>
      <Button type="submit" variant="primary" fullWidth disabled={loading} className="h-14">
        {loading ? <Spinner size="sm" className="mr-2" /> : null}เข้าสู่ระบบ
      </Button>
      <p className="text-center text-sm text-[var(--muted)]">ยังไม่มีบัญชี? <Link href="/auth/register" className="font-semibold text-[var(--color-primary)] hover:underline">สมัครใช้งาน</Link></p>
    </form>
  );
}
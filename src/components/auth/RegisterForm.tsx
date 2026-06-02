"use client";

import { useState, useRef, useCallback } from "react";
import { Input, Button, Alert, Spinner, ProgressBar, useToast } from "@/components/ui";

const STEP_PHONE = 1;
const STEP_OTP = 2;
const STEP_PASSWORD = 3;

export function RegisterForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(STEP_PHONE);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const phoneValid = /^\d{10}$/.test(phone);
  const otpComplete = otp.every((d) => d.length === 1);
  const passwordValid = password.length >= 8;
  const confirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

  function getPasswordStrength(pw: string): { label: string; percent: number; variant: "danger" | "warning" | "success" } {
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

  const strength = getPasswordStrength(password);

  function startCountdown() {
    setCountdown(60);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => { if (prev <= 1) { if (countdownRef.current) clearInterval(countdownRef.current); return 0; } return prev - 1; });
    }, 1000);
  }

  function handleSendOtp() {
    setError("");
    if (!phoneValid) { setError("เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(STEP_OTP); startCountdown(); setTimeout(() => otpRefs.current[0]?.focus(), 100); }, 1000);
  }

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  }, [otp]);

  const handleOtpKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  }, [otp]);

  function handleOtpSubmit() {
    setError("");
    if (!otpComplete) { setError("กรุณากรอก OTP 6 หลักให้ครบ"); return; }
    setStep(STEP_PASSWORD);
  }

  function handleRegister() {
    setError("");
    if (!passwordValid) { setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"); return; }
    if (!confirmPasswordValid) { setError("รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast("สมัครใช้งานสำเร็จ", "success"); }, 1000);
  }

  return (
    <div className="space-y-4">
      <ProgressBar value={step} max={3} showPercent label={"ขั้นตอนที่ " + step + " จาก 3"} />
      {error && <Alert variant="danger" title="เกิดข้อผิดพลาด">{error}</Alert>}

      {step === STEP_PHONE && (
        <div className="space-y-4">
          <Input label="เบอร์โทรศัพท์" type="tel" placeholder="0XX XXX XXXX" maxLength={10} value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); if (error) setError(""); }}
            error={phone.length > 0 && !phoneValid ? "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก" : undefined} hint="เราจะส่งรหัส OTP ไปยังเบอร์โทรนี้" inputMode="numeric" />
          <Button variant="primary" fullWidth className="h-14" onClick={handleSendOtp} disabled={loading}>
            {loading ? <Spinner size="sm" className="mr-2" /> : null}ส่ง OTP
          </Button>
        </div>
      )}

      {step === STEP_OTP && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)] text-center">กรอกรหัส OTP 6 หลักที่ส่งไปยังเบอร์ {phone.slice(0, 3)}-XXXX-{phone.slice(6)}</p>
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {otp.map((digit, i) => (
              <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="h-12 w-10 sm:h-14 sm:w-12 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-center text-lg sm:text-xl font-bold text-[var(--foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20" />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            {countdown > 0 ? <span className="text-sm text-[var(--muted)]">ส่ง OTP อีกครั้งใน {countdown} วินาที</span> : <Button variant="ghost" size="sm" onClick={() => { startCountdown(); }}>ส่ง OTP อีกครั้ง</Button>}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => { setStep(STEP_PHONE); setOtp(["", "", "", "", "", ""]); setError(""); }}>ย้อนกลับ</Button>
            <Button variant="primary" fullWidth className="h-14" onClick={handleOtpSubmit} disabled={!otpComplete}>ถัดไป</Button>
          </div>
        </div>
      )}

      {step === STEP_PASSWORD && (
        <div className="space-y-4">
          <Input label="รหัสผ่าน" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" value={password}
            onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
            error={password.length > 0 && !passwordValid ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" : undefined} />
          {password.length > 0 && <ProgressBar value={strength.percent} showPercent label={"ความแข็งแกร่ง: " + strength.label} />}
          <Input label="ยืนยันรหัสผ่าน" type="password" placeholder="กรอกรหัสผ่านอีกครั้ง" value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(""); }}
            error={confirmPassword.length > 0 && !confirmPasswordValid ? "รหัสผ่านไม่ตรงกัน" : undefined} />
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => { setStep(STEP_OTP); setError(""); }}>ย้อนกลับ</Button>
            <Button variant="primary" fullWidth className="h-14" onClick={handleRegister} disabled={loading}>
              {loading ? <Spinner size="sm" className="mr-2" /> : null}สมัครใช้งาน
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Button, Alert, Spinner } from "@/components/ui";
import { cn } from "@/lib/utils";

type UserRole = "buyer" | "seller" | "both";

export function OnboardingForm() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!displayName.trim()) {
      setError("กรุณากรอกชื่อที่แสดงบนแพลตฟอร์ม");
      return;
    }
    if (!role) {
      setError("กรุณาเลือกบทบาทของคุณ");
      return;
    }

    setSubmitting(true);
    // Mock: simulate API call with setTimeout
    setTimeout(() => {
      setSubmitting(false);
      router.push("/auth/consent");
    }, 1200);
  }

  const roleOptions: { value: UserRole; label: string; color: string; selectedColor: string; icon: string }[] = [
    { value: "buyer", label: "ฉันซื้อ", color: "border-[var(--color-buyer)]", selectedColor: "bg-[var(--color-buyer-light)] border-[var(--color-buyer)]", icon: "🛒" },
    { value: "seller", label: "ฉันขาย", color: "border-[var(--color-seller)]", selectedColor: "bg-[var(--color-seller-light)] border-[var(--color-seller)]", icon: "🌾" },
    { value: "both", label: "ทั้งซื้อและขาย", color: "border-[var(--color-primary)]", selectedColor: "bg-[var(--color-primary-light)] border-[var(--color-primary)]", icon: "🔄" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="danger" title="ข้อมูลไม่ครบ">
          {error}
        </Alert>
      )}

      <Input
        label="ชื่อที่แสดงบนแพลตฟอร์ม"
        placeholder="เช่น สมชาย ขายของ"
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
          if (error) setError("");
        }}
        required
      />

      <Input
        label="ชื่อฟาร์ม/สวน"
        placeholder="เช่น ฟาร์มสุขสันต์"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
        hint="ไม่จำเป็นต้องกรอก"
      />

      <Input
        label="ชื่อบริษัท/ร้าน"
        placeholder="เช่น บริษัท อะกรี จำกัด"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        hint="ไม่จำเป็นต้องกรอก"
      />

      <Textarea
        label="ที่อยู่จัดส่ง"
        placeholder="บ้านเลขที่, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        hint="ไม่จำเป็นต้องกรอก"
        rows={3}
      />

      <div className="mb-2">
        <p className="mb-2 text-sm font-medium text-[var(--foreground)]">บทบาทของคุณ</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {roleOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setRole(opt.value);
                if (error) setError("");
              }}
              className={cn(
                "flex flex-col items-center gap-2 rounded-[var(--radius)] border-2 p-4 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30",
                role === opt.value ? opt.selectedColor : `bg-[var(--surface)] ${opt.color}`
              )}
            >
              <span className="text-3xl">{opt.icon}</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary" fullWidth className="h-14" disabled={submitting}>
        {submitting ? <Spinner size="sm" className="mr-2" /> : null}
        บันทึกและไปต่อ
      </Button>
    </form>
  );
}

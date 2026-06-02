import Link from "next/link";
import { Card, CardBody } from "@/components/ui";
import { LoginForm } from "@/components/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8 pb-16 md:pb-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="text-3xl sm:text-4xl">🌿</span>
          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--foreground)]">AgriForward</h1>
        </div>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-center text-base sm:text-lg font-semibold text-[var(--foreground)]">เข้าสู่ระบบ</h2>
            <LoginForm />
          </CardBody>
        </Card>

        <p className="mt-4 text-center text-sm text-[var(--muted)]">
          ยังไม่มีบัญชี?{" "}
          <Link href="/auth/register" className="font-semibold text-[var(--color-primary)] hover:underline">
            สมัครใช้งาน
          </Link>
        </p>
      </div>
    </div>
  );
}
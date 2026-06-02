import { Card, CardBody } from "@/components/ui";
import { OnboardingForm } from "@/components/auth";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8 pb-16 md:pb-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="text-3xl sm:text-4xl">🌿</span>
          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--foreground)]">AgriForward</h1>
        </div>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-center text-base sm:text-lg font-semibold text-[var(--foreground)]">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</h2>
            <OnboardingForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
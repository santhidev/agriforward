"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, ConfirmDialog } from "@/components/ui";

export default function ConsentPage() {
  const router = useRouter();
  const [showDenyDialog, setShowDenyDialog] = useState(false);

  function handleConsent() {
    router.push("/products");
  }

  function handleDeny() {
    setShowDenyDialog(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-8 pb-16 md:pb-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="text-3xl sm:text-4xl">🌿</span>
          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--foreground)]">AgriForward</h1>
        </div>

        <Card>
          <CardBody>
            <h2 className="mb-4 text-center text-base sm:text-lg font-semibold text-[var(--foreground)]">ข้อตกลงการใช้งาน</h2>

            <div className="mb-6 space-y-3 text-sm leading-relaxed text-[var(--foreground)]">
              <p>
                เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ เช่น เบอร์โทรศัพท์ ชื่อ ที่อยู่ เพื่อให้บริการแพลตฟอร์ม AgriForward ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
              </p>
              <p>
                ข้อมูลของคุณจะถูกใช้เพื่อ:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>ยืนยันตัวตนและจัดการบัญชีของคุณ</li>
                <li>เชื่อมต่อผู้ซื้อและผู้ขายบนแพลตฟอร์ม</li>
                <li>แสดงรายการสินค้าและอำนวยความสะดวกในการทำธุรกรรม</li>
                <li>ปรับปรุงประสบการณ์การใช้งาน</li>
              </ul>
              <p>
                คุณสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้ตลอดเวลา
              </p>
            </div>

            <div className="space-y-3">
              <Button variant="primary" fullWidth className="h-14" onClick={handleConsent}>
                ยินยอม
              </Button>
              <Button variant="danger" fullWidth className="h-14" onClick={handleDeny}>
                ปฏิเสธ
              </Button>
            </div>
          </CardBody>
        </Card>

        <ConfirmDialog
          open={showDenyDialog}
          onClose={() => setShowDenyDialog(false)}
          onConfirm={() => setShowDenyDialog(false)}
          title="ไม่สามารถใช้งานได้"
          confirmLabel="เข้าใจแล้ว"
          variant="primary"
        >
          <p className="text-sm text-[var(--foreground)]">
            หากคุณไม่ยินยอมให้เราเก็บข้อมูล คุณจะไม่สามารถใช้งานแพลตฟอร์ม AgriForward ได้ เนื่องจากข้อมูลจำเป็นต่อการให้บริการ
          </p>
        </ConfirmDialog>
      </div>
    </div>
  );
}
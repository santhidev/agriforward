"use client";

import { useState } from "react";
import { Button, ConfirmDialog } from "@/components/ui";

interface PublishActionProps {
  onPublish: () => void;
  onDelete: () => void;
  loading?: boolean;
}

export function PublishAction({ onPublish, onDelete, loading = false }: PublishActionProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Button variant="primary" size="xl" fullWidth onClick={onPublish} disabled={loading} className="h-14">
        เผยแพร่
      </Button>
      <Button variant="danger" size="lg" fullWidth onClick={() => setDeleteOpen(true)} disabled={loading}>
        ลบ
      </Button>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => { setDeleteOpen(false); onDelete(); }}
        title="ลบงานซื้อ"
        confirmLabel="ลบ"
        variant="danger"
      >
        คุณต้องการลบงานซื้อนี้หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
      </ConfirmDialog>
    </div>
  );
}

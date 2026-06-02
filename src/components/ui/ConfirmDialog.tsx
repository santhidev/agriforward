"use client";

import { Modal } from "./Modal";
import { Button } from "./Button";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = "ยืนยัน",
  cancelLabel = "ยกเลิก",
  variant = "primary",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex w-full gap-3">
          <Button variant="secondary" onClick={onClose} fullWidth disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} fullWidth disabled={loading}>
            {loading ? "กำลังดำเนินการ..." : confirmLabel}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
}

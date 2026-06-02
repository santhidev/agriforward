"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Modal({ open, onClose, title, children, footer, className, size = "md" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      handleClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [handleClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "rounded-[var(--radius-xl)] border-0 bg-transparent p-0 shadow-[var(--shadow-lg)] backdrop:bg-black/40",
        "animate-fade-in",
        className
      )}
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={cn(
          "w-full rounded-[var(--radius-xl)] bg-[var(--surface)] p-6",
          sizeClasses[size]
        )}
      >
        {title && (
          <h2 id="modal-title" className="mb-4 text-lg font-semibold text-[var(--foreground)]">
            {title}
          </h2>
        )}
        <div className="mb-6 text-sm text-[var(--muted)]">{children}</div>
        {footer !== undefined ? (
          <div className="flex justify-end gap-3">{footer}</div>
        ) : (
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleClose}>
              ปิด
            </Button>
          </div>
        )}
      </div>
    </dialog>
  );
}

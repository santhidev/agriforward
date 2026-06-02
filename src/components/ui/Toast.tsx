"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
  action?: ReactNode;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, action?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "info", action?: ReactNode) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, variant, message, action }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-[var(--color-success)] text-white",
  error: "bg-[var(--color-danger)] text-white",
  warning: "bg-[var(--color-warning)] text-white",
  info: "bg-[var(--color-info)] text-white",
};

const variantIcons: Record<ToastVariant, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-slide-up flex items-center gap-2 rounded-[var(--radius-lg)] px-4 py-3 shadow-lg ${variantStyles[t.variant]}`}
          role="alert"
        >
          <span aria-hidden="true">{variantIcons[t.variant]}</span>
          <span className="text-sm font-medium">{t.message}</span>
          {t.action}
          <button
            onClick={() => onRemove(t.id)}
            className="ml-2 opacity-70 hover:opacity-100"
            aria-label="ปิด"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

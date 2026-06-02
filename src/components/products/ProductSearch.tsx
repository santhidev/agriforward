"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setLocal(v);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(v), 300);
    },
    [onChange]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <Input
      value={local}
      onChange={handleChange}
      placeholder="ค้นหาสินค้า..."
      icon={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      }
    />
  );
}
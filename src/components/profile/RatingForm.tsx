"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";

interface RatingFormProps {
  targetName: string;
  targetRole?: string;
  onSubmit: (data: { rating: number; comment: string }) => void;
  loading?: boolean;
}

export function RatingForm({ targetName, targetRole, onSubmit, loading = false }: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit({ rating, comment });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-2xl)] bg-[var(--surface)] p-4 text-center border border-[var(--border)]">
        <p className="text-sm text-[var(--muted)]">ให้คะแนน</p>
        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">{targetName}</p>
        {targetRole && <span className="mt-0.5 inline-block rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-xs text-[var(--muted)]">{targetRole}</span>}
      </div>

      <div className="flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = (hovered || rating) >= star;
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-3xl transition-transform hover:scale-110 active:scale-95"
            >
              {filled ? "⭐" : "☆"}
            </button>
          );
        })}
      </div>

      <Textarea
        label="ความคิดเห็น (ไม่จำเป็น)"
        placeholder="แบ่งปันประสบการณ์..."
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        variant="primary"
        size="xl"
        fullWidth
        disabled={rating === 0 || loading}
        onClick={handleSubmit}
        className="h-14"
      >
        ให้คะแนน
      </Button>
    </div>
  );
}

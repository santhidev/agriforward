"use client";

import { useRef, useEffect, useState } from "react";
import { Textarea, Button, EmptyState, Spinner } from "@/components/ui";

interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  loading: boolean;
}

function relativeTime(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "เมื่อสักครู่";
  if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} วันที่แล้ว`;
  return `${Math.floor(diff / 2592000)} เดือนที่แล้ว`;
}

export function CommentThread({ comments, onAddComment, loading }: CommentThreadProps) {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText("");
  };

  if (comments.length === 0 && !loading) {
    return (
      <div>
        <EmptyState
          icon="💬"
          title="ยังไม่มีข้อความ"
          description="พิมพ์คำถามหรือข้อสงสัยได้เลย"
        />
        <div className="mt-3 space-y-2">
          <Textarea
            placeholder="พิมพ์ข้อความ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
          />
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            ส่งข้อความ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="max-h-80 overflow-y-auto space-y-3 mb-3">
        {comments.map((c) => (
          <div key={c.id} className="rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--foreground)]">{c.userName}</span>
              <span className="text-xs text-[var(--muted)]">{relativeTime(c.createdAt)}</span>
            </div>
            <p className="text-sm text-[var(--foreground)]">{c.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="พิมพ์ข้อความ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
        >
          {loading ? <Spinner size="sm" /> : "ส่งข้อความ"}
        </Button>
      </div>
    </div>
  );
}
import { Suspense } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { NewRatingContent } from "./NewRatingContent";

export default function NewRatingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <Suspense fallback={<NewRatingFallback />}>
          <NewRatingContent />
        </Suspense>
      </PageContainer>
      <BottomNav />
    </div>
  );
}

function NewRatingFallback() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-24 rounded bg-[var(--muted)]/20" />
      <div className="h-8 w-40 rounded bg-[var(--muted)]/20" />
      <div className="h-64 rounded-2xl bg-[var(--muted)]/10" />
    </div>
  );
}

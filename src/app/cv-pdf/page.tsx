"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CvPdfPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portfolio-pdf");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <p className="text-sm text-[var(--color-body)] animate-pulse">Redirecting to CV builder…</p>
    </div>
  );
}

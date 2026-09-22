"use client";

import { useEffect, useState } from "react";

function timeLeft(deadline: string) {
  const diff = Math.max(0, new Date(deadline).getTime() - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, minutes };
}

export default function CountdownBanner({
  text,
  deadline,
}: {
  text: string;
  deadline: string;
}) {
  const [left, setLeft] = useState(() => timeLeft(deadline));

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(deadline)), 60_000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="bg-rust">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded bg-ink px-2.5 py-1 text-xs font-semibold tracking-wide text-paper">
            Chegirmali hafta
          </span>
          <p className="text-sm font-medium text-paper">{text}</p>
        </div>
        <div className="flex gap-2 tab-nums text-xs font-semibold text-paper">
          <span className="rounded bg-rust-deep/60 px-2.5 py-1">
            {String(left.days).padStart(2, "0")} kun
          </span>
          <span className="rounded bg-rust-deep/60 px-2.5 py-1">
            {String(left.hours).padStart(2, "0")} soat
          </span>
          <span className="rounded bg-rust-deep/60 px-2.5 py-1">
            {String(left.minutes).padStart(2, "0")} daq
          </span>
        </div>
      </div>
    </div>
  );
}

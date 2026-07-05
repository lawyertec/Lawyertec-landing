"use client";

import { useRowLabel } from "@payloadcms/ui";

type StepData = {
  num?: string;
  title?: string;
};

export function StepRowLabel() {
  const { data, rowNumber } = useRowLabel<StepData>();
  const num = data?.num?.trim();
  const title = data?.title?.trim();

  if (num && title) return <span>{`${num} — ${title}`}</span>;
  if (title) return <span>{title}</span>;

  return <span>{`Paso ${(rowNumber ?? 0) + 1}`}</span>;
}

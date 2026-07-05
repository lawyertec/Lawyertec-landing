"use client";

import { useRowLabel } from "@payloadcms/ui";

type StatData = {
  value?: string;
  label?: string;
};

export function StatRowLabel() {
  const { data, rowNumber } = useRowLabel<StatData>();
  const value = data?.value?.trim();
  const label = data?.label?.trim();

  if (value && label) return <span>{`${value} — ${label}`}</span>;
  if (value) return <span>{value}</span>;

  return <span>{`Cifra ${(rowNumber ?? 0) + 1}`}</span>;
}

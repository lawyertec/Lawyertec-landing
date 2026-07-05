"use client";

import { useRowLabel } from "@payloadcms/ui";

type RowData = {
  title?: string;
  label?: string;
  tag?: string;
  keyword?: string;
  term?: string;
  value?: string;
  num?: string;
};

export function SmartRowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>();

  const text =
    data?.title?.trim() ||
    (data?.num && data?.title ? `${data.num}: ${data.title}` : undefined) ||
    (data?.value && data?.label ? `${data.value} — ${data.label}` : undefined) ||
    data?.label?.trim() ||
    data?.tag?.trim() ||
    data?.keyword?.trim() ||
    data?.term?.trim() ||
    data?.value?.trim();

  return <span>{text || `Elemento ${(rowNumber ?? 0) + 1}`}</span>;
}

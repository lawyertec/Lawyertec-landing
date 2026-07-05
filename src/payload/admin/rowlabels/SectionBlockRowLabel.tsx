"use client";

import { useRowLabel } from "@payloadcms/ui";
import { sectionBlockLabels } from "@/payload/fields/options";

type SectionRowData = {
  blockType?: string;
  title?: string;
  eyebrow?: string;
};

export function SectionBlockRowLabel() {
  const { data, rowNumber } = useRowLabel<SectionRowData>();

  const typeLabel = sectionBlockLabels[data?.blockType ?? ""] ?? "Sección";
  const title = data?.title?.trim() || data?.eyebrow?.trim();

  return (
    <span>
      {typeLabel}
      {title ? `: ${title}` : ` ${(rowNumber ?? 0) + 1}`}
    </span>
  );
}

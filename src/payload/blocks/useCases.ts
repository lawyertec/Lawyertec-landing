import type { Block } from "payload";
import { rowLabel } from "../fields/admin";
import { sectionHeaderFields } from "../fields/sectionHeader";
import { useCaseItemFields } from "../fields/items";

export const UseCasesBlock: Block = {
  slug: "useCases",
  labels: { singular: "Casos de uso", plural: "Casos de uso" },
  fields: [
    ...sectionHeaderFields(),
    {
      name: "items",
      type: "array",
      label: "Diapositivas",
      minRows: 1,
      admin: { components: rowLabel.smart, initCollapsed: true },
      fields: useCaseItemFields,
    },
  ],
};

import type { Block } from "payload";
import { rowLabel } from "../fields/admin";
import { statItemFields } from "../fields/items";

export const StatsBlock: Block = {
  slug: "stats",
  labels: { singular: "Estadísticas", plural: "Estadísticas" },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Cifras",
      minRows: 1,
      maxRows: 6,
      admin: { components: rowLabel.stat, initCollapsed: true },
      fields: statItemFields,
    },
  ],
};

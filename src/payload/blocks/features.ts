import type { Block } from "payload";
import { rowLabel } from "../fields/admin";
import { sectionHeaderFields } from "../fields/sectionHeader";
import { featureItemFields } from "../fields/items";

export const FeaturesBlock: Block = {
  slug: "features",
  labels: { singular: "Funciones", plural: "Funciones" },
  fields: [
    ...sectionHeaderFields(),
    {
      name: "items",
      type: "array",
      label: "Tarjetas",
      minRows: 1,
      maxRows: 6,
      admin: { components: rowLabel.smart, initCollapsed: true },
      fields: featureItemFields,
    },
  ],
};

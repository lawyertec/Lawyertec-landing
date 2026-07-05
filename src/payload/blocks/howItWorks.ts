import type { Block } from "payload";
import { rowLabel } from "../fields/admin";
import { sectionHeaderFields } from "../fields/sectionHeader";
import { howItWorksStepFields } from "../fields/items";

export const HowItWorksBlock: Block = {
  slug: "howItWorks",
  labels: { singular: "Cómo funciona", plural: "Cómo funciona" },
  fields: [
    ...sectionHeaderFields(),
    {
      name: "steps",
      type: "array",
      label: "Pasos",
      minRows: 1,
      maxRows: 5,
      admin: { components: rowLabel.step, initCollapsed: true },
      fields: howItWorksStepFields,
    },
  ],
};

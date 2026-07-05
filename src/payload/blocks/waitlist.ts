import type { Block } from "payload";
import { waitlistFields } from "../fields/items";

export const WaitlistBlock: Block = {
  slug: "waitlist",
  labels: { singular: "Lista de espera", plural: "Lista de espera" },
  fields: waitlistFields,
};

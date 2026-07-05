import type { Block } from "payload";
import { FeaturesBlock } from "./features";
import { HowItWorksBlock } from "./howItWorks";
import { StatsBlock } from "./stats";
import { UseCasesBlock } from "./useCases";
import { WaitlistBlock } from "./waitlist";

/** Ordered list of section block types available on the landing page. */
export const landingSectionBlocks: Block[] = [
  FeaturesBlock,
  StatsBlock,
  UseCasesBlock,
  HowItWorksBlock,
  WaitlistBlock,
];

export {
  FeaturesBlock,
  StatsBlock,
  UseCasesBlock,
  HowItWorksBlock,
  WaitlistBlock,
};

import type { LandingSection } from "@/lib/landing-content";
import { Features, HowItWorks, Stats, WaitlistSection } from "./Landing";
import UseCasesSection from "./UseCasesSection";

type LandingSectionsProps = {
  sections: LandingSection[];
};

export default function LandingSections({ sections }: LandingSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.blockType) {
          case "features":
            return <Features key={`${section.blockType}-${index}`} section={section} />;
          case "stats":
            return <Stats key={`${section.blockType}-${index}`} section={section} />;
          case "useCases":
            return (
              <UseCasesSection
                key={`${section.blockType}-${index}`}
                content={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  subtitle: section.subtitle,
                  items: section.items,
                }}
              />
            );
          case "howItWorks":
            return <HowItWorks key={`${section.blockType}-${index}`} section={section} />;
          case "waitlist":
            return <WaitlistSection key={`${section.blockType}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}

import type { Metadata } from "next";
import Header, {
  Hero,
  Features,
  Stats,
  HowItWorks,
  WaitlistSection,
  Footer,
} from "@/components/Landing";
import UseCasesSection from "@/components/UseCasesSection";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { homePageJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.tagline,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    absolute: siteConfig.defaultTitle,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <Stats />
        <UseCasesSection />
        <HowItWorks />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}

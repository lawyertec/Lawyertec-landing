import type { Metadata } from "next";
import Header, { Hero, Footer } from "@/components/Landing";
import LandingSections from "@/components/LandingSections";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/metadata";
import { homePageJsonLd } from "@/lib/json-ld";
import { getLandingContent } from "@/lib/get-landing-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingContent();

  return {
    ...createPageMetadata({
      title: content.seo.title,
      description: content.seo.description,
      keywords: content.seo.keywords,
      path: "/",
    }),
    title: {
      absolute: content.seo.title,
    },
  };
}

export default async function Home() {
  const content = await getLandingContent();

  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <Header content={content} />
      <main id="main-content">
        <Hero content={content} />
        <LandingSections sections={content.sections} />
      </main>
      <Footer />
    </>
  );
}

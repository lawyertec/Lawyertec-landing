"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import Header, { Hero, Footer } from "@/components/Landing";
import LandingSections from "@/components/LandingSections";
import { mapPayloadLanding, type PayloadLanding } from "@/lib/landing-content-map";

type LandingLivePreviewProps = {
  initialData: PayloadLanding;
  serverURL: string;
};

export default function LandingLivePreview({ initialData, serverURL }: LandingLivePreviewProps) {
  const { data } = useLivePreview({
    initialData,
    serverURL,
    depth: 1,
  });

  const content = mapPayloadLanding((data ?? initialData) as PayloadLanding);

  return (
    <>
      <Header content={content} />
      <main id="main-content">
        <Hero content={content} />
        <LandingSections sections={content.sections} />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import config from "@payload-config";
import { getPayload, type GlobalSlug } from "payload";
import LandingLivePreview from "./LandingLivePreview";
import { mapPayloadLanding, type PayloadLanding } from "@/lib/landing-content-map";
import { getPayloadServerURL } from "@/lib/payload-server-url";

export const metadata: Metadata = {
  title: "Vista previa — Lawyertec",
  robots: { index: false, follow: false },
};

export default async function PreviewPage() {
  let initialData: PayloadLanding = {};

  if (process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim()) {
    try {
      const payload = await getPayload({ config });
      initialData = (await payload.findGlobal({
        slug: "landing" as GlobalSlug,
        depth: 1,
      })) as PayloadLanding;
    } catch {
      initialData = {};
    }
  }

  // Ensure mapper produces valid content even if DB is empty
  mapPayloadLanding(initialData);

  return (
    <LandingLivePreview initialData={initialData} serverURL={getPayloadServerURL()} />
  );
}

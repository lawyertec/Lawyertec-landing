import config from "@payload-config";
import { getPayload, type GlobalSlug } from "payload";
import { defaultLandingContent } from "./landing-content";
import { mapPayloadLanding, type PayloadLanding } from "./landing-content-map";

export { mapLandingContentToPayload } from "./landing-content-map";

export async function getLandingContent() {
  if (!process.env.DATABASE_URI?.trim() || !process.env.PAYLOAD_SECRET?.trim()) {
    return defaultLandingContent;
  }

  try {
    const payload = await getPayload({ config });
    const global = await payload.findGlobal({
      slug: "landing" as GlobalSlug,
      depth: 1,
    });

    return mapPayloadLanding(global as PayloadLanding);
  } catch (error) {
    console.warn("[landing] Using default content — CMS unavailable:", error);
    return defaultLandingContent;
  }
}

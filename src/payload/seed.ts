import fs from "fs";
import path from "path";
import type { SanitizedConfig } from "payload";
import { getPayload } from "payload";
import { defaultLandingContent } from "../lib/landing-content";
import { mapLandingContentToPayload } from "../lib/landing-content-map";

async function seedMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const mediaIds: string[] = [];

  const useCasesSection = defaultLandingContent.sections.find(
    (section) => section.blockType === "useCases",
  );
  if (!useCasesSection || useCasesSection.blockType !== "useCases") {
    return mediaIds;
  }

  for (const item of useCasesSection.items) {
    const filename = path.basename(item.image);
    const filePath = path.join(process.cwd(), "public", item.image.replace(/^\//, ""));

    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping missing image: ${filePath}`);
      mediaIds.push("");
      continue;
    }

    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
    });

    if (existing.docs[0]?.id) {
      mediaIds.push(String(existing.docs[0].id));
      continue;
    }

    const doc = await payload.create({
      collection: "media",
      data: { alt: item.title },
      filePath,
    });

    mediaIds.push(String(doc.id));
    console.log(`Uploaded media: ${filename}`);
  }

  return mediaIds.filter(Boolean);
}

export async function script(config: SanitizedConfig) {
  const payload = await getPayload({ config });

  let mediaIds: string[] | undefined;
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    mediaIds = await seedMedia(payload);
  } else {
    console.log("Skipping media upload — set BLOB_READ_WRITE_TOKEN to seed carousel images.");
  }

  await payload.updateGlobal({
    slug: "landing",
    data: mapLandingContentToPayload(defaultLandingContent, mediaIds),
    context: { skipDeployHook: true },
  });

  const email = process.env.PAYLOAD_SEED_EMAIL?.trim();
  const password = process.env.PAYLOAD_SEED_PASSWORD?.trim();

  if (email && password) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: { email, password },
      });
      console.log(`Created admin user: ${email}`);
    } else {
      console.log(`Admin user already exists: ${email}`);
    }
  } else {
    console.log("Skipping admin user — set PAYLOAD_SEED_EMAIL and PAYLOAD_SEED_PASSWORD to create one.");
  }

  console.log("Landing content seeded.");
}

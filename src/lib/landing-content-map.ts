import {
  defaultLandingContent,
  defaultLandingSections,
  type ChatToolIcon,
  type FeatureIcon,
  type LandingContent,
  type LandingSection,
  type StepPreviewStyle,
} from "./landing-content";
import { resolveMediaUrl, type PayloadMedia } from "./resolve-media-url";
import type { Landing } from "../payload-types";

type PayloadSection = {
  blockType?: string;
  blockName?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: Array<{
    title?: string;
    description?: string;
    icon?: FeatureIcon;
    value?: string;
    label?: string;
    image?: string | number | PayloadMedia | null;
    caption?: string;
  }>;
  steps?: Array<{
    num?: string;
    title?: string;
    text?: string;
    previewStyle?: StepPreviewStyle;
    previewText?: string;
    previewHighlight?: string;
    previewTags?: Array<{ tag?: string }>;
  }>;
  titleHighlight?: string;
  description?: string;
  footnote?: string;
};

type LegacyPayloadLanding = {
  features?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{ title?: string; description?: string; icon?: FeatureIcon }>;
  };
  stats?: Array<{ value?: string; label?: string }>;
  useCases?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{ image?: string | number | PayloadMedia | null; title?: string; caption?: string }>;
  };
  howItWorks?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    steps?: PayloadSection["steps"];
  };
  waitlist?: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    footnote?: string;
  };
};

export type PayloadLanding = {
  nav?: LandingContent["nav"];
  hero?: LandingContent["hero"];
  marquee?: { heading?: string; sources?: Array<{ label?: string }> };
  sections?: PayloadSection[];
  chatDemo?: {
    projectTitle?: string;
    question?: string;
    tools?: Array<{ label?: string; icon?: ChatToolIcon }>;
    answer?: string;
    highlightTerms?: Array<{ term?: string }>;
    footerNote?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: Array<{ keyword?: string }>;
  };
} & LegacyPayloadLanding;

function mapPayloadSection(block: PayloadSection): LandingSection | null {
  const blockType = block.blockType ?? block.blockName;
  if (!blockType) return null;

  switch (blockType) {
    case "features": {
      const items =
        block.items
          ?.filter((item) => item.title && item.description && item.icon)
          .map((item) => ({
            title: item.title!,
            description: item.description!,
            icon: item.icon!,
          })) ?? [];
      if (!block.eyebrow || !block.title || !block.subtitle || items.length === 0) return null;
      return {
        blockType: "features",
        eyebrow: block.eyebrow,
        title: block.title,
        subtitle: block.subtitle,
        items,
      };
    }
    case "stats": {
      const items =
        block.items
          ?.filter((item) => item.value && item.label)
          .map((item) => ({ value: item.value!, label: item.label! })) ?? [];
      if (items.length === 0) return null;
      return { blockType: "stats", items };
    }
    case "useCases": {
      const items =
        block.items
          ?.map((item) => {
            const image = resolveMediaUrl(item.image);
            if (!image || !item.title || !item.caption) return null;
            return { image, title: item.title, caption: item.caption };
          })
          .filter((item): item is { image: string; title: string; caption: string } => item !== null) ?? [];
      if (!block.eyebrow || !block.title || !block.subtitle || items.length === 0) return null;
      return {
        blockType: "useCases",
        eyebrow: block.eyebrow,
        title: block.title,
        subtitle: block.subtitle,
        items,
      };
    }
    case "howItWorks": {
      const steps =
        block.steps
          ?.filter((step) => step.num && step.title && step.text)
          .map((step) => ({
            num: step.num!,
            title: step.title!,
            text: step.text!,
            previewStyle: step.previewStyle ?? "simple",
            previewText: step.previewText ?? "",
            previewHighlight: step.previewHighlight,
            previewTags: step.previewTags
              ?.map((tag) => tag.tag?.trim())
              .filter((tag): tag is string => Boolean(tag)),
          })) ?? [];
      if (!block.eyebrow || !block.title || !block.subtitle || steps.length === 0) return null;
      return {
        blockType: "howItWorks",
        eyebrow: block.eyebrow,
        title: block.title,
        subtitle: block.subtitle,
        steps,
      };
    }
    case "waitlist": {
      if (!block.title || !block.titleHighlight || !block.description || !block.footnote) return null;
      return {
        blockType: "waitlist",
        title: block.title,
        titleHighlight: block.titleHighlight,
        description: block.description,
        footnote: block.footnote,
      };
    }
    default:
      return null;
  }
}

function mapLegacyPayloadSections(data: LegacyPayloadLanding): LandingSection[] {
  const sections: LandingSection[] = [];

  if (data.features?.title) {
    const mapped = mapPayloadSection({ blockType: "features", ...data.features, items: data.features.items });
    if (mapped) sections.push(mapped);
  }
  if (data.stats?.length) {
    const mapped = mapPayloadSection({ blockType: "stats", items: data.stats });
    if (mapped) sections.push(mapped);
  }
  if (data.useCases?.title) {
    const mapped = mapPayloadSection({ blockType: "useCases", ...data.useCases, items: data.useCases.items });
    if (mapped) sections.push(mapped);
  }
  if (data.howItWorks?.title) {
    const mapped = mapPayloadSection({ blockType: "howItWorks", ...data.howItWorks, steps: data.howItWorks.steps });
    if (mapped) sections.push(mapped);
  }
  if (data.waitlist?.title) {
    const mapped = mapPayloadSection({ blockType: "waitlist", ...data.waitlist });
    if (mapped) sections.push(mapped);
  }

  return sections;
}

function mapPayloadSections(sections: PayloadSection[] | undefined): LandingSection[] {
  if (!sections?.length) return defaultLandingSections;

  const mapped = sections
    .map((block) => mapPayloadSection(block))
    .filter((section): section is LandingSection => section !== null);

  return mapped.length > 0 ? mapped : defaultLandingSections;
}

export function mapPayloadLanding(data: PayloadLanding): LandingContent {
  const sections = data.sections?.length
    ? mapPayloadSections(data.sections)
    : mapLegacyPayloadSections(data);

  return {
    nav: {
      functionsLabel: data.nav?.functionsLabel ?? defaultLandingContent.nav.functionsLabel,
      howItWorksLabel: data.nav?.howItWorksLabel ?? defaultLandingContent.nav.howItWorksLabel,
      waitlistCta: data.nav?.waitlistCta ?? defaultLandingContent.nav.waitlistCta,
    },
    hero: {
      badge: data.hero?.badge ?? defaultLandingContent.hero.badge,
      titleLine1: data.hero?.titleLine1 ?? defaultLandingContent.hero.titleLine1,
      titleHighlight: data.hero?.titleHighlight ?? defaultLandingContent.hero.titleHighlight,
      description: data.hero?.description ?? defaultLandingContent.hero.description,
    },
    marquee: {
      heading: data.marquee?.heading ?? defaultLandingContent.marquee.heading,
      sources:
        data.marquee?.sources
          ?.map((item) => item.label?.trim())
          .filter((label): label is string => Boolean(label)) ??
        defaultLandingContent.marquee.sources,
    },
    chatDemo: {
      projectTitle: data.chatDemo?.projectTitle ?? defaultLandingContent.chatDemo.projectTitle,
      question: data.chatDemo?.question ?? defaultLandingContent.chatDemo.question,
      tools:
        data.chatDemo?.tools
          ?.filter((tool) => tool.label && tool.icon)
          .map((tool) => ({ label: tool.label!, icon: tool.icon! })) ??
        defaultLandingContent.chatDemo.tools,
      answer: data.chatDemo?.answer ?? defaultLandingContent.chatDemo.answer,
      highlightTerms:
        data.chatDemo?.highlightTerms
          ?.map((item) => item.term?.trim())
          .filter((term): term is string => Boolean(term)) ??
        defaultLandingContent.chatDemo.highlightTerms,
      footerNote: data.chatDemo?.footerNote ?? defaultLandingContent.chatDemo.footerNote,
    },
    seo: {
      title: data.seo?.title ?? defaultLandingContent.seo.title,
      description: data.seo?.description ?? defaultLandingContent.seo.description,
      keywords:
        data.seo?.keywords
          ?.map((item) => item.keyword?.trim())
          .filter((keyword): keyword is string => Boolean(keyword)) ??
        defaultLandingContent.seo.keywords,
    },
    sections: sections.length > 0 ? sections : defaultLandingSections,
  };
}

function mapSectionToPayload(
  section: LandingSection,
  mediaIdsByUseCaseIndex: Map<number, number>,
  useCaseCursor: { index: number },
): Record<string, unknown> {
  switch (section.blockType) {
    case "features":
      return {
        blockType: "features",
        eyebrow: section.eyebrow,
        title: section.title,
        subtitle: section.subtitle,
        items: section.items,
      };
    case "stats":
      return {
        blockType: "stats",
        items: section.items,
      };
    case "useCases": {
      const items = section.items.map((item) => {
        const mediaId = mediaIdsByUseCaseIndex.get(useCaseCursor.index);
        useCaseCursor.index += 1;
        return mediaId
          ? { title: item.title, caption: item.caption, image: mediaId }
          : { title: item.title, caption: item.caption };
      });
      return {
        blockType: "useCases",
        eyebrow: section.eyebrow,
        title: section.title,
        subtitle: section.subtitle,
        items,
      };
    }
    case "howItWorks":
      return {
        blockType: "howItWorks",
        eyebrow: section.eyebrow,
        title: section.title,
        subtitle: section.subtitle,
        steps: section.steps.map((step) => ({
          ...step,
          previewTags: step.previewTags?.map((tag) => ({ tag })),
        })),
      };
    case "waitlist":
      return {
        blockType: "waitlist",
        title: section.title,
        titleHighlight: section.titleHighlight,
        description: section.description,
        footnote: section.footnote,
      };
  }
}

export function mapLandingContentToPayload(
  content: LandingContent,
  mediaIds?: string[],
): Partial<Omit<Landing, "id" | "updatedAt" | "createdAt">> {
  const mediaIdsByUseCaseIndex = new Map<number, number>();
  if (mediaIds?.length) {
    mediaIds.forEach((id, index) => {
      if (id) mediaIdsByUseCaseIndex.set(index, Number(id));
    });
  }

  const useCaseCursor = { index: 0 };

  return {
    nav: content.nav,
    hero: content.hero,
    marquee: {
      heading: content.marquee.heading,
      sources: content.marquee.sources.map((label) => ({ label })),
    },
    sections: content.sections.map((section) =>
      mapSectionToPayload(section, mediaIdsByUseCaseIndex, useCaseCursor),
    ) as Landing["sections"],
    chatDemo: {
      ...content.chatDemo,
      highlightTerms: content.chatDemo.highlightTerms.map((term) => ({ term })),
    },
    seo: {
      ...content.seo,
      keywords: content.seo.keywords.map((keyword) => ({ keyword })),
    },
  };
}

/** Converts legacy flat global data into sections blocks for Payload updates (preserves media IDs). */
export function rawLegacyGlobalToSectionBlocks(data: LegacyPayloadLanding): Record<string, unknown>[] {
  const sections: Record<string, unknown>[] = [];

  if (data.features) {
    sections.push({ blockType: "features", ...data.features });
  }
  if (data.stats?.length) {
    sections.push({ blockType: "stats", items: data.stats });
  }
  if (data.useCases) {
    sections.push({
      blockType: "useCases",
      eyebrow: data.useCases.eyebrow,
      title: data.useCases.title,
      subtitle: data.useCases.subtitle,
      items: data.useCases.items?.map((item) => ({
        title: item.title,
        caption: item.caption,
        image:
          typeof item.image === "object" && item.image !== null && "id" in item.image
            ? item.image.id
            : item.image,
      })),
    });
  }
  if (data.howItWorks) {
    sections.push({ blockType: "howItWorks", ...data.howItWorks });
  }
  if (data.waitlist) {
    sections.push({ blockType: "waitlist", ...data.waitlist });
  }

  return sections;
}

/** Converts legacy flat global data into the new sections blocks format (for migrations). */
export function legacyPayloadToSections(data: LegacyPayloadLanding): Record<string, unknown>[] {
  return mapLegacyPayloadSections(data).map((section) => {
    const cursor = { index: 0 };
    return mapSectionToPayload(section, new Map(), cursor);
  });
}

import { absoluteUrl, siteConfig } from "./site";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/favicon/web-app-manifest-512x512.png"),
    description: siteConfig.description,
    email: siteConfig.emails.privacy,
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
    knowsLanguage: siteConfig.language,
  };
}

export function webSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function softwareApplicationSchema(): JsonLd {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl("/")}#software`,
    name: siteConfig.name,
    applicationCategory: siteConfig.applicationCategory,
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description: siteConfig.description,
    featureList: siteConfig.features,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MXN",
      availability: "https://schema.org/PreOrder",
      description: "Lista de espera para acceso anticipado",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Abogados y profesionales del derecho en México",
    },
    inLanguage: siteConfig.language,
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  const url = absoluteUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: {
      "@id": `${absoluteUrl("/")}#website`,
    },
    about: {
      "@id": `${absoluteUrl("/")}#software`,
    },
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildJsonLd(...nodes: JsonLd[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}

export function homePageJsonLd(): string {
  return buildJsonLd(
    organizationSchema(),
    webSiteSchema(),
    softwareApplicationSchema(),
    webPageSchema({
      title: siteConfig.defaultTitle,
      description: siteConfig.description,
      path: "/",
    }),
  );
}

export function privacyPageJsonLd(): string {
  return buildJsonLd(
    organizationSchema(),
    webSiteSchema(),
    webPageSchema({
      title: "Política de privacidad",
      description:
        "Política de privacidad de Lawyertec: datos recopilados en la lista de espera, almacenamiento y derechos del usuario.",
      path: "/privacidad",
    }),
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: "Política de privacidad", path: "/privacidad" },
    ]),
  );
}

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Imagen",
    plural: "Imágenes",
  },
  admin: {
    group: "Contenido",
    description: "Imágenes del carrusel de casos de uso y otros recursos visuales.",
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      required: true,
      admin: {
        description: "Describe la imagen para accesibilidad y SEO.",
      },
    },
  ],
};

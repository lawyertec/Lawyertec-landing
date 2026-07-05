import type { GlobalConfig } from "payload";
import { landingSectionBlocks } from "../blocks";
import { rowLabel } from "../fields/admin";
import { chatToolIconOptions } from "../fields/options";
import { triggerDeploy } from "../hooks/triggerDeploy";

export const Landing: GlobalConfig = {
  slug: "landing",
  label: "Página de inicio",
  admin: {
    group: "Contenido",
    description: "Todos los textos e imágenes visibles en lawyertec.com. Guarda para publicar.",
    livePreview: {
      url: () => "/preview",
      breakpoints: [
        { label: "Escritorio", name: "desktop", width: 1440, height: 900 },
        { label: "Móvil", name: "mobile", width: 390, height: 844 },
      ],
    },
  },
  hooks: {
    afterChange: [triggerDeploy],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Navegación",
          description: "Enlaces del menú fijo en la parte superior del sitio.",
          fields: [
            {
              name: "nav",
              type: "group",
              label: "Menú superior",
              admin: {
                description: "Aparece en la barra de navegación de todas las páginas.",
              },
              fields: [
                {
                  name: "functionsLabel",
                  type: "text",
                  label: "Enlace Funciones",
                  required: true,
                  admin: { description: "Enlace que lleva a la sección de funciones." },
                },
                {
                  name: "howItWorksLabel",
                  type: "text",
                  label: "Enlace Cómo funciona",
                  required: true,
                  admin: { description: "Enlace que lleva a la sección de pasos." },
                },
                {
                  name: "waitlistCta",
                  type: "text",
                  label: "Botón lista de espera",
                  required: true,
                  admin: { description: "Texto del botón blanco en la esquina superior derecha." },
                },
              ],
            },
          ],
        },
        {
          label: "Hero",
          description: "La primera sección que ven los visitantes al entrar al sitio.",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Sección principal",
              admin: {
                description: "Título grande, descripción y formulario de lista de espera compacto.",
              },
              fields: [
                {
                  name: "badge",
                  type: "text",
                  label: "Etiqueta superior",
                  required: true,
                  admin: { description: "Píldora pequeña sobre el título (p. ej. «IA legal para abogados…»)." },
                },
                {
                  name: "titleLine1",
                  type: "text",
                  label: "Título (línea 1)",
                  required: true,
                  admin: { description: "Primera línea del titular principal." },
                },
                {
                  name: "titleHighlight",
                  type: "text",
                  label: "Título destacado (línea 2)",
                  required: true,
                  admin: { description: "Segunda línea con efecto visual destacado." },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descripción",
                  required: true,
                  admin: { description: "Párrafo bajo el titular." },
                },
              ],
            },
            {
              name: "marquee",
              type: "group",
              label: "Cinta de fuentes legales",
              admin: {
                description: "Lista desplazable de fuentes legales bajo el hero.",
              },
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: "Encabezado",
                  required: true,
                  admin: { description: "Texto sobre la cinta animada." },
                },
                {
                  name: "sources",
                  type: "array",
                  label: "Fuentes",
                  minRows: 1,
                  admin: { components: rowLabel.smart, initCollapsed: true },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Nombre",
                      required: true,
                      admin: { description: "Nombre del código o ley (p. ej. Código Civil Federal)." },
                    },
                  ],
                },
              ],
            },
            {
              name: "chatDemo",
              type: "group",
              label: "Animación del chat",
              admin: {
                description: "Simulación de conversación legal en la caja del hero.",
              },
              fields: [
                {
                  name: "projectTitle",
                  type: "text",
                  label: "Título del proyecto",
                  required: true,
                  admin: { description: "Etiqueta en la barra superior del chat." },
                },
                {
                  name: "question",
                  type: "textarea",
                  label: "Pregunta del usuario",
                  required: true,
                  admin: { description: "Burbuja de pregunta del abogado." },
                },
                {
                  name: "tools",
                  type: "array",
                  label: "Herramientas",
                  minRows: 1,
                  maxRows: 5,
                  admin: { components: rowLabel.smart, initCollapsed: true },
                  fields: [
                    { name: "label", type: "text", label: "Etiqueta", required: true },
                    {
                      name: "icon",
                      type: "select",
                      label: "Ícono",
                      required: true,
                      options: chatToolIconOptions,
                    },
                  ],
                },
                {
                  name: "answer",
                  type: "textarea",
                  label: "Respuesta",
                  required: true,
                  admin: { description: "Texto de respuesta del agente." },
                },
                {
                  name: "highlightTerms",
                  type: "array",
                  label: "Términos a resaltar",
                  admin: { components: rowLabel.smart, initCollapsed: true },
                  fields: [
                    {
                      name: "term",
                      type: "text",
                      label: "Término",
                      required: true,
                      admin: { description: "Palabra o frase resaltada en dorado en la respuesta." },
                    },
                  ],
                },
                { name: "footerNote", type: "text", label: "Nota al pie", required: true },
              ],
            },
          ],
        },
        {
          label: "Secciones",
          description: "Bloques de contenido en orden de aparición. Arrastra para reordenar o añade nuevos.",
          fields: [
            {
              name: "sections",
              type: "blocks",
              label: "Secciones de la página",
              minRows: 1,
              admin: {
                description:
                  "Cada bloque es una sección del sitio. Usa «Añadir bloque» para insertar secciones y arrastra para cambiar el orden.",
                initCollapsed: true,
              },
              blocks: landingSectionBlocks,
            },
          ],
        },
        {
          label: "SEO",
          description: "Metadatos para Google y redes sociales.",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "Metadatos",
              admin: {
                description: "Título y descripción que aparecen en Google y al compartir el enlace.",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Título de la página",
                  required: true,
                  admin: { description: "Aparece en la pestaña del navegador y en resultados de búsqueda." },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Descripción",
                  required: true,
                  admin: { description: "Resumen de 1–2 oraciones para buscadores." },
                },
                {
                  name: "keywords",
                  type: "array",
                  label: "Palabras clave",
                  admin: { components: rowLabel.smart, initCollapsed: true },
                  fields: [
                    { name: "keyword", type: "text", label: "Palabra clave", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

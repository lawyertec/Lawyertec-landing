import type { Field } from "payload";
import { featureIconOptions, stepPreviewStyleOptions } from "./options";
import { rowLabel } from "./admin";

export const featureItemFields: Field[] = [
  { name: "title", type: "text", label: "Título", required: true },
  { name: "description", type: "textarea", label: "Descripción", required: true },
  {
    name: "icon",
    type: "select",
    label: "Ícono",
    required: true,
    options: featureIconOptions,
    admin: { description: "Ícono visual de la tarjeta (no editable, solo estilo)." },
  },
];

export const statItemFields: Field[] = [
  {
    name: "value",
    type: "text",
    label: "Valor",
    required: true,
    admin: { description: "Número o cifra (p. ej. +300, 24/7)." },
  },
  {
    name: "label",
    type: "text",
    label: "Etiqueta",
    required: true,
    admin: { description: "Descripción breve bajo la cifra." },
  },
];

export const useCaseItemFields: Field[] = [
  {
    name: "image",
    type: "upload",
    relationTo: "media",
    label: "Imagen",
    required: true,
    admin: {
      description: "Arrastra una foto o elige de la biblioteca de imágenes.",
    },
  },
  { name: "title", type: "text", label: "Título", required: true },
  { name: "caption", type: "textarea", label: "Descripción", required: true },
];

export const howItWorksStepFields: Field[] = [
  {
    name: "num",
    type: "text",
    label: "Número",
    required: true,
    admin: { description: "P. ej. 01, 02, 03." },
  },
  { name: "title", type: "text", label: "Título", required: true },
  { name: "text", type: "textarea", label: "Descripción", required: true },
  {
    name: "previewStyle",
    type: "select",
    label: "Estilo de vista previa",
    required: true,
    options: stepPreviewStyleOptions,
    defaultValue: "simple",
    admin: { description: "Tipo de mini-vista previa bajo cada paso." },
  },
  {
    name: "previewText",
    type: "text",
    label: "Texto de vista previa",
    admin: { description: "Texto mostrado en la mini-vista previa." },
  },
  {
    name: "previewHighlight",
    type: "text",
    label: "Texto destacado (citas)",
    admin: {
      condition: (_, siblingData) => siblingData?.previewStyle === "citation",
      description: "Parte resaltada en color dorado (p. ej. Art. 1792 CCF).",
    },
  },
  {
    name: "previewTags",
    type: "array",
    label: "Etiquetas de vista previa",
    admin: {
      condition: (_, siblingData) => siblingData?.previewStyle === "tags",
      components: rowLabel.smart,
      initCollapsed: true,
    },
    fields: [{ name: "tag", type: "text", label: "Etiqueta", required: true }],
  },
];

export const waitlistFields: Field[] = [
  {
    name: "title",
    type: "text",
    label: "Título",
    required: true,
    admin: { description: "Primera parte del titular (antes de la palabra destacada)." },
  },
  {
    name: "titleHighlight",
    type: "text",
    label: "Palabra destacada",
    required: true,
    admin: { description: "Palabra con efecto visual (p. ej. «anticipado»)." },
  },
  { name: "description", type: "textarea", label: "Descripción", required: true },
  {
    name: "footnote",
    type: "text",
    label: "Nota al pie",
    required: true,
    admin: { description: "Texto pequeño bajo el formulario." },
  },
];

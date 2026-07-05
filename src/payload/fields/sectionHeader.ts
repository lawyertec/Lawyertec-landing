import type { Field } from "payload";

type SectionHeaderOptions = {
  required?: boolean;
};

export function sectionHeaderFields({ required = true }: SectionHeaderOptions = {}): Field[] {
  return [
    {
      name: "eyebrow",
      type: "text",
      label: "Etiqueta superior",
      required,
      admin: { description: "Texto pequeño en mayúsculas sobre el título." },
    },
    { name: "title", type: "text", label: "Título", required },
    { name: "subtitle", type: "textarea", label: "Subtítulo", required },
  ];
}

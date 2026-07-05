# Adding a landing page section

Page body sections use Payload **blocks** — a standardized pattern shared across the CMS.

## Architecture

```
src/payload/
  fields/          # Reusable field fragments (headers, items, options)
  blocks/          # Section block definitions (one file per section type)
  globals/Landing.ts

src/lib/
  landing-sections.ts   # Frontend section types + defaults
  landing-content-map.ts  # Payload ↔ frontend mapping

src/components/
  LandingSections.tsx     # Renders sections by blockType
  Landing.tsx             # Individual section components
```

## Add a new section type

1. **Define item fields** (if needed) in `src/payload/fields/items.ts`
2. **Create a block** in `src/payload/blocks/mySection.ts` using `sectionHeaderFields()` and shared item fields
3. **Register** the block in `src/payload/blocks/index.ts` → `landingSectionBlocks`
4. **Add a label** in `src/payload/fields/options.ts` → `sectionBlockLabels`
5. **Add a frontend type** in `src/lib/landing-sections.ts` and include it in the `LandingSection` union
6. **Map Payload data** in `src/lib/landing-content-map.ts` (`mapPayloadSection` + `mapSectionToPayload`)
7. **Create a React component** (or reuse an existing one) and add a case in `src/components/LandingSections.tsx`
8. **Run** `npm run generate:importmap` and `npx payload migrate:create <name>` then `npm run build`

## Example block

```typescript
// src/payload/blocks/testimonials.ts
import type { Block } from "payload";
import { sectionHeaderFields } from "../fields/sectionHeader";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: { singular: "Testimonios", plural: "Testimonios" },
  fields: [
    ...sectionHeaderFields(),
    {
      name: "items",
      type: "array",
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "author", type: "text", required: true },
      ],
    },
  ],
};
```

After registering in `landingSectionBlocks`, editors can add the block from **Secciones → Añadir bloque**.

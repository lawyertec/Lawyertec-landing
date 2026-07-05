"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { UseCasesCarouselSkeleton } from "./UseCasesCarousel";
import type { UseCasesSectionData } from "@/lib/landing-content";

const UseCasesCarousel = dynamic(() => import("./UseCasesCarousel"), {
  ssr: false,
  loading: () => <UseCasesCarouselSkeleton />,
});

type UseCasesSectionProps = {
  content: Omit<UseCasesSectionData, "blockType">;
};

export default function UseCasesSection({ content }: UseCasesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadCarousel(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCarousel(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="casos-de-uso" className="relative overflow-hidden bg-white pb-20 pt-4 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-light" />
      <div ref={sectionRef} className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-navy-muted">{content.subtitle}</p>
        </Reveal>

        <Reveal delay={120}>
          {shouldLoadCarousel ? (
            <UseCasesCarousel items={content.items} />
          ) : (
            <UseCasesCarouselSkeleton />
          )}
        </Reveal>
      </div>
    </section>
  );
}

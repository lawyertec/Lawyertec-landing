"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useCases = [
  {
    image: "/images/optimized/timon-studler-ABGaVhJxwDQ-unsplash.jpg",
    title: "Plazos bajo presión",
    caption:
      "Calcula fechas límite y montos legales cuando el tiempo apremia y no puedes permitirte un error.",
  },
  {
    image: "/images/optimized/clarisse-meyer-jKU2NneZAbI-unsplash.jpg",
    title: "Investigación doctrinal",
    caption:
      "Encuentra artículos, reglamentos y criterios relevantes en minutos — con citas listas para tu escrito.",
  },
  {
    image: "/images/optimized/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg",
    title: "Consultas con clientes",
    caption:
      "Responde con artículos citables en la sala de juntas, sin pausar la conversación para buscar fuera.",
  },
  {
    image: "/images/optimized/matthew-henry-VviFtDJakYk-unsplash.jpg",
    title: "Derecho corporativo",
    caption:
      "Analiza cláusulas societarias y riesgos contractuales en operaciones de alto volumen con respuestas verificables.",
  },
  {
    image: "/images/optimized/sebastian-pichler-bAQH53VquTc-unsplash.jpg",
    title: "Jurisprudencia y precedentes",
    caption:
      "Localiza criterios de tribunales superiores para fundamentar tu estrategia antes de una audiencia clave.",
  },
  {
    image: "/images/optimized/harry-cao-DG87bwGRRqs-unsplash.jpg",
    title: "Equipos jurídicos",
    caption:
      "Estandariza la calidad de investigación de todo el despacho en casos complejos y de alto impacto.",
  },
  {
    image: "/images/optimized/juan-luis-alejos-KJgoOAxq9ns-unsplash.jpg",
    title: "Contratos en la Ciudad de México",
    caption:
      "Valida obligaciones mercantiles y plazos del Código de Comercio antes de una reunión con tu cliente en Reforma.",
  },
  {
    image: "/images/optimized/patrick-fore-H5Lf0nGyetk-unsplash.jpg",
    title: "Demandas y procedimientos",
    caption:
      "Confirma requisitos procesales, plazos y fundamento legal antes de presentar un escrito.",
  },
  {
    image: "/images/optimized/bhargava-marripati-7LDBKPWAHJ4-unsplash.jpg",
    title: "Legislación federal y local",
    caption:
      "Cruza la Constitución, leyes federales y ordenamientos locales sin saltar entre fuentes dispersas.",
  },
] as const;

const arrowButtonClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-950/10 bg-white text-navy-950 shadow-sm transition hover:border-accent/30 hover:bg-accent/5 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11";

export default function UseCasesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll<HTMLElement>("[data-slide]");
    if (!slides.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
    setCanScrollPrev(track.scrollLeft > 8);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelectorAll<HTMLElement>("[data-slide]")[index];
    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  }

  function scrollByDirection(direction: -1 | 1) {
    scrollToIndex(Math.min(useCases.length - 1, Math.max(0, activeIndex + direction)));
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        type="button"
        onClick={() => scrollByDirection(-1)}
        disabled={!canScrollPrev}
        aria-label="Anterior"
        className={arrowButtonClass}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative min-w-0 flex-1">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Casos de uso de Lawyertec"
        >
          {useCases.map((item, index) => (
            <figure
              key={item.image}
              data-slide
              className="w-[min(78vw,300px)] shrink-0 snap-center sm:w-[340px]"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-navy-950/10 bg-navy-950/[0.04] shadow-[0_12px_40px_-20px_rgba(4,8,16,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  width={900}
                  height={600}
                  loading={index <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(min-width: 640px) 340px, 78vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="mt-4 px-1">
                <p className="text-sm font-semibold text-navy-950">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-muted">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollByDirection(1)}
        disabled={!canScrollNext}
        aria-label="Siguiente"
        className={arrowButtonClass}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function UseCasesCarouselSkeleton() {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-navy-950/[0.06] sm:h-11 sm:w-11" />
      <div className="flex min-w-0 flex-1 gap-5 overflow-hidden">
        {[0, 1].map((key) => (
          <div key={key} className="w-[min(78vw,300px)] shrink-0 sm:w-[340px]">
            <div className="aspect-[3/2] animate-pulse rounded-2xl bg-navy-950/[0.06]" />
            <div className="mt-4 space-y-2 px-1">
              <div className="h-4 w-2/3 animate-pulse rounded bg-navy-950/[0.06]" />
              <div className="h-3 w-full animate-pulse rounded bg-navy-950/[0.04]" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-navy-950/[0.06] sm:h-11 sm:w-11" />
    </div>
  );
}

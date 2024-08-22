"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

type FeaturesProps = {
  icon: {
    src: string;
    alt: string;
  };
  heading: string;
  description: string;
};

type Props = {
  tagline: string;
  heading: string;
  buttons: ButtonProps[];
  features: FeaturesProps[];
};

export type Layout121Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout121 = (props: Layout121Props) => {
  const { tagline, heading, buttons, features } = {
    ...props,
    ...Layout121Defaults,
  } as Props;

  const scrollSection = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollSection,
    offset: ["start 55%", "start start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="Red Social" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 items-start gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        <div>
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 right-auto top-[10%] h-3/4 w-0.5 bg-black/15 md:left-[2.4375rem]">
            <motion.div ref={scrollSection} className="bg-black" style={{ height }} />
          </div>
          {features.map((feature, index) => (
            <div key={index} className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
              <div className="relative flex flex-col items-center justify-start py-10">
                <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                  <img src={feature.icon.src} alt={feature.icon.alt} className="size-12" />
                </div>
              </div>
              <div className="py-10">
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  {feature.heading}
                </h6>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout121Defaults: Layout121Props = {
  heading: "Más que una red social",
  features: [
    {
      icon: {
        src: "ZORRO1.webp",
        alt: "Relume icon 1",
      },
      heading: "Conexiones Reales",
      description:
        "Crea vínculos auténticos con otros amantes de las mascotas, compartiendo experiencias y consejos.",
    },
    {
      icon: {
        src: "PM 05 B.webp",
        alt: "Relume icon 2",
      },
      heading: "Soporte Integral",
      description:
        "Accede a una amplia gama de recursos y asesoramiento para el cuidado óptimo de tus mascotas.",
    },
    {
      icon: {
        src: "PM 05 C.webp",
        alt: "Relume icon 3",
      },
      heading: "Eventos y Actividades",
      description:
        "Participa en eventos locales y actividades diseñadas para ti y tus mascotas.",
    },
    {
      icon: {
        src: "PM 05 D.webp",
        alt: "Relume icon 4",
      },
      heading: "Actualizaciones Continuas",
      description:
        "Disfruta de nuevas funciones y mejoras constantes para enriquecer tu experiencia.",
    },
  ],
};
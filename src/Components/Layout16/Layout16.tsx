import { useEffect } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

// Registrar los plugins de GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@nextui-org/react";

type ImageProps = {
  src: string;
  alt?: string;
};

type FeaturesProps = {
  icon: ImageProps;
  paragraph: string;
};

type Props = {
  heading: string;
  description: string;
  tagline: string;
  features: FeaturesProps[];
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Layout16Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout16 = (props: Layout16Props) => {
  const { tagline, heading, description, features, buttons, image } = {
    ...Layout16Defaults,
    ...props,
  } as Props;

  useEffect(() => {
    setupDefaultTextAnimations();

    function queryElementsWithExclusion(selectors: string[]): NodeListOf<HTMLElement> {
      return document.querySelectorAll(
        selectors.map(selector => `${selector}:not(.exclude)`).join(', ')
      );
    }

    function setupDefaultTextAnimations() {
      const elements = queryElementsWithExclusion([
        "p",
        ".u-text-medium",
        ".u-text-label-small",
        ".u-text-label-large",
        ".u-text-h5",
        ".u-text-large",
        ".footer-link",
        ".title-small",
        ".default-text",
        ".u-text-link",
        "h1",
        "h2",
        "h3",
        "li",
      ]);

      console.log('Found elements:', elements.length);

      if (elements.length === 0) {
        console.warn('No elements found for the provided selectors.');
        return;
      }

      elements.forEach((element) => {
        try {
          // Split text into spans using SplitType
          const splitText = new SplitType(element, { types: 'words' });

          if (splitText.words && splitText.words.length > 0) {
            gsap.from(splitText.words, {
              opacity: 0,
              y: 20,
              duration: 1,
              ease: "power3.out",
              stagger: 0.015,
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom 45%",
                toggleActions: "play none none reverse",
              },
            });
          } else {
            console.warn('No words found in element:', element);
          }
        } catch (error) {
          console.error('Error animating element:', element, error);
        }
      });
    }
  }, []);

  return (
    <section id="Plataforma" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="mb-5 text-base md:mb-6 md:text-md">{description}</p>
            <ul className="grid grid-cols-1 gap-4 py-2">
              {features.map((feature, index) => (
                <li key={index} className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <img src={feature.icon.src} alt={feature.icon.alt} className="size-6" />
                  </div>
                  <span>{feature.paragraph}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={image.src} className="w-full object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout16Defaults: Layout16Props = {
  heading: "Una plataforma única",
  description:
    "PetMatch no es solo una plataforma de adopción, es una comunidad creada para mejorar la conexión entre humanos y mascotas. Gracias a nuestra tecnología avanzada y enfoque en la personalización, te garantizamos una experiencia única y enriquecedora.",
  features: [
    {
      icon: { src: "PM 05 A.svg", alt: "Relume logo 1" },
      paragraph: " Recomendaciones basadas en IA según tu estilo de vida.",
    },
    {
      icon: { src: "PM 05 A.svg", alt: "Relume logo 2" },
      paragraph: "Comparte fotos y conecta con otros amantes de los animales.",
    },
    {
      icon: { src: "PM 05 A.svg", alt: "Relume logo 3" },
      paragraph: "Participa en discusiones y eventos exclusivos.",
    },
  ],
  image: {
    src: "/Plataforma.png",
    alt: "Placeholder image",
  },
};

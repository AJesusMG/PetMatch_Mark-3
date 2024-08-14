import { Button } from "@nextui-org/react";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  image: ImageProps;
};

export type Header26Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header26 = (props: Header26Props) => {
  const { heading, description, buttons, image } = {
    ...Header26Defaults,
    ...props,
  } as Props;
  return (
    <section id="#home" className="px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-tr from-primary-200 via-success-100/20 to-white">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
                Conoce Pet<span className="text-primary-500">Match</span>
              </h1>
              <p className="md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <Button className="bg-primary-500 text-white" radius="sm">Inicia Sesión <span className="material-symbols-outlined">
                  arrow_forward
                </span></Button>
              </div>
            </div>
          </div>
          <div className="md:-mt-14 lg:-mt-18 -mt-10">
            <img src={image.src} className="size-full object-cover" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header26Defaults: Header26Props = {
  heading: "Conoce PetMatch",
  description:
    "Encuentra tu compañero ideal con la ayuda de la inteligencia artificial. PetMatch te ayuda a descubrir las mascotas que más se adaptan a tu estilo de vida mediante un cuestionario especializado. ¡Haz de tu adopción una experiencia personalizada!",
  buttons: [{ title: "Inicia Sesión" }],
  image: {
    src: "/HeroImage.svg",
    alt: "Placeholder image",
  },
};
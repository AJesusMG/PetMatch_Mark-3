import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@nextui-org/react"

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
  return (
    <section id="#Plataforma" className="px-[5%] py-16 md:py-24 lg:py-28">
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
            <div className="mt-6 flex items-center gap-x-4 md:mt-8">
              <Button className="border-1 border-primary-500 bg-transparent hover:bg-primary-500 hover:text-white">Más información</Button>
            </div>
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
      icon: { src: "https://relume-assets.s3.amazonaws.com/relume-icon.svg", alt: "Relume logo 1" },

      paragraph: " Recomendaciones basadas en IA según tu estilo de vida.",
    },
    {
      icon: { src: "https://relume-assets.s3.amazonaws.com/relume-icon.svg", alt: "Relume logo 2" },
      paragraph: "Comparte fotos y conecta con otros amantes de los animales.",
    },
    {
      icon: { src: "https://relume-assets.s3.amazonaws.com/relume-icon.svg", alt: "Relume logo 3" },
      paragraph: "Participa en discusiones y eventos exclusivos.  ",
    },
  ],
  image: {
    src: "/Plataforma.svg",
    alt: "Placeholder image",
  },
};
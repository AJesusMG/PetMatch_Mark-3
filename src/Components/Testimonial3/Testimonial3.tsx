type ImageProps = {
    src: string;
    alt?: string;
  };
  
  type Testimonial = {
    image: ImageProps;
    quote: string;
    avatar: ImageProps;
    name: string;
    position: string;
    companyName: string;
  };
  
  type Props = {
    heading: string;
    description: string;
    testimonials: Testimonial[];
  };
  
  export type Testimonial3Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;
  
  export const Testimonial3 = (props: Testimonial3Props) => {
    const { heading, description, testimonials } = {
      ...Testimonial3Defaults,
      ...props,
    } as Props;
    return (
      <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-secondary-100">
        <div className="container">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="md:text-md">{description}</p>
          </div>
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 lg:gap-y-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <blockquote className="my-6 text-md font-bold leading-[1.4] md:my-8 md:text-xl">
                  {testimonial.quote}
                </blockquote>
                <img
                  src={testimonial.avatar.src}
                  alt={testimonial.avatar.alt}
                  className="mb-4 size-14 min-h-14 min-w-14 rounded-full object-cover"
                />
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export const Testimonial3Defaults: Testimonial3Props = {
    heading: "Historias de Amor Perruno",
    description: "Lo Que Dicen Nuestros Usuarios.",
    testimonials: [
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/webflow-logo.svg",
          alt: "Webflow logo 1",
        },
        quote:
          'PetMatch hizo que encontrar a mi perro ideal fuera una experiencia increíble. La plataforma es intuitiva y las recomendaciones fueron exactas. Me encanta compartir ¡No podría estar más feliz!',
        avatar: {
          src: "/Avatar 1.svg",
          alt: "Testimonial avatar 1",
        },
        name: "Jane Cooper",
        position: "Position",
        companyName: "Company name",
      },
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/webflow-logo.svg",
          alt: "Webflow logo 2",
        },
        quote:
          '"Adoptar a mi gata a través de PetMatch ha sido una experiencia fantástica. La comunidad es acogedora y llena de recursos útiles. Me encanta compartir y aprender con otros amantes de los animales."',
        avatar: {
          src: "Avatar 2.svg",
          alt: "Testimonial avatar 2",
        },
        name: "Wade Warren",
        position: "Position",
        companyName: "Company name",
      },
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/webflow-logo.svg",
          alt: "Webflow logo 3",
        },
        quote:
          '"Gracias a PetMatch, encontré la mascota perfecta para mí. La plataforma no solo facilitó la adopción, sino que también ofrece eventos y recursos valiosos para el cuidado de mi nueva amiga."',
        avatar: {
          src: "Avatar 3.svg",
          alt: "Testimonial avatar 3",
        },
        name: "Ronald Richards",
        position: "Position",
        companyName: "Company name",
      },
    ],
  };
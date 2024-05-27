'use client'

import React from "react";
import Hero3DComponent from "@/Components/Hero3DComponent/Hero3DComponent";
import NavBar from "@/Components/NavBar/NavBar";
import { Image } from "@nextui-org/react";
import WitnessCard from "@/Components/WitnessCard/WitnessCard";
import NewsLetter from "@/Components/NewsLetter/NewsLetter";
import Footer from "@/Components/Footer/Footer";

const testimonies = [
  {
    id: "1",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    user: "Bryan_Ruiz",
    date: "Mar 16, 2020",
    description: "Antes de PetMatch, mi vida era solitaria. Trabajaba mucho y apenas socializaba. Adoptar a Luna cambió todo. Gracias a la plataforma, encontré a esta dulce cachorra que llenó mi hogar de alegría.",
    starRating: 4,
  },
  {
    id: "2",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    user: "Brenda_Mendez",
    date: "Jul 20, 2023",
    description: "Desde que adopté a Max a través de PetMatch, mi vida ha sido mucho más feliz. Su amor incondicional y su energía contagiosa han llenado mi hogar de alegría. Gracias a PetMatch por hacer posible este encuentro tan especial.",
    starRating: 4,
  },
  {
    id: "3",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    user: "Carlos_Ramirez",
    date: "Sep 5, 2023",
    description: "Antes de descubrir PetMatch, no sabía lo que me estaba perdiendo. Adoptar a Lola ha sido una de las mejores decisiones de mi vida. Su compañía y lealtad han transformado por completo mi rutina diaria. ¡Gracias, PetMatch, por ayudarme a encontrar a mi fiel amiga!",
    starRating: 5,
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero3DComponent/>
      <div id="conoce-petmatch" className="flex flex-col px-24 mt-32 space-y-32 mb-32">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h1 className="text-7xl font-bold">Conoce</h1>
            <p className="text-8xl text-primary-500 mt-4">PetMatch</p>
            <p className="text-justify text-xl">
              PetMatch es una plataforma de adopción de mascotas que ofrece una experiencia personalizada para cada usuario. Nuestro formulario ayuda a encontrar la mascota ideal, y nuestra red social integrada permite compartir consejos y experiencias entre usuarios, creando una comunidad comprometida con el bienestar animal.
            </p>
          </div>
          <Image width={600} alt="NextUI hero Image" src="/Lomito.jpg" />
        </div>
        <div id="testimonios" className="flex flex-col gap-8">
          <h1 className="font-bold text-7xl text-center">Testimonios</h1>
          <p className="text-xl text-center">Descubre cómo PetMatch cambió la vida de estas mascotas y sus familias para siempre.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonies.map((testimony) => (
              <WitnessCard
                key={testimony.id}
                id={testimony.id}
                image={testimony.image}
                user={testimony.user}
                date={testimony.date}
                description={testimony.description}
                starRating={testimony.starRating}
              />
            ))}
          </div>
        </div>
        <div id="noticias" className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-7xl font-bold text-center">Noticias</h1>
            <h2 className="text-xl text-center">Suscríbete para ser parte de nuestra familia.</h2>
          </div>
          <NewsLetter />
        </div>
      </div>
      <Footer />
    </div>
  );
}

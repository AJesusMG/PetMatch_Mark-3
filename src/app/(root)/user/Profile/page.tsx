"use client";

import React, { useState } from "react";
import {Card, CardBody, CardFooter, CardHeader, Divider, Image, Link} from "@nextui-org/react";
import PostCard from "@/Components/PostCard/PostCard";

interface UserData {
  name: string;
  image: string;
}

// Datos de usuario estáticos
const staticUser = {
  name: "Nombre del Usuario",
  image: "/path/to/default/avatar.jpg" // Cambia esto a la ruta de tu imagen por defecto
};

// Datos de posts estáticos
const staticPosts = [
  {
    id: 1,
    urlImage: "https://petmatchbucketcd.s3.amazonaws.com/1717172384010_582",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    user: "Usuario 1",
    content: "Contenido del post 1",
    race: "Raza 1",
    size: "Tamaño 1",
    age: "Edad 1",
    instagram: "@usuario1",
    whatsapp: "+123456789",
    facebook: "/usuario1",
  }
];

export default function Profile() {
  const [PostProps, setPostProps] = useState(staticPosts);

  const [userData, setUserData] = useState<UserData>(staticUser);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row w-full">
        <header className="flex flex-row w-full items-center justify-between">
          <h1 className="text-4xl font-bold">Mi Perfil</h1>
        </header>
      </div>
      <div className="flex flex-col w-full h-full gap-8">
      <Card className="max-w-full">
  <CardHeader className="flex gap-3">
    <Image
      alt="veterinaria logo"
      height={40}
      radius="sm"
      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
      width={40}
    />
    <div className="flex flex-col">
      <p className="text-md font-bold">Veterinaria El Buen Amigo</p>
      <div className="flex items-center gap-1 text-small text-default-500">
      <span className="material-symbols-outlined w-4 h-4 mr-1">star</span>
        <span>4.5 (200 valoraciones)</span>
      </div>
      <p className="text-small text-default-500 flex items-center">
      <span className="material-symbols-outlined w-4 h-4 mr-1">location_on</span>
        Av. Siempre Viva 742, Springfield
      </p>
      <p className="text-small text-default-500 flex items-center">
      <span className="material-symbols-outlined w-4 h-4 mr-1">phone</span>
        +52 442 555 1234
      </p>
      <p className="text-small text-default-500 flex items-center">
      <span className="material-symbols-outlined w-4 h-4 mr-1">schedule</span>
        Lunes a Viernes, 9 AM - 6 PM
      </p>
    </div>
  </CardHeader>
  <Divider />
  <CardBody>
    <p>
      Somos un centro veterinario dedicado al cuidado y bienestar de tus mascotas.
      Ofrecemos servicios de atención médica, vacunación, y mucho más.
    </p>
  </CardBody>
  <Divider />
  <CardFooter className="flex justify-end">
    <Link
      isExternal
      showAnchorIcon
      href="https://github.com/nextui-org/nextui"
    >
      Visita nuestro sitio web
    </Link>
  </CardFooter>
</Card>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-5 gap-4">
            {PostProps.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                urlImage={post.urlImage}
                avatar={post.avatar}
                username={post.user}
                content={post.content}
                race={post.race}
                size={post.size}
                age={post.age}
                instagram={post.instagram}
                whatsapp={post.whatsapp}
                facebook={post.facebook}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

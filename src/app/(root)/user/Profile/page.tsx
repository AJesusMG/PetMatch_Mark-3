"use client";

import React, { useState } from "react";
import { Avatar, Chip } from "@nextui-org/react";
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
        <div className="flex flex-col w-full h-full gap-8 items-center">
          <Avatar
            src={userData.image}
            className="w-48 h-48"
          />
          <h1 className="text-4xl font-bold">{userData.name}</h1>
          <Chip size="md" className="bg-success-300 p-4 text-md">Mis publicaciones</Chip>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-5 gap-4">
            {PostProps.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                urlImage={post.urlImage}
                avatar={post.avatar}
                user={post.user}
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

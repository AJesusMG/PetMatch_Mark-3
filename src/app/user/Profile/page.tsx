"use client";

import React from "react";
import { Avatar, Chip } from "@nextui-org/react";
import PostCard from "@/Components/PostCard/PostCard";

const PostProps = [
    {
      id: 1,
      image: "https://nextui.org/images/hero-card.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      user: "Usuario 1",
      content: "Contenido del post 1",
      race: "Raza 1",
      size: "Tamaño 1",
      age: "Edad 1",
      instagram: "@usuario1",
      whatsapp: "+123456789",
      facebook: "/usuario1",
    },
    {
      id: 2,
      image: "https://nextui.org/images/album-cover.png",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 2",
      content: "Contenido del post 2",
      race: "Raza 2",
      size: "Tamaño 2",
      age: "Edad 2",
      instagram: "@usuario2",
      whatsapp: "+987654321",
      facebook: "/usuario2",
    },
    {
      id: 3,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 4,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 5,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-3.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 6,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-7.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 7,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 8,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 9,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
    {
      id: 10,
      image: "https://nextui-docs-v2.vercel.app/images/fruit-8.jpeg",
      avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
      user: "Usuario 3",
      content: "Contenido del post 3",
      race: "Raza 3",
      size: "Tamaño 3",
      age: "Edad 3",
      instagram: "@usuario3",
      whatsapp: "+2342342323",
      facebook: "/usuario3",
    },
  ];

export default function Profile() {
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
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-48 h-48"
          />
          <h1 className="text-4xl font-bold">A.Jesus.G</h1>
          <Chip size="md" className="bg-success-300 p-4 text-md">Mis publicaciones</Chip>
        </div>
        <div className="flex flex-col gap-8">
        <div className="grid grid-cols-5 gap-4">
          {PostProps.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image={post.image}
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

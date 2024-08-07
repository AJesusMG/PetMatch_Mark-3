"use client";

import React from "react";
import { Avatar, Button, Card, CardFooter, CardHeader, CardBody, Input, Image } from "@nextui-org/react";

// Datos inventados para las cards
const posts = [
  {
    id: 1,
    user: "Usuario1",
    message: "¿Alguien sabe cómo entrenar a un cachorro?",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    image: "/Lomito.jpg",
    comments: 5,
  },
  {
    id: 2,
    user: "Usuario2",
    message: "Recomendaciones para alimentar a un gato adulto",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026303d",
    image: "/Michi.jpg",
    comments: 8,
  },
  {
    id: 3,
    user: "Usuario3",
    message: "¿Cuál es la mejor manera de introducir un nuevo ave en casa?",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026304d",
    image: "/Ave.jpg",
    comments: 12,
  },
];

export default function Community() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <header className="flex flex-row w-full justify-between items-center sticky top-0 bg-white rounded-md p-4">
        <h1 className="text-4xl font-bold">Comunidad</h1>
      </header>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col w-1/2">
          <Card className="border-1 border-black p-4">
            <CardHeader className="flex flex-row justify-between items-center gap-4">
              <div className="flex flex-row gap-2">
                <Button className="bg-primary-500 text-white">Inicio</Button>
                <Button variant="light">Seguidos</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-row gap-4 items-center">
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
                <Input type="text" label="Pregunta algo a la comunidad" />
              </div>
            </CardBody>
            <CardFooter className="w-full justify-end">
              <Button className="bg-success-300 font-bold text-md">Publicar</Button>
            </CardFooter>
          </Card>
          {posts.map((post) => (
            <Card key={post.id} className="border-1 border-black p-4 mt-4">
              <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 w-full">
                  <Avatar src={post.avatar} size="lg" />
                  <div className="flex flex-col">
                    <span className="font-bold">{post.user}</span>
                    <span className="text-gray-500">{post.message}</span>
                  </div>
                </div>
                <Image src={post.image} alt="Imagen del usuario" width={600} height={300} className="rounded-md" />
              </CardHeader>
              <CardFooter className="flex flex-row items-center gap-2">
                <span className="material-symbols-outlined">add_comment</span>
                <span>{post.comments} comentarios</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

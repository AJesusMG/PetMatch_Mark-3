"use client"
import React, { useState } from "react";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import AddComment from "@/Components/AddComment/AddComment";
import RightSidebar from "@/Components/RightSideBar/RightSideBar";

const Community = () => {
  const [posts, setPosts] = useState([
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
  ]);

  const handleFavorite = (id: any) => {
    console.log(`Post ${id} marcado como favorito`);
  };

  const handleAddComment = (id: any) => {
    console.log(`Agregar comentario en post ${id}`);
  };

  const handleReply = (id: any) => {
    console.log(`Responder al post ${id}`);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-full">
      <header className="flex flex-row w-full justify-between items-center top-0 bg-white rounded-md p-4">
        <h1 className="text-4xl font-bold">Comunidad</h1>
      </header>
        <AddComment />
        <CommunityCard
          posts={posts}
          handleFavorite={handleFavorite}
          handleAddComment={handleAddComment}
          handleReply={handleReply}
        />
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Community;

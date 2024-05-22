
import PostCard from "@/Components/PostCard/PostCard";
import React from "react";
import PostCard from "@/Components/PostCard/PostCard";
import UserButton from "@/Components/UserButton/UserButton";

// const PostProps = [
//   {
//     id: 1,
//     image: "https://nextui.org/images/hero-card.jpeg",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     user: "Usuario 1",
//     content: "Contenido del post 1",
//     race: "Raza 1",
//     size: "Tamaño 1",
//     age: "Edad 1",
//     instagram: "@usuario1",
//     whatsapp: "+123456789",
//     facebook: "/usuario1",
//   },
//   {
//     id: 2,
//     image: "https://nextui.org/images/album-cover.png",
//     avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
//     user: "Usuario 2",
//     content: "Contenido del post 2",
//     race: "Raza 2",
//     size: "Tamaño 2",
//     age: "Edad 2",
//     instagram: "@usuario2",
//     whatsapp: "+987654321",
//     facebook: "/usuario2",
//   },
// ];

export default function Pruebas() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {/* {PostProps.map((post) => (
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
      ))} */}
      <UserButton/>
    </div>
  );
}

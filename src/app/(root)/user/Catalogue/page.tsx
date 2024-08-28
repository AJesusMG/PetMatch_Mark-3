'use client'
import React, { useState, useEffect } from "react";
import PostCard from "@/Components/PostCard/PostCard";
import { PostCardProps } from "@/Components/PostCard/PostCard";  
import { getSizeLabel } from "@/data/sizeAnimals";
import { getAgeLabel } from "@/data/ageAnimals";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Catalogue() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Lógica de verificación del estado del usuario...
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const formattedPosts = data.data.map((post: any, index: number) => {
          const formattedPost = {
            id: index,
            veterinaryClinicName: post.user.veterinaryClinicName,
            urlImage: post.urlImage,
            avatar: post.user.photoUrl,
            fullname: post.user.fullname,
            username: post.user.username,
            content: post.description,
            race: post.animal.breed,
            size: getSizeLabel(post.animal.size),
            age: getAgeLabel(post.animal.age),
            instagram: post.user.instagram || "",
            whatsapp: post.user.whatsapp || "",
            facebook: post.user.facebook || "",
            userId: post.user.id // Incluir userId aquí
          };
          return formattedPost;
        });

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row w-full">
        <header className="flex flex-row w-full items-center justify-between">
          <h1 className="text-4xl font-bold">Mascotas en Adopción</h1>
        </header>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              veterinaryClinicName={post.veterinaryClinicName}
              urlImage={post.urlImage}
              avatar={post.avatar}
              fullname={post.fullname}
              username={post.username}
              content={post.content}
              race={post.race}
              size={post.size}
              age={post.age}
              userId={post.userId} // Pasar userId a PostCard
            />
          ))}
        </div>
      </div>
    </div>
  );
}
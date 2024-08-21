// page.ts
'use client'
import React, { useState, useEffect } from "react";
import PostCard from "@/Components/PostCard/PostCard";
import { PostCardProps } from "@/Components/PostCard/PostCard";  
import { getSizeLabel } from "@/data/sizeAnimals";
import { getAgeLabel } from "@/data/ageAnimals";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUserStatus } from "@/libs/actions/user.actions";

// Default export function Catalogue
export default function Catalogue() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user && user.emailAddresses[0].emailAddress) {
        try {
          const email = user.emailAddresses[0].emailAddress;
          const userStatus = await getUserStatus(email);
          if (userStatus && !userStatus.onboarded) {
            router.push("/Onboarding");
          }
        } catch (error) {
          console.error("Error fetching user status:", error);
        }
      }
    };

    checkUserStatus();
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.data);

        const formattedPosts = data.data.map((post: any, index: number) => ({
          id: index,
          urlImage: post.urlImage,
          avatar: post.user.photoUrl,
          fullname: post.user.fullname,
          username: post.user.username,
          content: post.description,
          race: post.animal.breed,
          size: getSizeLabel(post.animal.size),
          age: getAgeLabel(post.animal.age),
          instagram: "",
          whatsapp: "",
          facebook: ""
        }));

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
        <div className="grid grid-cols-5 gap-4">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              id={post.id}
              urlImage={post.urlImage}
              avatar={post.avatar}
              fullname={post.fullname}
              username={post.username}
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
  );
}

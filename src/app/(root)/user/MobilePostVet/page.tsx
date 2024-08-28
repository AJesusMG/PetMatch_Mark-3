'use client'

import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import PostCard from "@/Components/PostCard/PostCard";
import { PostCardProps } from "@/Components/PostCard/PostCard";
import { getSizeLabel } from "@/data/sizeAnimals";
import { getAgeLabel } from "@/data/ageAnimals";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUserStatus } from "@/libs/actions/user.actions";
import Image from "next/image";
import PostCardMobile from "@/Components/PostCardMobile/PostCardMobile";

export default function VetPost() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const { user } = useUser();
  const router = useRouter()

  const handleCardClick = (id: string) => {
    router.push(`/user/MobilePostVet/${id}`);
  };

  useEffect(() => {
    const checkUserOnboardingStatusAndFetchPosts = async () => {
      if (!user) return;
  
      try {
        const email = user.emailAddresses?.[0]?.emailAddress;
        let userStatus;
  
        if (email) {
          userStatus = await getUserStatus(email);
          if (userStatus && !userStatus.onboarded) {
            router.push("/Onboarding");
            return;
          }
        }
  
        const response = await fetch(`/api/posts/getPropios?userId=${userStatus?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
  
        if (!data || !data.posts) {
          throw new Error("Invalid data format");
        }
  
        data.posts.forEach((post: any, index: number) => {
        });
  
        const userPosts = data.posts.filter((post: any) => post.userEmail === user.emailAddresses[0]?.emailAddress);
  
  
        const formattedPosts = userPosts.map((post: any, index: number) => {
          return {
            id: post.id,
            urlImage: post.urlImage,
            avatar: "", // Assumed that user photo URL is not present in the post data
            fullname: "", // Assumed that user fullname is not present in the post data
            username: "", // Assumed that username is not present in the post data
            content: post.description,
            race: "", // Assumed that race info is not present in the post data
            size: "", // Assumed that size info is not present in the post data
            age: "", // Assumed that age info is not present in the post data
          
          };
        });
  
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching data or verifying user status:", error);
      }
    };
    
  
    checkUserOnboardingStatusAndFetchPosts();
  }, [user, router]
);

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full p-2 pt-0">
        <Image
          src="/ZORRO_SIN1.webp"
          width={50}
          height={50}
          alt="Logo"
          className="xl:hidden -mt-6"
        />
        <h1 className="text-center font-bold text-xl">Mis Publicaciones</h1>
      </header>
      <div className="grid grid-cols-3 gap-4 mt-4 sm:gap-2 text-center items-center">
        {posts.map((post, index) => (
          <PostCardMobile
            key={index}
            id={post.id.toString()}
            urlImage={post.urlImage}
            onClick={() => handleCardClick(post.id.toString())}
          />
        ))}
      </div>
    </div>
  );
}

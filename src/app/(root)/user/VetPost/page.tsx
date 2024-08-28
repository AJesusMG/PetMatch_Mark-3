'use client'

import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import PostCard from "@/Components/PostCard/PostCard";
import { PostCardProps } from "@/Components/PostCard/PostCard";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUserStatus } from "@/libs/actions/user.actions";

export default function VetPost() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const { user } = useUser();
  const router = useRouter()

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
            id: index,
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
  }, [user, router]);
   

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <header className="flex justify-between items-center">
        <h1 className="lg:text-4xl text-xl font-bold">Mis Publicaciones</h1>
        <div className="flex gap-4">
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">notifications</span>
          </Button>
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">mail</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
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
              />
            ))
          ) : (
            <p>No hay publicaciones.</p> // Mensaje en caso de que no haya publicaciones
          )}
        </div>
      </div>
    </div>
  );

}

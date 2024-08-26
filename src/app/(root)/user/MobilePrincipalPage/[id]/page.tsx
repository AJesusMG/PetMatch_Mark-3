'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Avatar, Button, Chip, Divider } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";
import Loading from "@/Components/Loading/Loading";

interface PetMatchUser {
  id: string;
  fullname: string;
  username: string;
  isAdmin: boolean;
  email: string;
  phoneNumber: string;
  bio: string;
  onboarded: boolean;
  instagramUrl: string | null;
  facebookUrl: string | null;
  photoUrl: string;
  ageUser: number;
  experience: number;
}

interface Animal {
  id: string;
  age: number;
  size: number;
  training: number;
  specie: string;
  breed: string;
  color: string;
  temperament: number;
  maintenance: number;
  timeNeeded: number;
  spaceNeeded: number;
  experienceNeeded: number;
  weather: number;
  total_plus: number;
}

interface FullPostProps {
  id: string;
  adopted: boolean;
  description: string;
  active: boolean;
  createdAt: string;
  urlImage: string;
  animalId: string;
  userEmail: string;
  user: PetMatchUser;
  animal: Animal;
}

export default function Page() {
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState<FullPostProps | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("No post ID found in the URL.");
      return;
    }

    const fetchPost = async () => {
      try {
        console.log("Fetching post...");
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        setPost(data);
        console.log("Post fetched successfully", data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div><Loading/></div>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <header className="flex flex-row w-full justify-between items-center">
        <Button isIconOnly className="bg-transparent" onClick={() => router.back()}>
          <FaArrowLeft />
        </Button>
        <h1 className="font-bold">Publicación</h1>
      </header>
      <Divider />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row w-full gap-4 items-center">
          <Avatar src={post.user.photoUrl} />
          <h1 className="text-sm">{post.user.fullname}</h1>
        </div>
        <Button isIconOnly className="bg-transparent" size="sm">
          <span className="material-symbols-outlined text-sm">more_horiz</span>
        </Button>
      </div>
      <div className="w-full h-[70vh]">  {/* Ajusta la altura aquí */}
        <img
          src={post.urlImage}
          alt="Post image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
      <div className="w-full px-4 py-2">
        <p className="text-sm">{post.description}</p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-sm">Tags</h1>
        <div className="flex flex-row justify-between">
          <Chip variant="bordered" radius="md" className="border-primary-500" style={{ fontSize: 12 }}>
            Pug
          </Chip>
          <Chip variant="bordered" radius="md" className="border-primary-500" style={{ fontSize: 12 }}>
            Mediano
          </Chip>
          <Chip variant="bordered" radius="md" className="border-primary-500" style={{ fontSize: 12 }}>
            Cachorro
          </Chip>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-sm">Contacto</h1>
        {/* Contacto Section */}
      </div>
    </div>
  );
}
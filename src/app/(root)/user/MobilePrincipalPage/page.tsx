'use client'

import React, { useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import PostCardMobile, { PostCardPropsMobile } from "@/Components/PostCardMobile/PostCardMobile";
import Image from "next/image";

interface FullPostProps {
  id: string;
  urlImage: string;
  avatar: string;
  fullname: string;
  username: string;
  content: string;
  race: string;
  size: string;
  age: string;
  instagram: string;
  whatsapp: string;
  facebook: string;
}

export default function MobilePrincipalPage() {

  const [posts, setPosts] = useState<PostCardPropsMobile[]>([]);
  const [questionnaireResolved, setQuestionnaireResolved] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Probando");
        const request = {email: email};
        const postsIds = await fetch(
          'https://s136w4qddk.execute-api.us-east-1.amazonaws.com/dev', {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(request),
          }
        );
        const result = await postsIds.json();

        const { response } = result;
        if(response != undefined){
          await setQuestionnaireResolved(true);
        }
        console.log(questionnaireResolved);
        if(questionnaireResolved){
          const arrayIde = JSON.stringify(response);
        const res = await fetch("/api/getFiltered", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
            body: arrayIde,
          });
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await res.json();
          console.log(data);
          (data.data);
  
          const formattedPosts = data.data.map((post: any, index: number) => ({
            id: post.id, // Asigna el id correcto aquí
            urlImage: post.urlImage,
            avatar: post.avatar,
            fullname: post.fullname,
            username: post.username,
            content: post.content,
            race: post.race,
            size: post.size,
            age: post.age,
            instagram: post.instagram,
            whatsapp: post.whatsapp,
            facebook: post.facebook
          }));
  
          setPosts(formattedPosts);
        }else{
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        (data.data);

        const formattedPosts = data.data.map((post: any, index: number) => ({
          id: post.id, // Asigna el id correcto aquí
          urlImage: post.urlImage,
          avatar: post.avatar,
          fullname: post.fullname,
          username: post.username,
          content: post.content,
          race: post.race,
          size: post.size,
          age: post.age,
          instagram: post.instagram,
          whatsapp: post.whatsapp,
          facebook: post.facebook
        }));

        setPosts(formattedPosts);
      }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/user/MobilePrincipalPage/${id}`);
  };

  const handleQuestionnaireClick = () => {
    setQuestionnaireResolved(true);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full">
        <Image
          src="/ZORRO_SIN1.webp"
          width={50}
          height={50}
          alt="Logo"
          className="absolute xl:hidden -mt-6"
        />
        <h1 className="text-center font-bold text-xl">Tus Recomendaciones</h1>
        {!questionnaireResolved && (
        <div className="flex mx-auto justify-center mt-8">
              <Button
                className="bg-success-300 font-bold text-xl"
                size="lg"
                as={Link} // Enlace al catálogo
                href="/user/Questionnaire"
                onClick={handleQuestionnaireClick} // Maneja el click para actualizar el estado
              >
                Resolver Cuestionario
              </Button>
        </div>
        )}
      </header>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {posts.map((post, index) => (
          <PostCardMobile
            key={index}
            id={post.id}
            urlImage={post.urlImage}
            onClick={() => handleCardClick(post.id)} // Maneja el click
          />
        ))}
      </div>
    </div>
  )
}
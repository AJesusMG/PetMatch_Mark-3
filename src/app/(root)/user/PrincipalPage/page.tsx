"use client";
import React, { useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import PostCard from "@/Components/PostCard/PostCard";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getUserStatus } from "@/libs/actions/user.actions";

interface UserData {
  name: string;
  email: string;
  image: string;
}

// Datos de usuario estáticos
const staticUser = {
  name: "Nombre del Usuario",
  email: "usuario@example.com",
  image: "/path/to/default/avatar.jpg", // Cambia esto a la ruta de tu imagen por defecto
};

// Datos de posts estáticos
const staticPosts = [
  {
    id: 1,
    urlImage: "https://petmatchbucketcd.s3.amazonaws.com/1717172384010_582",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    user: "Usuario 1",
    content: "Contenido del post 1",
    breed: "Raza 1",
    size: "Tamaño 1",
    age: "Edad 1",
    instagram: "@usuario1",
    whatsapp: "+123456789",
    facebook: "/usuario1",
  },
];


export default function PrincipalPage() {
  
  const { user } = useUser();
  const router = useRouter();
  const email = user?.primaryEmailAddress?.emailAddress;

  // Estado para almacenar los posts
  const [PostProps, setPostProps] = useState(staticPosts);

  // Estado para controlar si el cuestionario ha sido resuelto
  const [questionnaireResolved, setQuestionnaireResolved] = useState(false);

  // Verifica el estado de onboarded del usuario
  useEffect(() => {
    const checkUserOnboardingStatus = async () => {
      if (user && user.emailAddresses[0].emailAddress) {
        try {
          const email = user.emailAddresses[0].emailAddress;
          const userStatus = await getUserStatus(email);
          if (userStatus && !userStatus.onboarded) {
            router.push("/Onboarding");
          }
        } catch (error) {
          console.error("Error al verificar el estado del usuario:", error);
        }
      }
    };

    checkUserOnboardingStatus();
  }, [user, router]);

  // Petición para obtener los IDs de los posts y los datos completos de los posts
  useEffect(() => {
    const getPostsId = async () => {
      try {
        if (!email) return;

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
        if(response == undefined) return;
        const arrayIde = JSON.stringify(response);
        const posts = await fetch("/api/posts/getMany", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: arrayIde,
        });

        const finalResult = await posts.json();

        (finalResult.data);
        if (finalResult.data) {
          setPostProps(finalResult.data);
          setQuestionnaireResolved(true);
        }
      } catch (error) {
        (error);
      }
    };

    getPostsId();
  }, [email]);

  // Función para manejar el click en el botón de cuestionario
  const handleQuestionnaireClick = () => {
    setQuestionnaireResolved(true);
  };

  return (
    <div className="flex flex-col gap-16 w-full h-full">
      {/* Renderiza el contenido de bienvenida solo si el cuestionario no ha sido resuelto */}
      {!questionnaireResolved && (
        <div className="flex w-full">
          <div className="flex flex-col">
            <h1 className="text-center text-7xl">
              Bienvenidos a{" "}
              <p className="text-6xl text-primary-500 font-bold">PetMatch</p>
            </h1>
            <div className="flex w-1/2 mx-auto mt-8">
              <p className="text-center text-xl">
                ¿Buscas a tu compañero perfecto de cuatro patas? ¡No busques más!
                En nuestra plataforma, te conectamos con los animales en adopción
                que están ansiosos por encontrar un hogar amoroso.
              </p>
            </div>
            <div className="flex mx-auto mt-8">
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
          </div>
        </div>
      )}
      {/* Renderiza la lista de mascotas en adopción */}
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Tus Recomendaciones</h1>
        <div className="grid grid-cols-5 gap-4">
          {PostProps.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              urlImage={post.urlImage}
              avatar={post.avatar}
              fullname={post.user}
              username={post.user}
              content={post.content}
              race={post.breed}
              size={post.size}
              age={post.age}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

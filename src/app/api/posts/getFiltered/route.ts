import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const listed = await request.json();
        // Obtén todos los posts, incluyendo la información relacionada del usuario y del animal
        const posts = await prisma.posts.findMany({
          select: {
            id: true,
            urlImage: true,
            description: true,
            animal: {
              select: {
                breed: true,
                size: true,
                age: true,
              },
            },
            user: {
              select: {
                id:true,
                veterinaryClinicName: true,
                fullname: true,
                username: true,
                photoUrl:true
              },
            },
          },
          // Filtra posts donde `userId` no sea nulo
          where: {
            animal: {
              id: {
                in: listed,
              }
            },
          },
        });
    
        // Mapea los posts para añadir el mensaje "Publicación:"
        const postsWithMessages = posts.map((post) => {
          return {
            message: "Publicación:",
            ...post,
          };
        });
    
        // Devuelve una respuesta JSON con el código 200 y los datos de los posts
        return NextResponse.json({
          code: 200,
          message: "Datos recuperados correctamente.",
          data: postsWithMessages,
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json({
          code: 500,
          message: "Ocurrió un error en el servidor.",
        });
      }
}
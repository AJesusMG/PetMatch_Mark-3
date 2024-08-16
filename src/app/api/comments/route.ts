import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { text, communityId, userId, parentId, imgUrl } = await request.json();

    // Verifica que el campo 'text' no esté vacío
    if (!text) {
      return NextResponse.json({
        code: 400,
        message: "El campo 'text' es obligatorio.",
      });
    }

    // Inserta el comentario en la base de datos
    const newComment = await prisma.comment.create({
      data: {
        text,
        communityId: communityId || null, 
        userId: userId || null,          
        parentId: parentId || null,    
        imgUrl: imgUrl || null
      },
    });

    return NextResponse.json({
      code: 201,
      message: "Comentario creado exitosamente.",
      data: newComment,
    });
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error al crear el comentario.",
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
    try {
      // Realiza la consulta para obtener los comentarios junto con la información del usuario relacionado
      const comments = await prisma.comment.findMany({
        select: {
          text: true,
          imgUrl:true,
          user: {
            select: {
              fullname: true,
              username: true,
              photoUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc', // Ordena los comentarios por la fecha de creación en orden descendente
        },
      });
  
      return NextResponse.json({
        code: 200,
        message: "Comentarios obtenidos exitosamente.",
        data: comments,
      });
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
      return NextResponse.json({
        code: 500,
        message: "Ocurrió un error al obtener los comentarios.",
      });
    } finally {
      await prisma.$disconnect();
    }
  }



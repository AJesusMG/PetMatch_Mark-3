import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { text, communityId, userId, parentId, imgUrl, createdAt } = await request.json();

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
        imgUrl: imgUrl || null,
        createdAt: createdAt, // Usamos el createdAt enviado desde la solicitud
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
  // fecha y hora actual en formato UTC
  const currentDateUTC = new Date();

  // offset en minutos para la zona horaria de México
  const offset = -6 * 60; // Offset para CDT 

  // fecha y hora local en México sumando el offset
  const currentDateLocal = new Date(currentDateUTC.getTime() + offset * 60000);
  // fecha y hora local a ISO-8601 DateTime
  const currentDateLocalISO = currentDateLocal.toISOString();

  (currentDateLocalISO);

  try {

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || null;





    // Realiza la consulta para obtener los comentarios principales (sin parentId)
    const comments = await prisma.comment.findMany({
      where: {
        parentId: null,  // Filtra los comentarios que no tienen un parentId
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        imgUrl: true,
        user: {
          select: {
            fullname: true,
            username: true,
            photoUrl: true,
          },
        },
        user_likes: {
          where: {
            ...(userId ? { userId: userId } : {}),
          },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    

      // Calcula la diferencia de tiempo para cada comentario
      const commentsWithTimeDiff = comments.map(comment => {
      const createdAtDate = new Date(comment.createdAt);
      const timeDiff = currentDateLocal.getTime() - createdAtDate.getTime();

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30); // Aproximación de meses
      const years = Math.floor(days / 365); // Aproximación de años

      let timeDifference: string;

      if (years > 0 || months > 0 || days > 0) {
        timeDifference = `${days} día${days > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        timeDifference = `${hours}h`;
      } else if (minutes > 0) {
        timeDifference = `${minutes}m`;
      } else {
        timeDifference = `${seconds}s`;
      }

      return {
        ...comment,
        timeDifference,
      };
    });

    return NextResponse.json({
      code: 200,
      message: "Comentarios obtenidos exitosamente.",
      data: commentsWithTimeDiff,
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
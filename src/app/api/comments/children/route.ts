import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const parentIdParam = request.nextUrl.searchParams.get("id");

  if (!parentIdParam) {
    return NextResponse.json({
      code: 400,
      message: "La URL no contiene un parámetro 'id'.",
    });
  }

  try {
    const { text, communityId, userId, imgUrl } = await request.json();

    if (!text) {
      return NextResponse.json({
        code: 400,
        message: "El 'text' es obligatorio.",
      });
    }

    // Obtener la fecha actual en la zona horaria de México
    const now = new Date();
    const mexicoOffset = -6; // Zona horaria de México (CDT)
    now.setHours(now.getHours() + mexicoOffset);

    const newComment = await prisma.comment.create({
      data: {
        text,
        communityId: communityId || null,
        userId: userId || null,
        parentId: parentIdParam,
        imgUrl: imgUrl || null,
        createdAt: now.toISOString(), // Establecer `createdAt`
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
  const idParam = request.nextUrl.searchParams.get("id");

  if (!idParam) {
    return NextResponse.json({
      code: 400,
      message: "La URL no contiene un parámetro 'id'.",
    });
  }

  try {
    // Obtiene la fecha y hora actual en UTC
    const currentDateUTC = new Date();

    // Offset en minutos para la zona horaria de México
    const offset = -6 * 60; // Offset para CDT 

    // Fecha y hora local en México sumando el offset
    const currentDateLocal = new Date(currentDateUTC.getTime() + offset * 60000);

    // Realiza la consulta para obtener el comentario con el id proporcionado
    const comment = await prisma.comment.findUnique({
      where: {
        id: idParam,
      },
      select: {
        id: true,
        text: true,
        imgUrl: true,
        createdAt: true,
        user: {
          select: {
            fullname: true,
            username: true,
            photoUrl: true,
          },
        },
        childrenComments: {
          select: {
            id: true,
            text: true,
            imgUrl: true,
            createdAt: true,
            user: {
              select: {
                fullname: true,
                username: true,
                photoUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!comment) {
      return NextResponse.json({
        code: 404,
        message: "Comentario no encontrado.",
      });
    }

    // Función para calcular la diferencia de tiempo
    const calculateTimeDifference = (date: Date): string => {
      const createdAtDate = new Date(date);
      const timeDiff = currentDateLocal.getTime() - createdAtDate.getTime();

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30); // Aproximación de meses
      const years = Math.floor(days / 365); // Aproximación de años

      if (years > 0) {
        return `${years} año${years > 1 ? 's' : ''}`;
      } else if (months > 0) {
        return `${months} mes${months > 1 ? 'es' : ''}`;
      } else if (days > 0) {
        return `${days} día${days > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        return `${hours} hora${hours > 1 ? 's' : ''}`;
      } else if (minutes > 0) {
        return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
      } else {
        return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
      }
    };

    // Convierte `createdAt` a string en formato ISO y calcula la diferencia de tiempo
    const formattedComment = {
      ...comment,
      createdAt: comment.createdAt.toISOString(),
      timeDifference: calculateTimeDifference(comment.createdAt),
      childrenComments: comment.childrenComments.map(childComment => ({
        ...childComment,
        createdAt: childComment.createdAt.toISOString(),
        timeDifference: calculateTimeDifference(childComment.createdAt),
      })),
    };

    return NextResponse.json({
      code: 200,
      message: "Comentario obtenido exitosamente.",
      data: formattedComment,
    });
  } catch (error) {
    console.error("Error al obtener el comentario:", error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error al obtener el comentario.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
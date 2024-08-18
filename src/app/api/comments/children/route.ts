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

    const newComment = await prisma.comment.create({
      data: {
        text,
        communityId: communityId || null,
        userId: userId || null,
        parentId: parentIdParam,
        imgUrl: imgUrl || null,
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
        // Realiza la consulta para obtener el comentario con el id proporcionado
        const comment = await prisma.comment.findUnique({
            where: {
                id: idParam,
            },
            select: {
                id: true,
                text: true,
                imgUrl: true,
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

        return NextResponse.json({
            code: 200,
            message: "Comentario obtenido exitosamente.",
            data: comment,
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

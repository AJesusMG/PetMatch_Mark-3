import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const idParam = request.nextUrl.searchParams.get("id");

  if (!idParam) {
    return NextResponse.json({
      code: 400,
      message: "La URL no contiene un parámetro 'email'.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: idParam,
      },
      select: {
        veterinaryClinicName: true,
        veterinaryAddress: true,
        phoneNumber: true,
        bio: true,
        photoUrl: true,
        schedule: true,
      },
    });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return NextResponse.json({
        code: 404,
        message: "Usuario no encontrado.",
      });
    }

    // Devolver el usuario encontrado
    return NextResponse.json({
      code: 200,
      message: "Usuario encontrado con éxito.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "Error al consultar la base de datos.",
    });
  }
}

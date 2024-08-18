import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const emailParam = request.nextUrl.searchParams.get("email");

  if (!emailParam) {
    return NextResponse.json({
      code: 400,
      message: "La URL no contiene un parámetro 'email'.",
    });
  }

  const { fullname, username, phoneNumber, bio, instagramUrl, facebookUrl, photoUrl } =
    (await request.json()) as {
      fullname: string;
      username?: string;
      phoneNumber?: string;
      bio?: string;
      instagramUrl?: string;
      facebookUrl?: string;
      photoUrl?: string;
    };

  // Validate required fields
  if (!fullname || !emailParam) {
    return NextResponse.json({
      code: 400,
      message: "Missing required fields: fullname or email.",
    });
  }

  try {
    // Insert into the DB and update the onboarded field
    const result = await prisma.user.create({
      data: {
        fullname,
        username,
        email: emailParam, // Use the email from the URL parameter
        phoneNumber,
        bio,
        instagramUrl,
        facebookUrl,
        photoUrl,
        onboarded: true, // Set onboarded to true
      },
    });

    return NextResponse.json({
      code: 201,
      message: "User created successfully.",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "Database error occurred.",
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Obtener el parámetro de email de la URL
    const emailParam = request.nextUrl.searchParams.get("email");

    if (!emailParam) {
      return NextResponse.json({
        code: 400,
        message: "La URL no contiene un parámetro 'email'.",
      });
    }

    // Asegúrate de que el emailParam es un string válido
    if (typeof emailParam !== 'string') {
      return NextResponse.json({
        code: 400,
        message: "El valor de 'email' no es válido.",
      });
    }

    // Buscar el usuario en la base de datos por email
    const user = await prisma.user.findUnique({
      where: {
        email: emailParam,
      },
      select: {
        id: true,
        photoUrl: true,
        onboarded: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        code: 404,
        message: "Usuario no encontrado.",
      });
    }

    // Retornar el userId, photoUrl, y onboarded
    return NextResponse.json({
      code: 200,
      message: "Usuario encontrado.",
      data: user,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud GET:", error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error en el servidor.",
    });
  }
}


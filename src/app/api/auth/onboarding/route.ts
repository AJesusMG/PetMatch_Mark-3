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

  const { fullname, username, phoneNumber, bio, instagramUrl, facebookUrl, photoUrl, password } =
    (await request.json()) as {
      fullname: string;
      username?: string;
      phoneNumber?: string;
      bio?: string;
      instagramUrl?: string;
      facebookUrl?: string;
      photoUrl?: string;
      password: string;
    };

  // Validate required fields
  if (!fullname || !password) {
    return NextResponse.json({
      code: 400,
      message: "Missing required fields: fullname or password.",
    });
  }

  try {
    // Insert into the DB
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

export async function PATCH() {
    try {
      const updateResult = await prisma.user.updateMany({
        where: {
          fullname: {
            equals: null, // Filtro que selecciona registros donde fullname es null
          },
        },
        data: {
          fullname: "Nombre por defecto", // Asigna un valor por defecto
        },
      });
  
      return NextResponse.json({
        message: `Se han actualizado ${updateResult.count} usuarios.`,
      }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        message: "Ocurrió un error al actualizar los usuarios.",
      }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

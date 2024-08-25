import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      types,
      breed,
      colors,
      size,
      age,
      training,
      temperament,
      cost,
      time,
      weather,
      sizeH,
      description,
      imageUrl,
      email, // Usaremos el email del usuario
    } = await request.json();

    if (
      !types ||
      !breed ||
      !colors ||
      !size ||
      !age ||
      !training ||
      !temperament ||
      !cost ||
      !time ||
      !weather ||
      !sizeH ||
      !description ||
      !imageUrl ||
      !email // Validamos que el email esté presente
    ) {
      return NextResponse.json({
        code: 400,
        message: "Faltan campos obligatorios. Por favor completa el formulario.",
      });
    }

    // Buscar el usuario a partir del email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({
        code: 404,
        message: "Usuario no encontrado.",
      });
    }

    // Suma
    const total_plus = parseFloat(size[0]) + parseFloat(age[0]) + parseFloat(training[0]) + parseFloat(temperament[0]) + parseFloat(cost[0]) + parseFloat(time[0]) + parseFloat(weather[0]) + parseFloat(sizeH[0]);

    // Insertar en la tabla animals
    const animal = await prisma.animals.create({
      data: {
        age: parseFloat(age[0]),
        size: parseFloat(size[0]),
        training: parseFloat(training[0]),
        specie: types[0],
        breed: breed || '',
        color: colors.join(', '),
        temperament: parseFloat(temperament[0]),
        maintenance: parseFloat(cost[0]),
        timeNeeded: parseFloat(time[0]),
        space_Needed: parseFloat(sizeH[0]),
        weather: parseFloat(weather[0]),
        total_plus,
      },
    });

    // Insertar en la tabla posts
    const post = await prisma.posts.create({
      data: {
        adopted: false,
        description,
        active: true,
        createdAt: new Date(), // Usa el objeto Date directamente
        urlImage: imageUrl,
        animalId: animal.id,
        userEmail: email, // Usamos email en lugar de userId
      },
    });

    return NextResponse.json({
      code: 201,
      message: "Datos recibidos correctamente.",
      data: {
        animal,
        post,
      },
    });
  } catch (error) {
    console.error("Error en el proceso de POST:", error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error en el servidor.",
    });
  }
}


export async function GET(request: NextRequest) {
  try {
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
            fullname:true,
            username: true,
            photoUrl:true
          },
        },
      },
      // Filtra posts donde `userId` no sea nulo
      where: {
        userEmail: {
          not: '',
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



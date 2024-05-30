import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      animalType,
      breed,
      age,
      size,
      origin,
      exotic,
      color,
      pattern,
      personality,
      tendency,
      habitat,
      space,
      climate,
      description,
      instagram,
      whatsapp,
      facebook
    } = await request.json();

    // Verifica que todos los campos necesarios estén presentes
    if (
      !animalType ||
      !breed ||
      !age ||
      !size ||
      !origin ||
      exotic === undefined ||
      !color ||
      !pattern ||
      !personality ||
      !tendency ||
      !habitat ||
      !space ||
      !climate ||
      !description ||
      !instagram ||
      !whatsapp ||
      !facebook
    ) {
      return NextResponse.json({
        code: 400,
        message: "Faltan campos obligatorios. Por favor completa el formulario.",
      });
    }

    // Crea un objeto con todos los labels
    const formData = {
      animalType,
      breed,
      age,
      size,
      origin,
      exotic,
      color,
      pattern,
      personality,
      tendency,
      habitat,
      space,
      climate,
      description,
      instagram,
      whatsapp,
      facebook,
    };

    // Imprime el objeto en la consola
    console.log(formData);

    // Devuelve una respuesta de éxito
    return NextResponse.json({
      code: 201,
      message: "Datos recibidos correctamente.",
      data: formData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      code: 500,
      message: "Ocurrió un error en el servidor.",
    });
  }
}

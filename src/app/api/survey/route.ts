import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";

interface ReqBody {
  R_age: string;
  R_size: string;
  R_species: string[];
  R_breed: string[];
  R_space: string;
  R_weather: string;
  R_color: string[];
  R_temperament: string;
  R_cost: string;
  R_time: string;
  R_training: string;
  email: string;
  total_plus: number;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json() as ReqBody;
    if (!formData) {
      return NextResponse.json({ code: 400, message: "No data provided" });
    }
    if (!formData.R_age || !formData.R_size || !formData.R_species || !formData.R_breed || !formData.R_space || !formData.R_weather || !formData.R_color || !formData.R_temperament || !formData.R_cost || !formData.R_time || !formData.R_training || !formData.email) {
      return NextResponse.json({ code: 400, message: "Missing fields" });
    }

    

    // Asegúrate de que total_plus se haya calculado correctamente
    const age = parseFloat(formData.R_age);
    const size = parseFloat(formData.R_size);
    const training = parseFloat(formData.R_training);
    const temperament = parseFloat(formData.R_temperament);
    const maintenance = parseFloat(formData.R_cost);
    const timeNeeded = parseFloat(formData.R_time);
    const spaceNeeded = parseFloat(formData.R_space);
    const weather = parseFloat(formData.R_weather);

    const total_plus = age + size + training + temperament + maintenance + timeNeeded + spaceNeeded + weather;

    const check = await db.survey.findFirst({
      where: {
        userEmail: formData.email
      }
    })

    if (check) {
      const updatedSurvey = await db.survey.update({
        where: {
          userEmail: formData.email
        },
        data: {
          R_age: age,
          R_size: size,
          R_species: formData.R_species,
          R_breed: formData.R_breed, // Change the type from 'string' to 'string[]'
          R_space: spaceNeeded,
          R_weather: weather,
          R_color: formData.R_color,
          R_temperament: temperament,
          R_cost: maintenance,
          R_time: timeNeeded,
          R_training: training,
          total_plus: total_plus
        }
      })

      return NextResponse.json({ code: 201, message: "Survey updated", updatedSurvey });
    }

    const newSurvey = await db.survey.create({
      data: {
        R_age: age,
        R_size: size,
        R_species: formData.R_species,
        R_breed: formData.R_breed, // Change the type from 'string' to 'string[]'
        R_space: spaceNeeded,
        R_weather: weather,
        R_color: formData.R_color,
        R_temperament: temperament,
        R_cost: maintenance,
        R_time: timeNeeded,
        R_training: training,
        userEmail: formData.email,
        total_plus: total_plus
      }
    });

    return NextResponse.json({ code: 201, message: "Survey created", newSurvey });

  } catch (error) {
    (error);
    return NextResponse.json({ code: 500, message: "ERROR" });
  }
}

export async function GET(request: NextRequest) {
  try {
    const surveys = await db.survey.findMany();
    return NextResponse.json(surveys);
  } catch (error) {
    (error);
    return NextResponse.json({ code: 500, message: "ERROR" });
  }
}

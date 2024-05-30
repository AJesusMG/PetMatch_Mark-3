import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";

interface ReqBody {
  R_age: string;
  R_size: string;
  R_species: string;
  R_breed: string;
  R_space: string;
  R_weather: string;
  R_color: string;
  R_temperament: string;
  R_cost: string;
  R_time: string;
  R_training: string;
  email : string;
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
    const newSurvey = await db.survey.create({
      data: {
        R_age: formData.R_age,
        R_size: formData.R_size,
        R_species: formData.R_species,
        R_breed: formData.R_breed,
        R_space: formData.R_space,
        R_weather: formData.R_weather,
        R_color: formData.R_color,
        R_temperament: formData.R_temperament,
        R_cost: formData.R_cost,
        R_time: formData.R_time,
        R_training: formData.R_training,
        userEmail: formData.email
      }
    });

    return NextResponse.json({ code: 201, message: "Survey created" });


  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 500, message: "ERROR" });
  }
}

export async function GET(request: NextRequest) {
   try {
      const surveys = await db.survey.findMany();
      return NextResponse.json(surveys);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ code: 500, message: "ERROR" });
    }
  }  


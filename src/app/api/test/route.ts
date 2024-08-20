import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {

    const data = await prisma.posts.findMany();

    return NextResponse.json(data);
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 500, message: error });
  }
}
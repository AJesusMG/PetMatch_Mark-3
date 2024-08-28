import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const id = params.id;
    const post = await prisma.posts.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        animal: true,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    (error);
    return NextResponse.json({ code: 500, message: "ERROR" });
  }
}
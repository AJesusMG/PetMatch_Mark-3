import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({
        code: 400,
        message: "El 'userId' es obligatorio.",
      });
    }

    const posts = await prisma.posts.findMany({
      where: {
        user: {
          id: userId,
        },

      },
    });

    return NextResponse.json({ code: 200, posts, message: "OK" });
  } catch (error) {
    (error);
    return NextResponse.json({ code: 500, message: "ERROR" });
  }
}
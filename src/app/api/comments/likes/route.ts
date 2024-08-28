import prisma from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { userId, commentId, isLike } = await request.json();

    if (!userId || !commentId) {
      return NextResponse.json({
        code: 400,
        message: "El 'userId' y 'commentId' son obligatorios.",
      });
    }

    if (typeof isLike !== "boolean") {
      return NextResponse.json({
        code: 400,
        message: "El 'isLike' debe ser 'true' o 'false'.",
      });
    }

    if ( isLike == true ) {
      try {
      
        const existingLike = await prisma.user_likes.findMany({
          where: {
            userId: userId,
            commentId: commentId,
          },
        });

        if (existingLike.length > 0) {
          return NextResponse.json({ code: 200, message: "User already liked this comment" });
        }

        await prisma.user_likes.create({
          data: {
            userId: userId,
            commentId: commentId,
          },
        });

        await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });

        
      } catch (error) {
        ("User already liked this comment");
      }
    }

    if ( isLike == false ) {
      try {
        const existingDislike = await prisma.user_likes.deleteMany({
          where: {
            userId: userId,
            commentId: commentId,
          },
        });
    
        if (existingDislike.count == 0) {
          return NextResponse.json({ code: 200, message: "User already disliked this comment" });
        }

        await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
      } catch (error) {
        ("User already disliked this comment");
      }
    }

    return NextResponse.json({ code: 200, message: "OK" });


  } catch (error) {
    (error);
    return NextResponse.json({ code: 500, message: "ERROR" });
    
  }
}


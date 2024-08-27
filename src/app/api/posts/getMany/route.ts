import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {

        const { list } = await request.json()

        console.log(list);

        const posts = await prisma.posts.findMany({
            where: {
                id: {
                    in: list
                }
            },
            include: {
                user: true,
                animal: true,
            }
        })

        const result = posts.map((post) => ({
            ...post,
            avatar: post.user.photoUrl,
            user: post.user.username,
            breed: post.animal?.breed,
            size: post.animal?.size,
            age: post.animal?.age,
            phoneNumber: post.user.phoneNumber,
        }))
        

        return NextResponse.json({ code: 200, message: "OK", data: result})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: 500, message: "ERROR"})
    }
}
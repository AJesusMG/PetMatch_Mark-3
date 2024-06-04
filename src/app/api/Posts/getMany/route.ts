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
            user: post.user.name,
            breed: post.animal?.breed,
            size: post.animal?.size,
            age: post.animal?.age,
            instagram: post.user.instagramUrl,
            whatsapp: post.user.phoneNumber,
            facebook: post.user.facebookUrl
        }))
        

        return NextResponse.json({ code: 200, message: "OK", data: result})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: 500, message: "ERROR"})
    }
}
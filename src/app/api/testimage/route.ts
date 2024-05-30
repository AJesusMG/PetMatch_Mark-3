import NameGenerator from "@/utils/nameGenereator";
import { ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const Bucket = process.env.S3_BUCKET_NAME;
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string
    }
})

export async function GET() {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json(response?.Contents ?? []);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("image") as File;

        if (file.size === 0) {
            return NextResponse.json({ code: 400, message: "No file provided" })
        }

        const Key = NameGenerator();
        const Body = (await file.arrayBuffer()) as Buffer;
        const response = await s3.send(new PutObjectCommand({ Bucket, Key, Body, ACL: 'public-read', ContentType: file.type }));

        return NextResponse.json({ url: `https://${Bucket}.s3.amazonaws.com/${Key}` });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: 200, message: "ERROR" })
    }

}
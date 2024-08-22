import { ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import NameGenerator from "../../../utils/nameGenerator";
import { formatImage, uploadImage } from "@/utils/fileHandlers";

const Bucket = process.env.S3_BUCKET_NAME;
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  region: process.env.S3_REGION as string, // Asegúrate de tener la región configurada.
});

export async function GET() {
  try {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json(response?.Contents ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching objects from S3:", error);
    return NextResponse.json({ code: 500, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ code: 400, message: "No file provided" }, { status: 400 });
    }

    console.log("File:", file);
    const Body = (await file.arrayBuffer()) as Buffer;


    const resizedImage = await formatImage(Body, 640);


    if (!resizedImage) {
      return NextResponse.json({ code: 500, message: "Failed to resize image" }, { status: 500 });
    }

    const uploadedImage = await uploadImage(resizedImage);


    if (!uploadedImage) {
      return NextResponse.json({ code: 500, message: "Failed to upload image" }, { status: 500 });
    }

    return NextResponse.json({ url: uploadedImage }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 500, message: "Failed to upload image" }, { status: 500 });
  }
}

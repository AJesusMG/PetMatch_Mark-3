import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import NameGenerator from "./nameGenerator";

export async function formatImage(image: Buffer, size?: number) {
  try {
    return await sharp(image)
      .rotate()
      .resize({width: size, height: size})
      .toFormat("webp", { mozjpeg: true, quality: 40 })
      .toBuffer();
  } catch (error) {
    console.log(error);
  }
}

const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});

export async function uploadImage(image: Buffer) {
  try {
    const key = NameGenerator() + ".webp";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: key,
        Body: image,
        ACL: "public-read",
        ContentType: "image/webp",
      })
    );

    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

  } catch (error) {
    console.log(error);
  }
}

// module.exports = { resizeImage, uploadImage };
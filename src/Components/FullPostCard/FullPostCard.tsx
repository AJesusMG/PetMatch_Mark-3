import React from "react";
import { Card, Avatar, Button, Chip, Image, Divider } from "@nextui-org/react";
import NextImage from "next/image";

interface FullPostCardProps {
  id: number;
  urlImage?: string;
  avatar?: string;
  fullname?: string;
  username?: string;
  content: string;
  race?: string;
  size?: string;
  age?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

export default function FullPostCard({ id, urlImage, avatar, fullname, username, content, race, size, age, instagram, whatsapp, facebook }: FullPostCardProps) {
  return (
    <Card className="h-[560px] items-stretch flex flex-row " key={id}>
      <div className="flex flex-col  gap-8 w-3/4 bg-gray-300">
        <NextImage alt="Post image" width={1000} height={0} src={urlImage || "/Lomito.jpg"} className="h-full w-auto object-cover" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-8 w-1/2">
        <header className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-4 items-center w-full">
            <div className="flex flex-col">
              <Avatar src={avatar} size="md" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm">{fullname}</p>
              <p className="text-gray-500 text-xs" >@{username}</p>
            </div>
          </div>
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">more_horiz</span>
          </Button>
        </header>
        <div className="flex-1">
          <p className="text-sm text-justify">{content || "No content available"}</p>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="font-bold">Tags</h1>
          <div className="flex flex-row justify-between">
            <Chip variant="bordered" radius="md" className="border-primary-500" style={{fontSize: 12}}>
              {race}
            </Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500" style={{fontSize: 12}}>
              {size}
            </Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500" style={{fontSize: 12}}>
              {age}
            </Chip>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="font-bold">Contactame</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Instagram.webp" radius="none" className=" w-[25px] h-[25px]" />
              <p className="text-sm font-bold">{instagram}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/WhatsApp.webp" radius="none" className=" w-[25px] h-[25px]" />
              <p className="text-sm font-bold">{whatsapp}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Facebook.webp" radius="none" className=" w-[25px] h-[25px]" />
              <p className="text-sm font-bold">{facebook}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
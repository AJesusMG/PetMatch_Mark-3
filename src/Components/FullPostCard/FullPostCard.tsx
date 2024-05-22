import React from "react";
import { Card, Image, Avatar, Button, Chip } from "@nextui-org/react";

interface FullPostCardProps {
  imageUrl?: string;
}

export default function FullPostCard({ imageUrl }: FullPostCardProps) {
  return (
    <Card className="min-h-[640px] flex flex-row">
      <div className="w-1/2 h-[640px]">
      <Image radius="none" alt="NextUI hero Image" src={imageUrl} />
      </div>
      <div className="flex flex-col p-4 gap-8 w-1/2">
        <header className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 items-center">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              size="lg"
            />
            <p className="text-md">@A.Jesus.G</p>
          </div>
          <Button variant="light">
            Reportar
          </Button>
        </header>
        <div className="px-8">
          <p className="text-md text-justify">
            Hoy quiero presentarles a este hermoso perro blanco que ha llegado
            a mi vida y está en busca de un nuevo hogar. Se trata de un
            encantador Husky de un año de edad que ha conquistado nuestros
            corazones con su belleza y personalidad juguetona.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-8">
          <h1 className="text-xl font-bold">Tags</h1>
          <div className="flex flex-row justify-between">
            <Chip variant="bordered" radius="md" className="border-primary-500">Husky</Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500">Grande</Chip>
            <Chip variant="bordered" radius="md" className="border-primary-500">1.5 años</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-8">
          <h1 className="text-xl font-bold">Contactame</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Instagram.svg" radius="none" />
              <p className="text-md font-bold">A.Jesus.G</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/WhatsApp.svg" radius="none" />
              <p className="text-md font-bold">A.Jesus.G</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/Facebook.svg" radius="none" />
              <p className="text-md font-bold">A.Jesus.G</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

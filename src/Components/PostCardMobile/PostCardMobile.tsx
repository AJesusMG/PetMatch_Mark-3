import { Card, Image } from "@nextui-org/react";
import React from "react";

export interface PostCardPropsMobile {
  id: string;
  urlImage?: string;
  onClick?: () => void; // Añade el onClick
}

export default function PostCardMobile({ id, urlImage, onClick }: PostCardPropsMobile) {
  return (
    <Card key={id} radius="none" className="w-30 h-30" isPressable onClick={onClick}>
      <Image
        radius="none"
        src={urlImage}
        alt={`Post image ${id}`}
      />
    </Card>
  );
}

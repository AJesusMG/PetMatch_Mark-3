'use client'

import React from "react";
import { Card, Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FullPostCard from "../FullPostCard/FullPostCard";

interface PostCardProps {
  id: number;
  image?: string;
  avatar: string;
  user: string;
  content: string;
  race: string;
  size: string;
  age: string;
  instagram: string;
  whatsapp: string;
  facebook: string;
}

export default function PostCard({ id, image, avatar, user, content, race, size, age, instagram, whatsapp, facebook, }: PostCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        isHoverable
        radius="lg"
        className="border-none transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 w-64 h-64"
        key={id}
        isPressable
        onPress={onOpen}
      >
        <Image
          alt="Post image"
          className="object-cover"
          height={300}
          width={300}
          src={image}
        />
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          <FullPostCard
            id={id}
            imageUrl={image}
            avatar={avatar}
            user={user}
            content={content}
            race={race}
            size={size}
            age={age}
            instagram={instagram}
            whatsapp={whatsapp}
            facebook={facebook}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
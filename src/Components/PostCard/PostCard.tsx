'use client'

import React from "react";
import { Card, Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FullPostCard from "../FullPostCard/FullPostCard";

interface PostCardProps {
  id: number;
  image?: string;
}

export default function PostCard({ id, image }: PostCardProps) {
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
          alt="Woman listening to music"
          className="object-cover"
          height={300}
          width={300}
          src={image}
        />
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          <FullPostCard imageUrl={image} />
        </ModalContent>
      </Modal>
    </>
  );
}

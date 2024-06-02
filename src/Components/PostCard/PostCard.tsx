import React from "react";
import { Card, Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FullPostCard from "../FullPostCard/FullPostCard";

// PostData.ts
export interface User {
  name: string;
}

export interface Animal {
  breed: string;
  size: number;
  age: number;
}

export interface PostData {
  urlImage: string;
  user: User;
  description: string;
  animal: Animal;
}

export interface PostCardProps {
  id: number;
  urlImage?: string; 
  avatar?: string;   
  user?: string;     
  content: string;
  race?: string;     
  size?: string;     
  age?: string;      
  instagram?: string; 
  whatsapp?: string;  
  facebook?: string;  
}


export default function PostCard({
  id, urlImage, avatar, user, content, race, size, age, instagram, whatsapp, facebook
}: PostCardProps) {
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
          src={urlImage}
        />
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          <FullPostCard
            id={id}
            urlImage={urlImage}
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
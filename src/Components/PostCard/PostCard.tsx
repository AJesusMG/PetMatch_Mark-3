import React from "react";
import { Card, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import FullPostCard from "../FullPostCard/FullPostCard";
import NextImage from "next/image";

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
  veterinaryClinicName?: string;
  urlImage?: string; 
  avatar?: string;   
  fullname?: string;     
  username?: string;
  content: string;
  race?: string;     
  size?: string;     
  age?: string;      
  userId?: string;  
}

export default function PostCard({
  id, veterinaryClinicName, urlImage, avatar, fullname, username, content, race, size, age, userId
}: PostCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        isHoverable
        radius="sm"
        className="border-none transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 w-56 h-56 mx-auto"
        // className="border-none transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 post-card"
        key={id}
        isPressable
        onPress={onOpen}
      >
        <NextImage
          alt="Post image"
          className="h-full w-full object-cover"
          height={300}
          width={300}
          src={urlImage || "/Lomito.jpg"}
        />
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" hideCloseButton>
        <ModalContent>
          <FullPostCard
            id={id}
            veterinaryClinicName={veterinaryClinicName}
            urlImage={urlImage}
            avatar={avatar}
            fullname={fullname}
            username={username}
            content={content}
            race={race}
            size={size}
            age={age}
            userId={userId}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

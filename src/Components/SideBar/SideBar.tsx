"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Tooltip, Modal, ModalContent, useDisclosure, Tabs, Tab, CardBody, Card, Link, CardFooter, CardHeader, CircularProgress } from "@nextui-org/react";
import FormNewPost from "../FormNewPost/FormNewPost";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

interface FormData {
  types?: string[];
  breeds?: string[];
  colors?: string[];
  size?: string[];
  age?: string[];
  training?: string[];
  temperament?: string[];
  cost?: string[];
  time?: string[];
  weather?: string[];
  sizeH?: string[];
  description?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

const initialFormData: FormData = {
  types: [],
  breeds: [],
  colors: [],
  size: [],
  age: [],
  training: [],
  temperament: [],
  cost: [],
  time: [],
  weather: [],
  sizeH: [],
  description: "",
  instagram: "",
  whatsapp: "",
  facebook: "",
};

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageIptRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const handleShowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024 || !file.type.startsWith("image/")) {
        alert("El archivo debe ser una imagen y no superar los 8MB");
        setImageUrl(null);
        e.target.value = "";
        return;
      }
      setImageUrl(URL.createObjectURL(file));
      e.target.value = "";
    }
  };

  const handleFormDataChange = (data: FormData) => {
    setFormData(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const imageFormData = new FormData();
        imageFormData.append("image", blob, "image.jpg");

        const uploadResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: imageFormData,
        });

        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          console.log("Imagen subida correctamente. URL:", data.url);

          const postFormData = {
            ...formData,
            imageUrl: data.url,
            email: user?.primaryEmailAddress?.emailAddress,
          };

          const postResponse = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormData),
          });

          if (postResponse.ok) {
            console.log("Formulario enviado correctamente.");
          } else {
            console.error("Error al enviar los datos. Estado:", postResponse.status);
          }
        } else {
          console.error("Error al subir la imagen. Estado:", uploadResponse.status);
        }
      } else {
        console.error("La URL de la imagen es nula. No se puede subir.");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  return (
    <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4 shadow">
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex xl:flex-col xl:gap-6 w-full justify-between flex-row items-center">
          <Image
            src="/ZORRO1.webp"
            width={50}
            height={50}
            alt="Logo"
            className="hidden xl:block"
          />

          <div className="flex flex-row gap-4 w-full justify-between xl:flex-col">
            <Tooltip content="Recomendaciones" placement="right" size="sm">
              <Button
                variant="light"
                className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
                color="primary"
                radius="sm"
                isIconOnly
                as={Link}
                href="/user/PrincipalPage"
              >
                <span className="material-symbols-outlined">local_library</span>
              </Button>
            </Tooltip>

            <Tooltip content="Catálogo" placement="right" size="sm">
              <Button
                variant="light"
                className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
                color="primary"
                radius="sm"
                isIconOnly
                as={Link}
                href="/user/Catalogue"
              >
                <span className="material-symbols-outlined">auto_stories</span>
              </Button>
            </Tooltip>

            <Tooltip content="Comunidad" placement="right" size="sm">
              <Button
                variant="light"
                className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
                color="primary"
                radius="sm"
                isIconOnly
                as={Link}
                href="/user/Community"
              >
                <span className="material-symbols-outlined">groups</span>
              </Button>
            </Tooltip>

            <Tooltip content="Subir" placement="right" size="sm">
              <Button
                variant="light"
                className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
                color="primary"
                radius="sm"
                isIconOnly
                onPress={onOpen}
              >
                <span className="material-symbols-outlined">add_a_photo</span>
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="p-2 mt-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} className="p-2" size="2xl">
          <ModalContent className="max-h-[90vh] overflow-auto">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <Tabs aria-label="Options">
                <Tab key="formulario" title="Formulario">
                  <FormNewPost onFormDataChange={handleFormDataChange} />
                </Tab>
                <Tab key="imagen" title="Subir Imagen">
                  <Card>
                    <CardHeader>
                      <Button
                        size="lg"
                        className="text-black bg-secondary-200 w-full"
                        onPress={() => imageIptRef.current?.click()}
                      >
                        Seleccionar Imagen
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <div className="bg-zinc-500 h-64 w-full relative rounded-t-large flex justify-center items-center">
                        {imageUrl && (
                          <div className="h-full w-full flex items-center justify-center">
                            <Image
                              src={imageUrl}
                              alt="Imagen de miniatura"
                              width={1920}
                              height={1080}
                              className="object-cover h-full w-full rounded-t-large"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={imageIptRef}
                          onChange={handleShowImage}
                        />
                      </div>
                      <CardFooter className="flex justify-center">
                        {isLoading ? (
                          <CircularProgress aria-label="Loading..." />
                        ) : (
                          <Button
                            type="submit"
                            size="lg"
                            className="text-black w-full bg-success-300"
                          >
                            Publicar
                          </Button>
                        )}
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </nav>
  );
}

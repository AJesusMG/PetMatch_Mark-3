"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button, Tooltip, Modal, ModalContent, useDisclosure, Tabs, Tab, CardBody, Card, Link, CardFooter, CardHeader } from "@nextui-org/react";
import FormNewPost from "../FormNewPost/FormNewPost";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageIptRef = useRef<HTMLInputElement>(null);

  const handleShowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el envío del formulario, incluyendo la subida de la imagen a la base de datos.
    console.log("Formulario enviado");
  };

  return (
    <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4">
      <div className="flex xl:flex-col xl:gap-6 w-full justify-between flex-row">
        <Image src="/Logo.svg" width={50} height={50} alt="Logo" />
        
        <Tooltip content="Catálogo" placement="right" size="sm">
          <Button
            variant="light"
            className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
            color="primary"
            radius="sm"
            isIconOnly
            as={Link} // Enlace al catálogo
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
            as={Link} // Enlace al catálogo
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

        <Modal isOpen={isOpen} onClose={onClose} className="p-2" size="2xl">
          <ModalContent className="max-h-[90vh] overflow-auto">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <Tabs aria-label="Options">
                <Tab key="formulario" title="Formulario" >
                  <FormNewPost/>
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
                      <CardFooter>
                        <Button
                          type="submit"
                          size="lg"
                          className="text-black w-full bg-success-300"
                        >
                          Publicar
                        </Button>
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

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Modal, ModalContent, Button, CircularProgress, ModalHeader } from "@nextui-org/react";
import FormNewPost from "../FormNewPost/FormNewPost";
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

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [step, setStep] = useState<number>(1);
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
      onClose();  // Close the modal after submission
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-2" size="lg" hideCloseButton>
      <ModalContent className="max-h-[90vh] overflow-auto">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <FormNewPost onFormDataChange={handleFormDataChange} formData={formData} />
              <Button onPress={handleNext} size="lg" className="bg-success-300">
                Siguiente
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                className="text-black bg-secondary-200"
                onPress={() => imageIptRef.current?.click()}
              >
                Seleccionar Imagen
              </Button>

              {imageUrl && (
                <div className="h-64 w-full relative rounded-t-large flex justify-center items-center">
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
                className="hidden"
                accept="image/*"
                ref={imageIptRef}
                onChange={handleShowImage}
              />

              <div className="flex justify-between">
                <Button onPress={handleBack} size="lg" className="bg-secondary">
                  Atrás
                </Button>
                <Button type="submit" size="lg" className="bg-success-300">
                  {isLoading ? (
                    <CircularProgress size="sm" color="secondary" />
                  ) : (
                    "Subir Publicación"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </ModalContent>
    </Modal>
  );
}

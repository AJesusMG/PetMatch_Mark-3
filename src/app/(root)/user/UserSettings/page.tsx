'use client';

import React, { useState, ChangeEvent } from "react";
import { Avatar, Button, Input, Tooltip } from "@nextui-org/react";

interface UserData {
  Name: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  photoUrl: string;
}

export default function UserSettings() {
  // Datos de usuario estáticos
  const staticUser = {
    name: "Usuario Ejemplo",
    email: "usuario@ejemplo.com",
    image: "https://i.pravatar.cc/150?u=a04258114e29026708c"
  };

  const [userData, setUserData] = useState<UserData>({
    Name: staticUser.name,
    email: staticUser.email,
    phone: "1234567890",
    instagramUrl: "https://instagram.com/alanjesus",
    facebookUrl: "https://facebook.com/alanjesus",
    photoUrl: staticUser.image
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photoUrl" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("Error al guardar los datos");
      }

      const data = await response.json();
      console.log("Datos del usuario guardados:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row w-full">
        <header className="flex flex-row w-full items-center justify-between">
          <h1 className="text-4xl font-bold">Configuración</h1>
        </header>
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col w-1/2 h-full gap-6 items-center">
          <Tooltip content="Cambiar foto de perfil">
            <div onClick={handleAvatarClick} className="relative cursor-pointer">
              <Avatar src={userData.photoUrl} className="w-42 h-42 text-tiny" />
              <input
                id="fileInput"
                type="file"
                name="photoUrl"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          </Tooltip>
          <Input
            type="text"
            label="Nombre/s"
            labelPlacement="outside"
            name="Name"
            value={userData.Name}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Correo Electrónico"
            labelPlacement="outside"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            type="tel"
            label="Teléfono"
            labelPlacement="outside"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <Input
            type="url"
            label="Username Instagram"
            labelPlacement="outside"
            name="instagramUrl"
            value={userData.instagramUrl}
            onChange={handleChange}
          />
          <Input
            type="url"
            label="Username Facebook"
            labelPlacement="outside"
            name="facebookUrl"
            value={userData.facebookUrl}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row w-full justify-end">
        <Button onClick={handleSaveChanges} className="bg-success-300 font-bold">Guardar Cambios</Button>
      </div>
    </div>
  );
}

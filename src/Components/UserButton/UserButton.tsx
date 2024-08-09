'use client'

import React, { useState } from "react";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Link } from "@nextui-org/react";

interface UserData {
  name: string;
  email: string;
  image: string;
}

// Datos de usuario estáticos
const staticUser = {
  name: "Nombre del Usuario",
  email: "usuario@example.com",
  image: "/path/to/default/avatar.jpg" // Cambia esto a la ruta de tu imagen por defecto
};

export default function UserButton() {
  const [userData, setUserData] = useState<UserData>({
    name: staticUser.name,
    email: staticUser.email,
    image: staticUser.image
  });

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userData.name}
          size="md"
          src={userData.image}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-sm font-light">{userData.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" as={Link} href="/user/Profile">Mi Perfil</DropdownItem>
        <DropdownItem key="team_settings" as={Link} href="/user/UserSettings">Configuración</DropdownItem>
        <DropdownItem key="analytics" as={Link} href="/user/Questionnaire">Realizar Cuestionario</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

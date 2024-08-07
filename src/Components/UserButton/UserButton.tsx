'use client'

import React, { useState } from "react";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Link } from "@nextui-org/react";
import { useSession } from 'next-auth/react';

interface UserData {
  name: String;
  email: String;
  image: String;
}

export default function UserButton() {
  const { data: session } = useSession();
  console.log(session);

  const [userData, setUserData] = useState<UserData>({
    name: session?.user?.name || "No definido",
    email: session?.user?.email || "Sin correo",
    image: session?.user?.image ?? ""
  });

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="md"
          src={session?.user?.image as string}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{session?.user?.name}</p>
          <p className="text-sm font-light">{session?.user?.email}</p>
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

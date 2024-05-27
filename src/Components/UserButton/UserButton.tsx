'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export default function UserButton() {
  const router = useRouter();

  const handleQuestionnaireClick = () => {
    router.push("/user/Questionnaire");
  };

  const handleSettingsClick = () => {
    router.push("/user/UserSettings");
  };

  const handleProfileClick = () => {
    router.push("/user/Profile");
  };

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
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">A.Jesus.G</p>
          <p className="text-sm font-light">alanj.ajmg@outlook.com</p>
        </DropdownItem>
        <DropdownItem key="settings" onClick={handleProfileClick}>Mi Perfil</DropdownItem>
        <DropdownItem key="team_settings" onClick={handleSettingsClick}>Configuración</DropdownItem>
        <DropdownItem key="analytics" onClick={handleQuestionnaireClick}>Realizar Cuestionario</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

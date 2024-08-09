"use client";

import { Navbar, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, } from "@nextui-org/react";
import Image from "next/image";

export default function HeaderAdmin() {
  return (
    <Navbar className="mt-8">
      <h2 className="text-6xl font-bold text-primary-500">
        Posts Reportados
      </h2>


      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Cerrar Session
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
};

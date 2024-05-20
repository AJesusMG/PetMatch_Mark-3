import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4">
      <div className="flex xl:flex-col xl:gap-4 w-full justify-between flex-row">
        <Image
          src="/Logo.svg"
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <Button
          variant="light"
          className="p-6 bg-primary hover:bg-primary-500 hover:text-white"
          color="primary"
          radius="sm"
          isIconOnly
        >
          <span className="material-symbols-outlined">auto_stories</span>
        </Button>

        <Button
          variant="light"
          className="p-6 bg-primary hover:bg-primary-500 hover:text-white"
          color="primary"
          radius="sm"
          isIconOnly
        >
          <span className="material-symbols-outlined">groups</span>
        </Button>
        <Button
          variant="light"
          className="p-6 bg-primary hover:bg-primary-500 hover:text-white"
          color="primary"
          radius="sm"
          isIconOnly
        >
          <span className="material-symbols-outlined">add_a_photo</span>
        </Button>
      </div>
    </nav>
  );
}

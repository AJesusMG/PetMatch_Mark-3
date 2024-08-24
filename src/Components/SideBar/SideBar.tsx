"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Tooltip, useDisclosure, Link } from "@nextui-org/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import FormModal from "../FormModal/FormModal";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className="xl:h-screen xl:w-fit w-full flex lg:flex-col p-4 flex-row"
      style={{ boxShadow: "1px 0 6px rgba(0, 0, 0, 0.05)" }}
    >
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
                href={isMobile ? "/user/MobilePrincipalPage" : "/user/PrincipalPage"}
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
                href={isMobile ? "/user/MobileCatalogue" : "/user/Catalogue"}
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

        <div className="mt-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>

        <FormModal isOpen={isOpen} onClose={onClose} />
      </div>
    </nav>
  );
}

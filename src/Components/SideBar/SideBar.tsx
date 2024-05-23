"use client";

import React from "react";
import Image from "next/image";
import { Button, Tooltip, Modal, ModalContent, useDisclosure, ModalHeader, ModalBody, ModalFooter, Input, Checkbox, Link,} from "@nextui-org/react";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4">
      <div className="flex xl:flex-col xl:gap-6 w-full justify-between flex-row">
        <Image
          src="/Logo.svg"
          width={50}
          height={50}
          alt="Picture of the author"
        />

        <Tooltip content="Catalogo" placement="right" size="sm">
          <Button
            variant="light"
            className="p-6 bg-primary hover:bg-primary-500 hover:text-white transition-all duration-300"
            color="primary"
            radius="sm"
            isIconOnly
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Sign in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </nav>
  );
}

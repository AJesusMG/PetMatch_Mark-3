"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";
import LoginForm from "@/Components/auth/LoginForm";
import Image from "next/image";

export default function AuthCard() {
  return (
    <Card className="max-w-[1071px]">
      <CardHeader className="flex gap-3">
        <Image src="/img/logo.svg" alt="NextUI Logo" width={30} height={30} />
        <h4 className="font-extrabold">Petmacth</h4>
      </CardHeader>
      <CardBody className="flex flex-row gap-2">
        <div className="flex flex-col">
          <h2>Bienvenido de vuelta</h2>
          <p>
            ¿No tienes cuenta? <span>Registrate</span>
          </p>
          <LoginForm />
        </div>

        <Image
          src="/img/LoginImage.jpg"
          alt="NextUI Logo"
          width={500}
          height={500}
        />
      </CardBody>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}

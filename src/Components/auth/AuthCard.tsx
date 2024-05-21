"use client";
import { Card, CardBody } from "@nextui-org/react";
import LoginForm from "@/Components/auth/LoginForm";
import RegisterForm from "@/Components/auth/RegisterForm"; 
import Image from "next/image";
import { useState } from 'react';

export default function AuthCard() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  return (
    <Card className="max-w-[1071px] h-[700px] p-6">
      <CardBody className="flex flex-row gap-2">
        {showLoginForm ? (
          <>
            <div className="flex flex-col max-w-sm justify-between w-[350px]">
              <div className="flex items-center">
                <Image src="/img/logo.svg" alt="NextUI Logo" width={30} height={30} />
                <h4 className="font-extrabold">Petmacth</h4>
              </div>
              <h2 className="text-5xl font-semibold">¡Bienvenido de vuelta!</h2>
              <p className="text-xl">
                ¿No tienes cuenta?{' '}
                <span className="font-bold cursor-pointer underline" onClick={toggleForm}>
                  Regístrate
                </span>
              </p>
              <div className="h-80">
                <LoginForm />
              </div>
              <p className="text-sm text-center">
                <span className="font-bold cursor-pointer underline">Recupera tu contraseña</span>
              </p>
            </div>
            <Image src="/img/LoginImage.jpg" alt="NextUI Logo" width={550} height={600} className="ml-10"/>
          </>
        ) : (
          <>
            <Image src="/img/LoginImage.jpg" alt="NextUI Logo" width={550} height={600} className="mr-10"/>
            <div className="flex flex-col max-w-sm justify-between w-[350px]">
              <div className="flex items-center">
                <Image src="/img/logo.svg" alt="NextUI Logo" width={30} height={30} />
                <h4 className="font-extrabold">Petmacth</h4>
              </div>
              <h2 className="text-5xl font-semibold">¡Registrate!</h2>
              <p className="text-xl">
                ¿Ya tienes una cuenta?{' '}
                <span className="font-bold cursor-pointer underline" onClick={toggleForm}>
                  Inicia sesión
                </span>
              </p>
              <div className="h-[26rem] ">
                <RegisterForm />
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
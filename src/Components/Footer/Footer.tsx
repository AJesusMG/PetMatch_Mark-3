import React from "react";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col bg-[#FFD893] w-full h-72">
        <div className="flex flex-col bg-[#FFD893] w-full h-72 p-16 gap-4">
          <header className="flex flex-row">
            <h1 className="text-2xl text-black font-bold">PetMatch</h1>
          </header>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col w-full">
              <p className="text-md text-justify">
                Encuentra a tu compañero peludo excepcional en nuestra página
                web especializada en adopción de mascotas. ¡Prepara tu corazón
                para el amor incondicional y adopta a tu amigo peludo ahora!
              </p>
            </div>
            <div className="flex flex-row w-full gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-md">Terminos y Condiciones</p>
                <p className="text-md">Contáctanos</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-md">¿Quiénes somos?</p>
                <p className="text-md">Catalogo</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-md">Política de Cookies</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-sm font-bold text-center">
          © 2024 PetMatch
        </h1>
      </div>
    </>
  );
}

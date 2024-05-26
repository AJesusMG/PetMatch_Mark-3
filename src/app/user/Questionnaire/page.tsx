"use client";
import QuestionaireForm from "@/Components/QuestionaireFrom/QuestionaireForm";
import React, { useState } from "react";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/react";
import {Button} from "@nextui-org/button";

export default function Questionaire() {
  const [formValues, setFormValues] = useState({});

  const handleSubmit = () => {
    console.log("Valores del formulario:", formValues);
  };

  return (
    <div>
      <div className="block">
        <h1 className="ml-10 text-6xl font-bold">Cuestionario</h1>
        <Divider />
      </div>
      <div className="mt-6 w-full h-full flex justify-between items-center">
        <div className=" overflow-auto w-full max-h-[720px] p-6">
          <QuestionaireForm setFormValues={setFormValues}/>
          <div className="absolute bottom-14 right-20">
            <Button type="submit" className="bg-success-300 font-bold text-xl" onClick={handleSubmit}>Enviar Cuestionario</Button>
          </div>
        </div>
        <div className="object-center w-full flex justify-center">
          <Image
            src="/Lomito.jpg"
            alt="Descripción de la imagen"
            className="object-center w-[450px] h-[450px] rounded-full object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
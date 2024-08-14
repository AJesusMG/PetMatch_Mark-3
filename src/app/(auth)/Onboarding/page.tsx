'use client'

import { useState } from "react";
import { Button, Input, Textarea, Card, Avatar } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa"; // Importar icono de flecha

interface ProfileFormProps {
  onNext: () => void;
}

interface UploadProfilePictureProps {
  onBack: () => void;
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-secondary-200">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl h-full m-4 p-8">
        <header className="text-4xl mb-8">
          Pet<span className="text-primary-500">Match</span>
        </header>
        {step === 1 && (
          <ProfileForm onNext={handleNextStep} />
        )}
        {step === 2 && (
          <UploadProfilePicture onBack={handlePreviousStep} />
        )}
      </div>
    </div>
  );
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full animate-fadeIn">
      <h1 className="text-xl font-semibold">Termina de crear tu perfil</h1>
      <form className="flex flex-col gap-5 items-center w-full">
        <Input
          type="text"
          label="Nombre"
          placeholder="Escribe tu nombre completo"
          variant="bordered"
          className="w-1/2"
        />
        <Input
          type="text"
          label="UserName"
          placeholder="Escribe tu nombre de usuario"
          variant="bordered"
          className="w-1/2"
        />
        <Input
          type="text"
          label="Número"
          variant="bordered"
          placeholder="Escribe tu número"
          className="w-1/2"
        />
        <Textarea
          variant="bordered"
          label="Biografía"
          placeholder="Escribe algo breve sobre ti"
          className="w-1/2"
        />
        <Button onClick={onNext} className="w-1/2 bg-primary-400 text-white">
          Siguiente
        </Button>
      </form>
    </div>
  );
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onBack }) => {
  const handleAvatarClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Aquí puedes manejar la subida de la foto
        console.log(file);
      }
    };
    fileInput.click();
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full animate-fadeIn">
      <h1 className="text-xl font-semibold">Sube tu foto de perfil</h1>
      <div className="flex flex-col gap-8 items-center w-full">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="w-60 h-60 text-large cursor-pointer"
          onClick={handleAvatarClick}
        />
        <Button className="bg-success-400 font-bold w-1/2">Finalizar</Button>
      </div>
      <div className="w-full justify-start mt-28">
        <Button onClick={onBack} className="bg-transparent text-primary-500 justify-center hover:bg-primary-400 hover:text-white">
          <FaArrowLeft /> Atras
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;

'use client'
import { useState, useEffect } from "react";
import { Button, Input, Textarea, Avatar, CircularProgress, Select, SelectItem, select, getKeyValue } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getUserStatus } from "@/libs/actions/user.actions";

interface FormData {
  fullname: string;
  username: string;
  phoneNumber: string;
  ageUser: string;
  ageUserN: number;
  experience: string;
  experienceN: number;
  bio: string;
  photoUrl: string;
}

interface ProfileFormProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface UploadProfilePictureProps {
  onBack: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Onboarding: React.FC = () => {

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    username: "",
    phoneNumber: "",
    ageUser: "",
    ageUserN: 0,
    experience: "",
    experienceN: 0,
    bio: "",
    photoUrl: "",
  });
  const { user } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     if (user && user.emailAddresses[0].emailAddress) {
  //       try {
  //         const email = user.emailAddresses[0].emailAddress;
  //         const userStatus = await getUserStatus(email);
  //         if (userStatus && userStatus.onboarded) {
  //           router.push('/user/PrincipalPage');
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user status:", error);
  //       }
  //     }
  //   };

  //   checkUserStatus();
  // }, [user, router]);

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
          <ProfileForm
            onNext={handleNextStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <UploadProfilePicture
            onBack={handlePreviousStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

const ProfileForm: React.FC<ProfileFormProps> = ({ onNext, formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full animate-fadeIn">
      <h1 className="text-4xl font-semibold">Termina de crear tu perfil</h1>
      <form className="flex flex-col gap-5 items-center w-3/4">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Nombre"
              name="fullname"
              placeholder="Escribe tu nombre completo"
              variant="bordered"
              className="w-full"
              value={formData.fullname}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Nombre de usuario"
              name="username"
              placeholder="Escribe tu nombre de usuario"
              variant="bordered"
              className="w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Número"
              name="phoneNumber"
              variant="bordered"
              placeholder="Escribe tu número"
              className="w-full"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <div className="flex flex-row gap-2 w-full">
              <Input
                type="text"
                label="Edad"
                name="ageUser"
                variant="bordered"
                placeholder="Escribe tu edad"
                className="w-1/2"
                value={formData.ageUser}
                onChange={handleChange}

              />
              <Select
                variant="bordered"
                label="Experiencia con animales"
                name="experience"
                placeholder="Escribe tu número"
                className="w-1/2"
                value={formData.experience}
                onChange={handleChange}
              >
                <SelectItem key="0">Poca</SelectItem>
                <SelectItem key="0.5">Mediana</SelectItem>
                <SelectItem key="1">Mucha</SelectItem>
              </Select>
            </div>
          </div>
        </div>
        <Textarea
          variant="bordered"
          label="Biografía"
          name="bio"
          placeholder="Escribe algo breve sobre ti"
          className="w-full"
          value={formData.bio}
          onChange={handleChange}
        />
        <Button onClick={onNext} className="w-1/2 bg-primary-400 text-white">
          Siguiente
        </Button>
      </form>
    </div>
  );
};

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onBack, formData, setFormData }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 8 * 1024 * 1024 || !file.type.startsWith("image/")) {
          alert("El archivo debe ser una imagen y no superar los 8MB");
          return;
        }
        const localUrl = URL.createObjectURL(file);
        setFormData((prevData) => ({
          ...prevData,
          photoUrl: localUrl, // URL local de la imagen seleccionada
        }));
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.photoUrl) throw new Error("La URL de la imagen es nula. No se puede subir.");

      const response = await fetch(formData.photoUrl);
      const blob = await response.blob();
      const imageFormData = new FormData();
      imageFormData.append("image", blob, "image.jpg");

      // Primera solicitud para insertar en el bucket de AWS
      const uploadResponse = await fetch("/api/uploadImage", {
        method: "POST",
        body: imageFormData,
      });

      if (!uploadResponse.ok) throw new Error(`Error al subir la imagen. Estado: ${uploadResponse.status}`);

      const data = await uploadResponse.json();

      // Segunda solicitud para insertar en la base de datos
      formData.ageUserN = parseFloat(formData.ageUser);
      formData.experienceN = parseFloat(formData.experience);
      const postFormData = {
        ...formData,
        photoUrl: data.url, // Se asegura que `photoUrl` sea la URL final de la imagen
        email: user?.primaryEmailAddress?.emailAddress,
      };

      const postResponse = await fetch(`/api/auth/onboarding?email=${user?.primaryEmailAddress?.emailAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFormData),
      });

      const resBody = await postResponse.json();
      if (resBody.code !== 201) throw new Error(`Error al enviar los datos: ${resBody.message}`);

      router.push('/user/PrincipalPage');
    } catch (error) {
      console.error("Error en el proceso de submit:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full animate-fadeIn">
      <h1 className="text-xl font-semibold">Sube tu foto de perfil</h1>
      <div className="flex flex-col gap-8 items-center w-full">
        <Avatar
          src={formData.photoUrl || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
          className="w-60 h-60 text-large cursor-pointer"
          onClick={handleAvatarClick}
        />
        <Button
          type="submit"
          className="bg-success-400 font-bold w-1/2"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress aria-label="Loading..." />
          ) : (
            "Finalizar"
          )}
        </Button>
      </div>
      <div className="w-full justify-start mt-28">
        <Button onClick={onBack} className="bg-transparent text-primary-500 justify-center hover:bg-primary-400 hover:text-white">
          <FaArrowLeft /> Atrás
        </Button>
      </div>
    </form>
  );
};


export default Onboarding;

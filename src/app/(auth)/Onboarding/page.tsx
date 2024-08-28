'use client'

import Compressor from "compressorjs";
import React, { useState } from "react";
import { Button, Input, Textarea, Avatar, CircularProgress, Select, SelectItem, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


interface scheduleItem {
  day: string;
  time: string;
}

interface FormData {
  fullname: string;
  username: string;
  veterinaryClinicName: string;
  veterinaryAddress: string;
  phoneNumber: string;
  ageUserN: number
  ageUser: string;
  experience: string;
  bio: string;
  photoUrl: string;
  experienceN: number;
  schedule: string;
}


interface ProfileFormProps {
  onNext: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface ScheduleFormProps {
  onNext: () => void;
  onBack: () => void;
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
    veterinaryClinicName: "",
    veterinaryAddress: "",
    phoneNumber: "",
    ageUser: "",
    ageUserN: 0,
    experience: "",
    experienceN: 0,
    bio: "",
    photoUrl: "",
    schedule: "",
  });

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
    <div className="flex flex-col w-full h-full items-center justify-center bg-secondary-200">
      <div className="bg-white rounded-lg shadow-lg w-96 lg:w-3/4 max-w-4xl h-full p-2 lg:m-4 lg:p-8">
        <header className="text-4xl mb-4">
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
          <ScheduleForm
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
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
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: name === 'ageUser' || name === 'experienceN' ? Number(value) : value,
      };
      console.log('Updated formData in ProfileForm:', newData);
      return newData;
    });
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full animate-fadeIn">
      <h1 className="text-xl lg:text-4xl font-semibold">Termina de crear tu perfil</h1>
      <form className="flex flex-col gap-5 items-center w-3/4">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              isRequired
              type="text"
              label="Nombre"
              name="fullname"
              placeholder="Escribe tu nombre completo"
              variant="bordered"
              className="w-full"
              value={formData.fullname || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              label="Nombre de usuario"
              name="username"
              placeholder="Escribe tu nombre de usuario"
              variant="bordered"
              className="w-full"
              value={formData.username || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              label="Nombre de tu entidad"
              name="veterinaryClinicName"
              placeholder="Escribe el nombre de tu entidad"
              variant="bordered"
              className="w-full"
              value={formData.veterinaryClinicName || ''} // Siempre como string
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Input
              isRequired
              type="text"
              label="Dirección de tu entidad"
              name="veterinaryAddress"
              placeholder="Escribe la dirección de tu entidad"
              variant="bordered"
              className="w-full"
              value={formData.veterinaryAddress || ''} // Siempre como string
              onChange={handleChange}
            />
            <Input
              isRequired
              type="text"
              label="Número"
              name="phoneNumber"
              variant="bordered"
              placeholder="Escribe tu número"
              className="w-full"
              value={formData.phoneNumber || ''} // Siempre como string
              onChange={handleChange}
              onKeyDown={(e) => {
                // Evitar que el usuario ingrese caracteres no numéricos o negativos
                if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
            />
            <div className="flex flex-row gap-2 w-full">
              <Input
                isRequired
                type="text"
                label="Edad"
                name="ageUser"
                variant="bordered"
                placeholder="Escribe tu edad"
                className="w-full"
                value={formData.ageUser || ''} // Siempre como string
                onChange={handleChange}
                onKeyDown={(e) => {
                  // Evitar que el usuario ingrese caracteres no numéricos o negativos
                  if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <Select
          isRequired
          variant="bordered"
          label="Experiencia con animales"
          name="experience"
          placeholder="Escribe tu experiencia"
          className="w-full"
          value={formData.experience || ''} // Asegúrate de que sea string
          onChange={handleChange}
        >
          <SelectItem key="0">Poca</SelectItem>
          <SelectItem key="0.5">Mediana</SelectItem>
          <SelectItem key="1">Mucha</SelectItem>
        </Select>
        <Textarea
          isRequired
          variant="bordered"
          label="Misión"
          name="bio"
          placeholder="Escribe la misión de tu entidad"
          className="w-full"
          value={formData.bio || ''} // Siempre como string
          onChange={handleChange}
        />
        <div className="flex flex-row w-full justify-end">
          <Button onClick={onNext} className="w-full lg:w-52  bg-success-300 text-black">
            Siguiente
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};


const ScheduleForm: React.FC<ScheduleFormProps> = ({ onNext, onBack, formData, setFormData }) => {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: { active: boolean, time: string } }>({
    lunes: {
      active: false,
      time: '',
    },
    martes: {
      active: false,
      time: '',
    },
    miércoles: {
      active: false,
      time: '',
    },
    jueves: {
      active: false,
      time: '',
    },
    viernes: {
      active: false,
      time: '',
    },
    sábado: {
      active: false,
      time: '',
    },
    domingo: {
      active: false,
      time: '',
    },
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setCheckboxes((prev) => {
      const updatedCheckboxes = {
        ...prev,
        [value]: {
          ...prev[value],
          active: checked,
          time: (!checked ? '' : prev[value].time),
        },
      };
      return updatedCheckboxes;
    });


  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log('Input Change:', name, value);

    // Actualizar formData solo con valores de los checks
    setCheckboxes((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          time: value,
        },
      };
    });
  };

  const handleNext = () => {

    const schedule = Object.keys(checkboxes).map((day) => {
      if (checkboxes[day].active) {
        return ({
          day,
          time: checkboxes[day].time,
        });
      } else {
        return ({
          day,
          time: 'Cerrado',
        });
      }
    });

    console.log('Updated schedule:', schedule);

    setFormData({
      ...formData,
      schedule: JSON.stringify(schedule),
    });

    onNext();
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full animate-fadeIn">
      <h1 className="text-xl lg:text-4xl font-semibold">Horario de la entidad</h1>
      <form className="flex flex-col gap-5 items-center w-3/4">
        <div className="flex flex-col w-full">
          <CheckboxGroup
            className="text-black"
            label="Selecciona los días disponibles:"
          >
            {Object.keys(checkboxes).map((day) => (
              <div key={day} className="flex items-center grid-cols-2 w-full justify-between lg:px-14">
                <Checkbox
                  value={day}
                  className=""
                  checked={checkboxes[day].active}
                  onChange={handleCheckboxChange}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Checkbox>
                <Input
                  isRequired
                  variant="bordered"
                  type="text"
                  name={day}
                  placeholder={`ej.07:00AM - 15:00PM`}
                  className={`w-1/2 p-1`}
                  value={String(checkboxes[day].time)}
                  onChange={handleInputChange}
                  isDisabled={!checkboxes[day].active}
                />
              </div>
            ))}
          </CheckboxGroup>
        </div>
        <div className="flex gap-4 w-full mt-6 justify-between">
          <Button onClick={onBack} className="bg-transparent text-primary-500 justify-center hover:bg-primary-400 hover:text-white">
            <FaArrowLeft /> Atrás
          </Button>
          <Button onClick={onNext} className="w-32 lg:w-52 bg-success-300 text-black">
            Siguiente
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onBack, formData, setFormData }) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null)

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
        setImage(file);
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
    console.log('Final formData before submission:', formData);

    try {
      if (!formData.photoUrl) throw new Error("La URL de la imagen es nula. No se puede subir.");

      // const response = await fetch(formData.photoUrl);
      // const blob = await response.blob();
      // const imageFormData = new FormData();
      // imageFormData.append("image", blob, "image.jpg");

      // // Primera solicitud para insertar en el bucket de AWS
      // const uploadResponse = await fetch("/api/uploadImage", {
      //   method: "POST",
      //   body: imageFormData,
      // });

      // if (!uploadResponse.ok) throw new Error(`Error al subir la imagen. Estado: ${uploadResponse.status}`);

      // const data = await uploadResponse.json();

      let imgUrl = "";

      if (image) {
        imgUrl = await new Promise<string>((resolve, reject) => {
          new Compressor(image, {
            quality: 0.2,
            async success(result) {
              try {
                const formData = new FormData();
                formData.append("image", result);
                const uploadResponse = await fetch("/api/uploadImage", {
                  method: "POST",
                  body: formData,
                });

                if (uploadResponse.ok) {
                  const data = await uploadResponse.json();
                  resolve(data.url);
                } else {
                  const response = await uploadResponse.json().catch(() => ({}));
                  reject(new Error(`Error al subir la imagen: ${response.message}`));
                }
              } catch (error) {
                reject(error);
              }
            },
            error(err) {
              reject(err);
            },
          });
        });
      }

      // Segunda solicitud para insertar en la base de datos
      formData.ageUserN = parseFloat(formData.ageUser);
      formData.experienceN = parseFloat(formData.experience);
      const postFormData = {
        ...formData,
        photoUrl: imgUrl, // Se asegura que `photoUrl` sea la URL final de la imagen
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
          src={formData.photoUrl || ""}
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

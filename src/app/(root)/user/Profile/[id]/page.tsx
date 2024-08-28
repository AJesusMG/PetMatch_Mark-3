'use client'
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import CustomPieChart from "@/Components/CustomPieChart/CustomPieChart";
import { fetchVeterinarianData } from "@/libs/actions/user.actions";
import { useRouter } from "next/navigation";

const chartData = [
  {
    title: 'Estado de Adopción',
    labels: ['Adoptados Recientemente', 'Adoptados Hace Más de un Año', 'En Proceso de Adopción', 'No Adoptados'],
    data: [20, 15, 10, 55],
    backgroundColors: ['#36A2EB', '#FFCE56', '#FF9F40', '#FF6384'],
  },
  {
    title: 'Tipo de Animal',
    labels: ['Perros', 'Gatos', 'Conejos', 'Otros'],
    data: [50, 30, 10, 10],
    backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
  },
  {
    title: 'Estatus de Salud',
    labels: ['Saludables', 'Condiciones Especiales', 'En Tratamiento', 'No Disponible'],
    data: [60, 20, 10, 10],
    backgroundColors: ['#4BC0C0', '#FFCE56', '#FF9F40', '#FF6384'],
  },
];

interface PageProps {
  params: {
    id: string;
  };
}

interface FormattedPage {
  veterinaryClinicName: string;
  veterinaryAddress: string;
  phoneNumber: string;
  bio: string;
  photoUrl: string;
  schedule: string; // Ahora es un string que representa un JSON
}

interface ScheduleItem {
  day: string;
  time: string;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [vetInfo, setVetInfo] = useState<FormattedPage | null>(null);
  const router = useRouter()

  const loadVeterinarianData = async () => {
    try {
      const result = await fetchVeterinarianData(params.id);

      if (result) {
        const {
          veterinaryClinicName,
          veterinaryAddress,
          phoneNumber,
          bio,
          photoUrl,
          schedule,
        } = result;

        const formattedVetInfo: FormattedPage = {
          veterinaryClinicName,
          veterinaryAddress,
          phoneNumber,
          bio,
          photoUrl,
          schedule: schedule || "[]", // Asegúrate de que al menos sea un array vacío
        };

        setVetInfo(formattedVetInfo);
      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.error("Error fetching veterinarian data:", error);
    }
  };

  useEffect(() => {
    loadVeterinarianData();
  }, [params.id]);

  const getFormattedSchedule = () => {
    if (!vetInfo?.schedule) return [];

    try {
      const scheduleArray: ScheduleItem[] = JSON.parse(vetInfo.schedule);
      return scheduleArray.map((item) => ({
        day: item.day.charAt(0).toUpperCase() + item.day.slice(1), // Capitaliza el día
        time: item.time,
      }));
    } catch (error) {
      console.error("Error parsing schedule:", error);
      return [];
    }
  };

  const formattedSchedule = getFormattedSchedule();

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <header className="flex justify-between items-center">
        <h1 className="lg:text-4xl text-xl font-bold">
          {vetInfo?.veterinaryClinicName || "Cargando nombre..."}
        </h1>
        <div className="flex gap-4">
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">notifications</span>
          </Button>
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">mail</span>
          </Button>
        </div>
      </header>
      <Divider />
      <div id="main" className="flex flex-col gap-4 w-full h-full">
        <div id="seccionVet" className="grid gap-8 lg:grid-cols-4">
          <div id="image" className="flex justify-center lg:justify-start">
            <img
              alt="Imagen de perfil"
              src={vetInfo?.photoUrl || "/Mono.jpg"}
              className="rounded-lg object-cover w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
            />
          </div>
          <div id="infoVet" className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">
              {vetInfo?.veterinaryClinicName || "Cargando nombre de la veterinaria..."}
            </h1>
            <p className="text-justify">
              {vetInfo?.bio ||
                "Cargando misión de la veterinaria..."}
            </p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              {vetInfo?.phoneNumber || "Cargando número de la veterinaria..."}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">location_on</span>
              {vetInfo?.veterinaryAddress || "Cargando dirección de la veterinaria..."}
            </div>
          </div>
          <div id="horarios" className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">schedule</span>
              Horarios
            </div>
            <ul className="list-disc list-inside">
              {formattedSchedule.length > 0 ? (
                formattedSchedule.map((daySchedule, index) => (
                  <li key={index}>
                    {`${daySchedule.day}: ${daySchedule.time}`}
                  </li>
                ))
              ) : (
                'Cargando Horario de la Veterinaria'
              )}
            </ul>
          </div>
          <div id="botones" className="flex flex-col gap-4 justify-end lg:items-end lg:flex-row">
            <Button className="bg-secondary-200 w-full lg:w-auto" onClick={() => router.push("/user/VetPost")}>Ver Publicaciones</Button>
            <Button className="bg-secondary-200 w-full lg:w-auto" onClick={() => router.push("/user/Maps")}>Ver Mapa</Button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {chartData.map((chart, index) => (
            <CustomPieChart
              key={index}
              title={chart.title}
              labels={chart.labels}
              data={chart.data}
              backgroundColors={chart.backgroundColors}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

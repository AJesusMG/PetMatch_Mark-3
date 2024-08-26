"use client";

import React from "react";
import { Button, Divider } from "@nextui-org/react";
import CustomPieChart from "@/Components/CustomPieChart/CustomPieChart";

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

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <header className="flex justify-between items-center">
        <h1 className="lg:text-4xl text-xl font-bold">Veterinaria MyKan</h1>
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
              src="/Mono.jpg"
              className="rounded-lg object-cover w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
            />
          </div>
          <div id="infoVet" className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Veterinaria MyKan</h1>
            <p className="text-justify">
              Veterinaria Mykan es un centro dedicado al cuidado integral de las mascotas, ofreciendo servicios de salud, bienestar y grooming para animales domésticos. ¡Tu mascota está en buenas manos!
            </p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              442-217-90-78
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">location_on</span>
              Arquitectura 9 Col.Industrial 76130, <br /> Santiago de Querétaro
            </div>
          </div>
          <div id="horarios" className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">schedule</span>
              Horarios
            </div>
            <ul className="list-disc list-inside">
              <li>Lunes: Abierto 24 horas</li>
              <li>Martes: Abierto 24 horas</li>
              <li>Miércoles: Abierto 24 horas</li>
              <li>Jueves: Abierto 24 horas</li>
              <li>Viernes: Abierto 24 horas</li>
              <li>Sábado: Abierto 24 horas</li>
              <li>Domingo: Abierto 24 horas</li>
            </ul>
          </div>
          <div id="botones" className="flex flex-col gap-4 justify-end lg:items-end lg:flex-row">
            <Button className="bg-secondary-200 w-full lg:w-auto">Ver Publicaciones</Button>
            <Button className="bg-secondary-200 w-full lg:w-auto">Ver Mapa</Button>
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
}

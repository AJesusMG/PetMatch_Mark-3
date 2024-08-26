"use client";

import React, { useState } from "react";
import {Card, CardBody, CardFooter, CardHeader, Divider, Image, Link} from "@nextui-org/react";
import PostCard from "@/Components/PostCard/PostCard";
import { Button, Divider } from "@nextui-org/react";
import CustomPieChart from "@/Components/CustomPieChart/CustomPieChart";

interface UserData {
  name: string;
  image: string;
}

// Datos de usuario estáticos
const staticUser = {
  name: "Nombre del Usuario",
  image: "/path/to/default/avatar.jpg", // Cambia esto a la ruta de tu imagen por defecto
};

// Datos de posts estáticos
const staticPosts = [
  {
    id: 1,
    urlImage: "https://petmatchbucketcd.s3.amazonaws.com/1717172384010_582",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    user: "Usuario 1",
    content: "Contenido del post 1",
    race: "Raza 1",
    size: "Tamaño 1",
    age: "Edad 1",
    instagram: "@usuario1",
    whatsapp: "+123456789",
    facebook: "/usuario1",
  },
];

const chartData = [
  {
    title: 'Estado de Adopción',
    labels: ['Adoptados Recientemente', 'Adoptados Hace Más de un Año', 'En Proceso de Adopción', 'No Adoptados'],
    data: [20, 15, 10, 55], // Ajusta estos valores según los datos reales
    backgroundColors: ['#36A2EB', '#FFCE56', '#FF9F40', '#FF6384'],
  },
  {
    title: 'Tipo de Animal',
    labels: ['Perros', 'Gatos', 'Conejos', 'Otros'],
    data: [50, 30, 10, 10], // Ajusta estos valores según los datos reales
    backgroundColors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
  },
  {
    title: 'Estatus de Salud',
    labels: ['Saludables', 'Condiciones Especiales', 'En Tratamiento', 'No Disponible'],
    data: [60, 20, 10, 10], // Ajusta estos valores según los datos reales
    backgroundColors: ['#4BC0C0', '#FFCE56', '#FF9F40', '#FF6384'],
  },  
];

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <header className="flex flex-row justify-between">
        <div className="flex flex-row w-full">
          <h1 className="lg:text-4xl text-xl font-bold">Veterinaria MyKan</h1>
        </div>
        <div className="flex flex-row gap-4 w-full justify-end">
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">notifications</span>
          </Button>
          <Button isIconOnly className="bg-transparent">
            <span className="material-symbols-outlined">mail</span>
          </Button>
        </div>
      </header>
      <Divider />
      <div id="main" className="flex flex-col px-4 w-full h-screen gap-4">
        <div id="seccionVet" className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div id="image" className="flex items-center lg:w-[300px] lg:h-[300px] w-[200px] h-[200px]">
            <img
              alt="Imagen de perfil"
              src="/Mono.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div id="infoVet" className="flex flex-col gap-4 w-96">
            <h1 className="text-2xl font-bold">Veterinaria MyKan</h1>
            <p className="text-justify">Veterinaria Mykan es un centro dedicado al cuidado integral de las mascotas, ofreciendo servicios de salud, bienestar y grooming para animales domésticos. ¡Tu mascota está en buenas manos!</p>
            <div className="flex flex-row gap-4">
              <span className="material-symbols-outlined">
                call
              </span>
              442-217-90-78
            </div>
            <div className="flex flex-row gap-4">
              <span className="material-symbols-outlined">
                location_on
              </span>
              Arquitectura 9 Col.Industrial 76130,
              <br /> Santiago de Querétaro
            </div>
          </div>
          <div id="horarios" className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <span className="material-symbols-outlined">
                schedule
              </span>
              Horarios
            </div>
            <div className="flex flex-col gap-2">
              <li>
                Lunes: Abierto 24 horas
              </li>
              <li>
                Martes: Abierto 24 horas
              </li>
              <li>
                Miercoles: Abierto 24 horas
              </li>
              <li>
                Jueves: Abierto 24 horas
              </li>
              <li>
                Viernes: Abierto 24 horas
              </li>
              <li>
                Sabado: Abierto 24 horas
              </li>
              <li>
                Domingo: Abierto 24 horas
              </li>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button className="bg-secondary-200">Ver Publicaciones</Button>
            <Button className="bg-secondary-200">Ver Mapa</Button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
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

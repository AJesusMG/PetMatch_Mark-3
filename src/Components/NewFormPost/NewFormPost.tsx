"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, useDisclosure, Divider, Select, SelectItem, Textarea } from "@nextui-org/react";
import { typeAnimals } from "@/data/typeAnimals";
import { dogsBreeds, catsBreeds, rodentBreeds, birdBreeds } from "@/data/breeds";
import { sizeAnimals } from "@/data/sizeAnimals";
import { ageAnimals } from "@/data/ageAnimals";
import { trainAnimals } from "@/data/trainAnimal";
import { temperAnimals } from "@/data/temperAnimals";
import { costAnimals } from "@/data/costAnimals";
import { timeAnimals } from "@/data/timeAnimals";
import { Weather } from "@/data/weather";
import { sizeHome } from "@/data/sizeHome";
import { experienceNeeded } from "@/data/experienceNeeded"; // Asegúrate de importar correctamente tus datos

interface Raza {
  label: string;
  value: number;
  colores?: string[];
}

interface FormData {
  types?: string[];
  breeds?: string[];
  colors?: string[];
  size?: string[];
  age?: string[];
  training?: string[];
  temperament?: string[];
  cost?: string[];
  time?: string[];
  weather?: string[];
  sizeH?: string[];
  experience?: string[];
  description?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

interface FormNewPostProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

export default function NewFormPost({ onFormDataChange }: FormNewPostProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({});
  const [breeds, setBreeds] = useState<Raza[]>([]);
  const [colors, setColors] = useState<{ label: string; value: string }[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [training, setTraining] = useState<string[]>([]);
  const [temperament, setTemperament] = useState<string[]>([]);
  const [cost, setCost] = useState<string[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const [weather, setWeather] = useState<string[]>([]);
  const [sizeH, setSizeH] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);

  useEffect(() => {
    onFormDataChange(formData);
    (formData)
  }, [formData, onFormDataChange]);



  const onChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      case "animalType":
        setValues([value]);
        break;
      case "breed":
        const selectedBreed = breeds.find((breed) => breed.label === value);
        if (selectedBreed) {
          setColors(
            selectedBreed.colores?.map((color) => ({
              label: `${selectedBreed.label} - ${color}`,
              value: color,
            })) || []
          );
        } else {
          setColors([]);
        }
        break;
      default:
        break;
    }
  };

  const handleSelectionChange = (selectedKeys: string[]) => {
    setValues(selectedKeys);
  };

  const handleBreedsChange = (selectedKeys: string[]) => {
    setSelectedBreeds(selectedKeys);
  };

  React.useEffect(() => {
    const selectedTypes = values;
    let updatedBreeds: Raza[] = [];

    if (selectedTypes.includes("Perro")) {
      updatedBreeds = updatedBreeds.concat(
        dogsBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Gato")) {
      updatedBreeds = updatedBreeds.concat(
        catsBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Roedor")) {
      updatedBreeds = updatedBreeds.concat(
        rodentBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }
    if (selectedTypes.includes("Ave")) {
      updatedBreeds = updatedBreeds.concat(
        birdBreeds.map((breed) => ({ ...breed, colores: breed.colores || [] }))
      );
    }

    setBreeds(updatedBreeds);
  }, [values]);

  React.useEffect(() => {
    const selected = breeds.filter((breed) =>
      selectedBreeds.includes(breed.label)
    );

    const colors = selected.flatMap((breed) =>
      breed.colores?.map((color) => ({
        label: `${breed.label} - ${color}`,
        value: color,
      })) || []
    );

    setColors(colors);
  }, [selectedBreeds]);

  React.useEffect(() => {
    setFormData({
      ...formData,
      types: values,
      breeds: selectedBreeds,
      colors: colors.map((color) => color.value),
      size: selectedSize,
      age: selectedAge,
      training,
      temperament,
      cost,
      time,
      weather,
      sizeH,
      experience,
    });
  }, [
    values,
    selectedBreeds,
    colors,
    selectedSize,
    selectedAge,
    training,
    temperament,
    cost,
    time,
    weather,
    sizeH,
    experience,
  ]);

  return (
    <>
      <Divider />
      <div className="flex flex-row w-full">
        <Select
          isRequired
          variant="bordered"
          placeholder="Selecciona un tipo"
          label="Selecciona el tipo de mascota"
          className="w-full"
          name="animalType"
          value={formData.types || ""}
          onChange={onChange}
        >
          {typeAnimals.map((animal) => (
            <SelectItem key={animal.label} value={animal.label}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Divider />
      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <Select
            variant="bordered"
            isRequired
            label="Raza"
            placeholder="Selecciona la raza"
            className="w-full"
            name="breed"
            value={formData.breeds || ""}
            onChange={onChange}
          >
            {breeds.map((breed) => (
              <SelectItem key={breed.label} value={breed.label}>
                {breed.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Color"
            placeholder="Selecciona un color"
            className="w-full"
            name="color"
            value={formData.colors || ""}
            onChange={onChange}
          >
            {colors.map((color, index) => (
              <SelectItem key={index} value={color.value}>
                {color.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Tamaño"
            placeholder="Selecciona un tamaño"
            className="w-full"
            name="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize([e.target.value])} // Update setSelectedSize to accept a string array
          >
            {sizeAnimals.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Edad"
            placeholder="Selecciona una edad"
            className="w-full"
            name="age"
            value={selectedAge}
            onChange={(e) => setSelectedAge([e.target.value])} // Update setSelectedAge to accept a string array
          >
            {ageAnimals.map((age) => (
              <SelectItem key={age.value} value={age.value}>
                {age.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Select
            variant="bordered"
            isRequired
            label="Entrenamiento"
            placeholder="Selecciona nivel de entrenamiento"
            className="w-full"
            name="training"
            value={training.join(",")}
            onChange={(e) => setTraining(e.target.value.split(","))}
          >
            {trainAnimals.map((train) => (
              <SelectItem key={train.value} value={train.value}>
                {train.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Temperamento"
            placeholder="Selecciona temperamento"
            className="w-full"
            name="temperament"
            value={temperament.join(",")}
            onChange={(e) => setTemperament(e.target.value.split(","))}
          >
            {temperAnimals.map((temper) => (
              <SelectItem key={temper.value} value={temper.value}>
                {temper.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Costo de Mantenimiento"
            placeholder="Selecciona el costo"
            className="w-full"
            name="cost"
            value={cost.join(",")}
            onChange={(e) => setCost(e.target.value.split(","))}
          >
            {costAnimals.map((cost) => (
              <SelectItem key={cost.value} value={cost.value}>
                {cost.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            isRequired
            label="Tiempo Dedicado"
            placeholder="Selecciona el tiempo"
            className="w-full"
            name="time"
            value={time.join(",")}
            onChange={(e) => setTime(e.target.value.split(","))}
          >
            {timeAnimals.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col lg:flex-row gap-4">
        <Select
          isRequired
          variant="bordered"
          label="Clima Preferido"
          placeholder="Selecciona el clima"
          className="w-full"
          name="weather"
          value={weather.join(",")}
          onChange={(e) => setWeather(e.target.value.split(","))}
        >
          {Weather.map((weather) => (
            <SelectItem key={weather.value} value={weather.value}>
              {weather.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          variant="bordered"
          label="Tamaño del hogar recomendado"
          placeholder="Selecciona el tamaño"
          className="w-full"
          name="sizeH"
          value={sizeH.join(",")}
          onChange={(e) => setSizeH(e.target.value.split(","))}
        >
          {sizeHome.map((sizeH) => (
            <SelectItem key={sizeH.value} value={sizeH.value}>
              {sizeH.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          variant="bordered"
          label="Experencia necesaria"
          placeholder="Selecciona el nivel de experiencia"
          className="w-full"
          name="experienceNeeded"
          value={experience.join(",")}
          onChange={(e) => setExperience(e.target.value.split(","))}
        >
          {experienceNeeded.map((experience) => (
            <SelectItem key={experience.value} value={experience.value}>
              {experience.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Divider className="my-4" />
      <Textarea
        variant="bordered"
        label="Descripción sobre la mascota"
        placeholder="Escribe algo breve para conocer a la mascota"
        name="description"
        value={formData.description || ""}
        onChange={onChange}
        className="w-full"
        rows={4}
      />
    </>
  );
}
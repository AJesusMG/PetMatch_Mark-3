"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardBody, Divider, Select, SelectItem, Textarea, Input } from "@nextui-org/react";
import { typeAnimals } from "@/data/typeAnimals";
import { dogsBreeds, catsBreeds, rodentBreeds, birdBreeds } from "@/data/breeds";
import { sizeAnimals } from "@/data/sizeAnimals";
import { ageAnimals } from "@/data/ageAnimals";



const animals = typeAnimals;

const razas = [
  { value: "labrador", label: "Labrador" },
  { value: "bulldog", label: "Bulldog" },
  { value: "beagle", label: "Beagle" },
  { value: "poodle", label: "Poodle" },
];

interface Raza {
  label: string;
  value: string;
  colores?: string[];
}

interface FormData {
  animalType?: string;
  breed?: string;
  age?: string;
  size?: string;
  origin?: string;
  exotic?: string;
  color?: string;
  pattern?: string;
  personality?: string;
  tendency?: string;
  habitat?: string;
  space?: string;
  climate?: string;
  description?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

export default function FormNewPost() {
  const [formData, setFormData] = useState<FormData>({});
  const [breeds, setBreeds] = useState<Raza[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");



  const onChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    switch (name) {
      case "animalType":
        switch (value) {
          case "Perro":
            setBreeds(dogsBreeds);
            break;
          case "Gato":
            setBreeds(catsBreeds);
            break;
          case "Roedor":
            setBreeds(rodentBreeds);
            break;
          case "Ave":
            setBreeds(birdBreeds);
            break;
          default:
            setBreeds([]);
            setColors([]);
            break;
        }
        break;
      case "breed":
        const selectedBreed = breeds.find(breed => breed.value === value);
        if (selectedBreed) {
          setColors(selectedBreed.colores || []);
        } else {
          setColors([]);
        }
        break;
      default:
        break;
    }
  };


  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2">
          <Select
            isRequired
            label="Tipo de Animal"
            placeholder="Selecciona un tipo"
            className="w-full"
            name="animalType"
            value={formData.animalType || ""}
            onChange={onChange}
          >
            {typeAnimals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Divider className="my-4" />
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col gap-4 w-full">
              <Select
                isRequired
                label="Raza"
                placeholder="Selecciona la raza"
                className="w-full"
                name="breed"
                value={formData.breed || ""}
                onChange={onChange}
              >
                {breeds.map((breed) => (
                  <SelectItem key={breed.value} value={breed.value}>
                    {breed.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Edad"
                placeholder="Selecciona una edad"
                className="w-full"
                name="age"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              >
                {ageAnimals.map((age) => (
                  <SelectItem key={age.value} value={age.value}>
                    {age.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Tamaño"
                placeholder="Selecciona un tamaño"
                className="w-full"
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizeAnimals.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Origen"
                placeholder="Selecciona un origen"
                className="w-full"
                name="origin"
                value={formData.origin || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Es exótico?"
                placeholder="Selecciona si es exótico"
                className="w-full"
                name="exotic"
                value={formData.exotic || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Color"
                placeholder="Selecciona un color"
                className="w-full"
                name="color"
                value={formData.color || ""}
                onChange={onChange}
              >
                {colors.map((color, index) => (
                  <SelectItem key={index} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Select
                isRequired
                label="Patrón"
                placeholder="Selecciona un patrón"
                className="w-full"
                name="pattern"
                value={formData.pattern || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Personalidad"
                placeholder="Selecciona su personalidad"
                className="w-full"
                name="personality"
                value={formData.personality || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Tendencia"
                placeholder="Selecciona una tendencia"
                className="w-full"
                name="tendency"
                value={formData.tendency || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Hábitat"
                placeholder="Selecciona su hábitat"
                className="w-full"
                name="habitat"
                value={formData.habitat || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Espacio"
                placeholder="Selecciona un espacio"
                className="w-full"
                name="space"
                value={formData.space || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Clima"
                placeholder="Selecciona un clima"
                className="w-full"
                name="climate"
                value={formData.climate || ""}
                onChange={onChange}
              >
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex flex-col gap-4 w-full">
            <Textarea
              isRequired
              label="Descripción"
              placeholder="Escribe una descripción"
              className="w-full"
              name="description"
              value={formData.description || ""}
              onChange={onChange}
            />
            <Input
              isRequired
              label="Instagram"
              placeholder="Escribe el Instagram"
              className="w-full"
              name="instagram"
              value={formData.instagram || ""}
              onChange={onChange}
            />
            <Input
              isRequired
              label="WhatsApp"
              placeholder="Escribe el WhatsApp"
              className="w-full"
              name="whatsapp"
              value={formData.whatsapp || ""}
              onChange={onChange}
            />
            <Input
              isRequired
              label="Facebook"
              placeholder="Escribe el Facebook"
              className="w-full"
              name="facebook"
              value={formData.facebook || ""}
              onChange={onChange}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

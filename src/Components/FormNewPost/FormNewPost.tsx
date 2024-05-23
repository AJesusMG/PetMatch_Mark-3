"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardBody, Divider, Select, SelectItem, Textarea, Input } from "@nextui-org/react";

const animals = [
  { value: "dog", label: "Perro" },
  { value: "cat", label: "Gato" },
  { value: "bird", label: "Ave" },
  { value: "rodent", label: "Roedor" },
];

const razas = [
  { value: "labrador", label: "Labrador" },
  { value: "bulldog", label: "Bulldog" },
  { value: "beagle", label: "Beagle" },
  { value: "poodle", label: "Poodle" },
];

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

  const onChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
            {animals.map((animal) => (
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
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Edad"
                placeholder="Selecciona una edad"
                className="w-full"
                name="age"
                value={formData.age || ""}
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
                label="Tamaño"
                placeholder="Selecciona un tamaño"
                className="w-full"
                name="size"
                value={formData.size || ""}
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
                {razas.map((raza) => (
                  <SelectItem key={raza.value} value={raza.value}>
                    {raza.label}
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
          <div className="flex flex-col gap-4">
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
              type="text"
              label="Instagram"
              className="w-full"
              name="instagram"
              value={formData.instagram || ""}
              onChange={onChange}
            />
            <Input
              isRequired
              type="text"
              label="WhatsApp"
              className="w-full"
              name="whatsapp"
              value={formData.whatsapp || ""}
              onChange={onChange}
            />
            <Input
              isRequired
              type="text"
              label="Facebook"
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

"use client";
import { Select, SelectItem, SelectSection, Selection } from "@nextui-org/react";
import React from "react";

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
import { set } from "zod";


export default function QuestionaireForm({ setFormValues }: { setFormValues: (values: any) => void }) {
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const [breeds, setBreeds] = React.useState<{ label: string; value: number; colores: string[] }[]>([]);
  const [colors, setColors] = React.useState<{ label: string; value: string }[]>([]);
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
  const [size, setSize] = React.useState<Selection>(new Set([]));
  const [age, setAge] = React.useState<Selection>(new Set([]));
  const [training, setTraining] = React.useState<Selection>(new Set([]));
  const [temperament, setTemperament] = React.useState<Selection>(new Set([]));
  const [cost, setCost] = React.useState<Selection>(new Set([]));
  const [time, setTime] = React.useState<Selection>(new Set([]));
  const [weather, setWeather] = React.useState<Selection>(new Set([]));
  const [sizeH, setSizeH] = React.useState<Selection>(new Set([]));




  const handleSelectionChange = (selectedKeys: Selection) => {
    setValues(selectedKeys);
  };
  

  React.useEffect(() => {

    const selectedTypes = Array.from(values);
    let updatedBreeds: { label: string; value: number; colores: string[] }[] = [];

    if (selectedTypes.includes("Perro")) {
      updatedBreeds = updatedBreeds.concat(dogsBreeds.map(breed => ({ ...breed, colores: breed.colores ?? [] })));
    }
    if (selectedTypes.includes("Gato")) {
      updatedBreeds = updatedBreeds.concat(catsBreeds.map(breed => ({ ...breed, colores: breed.colores ?? [] })));
    }
    if (selectedTypes.includes("Roedor")) {
      updatedBreeds = updatedBreeds.concat(rodentBreeds.map(breed => ({ ...breed, colores: breed.colores ?? [] })));
    }
    if (selectedTypes.includes("Ave")) {
      updatedBreeds = updatedBreeds.concat(birdBreeds.map(breed => ({ ...breed, colores: breed.colores ?? [] })));
    }

    setBreeds(updatedBreeds);
  }, [values]);


  React.useEffect(() => {
    // Recopilar razas seleccionadas
    const selected = breeds.filter((breed) => selectedBreeds.includes(breed.label));

    // Obtener todos los colores de las razas seleccionadas en el formato "Labrador Retriever - Negro"
    const colors: { label: string; value: string }[] = selected.flatMap((breed) =>
      breed.colores.map((color) => ({ label: `${breed.label} - ${color}`, value: color }))
    );

    setColors(colors);
  }, [selectedBreeds]);


  const handleBreedsChange = (selectedKeys: Selection) => {
    setSelectedBreeds(Array.from(selectedKeys) as string[]);
  };

  React.useEffect(() => {
    setFormValues({
      types: Array.from(values),
      breeds: selectedBreeds,
      colors: colors.map((color) => color.value),
      size: Array.from(size),
      age: Array.from(age),
      training: Array.from(training),
      temperament: Array.from(temperament),
      cost: Array.from(cost),
      time: Array.from(time),
      weather: Array.from(weather),
      sizeH : Array.from(sizeH)
    });
  }, [
    values,
    selectedBreeds,
    colors,
    size,
    age,
    training,
    temperament,
    cost,
    time,
    weather,
    sizeH
  ]);


    return (
      <>
        <form action="">
        <div className="">
          <Select
            items={typeAnimals}
            label="Tipo de Animal"
            selectionMode="multiple"
            placeholder="Select an animal"
            className="m-4"
            classNames={{ label: " text-2xl" }}
            labelPlacement="outside"
            required
            onSelectionChange={handleSelectionChange}
          >
            {(animal) => <SelectItem key={animal.label}>{animal.label}</SelectItem>}
          </Select>
        </div>
        <div className="mt-12">
          <Select
            items={breeds}
            label={"Razas de " + Array.from(values).join(" y ")}
            selectionMode="multiple"
            placeholder="Select an animal"
            className="m-4"
            classNames={{ label: " text-2xl" }}
            labelPlacement="outside"
            required
            onSelectionChange={handleBreedsChange}
          >
            {(animal) => <SelectItem key={animal.label}>{animal.label}</SelectItem>}
          </Select>
        </div>

        <div className="mt-12">
        <Select
            items={colors}
            label="Color"
            selectionMode="multiple"
            placeholder="Select an animal"
            className="m-4"
            classNames={{ label: " text-2xl" }}
            labelPlacement="outside"
            required
          >
            {(color) => (
              <SelectItem key={color.value} value={color.value}>
                {color.label}
              </SelectItem>
            )}
          </Select>
          </div>
  
          <div className="mt-12">
            <Select
              items={sizeAnimals}
              label="Tamaño"
              selectionMode="multiple"
              placeholder="Select an animal"
              selectedKeys={size}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setSize}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="mt-12">
            <Select
              items={ageAnimals}
              label="Edad"
              selectionMode="multiple"
              placeholder="Select an animal"
              selectedKeys={age}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setAge}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
  
          
          <div className="mt-12">
            <Select
              items={trainAnimals}
              label="Entrenamiento"
              placeholder="Select an animal"
              selectedKeys={training}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setTraining}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="mt-12">
            <Select
              items={temperAnimals}
              label="Temperamento"
              selectionMode="multiple"
              placeholder="Select an animal"
              selectedKeys={temperament}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setTemperament}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          
          <div className="mt-12">
            <Select
              items={costAnimals}
              label="Nivel de mantenimiento"
              selectionMode="multiple"
              placeholder="Select an animal"
              selectedKeys={cost}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setCost}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="mt-12">
            <Select
              items={timeAnimals}
              label="Tiempo dedicado"
              placeholder="Select an animal"
              selectedKeys={time}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setTime}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="mt-12">
            <Select
              items={Weather}
              label="En que clima vives"
              placeholder="Select an animal"
              selectedKeys={weather}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setWeather}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
          <div className="mt-12">
            <Select
              items={sizeHome}
              label="¿Que tamaño de casa tienes?"
              placeholder="Select an animal"
              selectedKeys={sizeH}
              className="m-4"
              classNames={{ label: " text-2xl" }}
              labelPlacement="outside"
              required
              onSelectionChange={setSizeH}
            >
              {(animal) => (
                <SelectItem key={animal.value}>{animal.label}</SelectItem>
              )}
            </Select>
          </div>
        </form>
      </>
    );
  }
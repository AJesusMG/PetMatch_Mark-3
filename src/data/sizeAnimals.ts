interface sizeAnimal{
    label: string;
    value: number;
}

export const sizeAnimals: sizeAnimal[] = [
    { label: "Pequeño", value: 0.25 },
    { label: "Mediano", value: 0.50 },
    { label: "Grande", value: 0.75 },
    { label: "Gigante", value: 1 },
]

// Define the getSizeLabel function
export const getSizeLabel = (sizeValue?: number): string => {
    const sizeAnimal = sizeAnimals.find((sizeAnimal) => sizeAnimal.value === sizeValue);
    return sizeAnimal ? sizeAnimal.label : 'Desconocido';
  };
  

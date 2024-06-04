interface ageAnimal{
    label: string;
    value: number;
}

export const ageAnimals: ageAnimal[] = [
    { label: "Bebé", value: 0.25 },
    { label: "Joven", value: 0.5 },
    { label: "Adulto", value: 0.75 },
    { label: "Viejo", value: 1 },
]
  
  // Define the getAgeLabel function
  export const getAgeLabel = (ageValue?: number): string => {
    const ageAnimal = ageAnimals.find((ageAnimal) => ageAnimal.value === ageValue);
    return ageAnimal ? ageAnimal.label : 'Desconocido';
  };
interface vocalizationAnimal {
    label: string;
    value: number;
}

export const vocalizationAnimals: vocalizationAnimal[] = [
    { label: "Silencioso", value: 0.25 },
    { label: "Moderado", value: 0.5 },
    { label: "Ruidoso", value: 0.75},
    { label: "No importa", value: 1}

]
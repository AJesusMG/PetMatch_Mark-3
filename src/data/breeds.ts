// interfaces.ts
interface Raza {
    label: string;
    value: number;
    colores?: string[]; // Optional colores property
  }

  export const dogsBreeds: Raza[] = [
    { label: "Labrador Retriever", value:0.01 , colores: ["Negro", "Dorado", "Chocolate"] },
    { label: "Pastor Alemán", value: 0.02, colores: ["Negro y Tan", "Sable", "Negro y Blanco"] },
    { label: "Golden Retriever", value: 0.03, colores: ["Dorado Claro", "Dorado Oscuro", "Crema"] },
    { label: "Bulldog", value: 0.04, colores: ["Blanco", "Marron", "Negro"] },
    { label: "Beagle", value: 0.05, colores: ["Negro, Marrón y Blanco", "Rojo y Blanco", "Naranja y Blanco"] },
    { label: "Dálmata", value: 0.06, colores: ["Blanco con manchas negras"] },
    { label: "Doberman Pinscher", value: 0.07, colores: ["Negro y fuego", "Marrón y fuego"] },
    { label: "Rottweiler", value: 0.08, colores: ["Negro y fuego"] },
    { label: "Boxer", value: 0.09, colores: ["Atigrado", "Fawn", "Blanco"] },
    { label: "Schnauzer", value: 0.10, colores: ["Negro", "Sal y Pimienta", "Plata"] },
    { label: "Basset Hound", value: 0.11, colores: [" bicolor (negro y blanco, marrón y blanco)", "Tricolor (negro, marrón y blanco)"] },
    { label: "Bloodhound", value: 0.12, colores: ["Negro y fuego", "Hígado y fuego"] },
    { label: "Greyhound", value: 0.13, colores: ["Atigrado", "Negro", "Blanco", "Fawn", "Rojo"] },
    { label: "Dachshund", value: 0.14, colores: ["Negro y fuego", "Chocolate y fuego", "Atigrado", "Arlequín"] },
    { label: "Pomerania", value: 0.15, colores: ["Naranja", "Crema", "Negro", "Blanco", "Marrón"] },
    { label: "Siberian Husky", value: 0.16, colores: ["Gris y blanco", "Negro y blanco", "Rojo y blanco"] },
    { label: "Samoyedo", value: 0.17, colores: ["Blanco"] },
    { label: "Akita Inu", value: 0.18, colores: ["Blanco", "Atigrado", "Negro"] },
    { label: "Volpino Italiano", value: 0.19, colores: ["Blanco"] },
  ];

 // catsBreeds.ts
export const catsBreeds: Raza[] = [
    { label: "Persa", value: 0.20, colores: ["Blanco", "Negro", "Gris", "Naranja"] },
    { label: "Maine Coon", value: 0.21, colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (negro, blanco, azul, crema, rojo)", "Bicolor"] },
    { label: "Siamés", value: 0.22, colores: ["Color Point (seal point, chocolate point, lilac point, blue point)"] },
    { label: "Bengala", value: 0.23, colores: ["Manchado Marrón", "Manchado Negro", "Manchado Nieve"] },
    { label: "Sphynx", value: 0.24, colores: ["Rosa", "Negro", "Gris", "Blanco"] },
    { label: "Ragdoll", value: 0.25, colores: ["Mitad y Mitad (blanco con manchas de color)", "Bicolor", "Point (seal point, chocolate point, blue point, lilac point)"] },
    { label: "Abisinio", value: 0.26, colores: ["Atigrado (ticked tabby)", "Ruddy", "Fawn"] },
    { label: "Siberiano", value: 0.27, colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (negro, blanco, azul, crema, rojo)", "Bicolor", "Neva Masquerade"] },
    { label: "Británico de Pelo Corto", value: 0.28, colores: ["Azul", "Negro", "Blanco", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Exotic Shorthair", value: 0.29, colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Cornish Rex", value: 0.30, colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Devon Rex", value: 0.31, colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Savannah", value: 0.32, colores: ["Manchado Marrón", "Manchado Negro", "Manchado Nieve"] },
    { label: "Somalí", value: 0.33, colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (beige, chocolate, rojo)"] },
    { label: "Azul Ruso", value: 0.34, colores: ["Azul"] },
    { label: "Noruego del Bosque", value: 0.35, colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (blanco, negro, rojo, azul, crema)", "Bicolor"] },
  ];
  export const rodentBreeds: Raza[] = [
    { label: "Hámster", value: 0.36, colores: ["Marron", "Dorado", "Blanco", "Negro"] },
    { label: "Cobaya", value: 0.37, colores: ["Negro", "Blanco", "Marron", "Naranja"] },
    { label: "Ratón", value: 0.38, colores: ["Blanco", "Negro", "Marron", "Gris"] },
    { label: "Rata", value: 0.39, colores: ["Negro", "Marron", "Blanco", "Gris"] },
    { label: "Chinchilla", value: 0.40, colores: ["Gris", "Blanco"] },
    { label: "Jerbo", value: 0.41, colores: ["Marron", "Dorado", "Blanco", "Negro"] },
    { label: "Degu", value: 0.42, colores: ["Gris", "Marron", "Blanco"] },
    { label: "Hurón", value: 0.43, colores: ["Blanco", "Negro", "Marron", "Gris"] },
    { label: "Lirón", value: 0.44, colores: ["Gris", "Marron", "Blanco"] },
    { label: "Ardilla", value: 0.45, colores: ["Marron", "Negro", "Gris", "Rojo"] },
    { label: "Conejo", value: 0.46, colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
  ];
  

  export const birdBreeds: Raza[] = [
    { label: "Loro", value: 0.47, colores: ["Verde", "Rojo", "Azul", "Amarillo"] },
    { label: "Canario", value: 0.48, colores: ["Amarillo", "Blanco", "Naranja", "Verde"] },
    { label: "Pinzón", value: 0.49, colores: ["Marron", "Blanco", "Negro", "Rojo"] },
    { label: "Cacatúa", value: 0.50, colores: ["Blanco", "Negro", "Amarillo", "Gris"] },
    { label: "Inseparable", value: 0.51, colores: ["Verde", "Azul", "Amarillo", "Blanco"] },
    { label: "Paloma", value: 0.52, colores: ["Blanco", "Gris", "Negro", "Marron"] },
    { label: "Gorrión", value: 0.53, colores: ["Marron", "Blanco", "Negro"] },
    { label: "Águila", value: 0.54, colores: ["Marron", "Negro", "Blanco"] },
    { label: "Halcón", value: 0.55, colores: ["Gris", "Blanco", "Negro", "Marron"] },
    { label: "Búho", value: 0.56, colores: ["Marron", "Gris", "Blanco", "Negro"] },
    { label: "Pavo Real", value: 0.57, colores: ["Azul", "Verde", "Blanco"] },
    { label: "Avestruz", value: 0.58, colores: ["Negro", "Blanco"] },
    { label: "Gallina", value: 0.59, colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
    { label: "Pato", value: 0.60, colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
    { label: "Cisne", value: 0.61, colores: ["Blanco", "Negro"] },
  ];
  
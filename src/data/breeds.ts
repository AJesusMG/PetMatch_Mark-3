// interfaces.ts
interface Raza {
    label: string;
    value: string;
    colores?: string[]; // Optional colores property
  }

  export const dogsBreeds: Raza[] = [
    { label: "Labrador Retriever", value: "labrador_retriever", colores: ["Negro", "Dorado", "Chocolate"] },
    { label: "Pastor Alemán", value: "pastor_aleman", colores: ["Negro y Tan", "Sable", "Negro y Blanco"] },
    { label: "Golden Retriever", value: "golden_retriever", colores: ["Dorado Claro", "Dorado Oscuro", "Crema"] },
    { label: "Bulldog", value: "bulldog", colores: ["Blanco", "Marron", "Negro"] },
    { label: "Beagle", value: "beagle", colores: ["Negro, Marrón y Blanco", "Rojo y Blanco", "Naranja y Blanco"] },
    { label: "Dálmata", value: "dalmata", colores: ["Blanco con manchas negras"] },
    { label: "Doberman Pinscher", value: "doberman_pinscher", colores: ["Negro y fuego", "Marrón y fuego"] },
    { label: "Rottweiler", value: "rottweiler", colores: ["Negro y fuego"] },
    { label: "Boxer", value: "boxer", colores: ["Atigrado", "Fawn", "Blanco"] },
    { label: "Schnauzer", value: "schnauzer", colores: ["Negro", "Sal y Pimienta", "Plata"] },
    { label: "Basset Hound", value: "basset_hound", colores: [" bicolor (negro y blanco, marrón y blanco)", "Tricolor (negro, marrón y blanco)"] },
    { label: "Bloodhound", value: "bloodhound", colores: ["Negro y fuego", "Hígado y fuego"] },
    { label: "Greyhound", value: "greyhound", colores: ["Atigrado", "Negro", "Blanco", "Fawn", "Rojo"] },
    { label: "Dachshund", value: "dachshund", colores: ["Negro y fuego", "Chocolate y fuego", "Atigrado", "Arlequín"] },
    { label: "Pomerania", value: "pomerania", colores: ["Naranja", "Crema", "Negro", "Blanco", "Marrón"] },
    { label: "Siberian Husky", value: "siberian_husky", colores: ["Gris y blanco", "Negro y blanco", "Rojo y blanco"] },
    { label: "Samoyedo", value: "samoyedo", colores: ["Blanco"] },
    { label: "Akita Inu", value: "akita_inu", colores: ["Blanco", "Atigrado", "Negro"] },
    { label: "Volpino Italiano", value: "volpino_italiano", colores: ["Blanco"] },
  ];

 // catsBreeds.ts
export const catsBreeds: Raza[] = [
    { label: "Persa", value: "persa", colores: ["Blanco", "Negro", "Gris", "Naranja"] },
    { label: "Maine Coon", value: "maine_coon", colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (negro, blanco, azul, crema, rojo)", "Bicolor"] },
    { label: "Siamés", value: "siames", colores: ["Color Point (seal point, chocolate point, lilac point, blue point)"] },
    { label: "Bengala", value: "bengala", colores: ["Manchado Marrón", "Manchado Negro", "Manchado Nieve"] },
    { label: "Sphynx", value: "sphynx", colores: ["Rosa", "Negro", "Gris", "Blanco"] },
    { label: "Ragdoll", value: "ragdoll", colores: ["Mitad y Mitad (blanco con manchas de color)", "Bicolor", "Point (seal point, chocolate point, blue point, lilac point)"] },
    { label: "Abisinio", value: "abisinio", colores: ["Atigrado (ticked tabby)", "Ruddy", "Fawn"] },
    { label: "Siberiano", value: "siberiano", colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (negro, blanco, azul, crema, rojo)", "Bicolor", "Neva Masquerade"] },
    { label: "Británico de Pelo Corto", value: "britanico_pelo_corto", colores: ["Azul", "Negro", "Blanco", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Exotic Shorthair", value: "exotic_shorthair", colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Cornish Rex", value: "cornish_rex", colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Devon Rex", value: "devon_rex", colores: ["Blanco", "Negro", "Azul", "Crema", "Atigrado (clásico, caballa, mackerel)"] },
    { label: "Savannah", value: "savannah", colores: ["Manchado Marrón", "Manchado Negro", "Manchado Nieve"] },
    { label: "Somalí", value: "somali", colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (beige, chocolate, rojo)"] },
    { label: "Azul Ruso", value: "azul_ruso", colores: ["Azul"] },
    { label: "Noruego del Bosque", value: "noruego_del_bosque", colores: ["Atigrado (clásico, caballa, mackerel)", "Sólido (blanco, negro, rojo, azul, crema)", "Bicolor"] },
  ];
  export const rodentBreeds: Raza[] = [
    { label: "Hámster", value: "hamster", colores: ["Marron", "Dorado", "Blanco", "Negro"] },
    { label: "Cobaya", value: "cobaya", colores: ["Negro", "Blanco", "Marron", "Naranja"] },
    { label: "Ratón", value: "raton", colores: ["Blanco", "Negro", "Marron", "Gris"] },
    { label: "Rata", value: "rata", colores: ["Negro", "Marron", "Blanco", "Gris"] },
    { label: "Chinchilla", value: "chinchilla", colores: ["Gris", "Blanco"] },
    { label: "Jerbo", value: "jerbo", colores: ["Marron", "Dorado", "Blanco", "Negro"] },
    { label: "Degu", value: "degu", colores: ["Gris", "Marron", "Blanco"] },
    { label: "Hurón", value: "huron", colores: ["Blanco", "Negro", "Marron", "Gris"] },
    { label: "Lirón", value: "liron", colores: ["Gris", "Marron", "Blanco"] },
    { label: "Ardilla", value: "ardilla", colores: ["Marron", "Negro", "Gris", "Rojo"] },
    { label: "Conejo", value: "conejo", colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
  ];
  

  export const birdBreeds: Raza[] = [
    { label: "Loro", value: "loro", colores: ["Verde", "Rojo", "Azul", "Amarillo"] },
    { label: "Canario", value: "canario", colores: ["Amarillo", "Blanco", "Naranja", "Verde"] },
    { label: "Pinzón", value: "pinzon", colores: ["Marron", "Blanco", "Negro", "Rojo"] },
    { label: "Cacatúa", value: "cacatua", colores: ["Blanco", "Negro", "Amarillo", "Gris"] },
    { label: "Inseparable", value: "inseparable", colores: ["Verde", "Azul", "Amarillo", "Blanco"] },
    { label: "Paloma", value: "paloma", colores: ["Blanco", "Gris", "Negro", "Marron"] },
    { label: "Gorrión", value: "gorrion", colores: ["Marron", "Blanco", "Negro"] },
    { label: "Águila", value: "aguila", colores: ["Marron", "Negro", "Blanco"] },
    { label: "Halcón", value: "halcon", colores: ["Gris", "Blanco", "Negro", "Marron"] },
    { label: "Búho", value: "buho", colores: ["Marron", "Gris", "Blanco", "Negro"] },
    { label: "Pavo Real", value: "pavo_real", colores: ["Azul", "Verde", "Blanco"] },
    { label: "Avestruz", value: "avestruz", colores: ["Negro", "Blanco"] },
    { label: "Gallina", value: "gallina", colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
    { label: "Pato", value: "pato", colores: ["Blanco", "Negro", "Marron", "Gris", "Multicolor"] },
    { label: "Cisne", value: "cisne", colores: ["Blanco", "Negro"] },
  ];
  
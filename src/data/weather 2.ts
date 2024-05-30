interface Weather {
    label: string;
    value: string;
}

export const Weather: Weather[] = [
    { label: "Soleado", value: "sunny" },
    { label: "Lluvioso", value: "rainy" },
    { label: "Nublado", value: "cloudy" },
    { label: "Nevado", value: "snowy" },
    { label: "Ventoso", value: "windy" },
    { label: "Tormentoso", value: "stormy" },
    { label: "Neblina", value: "foggy" },
    { label: "Brumoso", value: "hazy" },
    { label: "Cubierto", value: "overcast" },
    { label: "Llovizna", value: "drizzle" },
    { label: "Tormenta eléctrica", value: "thunderstorm" },
    { label: "Ventisca", value: "blizzard" },
    { label: "Granizo", value: "hail" },
    { label: "Aguanieve", value: "sleet" },
    { label: "Lluvia helada", value: "freezing_rain" },
    { label: "Tornado", value: "tornado" },
    { label: "Huracán", value: "hurricane" },
    { label: "Tormenta de polvo", value: "dust_storm" },
    { label: "Tormenta de arena", value: "sandstorm" }
];

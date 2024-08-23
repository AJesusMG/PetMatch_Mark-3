"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"

type Billing = "monthly" | "yearly";

type ImageProps = {
    src: string;
    alt?: string;
};

type PricingPlan = {
    icon: ImageProps;
    planName: string;
    price: number;
    discount?: string;
    description: string;
    features: string[];
    button: {
        title: string;
        onClick?: () => void;
    };
};

type Tab = {
    value: Billing;
    tabName: string;
    plans: PricingPlan[];
};

type Props = {
    tagline: string;
    heading: string;
    description: string;
    defaultTabValue: Billing;
    tabs: Tab[];
};

export type Pricing17Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Pricing17 = (props: Pricing17Props) => {
    const { tagline, heading, description, defaultTabValue, tabs } = {
        ...Pricing17Defaults,
        ...props,
    } as Props; 

    const [activeTab, setActiveTab] = useState(defaultTabValue);
    const MotionTabsContent = motion(TabsContent);

    

    return (
        <section id="Planes" className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
                <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
                    <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
                    <p className="md:text-md">{description}</p>
                </div>
                <Tabs defaultValue={defaultTabValue}>
                    <AnimatePresence initial={false}>
                        {tabs.map(
                            (tab, index) =>
                                tab.value === activeTab && (
                                    <MotionTabsContent
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        value={tab.value}
                                        className="grid grid-cols-1 gap-8 md:grid-cols-2"
                                    >
                                        {tab.plans.map((plan, index) => (
                                            <PricingPlan key={index} plan={plan} billing={tab.value} />
                                        ))}
                                    </MotionTabsContent>
                                ),
                        )}
                    </AnimatePresence>
                </Tabs>
            </div>
        </section>
    );
};

const PricingPlan = ({ plan, billing }: { plan: PricingPlan; billing: Billing }) => {
    const router = useRouter();

    // Condicional para manejar la redirección
    const handleButtonClick = () => {
        if (plan.button.title === "Inicia sesión") {
            router.push("/sign-in"); // Redirige a la página de sign-in
        } else if (plan.button.onClick) {
            plan.button.onClick(); // Ejecuta la función onClick si existe
        }
    };

    return (
        <div className="flex h-full flex-col justify-between rounded-lg px-6 py-8 md:p-8 shadow-medium">
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="mb-4 flex flex-col items-start justify-end">
                            <img src={plan.icon.src} alt={plan.icon.alt} className="size-12" />
                        </div>
                        <h5 className="mb-2 text-xl font-bold md:text-2xl">{plan.planName}</h5>
                        <p>{plan.description}</p>
                    </div>
                </div>
                <div className="my-8 h-px w-full shrink-0 bg-border" />
                <p>Incluye:</p>
                <div className="mb-8 mt-4 grid grid-cols-1 gap-x-6 gap-y-4 py-2 lg:grid-cols-2">
                    {plan.features.map((feature, index) => (
                        <div key={index} className="flex self-start">
                            <div className="mr-4 flex-none self-start">
                                <BiCheck className="size-6" />
                            </div>
                            <p>{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Button
                    className="border-1 border-primary-500 bg-transparent hover:bg-primary-500 hover:text-white w-full p-6 text-xl font-bold"
                    onClick={handleButtonClick}
                >
                    {plan.button.title}
                </Button>
            </div>
        </div>
    );
};


export const Pricing17Defaults: Pricing17Props = {
    heading: "Planes",
    description: "Encuentra el plan perfecto para ti y tu nueva mascota en PetMatch",
    defaultTabValue: "monthly",
    tabs: [
        {
            value: "monthly",
            tabName: "Monthly",
            plans: [
                {
                    icon: {
                        src: "/ZORROPALTEADO1.webp",
                        alt: "Relume icon 1",
                    },
                    planName: "Plan Gratuito",
                    description: "Explora y Conecta con Mascotas",
                    price: 0.00,
                    features: [
                        "Acceso completo a la red social de la comunidad.",
                        "Visualización de publicaciones y anuncios de mascotas.",
                        "Opción de seguir a refugios y organizaciones.",
                        "Interacción con publicaciones mediante likes y comentarios.",
                        "Recibir recomendaciones personalizadas basadas en preferencias.",
                        "Acceso a recursos educativos para adoptantes.",
                    ],
                    button: { title: "Inicia sesión" },
                },
                {
                    icon: {
                        src: "/ZORRO_DORADO1.webp",
                        alt: "Relume icon 2",
                    },
                    planName: "Plan Premium",
                    description: "Maximiza tu visibilidad y apoya la adopción de mascotas.",
                    price: 19,
                    features: [
                        "Publicación destacada de animales disponibles para adopción.",
                        "Acceso a herramientas avanzadas de publicidad y promoción.",
                        "Soporte personalizado para optimización de anuncios.",
                        "Opción de crear publicaciones tipo Instagram para atraer más atención.",
                        "Participación en eventos y campañas promocionales organizados por PetMatch.",
                        "Herramientas para contactar directamente a posibles adoptantes.",
                    ],
                    button: { title: "Más Información" },
                },
            ],
        },
        {
            value: "yearly",
            tabName: "Yearly",
            plans: [
                {
                    icon: {
                        src: "https://relume-assets.s3.amazonaws.com/relume-icon.svg",
                        alt: "Relume icon 1",
                    },
                    planName: "Basic plan",
                    description: "Lorem ipsum dolor sit amet",
                    price: 180,
                    discount: "Save 20%",
                    features: [
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                    ],
                    button: { title: "Get started" },
                },
                {
                    icon: {
                        src: "https://relume-assets.s3.amazonaws.com/relume-icon.svg",
                        alt: "Relume icon 2",
                    },
                    planName: "Business plan",
                    description: "Lorem ipsum dolor sit amet",
                    price: 280,
                    discount: "Save 20%",
                    features: [
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                        "Feature text goes here",
                    ],
                    button: { title: "Get started" },
                },
            ],
        },
    ],
};
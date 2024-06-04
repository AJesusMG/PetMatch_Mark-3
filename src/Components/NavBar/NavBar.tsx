import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const navigate = useRouter()
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <Image
                    src="/Logo.svg"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
                <p className="font-bold text-inherit text-xl">PetMatch</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4m justify-between" >
                <NavbarItem isActive>
                    <Link color="foreground" href="#conoce-petmatch">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link color="foreground" href="#testimonios">
                        Testimonios
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#noticias">
                        Noticias
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={() => navigate.push('/auth')} href="#" variant="bordered" className="border-primary-500 text-md">
                        Iniciar Sesión
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button onClick={() => navigate.push('/auth')} href="#" variant="solid" className="bg-success-300 font-bold text-md">
                        Registrate
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

import * as z from "zod";
import { LoginSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Social } from "@/Components/auth/Social";
import {Switch} from "@nextui-org/react";
import { useForm } from "react-hook-form"
export default function LoginForm() {

  const LoginForm = useForm<z.infer<typeof LoginSchema>>(({
    resolver : zodResolver(LoginSchema),
    defaultValues : {
        name : "",
        password : ""
    }
}));

  return (

    <>
      <form action="" className="w-[90%] h-full flex flex-col justify-evenly">
        <Input
          label="Nombre"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
        />
        <Input
          type="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="*********"
        />
        <div className=" mt-2 mb-2">
            <Switch color="success" className="text-success-300">¿Eres administrador?</Switch>
        </div>
        <Button color="success" className="w-full bg-success-300 font-bold" type="submit">
          Iniciar Sesion
        </Button>
        <div>
          <Social/>
        </div>
      </form>
    </>
  );
}

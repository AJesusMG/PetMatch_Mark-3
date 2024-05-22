import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Social } from "@/Components/auth/Social";
import {Switch} from "@nextui-org/react";
export default function LoginForm() {
  return (
    <>
      <form action="" className="w-[90%] h-full flex flex-col justify-evenly">
        <Input
          label="Nombre"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
        />
        <Input
          type="email"
          label="correo electronico"
          labelPlacement="outside"
          placeholder="example@example.com"
        />
        <Input
          type="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="*********"
        />
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

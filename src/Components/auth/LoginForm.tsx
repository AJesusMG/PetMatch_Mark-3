import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
export default function LoginForm() {
  return (
    <div className="">
      <form action="" className="w-[350px]">
        <Input
          label="Nombre"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
        />
        <Input
          type="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
        />
        <Button color="success" className="w-full">Button</Button>
      </form>
    </div>
  );
}

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Social } from "@/Components/auth/Social";

import { useState } from "react";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { name, email, password };

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(data);

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        // Manejar la respuesta exitosa aquí
      } else {
        console.error('Login failed:', response.statusText);
        // Manejar el error aquí
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error aquí
    }
  };



export default function LoginForm() {

  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] h-full flex flex-col justify-evenly"
      >
        <Input
          label="Nombre"
          labelPlacement="outside"
          placeholder="Emiliano Obregon"
          value={name}
          onValueChange={setName}
        />
        <Input
          type="email"
          label="correo electronico"
          labelPlacement="outside"
          placeholder="example@example.com"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          type="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="*********"
          value={password}
          onValueChange={setPassword}
        />
        <Button
          color="success"
          className="w-full bg-success-300 font-bold"
          type="submit"
        >
          Iniciar Sesion
        </Button>
        <div>
          <Social />
        </div>
      </form>
    </>
  );
}

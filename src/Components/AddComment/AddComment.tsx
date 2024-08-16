import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const AddComment = () => {
  const { user } = useUser();

  return (
    <Card className="p-4" radius="none" shadow="none">
      <CardBody>
        <div className="flex flex-row gap-4 items-center">
          <Avatar src={user?.imageUrl} size="lg" />
          <Input type="text" label="Pregunta algo a la comunidad" />
        </div>
      </CardBody>
      <CardFooter className="w-full flex justify-between items-center">
        <Button isIconOnly className="bg-transparent">
          <span className="material-symbols-outlined">image</span>
        </Button>
        <Button className="bg-success-300 font-bold text-md">Publicar</Button>
      </CardFooter>
    </Card>
  );
}

export default AddComment;

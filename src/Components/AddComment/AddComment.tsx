import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";

const AddComment = () => {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row justify-between items-center gap-4">
      </CardHeader>
      <CardBody>
        <div className="flex flex-row gap-4 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
          <Input type="text" label="Pregunta algo a la comunidad" />
        </div>
      </CardBody>
      <CardFooter className="w-full justify-between">
        <Button isIconOnly className="bg-transparent"><span className="material-symbols-outlined">
          image
        </span></Button>
        <Button className="bg-success-300 font-bold text-md">Publicar</Button>
      </CardFooter>
    </Card>
  )
}

export default AddComment
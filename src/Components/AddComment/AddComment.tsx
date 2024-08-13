import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const AddComment = () => {
  const { user } = useUser();
  
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row justify-between items-center gap-4">
      </CardHeader>
      <CardBody>
        <div className="flex flex-row gap-4 items-center">
          <Avatar src={user?.imageUrl} size="lg" />
          {/* <div>
            {user?.emailAddresses?.map((email, index) => (
              <div key={index}>{email.emailAddress}</div>
            ))}
          </div> */}
          <Input type="text" label="Pregunta algo a la comunidad" />
        </div>
      </CardBody>
      <CardFooter className="w-full justify-end">
        <Button className="bg-success-300 font-bold text-md">Publicar</Button>
      </CardFooter>
    </Card>
  );
}

export default AddComment;

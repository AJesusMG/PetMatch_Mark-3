import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const AddComment = () => {
  const { user } = useUser();
  const AddComment = () => {
    return (
      <Card className="p-4">
        <CardHeader className="flex flex-row justify-between items-center gap-4">
        </CardHeader>
        <CardBody>
          <div className="flex flex-row gap-4 items-center">
              Comments
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

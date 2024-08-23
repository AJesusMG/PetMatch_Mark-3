import { useState } from 'react';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Image, Button } from "@nextui-org/react";

interface Post {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image?: string; // Hacer que la imagen sea opcional
  comments: number;
  likes: number;
}

interface CommunityCardProps {
  post: Post;
  handleFavorite: (id: string) => void;
  handleUnfavorite: (id: string) => void;
  handleAddComment: (id: string) => void;
  handleReply: (id: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ post, handleFavorite, handleUnfavorite, handleAddComment, handleReply }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleFavorite = () => {
    if (isLiked) {
      handleUnfavorite(post.id);
    } else {
      handleFavorite(post.id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="px-4 py-2 w-full flex flex-row gap-2" radius="none" shadow="none">
      {/* Div del Avatar */}
      <div className="flex items-start h-full">
        <Avatar src={post.avatar} size="md" />
      </div>

      {/* Div que contiene CardHeader, CardBody y CardFooter */}
      <div className="flex flex-col flex-grow h-full">
        <CardHeader className="flex -mt-3">
          <div className="flex flex-row gap-4 w-full justify-between">
            <div className="flex flex-row gap-4 items-center">
              <span className="font-bold">{post.user}</span>
              <span className="font-light text-sm">@Usuario</span>
              <span className="font-light text-sm">Tiempo o Fecha</span>
            </div>
            <Button isIconOnly className="bg-transparent" size="sm">
              <span className="material-symbols-outlined text-sm">more_horiz</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="w-full">
              <span className="text-gray-500 w-full">{post.message}</span>
            </div>
            {post.image && (
              <div className="mt-4 mx-auto flex justify-center">
                <Image
                  src={post.image}
                  alt="Imagen del usuario"
                  width={600}
                  height={300}
                  className="rounded-md"
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-between">
          <Button
            isIconOnly
            onPress={toggleFavorite}
            className="bg-transparent"
            size="sm"
            style={{ color: isLiked ? 'red' : 'black' }}
          >
            <span className="material-symbols-outlined text-xs" style={{ fontSize: '20px' }}>
              favorite
            </span>
          </Button>

          <Button
            isIconOnly
            onPress={() => handleAddComment(post.id)}
            className="bg-transparent"
            size="sm"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontSize: '20px' }}>add_comment</span>
          </Button>
          <Button
            isIconOnly
            onPress={() => handleReply(post.id)}
            className="bg-transparent"
            size="sm"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontSize: '20px' }}>reply</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CommunityCard;

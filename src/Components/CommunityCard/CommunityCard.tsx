import { useEffect, useState } from 'react';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Image, Button } from "@nextui-org/react";
import { FormattedPost } from '@/app/(root)/user/Community/page';
import { countChildrenComments } from '@/libs/actions/comment.actions';

interface Post {
  id: string;
  fullname: string;
  username: string;
  text: string;
  avatar: string;
  timeDifference: string;
  image?: string;
  comments: number;
  likes: number;
  name?: string;
  liked: boolean;
}

interface CommunityCardProps {
  post: FormattedPost;
  userId: string | undefined;
  handleFavorite: (id: string) => void;
  handleUnfavorite: (id: string) => void;
  handleAddComment: (id: string) => void;
  handleReply: (id: string) => void;
  handleOpen: (id?: string) => void;
}


const CommunityCard: React.FC<CommunityCardProps> = ({ post, handleFavorite, handleUnfavorite, handleAddComment, handleReply, handleOpen, userId }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [childrenCommentsCount, setChildrenCommentsCount] = useState<number>(0);

  useEffect(() => {
    // Obtener el número de comentarios hijos para el post actual
    const fetchChildrenCommentsCount = async () => {
      const count = await countChildrenComments(post.id);
      if (count !== null) {
        setChildrenCommentsCount(count);
      }
    };

    fetchChildrenCommentsCount();
  }, [post.id]);

  const toggleFavorite = () => {

    if (!userId) {
      return
    }
    
    if (isLiked) {
      handleUnfavorite(post.id);
    } else {
      handleFavorite(post.id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="px-1 sm:px-4 py-2 w-full flex flex-row gap-2" radius="none" shadow="none">
      {/* Div del Avatar */}
      <div className="flex items-start h-full">
        <Avatar src={post.avatar} size="md" />
      </div>

      {/* Div que contiene CardHeader, CardBody y CardFooter */}
      <div className="flex flex-col flex-grow h-full">
        <CardHeader className="flex -mt-3 p-1 sm:p-3">
          <div className="flex flex-row gap-4 w-full justify-between">
            <div className="flex flex-row gap-2 xl:gap-4 items-center">
              <span className="font-bold min-w-fit">{post.name}</span>
              <span className="md:hidden">·</span>
              <span className="font-light text-sm">@{post.username}</span>
              <span className="md:hidden">·</span>
              <span className="font-light text-sm">{post.timeDifference}</span>
            </div>
            <Button isIconOnly className="bg-transparent" size="sm">
              <span className="material-symbols-outlined text-sm">more_horiz</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="w-full">
              <span className="text-gray-500 w-full">{post.text}</span>
            </div>
            {post.image && (
              <div className="mt-4 mx-auto flex justify-center">
                <Image
                  src={post.image}
                  alt="Imagen del usuario"
                  width={600}
                  height={300}
                  radius='lg'
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
                  onClick={() => handleOpen(post.image)}
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
            <span className="ml-1">{post.likes - 1}</span>
          </Button>

          <Button
            isIconOnly
            onPress={() => handleAddComment(post.id)}
            className="bg-transparent"
            size="sm"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontSize: '20px' }}>add_comment</span>
            <span className='ml-1 mb-1'>{childrenCommentsCount}</span>
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

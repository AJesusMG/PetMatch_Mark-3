import { useState } from 'react';
import { Avatar, Card, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";

interface Post {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image?: string;  // Hacer que la imagen sea opcional
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
    <Card className="p-4 w-full" radius='none' shadow='none'>
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col items-center">
            <Avatar src={post.avatar} size="lg" />
            <div className="thread-card_bar mt-2" />
          </div>
          <div className="flex flex-col flex-grow">
            <span className="font-bold">{post.user}</span>
            <span className="text-gray-500">{post.message}</span>
            {post.image && (
              <div className="mt-4 mx-auto flex justify-center">
                <Image 
                  src={post.image} 
                  alt="Imagen del usuario" 
                  width={600} 
                  height={300} 
                  className="rounded-md" 
                  style={{ maxHeight: '300px', objectFit: 'cover' }} 
                />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-row items-center gap-6 ml-5">
        <button
          onClick={toggleFavorite}
          className="material-symbols-outlined"
          style={{ color: isLiked ? 'red' : 'black' }}
        >
          favorite
        </button>
        <button onClick={() => handleAddComment(post.id)} className="material-symbols-outlined">
          add_comment
        </button>
        <button onClick={() => handleReply(post.id)} className="material-symbols-outlined">
          reply
        </button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;

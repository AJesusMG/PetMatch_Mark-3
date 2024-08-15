import { useState } from 'react';
import { Avatar, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

interface Post {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image: string;
  comments: number;
}


const CommunityCard: React.FC<CommunityCardProps> = ({ posts, handleFavorite, handleAddComment, handleReply }) => {
  handleFavorite: (id: string) => void;
  handleAddComment: (id: string) => void;
  handleReply: (id: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ posts, handleFavorite, handleAddComment, handleReply }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
    handleFavorite(id);
  };
  
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="p-4 mt-4 w-full">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col items-center">
                <Avatar src={post.avatar} size="lg" />
                <div className="thread-card_bar mt-2" />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="font-bold">{post.user}</span>
                <span className="text-gray-500">{post.message}</span>
                <Image src={post.image} alt="Imagen del usuario" width={600} height={300} className="rounded-md mt-4" />
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-row items-center gap-10 ml-5">
            <button
              onClick={() => toggleFavorite(post.id)}
              className="material-symbols-outlined"
              style={{ color: favorites.includes(post.id) ? 'red' : 'black' }}
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
      ))}
    </>
  );
};

export default CommunityCard;

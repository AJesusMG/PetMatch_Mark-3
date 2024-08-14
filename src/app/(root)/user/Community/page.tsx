"use client"
import React, { useEffect, useState } from "react";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import AddComment from "@/Components/AddComment/AddComment";
import { useUser } from "@clerk/nextjs";

interface FormattedPost {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image: string;
  comments: number;
}

const Community = () => {
  const [posts, setPosts] = useState<FormattedPost[]>([]); 
  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const resBody = await response.json();

        if (!response.ok) {
          throw new Error(resBody.message || "Error fetching comments");
        }

        // Accede a la propiedad 'data' que contiene el array de comentarios
        const commentsArray = resBody.data;

        if (Array.isArray(commentsArray)) {
          const formattedPosts: FormattedPost[] = commentsArray.map((comment: any) => ({
            id: comment.id,
            user: comment.user?.fullname || "Anonymous",
            message: comment.text,
            avatar: comment.user?.photoUrl || user?.imageUrl || "https://i.pravatar.cc/150?u=default",
            image: comment.imgUrl || "", 
            comments: comment.childrenComments?.length || 0,
          }));

          setPosts(formattedPosts); // Asignación directa
        } else {
          console.error('Unexpected response format:', resBody);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [user?.imageUrl]);

  const handleFavorite = (id: string) => {
    console.log(`Post ${id} marcado como favorito`);
  };

  const handleAddComment = (id: string) => {
    console.log(`Agregar comentario en post ${id}`);
  };

  const handleReply = (id: string) => {
    console.log(`Responder al post ${id}`);
  };

  return (
    <div>
      <header className="flex flex-row w-full justify-between items-center top-0 bg-white rounded-md p-4">
        <h1 className="text-4xl font-bold">Comunidad</h1>
      </header>
      <AddComment />
      <CommunityCard
        posts={posts}
        handleFavorite={handleFavorite}
        handleAddComment={handleAddComment}
        handleReply={handleReply}
      />
    </div>
  );
};

export default Community;

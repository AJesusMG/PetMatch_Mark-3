"use client";

import React, { useEffect, useState } from "react";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import AddPost from "@/Components/AddPost/AddPost";
import { useUser } from "@clerk/nextjs";
import RightSidebar from "@/Components/RightSideBar/RightSideBar";
import { Button, Divider } from "@nextui-org/react";

interface FormattedPost {
  id: string;
  user: string;
  message: string;
  avatar: string;
  image: string;
  comments: number;
  likes: number;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<FormattedPost[]>([]);
  const { user } = useUser();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      const commentsArray = resBody.data;

      if (Array.isArray(commentsArray)) {
        const formattedPosts: FormattedPost[] = commentsArray.map((comment: any) => ({
          id: comment.id,
          user: comment.user?.fullname || "Anonymous",
          message: comment.text,
          avatar: comment.user?.photoUrl || user?.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
          image: comment.imgUrl || "",
          comments: comment.childrenComments?.length || 0,
          likes: 0, // Iniciamos el contador de likes en 0
        }));

        setPosts(formattedPosts);
      } else {
        console.error('Unexpected response format:', resBody);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [user?.imageUrl]);

  const handleFavorite = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleUnfavorite = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes - 1 } : post
      )
    );
  };

  const handleAddComment = (id: string) => {
    console.log(`Agregar comentario en post ${id}`);
  };

  const handleReply = (id: string) => {
    console.log(`Responder al post ${id}`);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-full">
        <nav className="fixed top-0 bg-white shadow-md z-50 flex justify-between items-center p-4 w-full">
          <Button
            onClick={handleScrollToTop}
            className="bg-transparent text-black hover:bg-primary-500 hover:text-white text-md font-bold"
            radius="sm"
          >
            Inicio
          </Button>
        </nav>
        <div className="flex flex-col w-full mt-16">
          <AddPost onPostAdded={fetchComments} />
          <Divider />
          {posts.map((post, index) => (
            <div key={post.id}>
              <CommunityCard
                post={post}
                handleFavorite={handleFavorite}
                handleUnfavorite={handleUnfavorite}
                handleAddComment={handleAddComment}
                handleReply={handleReply}
              />
              {index < posts.length - 1 && <Divider />} {/* Añadimos un Divider entre cada tarjeta */}
            </div>
          ))}
        </div>
      </div>
      <div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Community;

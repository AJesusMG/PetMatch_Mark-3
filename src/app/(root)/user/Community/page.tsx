"use client";

import React, { useEffect, useState } from "react";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import AddPost from "@/Components/AddPost/AddPost";
import { useUser } from "@clerk/nextjs";
import RightSidebar from "@/Components/RightSideBar/RightSideBar";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormattedPost {
  id: string;
  fullname: string;
  username: string;
  text: string;
  avatar: string;
  timeDifference: string; 
  image?: string; 
  comments: number;
  likes: number;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<FormattedPost[]>([]);
  const { user } = useUser();
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const [modalImage, setmodalImage] = useState<string | undefined>("");

  const handleOpen = (imageUrl?: string) => {
    setmodalImage(imageUrl);
    setisOpen(true);
  };

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
        const formattedPosts: FormattedPost[] = commentsArray.map((comment: any) => {
          return {
            id: comment.id,
            fullname: comment.user?.fullname || "Anonymous", 
            username: comment.user?.username || "anonymous", 
            text: comment.text, 
            avatar: comment.user?.photoUrl || user?.imageUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
            image: comment.imgUrl || "",
            timeDifference: comment.timeDifference || "Unknown", 
            comments: comment.childrenComments?.length || 0,
            likes: 0,
          };
        });

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
    router.push(`/user/Community/${id}`);
  };

  const handleReply = (id: string) => {
    console.log(`Responder al post ${id}`);
  };

  return (
    <>
      <div id="modal" className={`modal ${isOpen ? "is-active" : ""}`} onClick={() => setisOpen(false)}>
        <img src={modalImage} className="modal-content" alt="" onClick={(e) => e.stopPropagation()} />
      </div>
      <nav className="backdrop-blur-2xl shadow-md z-50 flex justify-between items-center w-full fixed top-0 p-2">
        <div className="flex items-center gap-8">
          <Image
            src="/ZORRO_SIN1.webp"
            width={50}
            height={50}
            alt="Logo"
            className="xl:hidden -mt-6"
          />
          <h1 className="lg:text-4xl text-xl font-bold">Comunidad</h1>
          <Button
            onClick={handleScrollToTop}
            className="bg-transparent text-black hover:bg-primary-500 hover:text-white text-md font-bold"
            radius="sm"
          >
            Inicio
          </Button>
        </div>
      </nav>
      <div className="flex flex-row mt-11">
        <div className="w-full flex flex-col">
          <div className="flex flex-col border-2 m-auto w-3/4 max-lg:w-full">
            <AddPost onPostAdded={fetchComments} />
            <Divider />
            {posts.map((post, index) => {
              return (
                <div key={post.id}>
                  <CommunityCard
                    post={post}
                    handleFavorite={handleFavorite}
                    handleUnfavorite={handleUnfavorite}
                    handleAddComment={() => handleAddComment(post.id)}
                    handleReply={() => handleReply(post.id)}
                    handleOpen={handleOpen}
                  />
                  {index < posts.length - 1 && <Divider />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/10">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Community;

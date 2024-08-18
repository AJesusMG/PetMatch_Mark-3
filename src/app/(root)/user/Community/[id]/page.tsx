'use client'
import AddPost from "@/Components/AddPost/AddPost";
import CommunityCard from "@/Components/CommunityCard/CommunityCard";
import { useUser } from "@clerk/nextjs";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchChildrenComments } from "@/libs/actions/comment.actions";
// Define un tipo para los comentarios hijos
interface ChildComment {
    id: string;
    text: string;
    imgUrl: string;
    createdAt: string;
    user: {
        fullname: string;
        username: string;
        photoUrl: string;
    };
}

interface Post {
    id: string;
    user: string;
    message: string;
    avatar: string;
    image: string;
    comments: number;
    likes: number;
    childrenComments: ChildComment[]; 
}

interface PageProps {
    params: {
        id: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [post, setPost] = useState<Post | null>(null);
    const { user } = useUser();
    const router = useRouter();
    
    const loadComments = async () => {
        try {
            const result = await fetchChildrenComments(params.id);
            
            if (result) {
                const { id, text, imgUrl, user: commentUser, childrenComments } = result;
                const mainPost: Post = {
                    id,
                    user: commentUser?.fullname || "Anonymous",
                    message: text,
                    avatar: commentUser?.photoUrl || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
                    image: imgUrl || "",
                    comments: childrenComments.length || 0,
                    likes: 0,
                    childrenComments // Incluye los comentarios hijos
                };

                setPost(mainPost);
            } else {
                console.error('Unexpected response format:', result);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        loadComments();
    }, [params.id, user?.imageUrl]);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFavorite = (id: string) => {
        // Función para manejar la adición a favoritos
    };

    const handleUnfavorite = (id: string) => {
        // Función para manejar la eliminación de favoritos
    };

    const handleAddComment = (id: string) => {
        router.push(`/user/Community/${id}`);
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
                    {post && (
                        <>
                            <CommunityCard
                                post={post}
                                handleFavorite={handleFavorite}
                                handleUnfavorite={handleUnfavorite}
                                handleAddComment={() => handleAddComment(post.id)}
                                handleReply={() => handleReply(post.id)}
                            />
                            <Divider />
                            <AddPost 
                                onPostAdded={loadComments} 
                                parentId={params.id} // Pasar el parentId al componente
                            />
                            {post.childrenComments.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold my-5">Comentarios:</h3>
                                    {post.childrenComments.map((comment) => (
                                        <div key={comment.id} className="mb-4 p-4 border rounded-md">
                                            <div className="flex items-center mb-2">
                                                <img src={comment.user.photoUrl} alt={comment.user.fullname} className="w-10 h-10 rounded-full mr-2" />
                                                <span className="font-bold">{comment.user.fullname}</span>
                                            </div>
                                            <p>{comment.text}</p>
                                            {comment.imgUrl && <img src={comment.imgUrl} alt="Comentario" className="mt-2 max-w-full h-auto" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;

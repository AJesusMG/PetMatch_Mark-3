
import PostCard from "@/Components/PostCard/PostCard";
import React from "react";

const PostProps = [
    {
        id: 1,
        image: "https://nextui.org/images/hero-card.jpeg"
    },
    {
        id: 2,
        image: "https://nextui.org/images/album-cover.png"
    },
    {
        id: 3,
        image: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
    },
    {
        id: 4,
        image: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg"
    },
    {
        id: 5,
        image: "https://nextui-docs-v2.vercel.app/images/fruit-3.jpeg"
    },
    {
        id: 6,
        image: "https://nextui-docs-v2.vercel.app/images/fruit-6.jpeg"
    },
    {
        id: 7,
        image: "https://nextui-docs-v2.vercel.app/images/fruit-7.jpeg"
    },
];

export default function Page() {
    return (
        <div className="grid grid-cols-5 gap-4">
            {PostProps.map((post) => (
                <PostCard key={post.id} id={post.id} image={post.image} />
            ))}
        </div>
    );
}


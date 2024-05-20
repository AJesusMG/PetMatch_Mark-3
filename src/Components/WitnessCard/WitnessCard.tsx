import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Avatar,} from "@nextui-org/react";

interface CardProps {
    id: string, 
    image?: string,
    user: string,
    date: string,
    description: string,
    starRating: number,
}

export default function WitnessCard({ id, image, user, date, description, starRating }: CardProps) {
    return (
        <Card className="max-w-[500px]" key={id} radius="sm" shadow="sm">
            <CardHeader className="flex gap-3 px-4">
                <div className="w-fit">
                    <Avatar src={image} />
                </div>
                <div className="flex flex-row justify-between w-full items-center">
                    <p className="text-md">{user}</p>
                    <p className="text-xs">{date}</p>
                </div>
            </CardHeader>
            <CardBody className="p-8">
                <p className="text-justify">{description}</p>
            </CardBody>
            <div className="px-7">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={`material-symbols-outlined ${index < starRating ? '!text-primary-500' : 'text-gray-200'}`}>
                        star
                    </span>
                ))}
            </div>
        </Card>
    );
}

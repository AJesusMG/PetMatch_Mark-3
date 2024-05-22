"use client";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa';
import { Button } from "@nextui-org/react";

export const Social = () => {
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={() => {

                }}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={() => {

                }}>
                <FaFacebook color="#3b5998" className="h-5 w-5"/>
            </Button>
        </div>
    )
}   
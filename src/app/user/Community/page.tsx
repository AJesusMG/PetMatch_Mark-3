'use client'

import React from "react";
import UserButton from "@/Components/UserButton/UserButton";

export default function Community() {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-row w-full">
                <header className="flex flex-row w-full items-center justify-between">
                    <h1 className="text-4xl font-bold">Comunidad</h1>
                    <UserButton />
                </header>
            </div>
        </div>
    )
}
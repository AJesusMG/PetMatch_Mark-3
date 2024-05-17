import React from 'react';
import { Button, Image } from '@nextui-org/react';


export default function Sidebar() {
    return (
        <nav className="xl:h-screen shadow-xl xl:w-fit w-full flex lg:flex-col p-4">
            <div className="flex xl:flex-col xl:gap-4 w-full justify-between flex-row">
                <Button variant="light" radius="sm" className="p-6" color="primary" isIconOnly>
                    <Image src="/Logo.svg" width={40} />
                </Button>
                <Button variant="light" className="p-6" color="primary" radius="sm" isIconOnly>
                    <span className="material-symbols-outlined">
                        auto_stories
                    </span>
                </Button>
                <Button variant="light" className="p-6" color="primary" radius="sm" isIconOnly>
                    <span className="material-symbols-outlined">
                        groups
                    </span>
                </Button>
                <Button variant="light" className="p-6" color="primary" radius="sm" isIconOnly>
                    <span className="material-symbols-outlined">
                        add_a_photo
                    </span>
                </Button>
            </div>
        </nav>
    );
};


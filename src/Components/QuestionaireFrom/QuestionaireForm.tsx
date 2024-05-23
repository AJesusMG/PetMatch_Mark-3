import { Select, SelectItem, Avatar } from "@nextui-org/react";

interface User {
    id: number;
    name: string;
    role: string;
    team: string;
    status: string;
    age: string;
    avatar: string;
    email: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "John Doe",
        role: "CTO",
        team: "Technology",
        status: "active",
        age: "35",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
        email: "john.doe@example.com",
    },
    {
        id: 3,
        name: "Jane Smith",
        role: "CFO",
        team: "Finance",
        status: "inactive",
        age: "42",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "jane.smith@example.com",
    },
];

export default function QuestionaireForm() {
    return (
        <Select
            items={users}
            label="Assigned to"
            placeholder="Select a user"
            labelPlacement="outside"
            classNames={{
                base: "max-w-xs",
                trigger: "h-12",
            }}
            renderValue={(items) => {
                return items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                        <Avatar
                            alt={item.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.avatar}
                        />
                        <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-default-500 text-tiny">({item.email})</span>
                        </div>
                    </div>
                ));
            }}
        >
            {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                        <Avatar
                            alt={user.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user.avatar}
                        />
                        <div className="flex flex-col">
                            <span className="text-small">{user.name}</span>
                            <span className="text-tiny text-default-400">{user.email}</span>
                        </div>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
}

interface NotificationProps {
    id: any;
    type:string;
    title: string;
    description: string;
    read: boolean;
    time: string;
}

export const defaultNotify: NotificationProps[] = [
    {
        id: 1,
        type:"Default",
        title: "Welcome to Anothershot",
        description:"",
        read: false,
        time: "Just now",
    },
    {
        id: 2,
        type:"Default",
        title: "Sign in to our website",
        description:"",
        read: false,
        time: "Just now",
    },
];



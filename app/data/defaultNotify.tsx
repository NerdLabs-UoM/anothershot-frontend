
interface NotificationProps {
    type:string;
    title: string;
    description: string;
}

export const defaultNotify: NotificationProps[] = [
    {
        type:"Default",
        title: "Welcome to Anothershot",
        description:"Join us in this journey of capturing moments and creating memories. Because here, every snapshot tells a story!",
    },
    {
        type:"signIn",
        title: "Sign in to our website",
        description:"Access personalized tools and connect with a vibrant community. Let's make every click count!",
    }
];



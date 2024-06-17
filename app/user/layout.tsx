"use client"


import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

type UserLayoutProps = {
    children: React.ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
    return (
        <>
            {props.children}
        </>
    );
}

export default UserLayout;
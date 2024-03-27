"use client"

import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import AdminDashboard from "./(routes)/dashboard/page";

const Admin = () => {

    const { userId } = useParams();

    return (
        <AdminDashboard />
    );
}

export default Admin;

"use client"

import AdminHeader from "@/components/adminHeader";


type UserLayoutProps = {
    children: React.ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
    return (
        <div className="container py-10">
            <AdminHeader/>
            {props.children}
        </div>
    );
}

export default UserLayout;
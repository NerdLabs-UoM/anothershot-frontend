"use client"

import AdminHeader from "@/components/adminHeader";


type UserLayoutProps = {
    children: React.ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
    return (
        <div className=" py-5 flex flex-col items-center ">
            <AdminHeader/>
            {props.children}
        </div>
    );
}

export default UserLayout;
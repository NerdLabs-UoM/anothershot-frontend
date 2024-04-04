"use client"

type UserManagementLayoutProps = {
    children: React.ReactNode;
}

const UserManagementLayout = (props: UserManagementLayoutProps) => {

    return (
        <div className="w-full px-20">
            {props.children}
        </div>
    );
}

export default UserManagementLayout;
"use client"

type UserManagementLayoutProps = {
    children: React.ReactNode;
}

const UserManagementLayout = (props: UserManagementLayoutProps) => {

    return (
        <div className="w-full mx-9">
            {props.children}
        </div>
    );
}

export default UserManagementLayout;
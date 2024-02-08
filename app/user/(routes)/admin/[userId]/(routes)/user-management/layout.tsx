"use client"

type UserManagementLayoutProps = {
    children: React.ReactNode;
}

const UserManagementLayout = (props: UserManagementLayoutProps) => {

    return (
        <div>
            {props.children}
        </div>
    );
}

export default UserManagementLayout;
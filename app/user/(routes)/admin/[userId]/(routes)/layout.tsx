"use client"

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
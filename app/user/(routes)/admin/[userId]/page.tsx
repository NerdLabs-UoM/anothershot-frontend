"use client"

import { useParams } from "next/navigation";

const Admin = () => {

    const { userId } = useParams();

    return (
        <div>
            <h1>Admin Page</h1>
            <div>{userId}</div>
        </div>
    );
}

export default Admin;

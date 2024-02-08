"use client"

import { useParams } from "next/navigation";
import React from "react";

const Client = () => {

    const { userId } = useParams();

    return (
        <div>
            <div>Client</div>
            <div>{userId}</div>
        </div>
    );
}

export default Client;

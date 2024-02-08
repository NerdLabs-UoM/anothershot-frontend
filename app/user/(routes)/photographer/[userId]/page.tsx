"use client"

import { useParams } from "next/navigation";

const Photographer = () => {

    const { userId } = useParams();

    return (
        <div>
            <div>Photographer</div>
            <div>{userId}</div>
        </div>
    );
}

export default Photographer;
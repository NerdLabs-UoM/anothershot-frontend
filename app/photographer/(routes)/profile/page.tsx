"use client"

import TestMonialsSection from "./testimonialSection/testimonialSection";
import { useEffect, useState } from "react";

const PhotographerProfile = () => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {isClient && <TestMonialsSection />}
        </div>
    );
}

export default PhotographerProfile;
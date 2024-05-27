"use client";

import { InfinitySpin } from 'react-loader-spinner';

const Loading= () =>   {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <InfinitySpin
                width="200"
                color="#2c2b2b"
            />
        </div>
    )
}
export default Loading;

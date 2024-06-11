"use client";
import React from 'react';
import { delay } from "@/app/lib/delay";

const AddButton = React.lazy(() => delay(1000).then(() => import("./components/AddButton")));
const FeedComponent = React.lazy(() => delay(1000).then(() => import("./components/FeedComponent")));

const Feed = () => {
    return (
        
        <div>
                <AddButton />
                <FeedComponent />
        </div>
    )
}

export default Feed;

"use client"

import React, { Suspense } from 'react';
import { delay } from "@/app/lib/delay";
import Loading from "@/components/loading";

const FeedImageComp = React.lazy(() => delay(4000).then(() => import("@/components/feedImageComp")));

const Home = () => {

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <FeedImageComp />
      </Suspense>
    </main>
  )
}

export default Home;
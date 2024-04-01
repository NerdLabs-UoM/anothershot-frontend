"use client"

import Navbar from '@/components/Navbar';
import FeedImageComp from '@/components/feedImageComp';
import React from 'react';

const Home = () => {

  return (
    <main>
      <FeedImageComp />
      <Navbar />
    </main>
  )
}

export default Home;
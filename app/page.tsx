import Navbar from '@/components/Navbar';
import React from 'react';

const Home = async () => {

  return (  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Landing Page
      <Navbar/>
    </main>
  )
}

export default Home;
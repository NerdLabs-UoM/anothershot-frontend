import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Home = async () => {

  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Landing Page
    </main>
  )
}

export default Home;
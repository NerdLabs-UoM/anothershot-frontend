import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ToasterProvider } from '@/providers/toast-provider'
import Header from '@/components/Header'
import SessionProvider from '@/providers/AuthProvider'
import { getServerSession } from 'next-auth'
import { SocketProvider } from '@/context/socketContext'
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnotherShots',
  description: 'Photographer Booking Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
      <link rel="icon" href="/siteicon.png" sizes="2048x2048" />
        <SessionProvider session={session}>
          <SocketProvider>
            <Header />
            {children}
            <Navbar/>
            <ToasterProvider />
          </SocketProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

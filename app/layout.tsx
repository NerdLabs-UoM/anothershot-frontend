import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ToasterProvider } from '@/providers/toast-provider'
import Header from '@/components/Header'
import  SessionProvider  from '@/providers/AuthProvider'
import { getServerSession } from 'next-auth'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnotherShot',
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
        <SessionProvider session={session}>
          <Header />
          {children}
          <ToasterProvider />
        </SessionProvider>
      </body>   
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ToasterProvider } from '@/providers/toast-provider'
import AuthProvider from '@/providers/AuthProvider'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnotherShot',
  description: 'Photographer Booking Application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,


// ...

}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider >
          <Header />
          {children}
          <Navbar />
          <ToasterProvider />
        </AuthProvider>
      </body>
    </html>
  )
}

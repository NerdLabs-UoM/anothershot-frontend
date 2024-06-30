import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToasterProvider } from "@/providers/toast-provider";
import Header from "@/components/Header";
import { SocketProvider } from "@/context/socketContext";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnotherShots",
  description: "Photographer Booking Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/siteicon.png" sizes="2048x2048" />
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <SocketProvider>
              <Header />
              {children}
              <Navbar />
              <ToasterProvider />
            </SocketProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

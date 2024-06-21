import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ToasterProvider } from "@/providers/toast-provider";
import Header from "@/components/Header";
import SessionProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth";
import { SocketProvider } from "@/context/socketContext";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnotherShot",
  description: "Photographer Booking Application",
};

// const queryClient = new QueryClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/siteicon.png" sizes="2048x2048" />
      <body className={inter.className}>
        <QueryProvider>
          {/* <SessionProvider session={session}> */}
          <AuthProvider>
            <SocketProvider>
              <Header />
              {children}
              <Navbar />
              <ToasterProvider />
            </SocketProvider>
          </AuthProvider>
          {/* </SessionProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}

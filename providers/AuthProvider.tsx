"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Loading from "@/components/loading";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
};

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Header />
        <Loading />
        <Navbar />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;

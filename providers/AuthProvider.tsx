"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";

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
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { useSession } from 'next-auth/react';

import { Socket } from 'socket.io-client';

import { connectSocket, disconnectSocket, getSocket } from '@/app/lib/socket';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

interface SocketProviderProps {
    children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (session) {
            setSocket(connectSocket(session.user.id));
        }
        return () => {
            if (session) {
                disconnectSocket(session.user.id);
            }
        };
    }, [session]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
    if (!socket) {
        try {
            socket = io(`${process.env.NEXT_PUBLIC_GATEWAY_URL}`);
            if (socket) {
                socket.emit('connect-user', userId);
            }
        } catch (error) {
            toast.error('Error connecting to server');
        }
    }
    return socket;
};

export const disconnectSocket = (userId: string) => {
    if (socket) {
        try {
            socket.emit('disconnect-user', userId);
            socket.disconnect();
        } catch (error) {
            toast.error('Error disconnecting from server');
        }

        socket = null;
    }
};

export const getSocket = (): Socket | null => {
    return socket;
};
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        // Connection event handlers
        socketInstance.on('connect', () => {
            console.log('Socket connected');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setIsConnected(false);
        });

        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    // Function to emit events
    const sendMessage = (eventName, data) => {
        if (socket && isConnected) {
            socket.emit(eventName, data);
        } else {
            console.warn('Socket is not connected');
        }
    };

    // Function to listen for events
    const subscribeToEvent = (eventName, callback) => {
        if (socket) {
            socket.on(eventName, callback);
            // Return cleanup function
            return () => socket.off(eventName, callback);
        }
        return () => {}; // Return empty cleanup if no socket
    };

    const value = {
        socket,
        isConnected,
        sendMessage,
        subscribeToEvent
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
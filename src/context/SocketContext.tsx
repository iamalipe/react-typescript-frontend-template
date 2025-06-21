import { Socket, io } from "socket.io-client";

import { createContext, useMemo } from "react";

const VITE_API_SOCKET_URL =
  (import.meta.env.VITE_API_SOCKET_URL as string) || "";

export type UseSocketProps = {
  socket: Socket | null;
};

const SocketContext = createContext<UseSocketProps | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketIo = useMemo(() => {
    return io(VITE_API_SOCKET_URL, {
      withCredentials: true,
      // extraHeaders: {
      //   "X-My-Custom-Cookie-Like-Header": "myValue",
      // },
      reconnectionAttempts: Infinity, // Keep trying to reconnect indefinitely
      reconnectionDelay: 1000, // Start with a 1-second delay
      reconnectionDelayMax: 5000, // Max delay of 5 seconds between attempts
      timeout: 20000, // Connection timeout
      autoConnect: true, // Automatically connect on mount
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketIo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

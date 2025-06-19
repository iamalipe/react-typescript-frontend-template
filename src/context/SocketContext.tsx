import { Socket, io } from "socket.io-client";

import { createContext, useMemo } from "react";

const VITE_API_SOCKET_URL =
  (import.meta.env.VITE_API_SOCKET_URL as string) || "";

export type UseSocketProps = {
  socket: Socket | null;
};

const SocketContext = createContext<UseSocketProps | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketIo = useMemo(() => io(VITE_API_SOCKET_URL), []);

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

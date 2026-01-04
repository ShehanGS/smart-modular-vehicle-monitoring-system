import { useEffect } from 'react';
import { ReconnectingWebSocket } from '@services/websocket';

export const useWebSocket = <T,>(path: string, onMessage: (data: T) => void) => {
  useEffect(() => {
    const socket = new ReconnectingWebSocket<T>(path, onMessage);
    return () => socket.close();
  }, [path, onMessage]);
};


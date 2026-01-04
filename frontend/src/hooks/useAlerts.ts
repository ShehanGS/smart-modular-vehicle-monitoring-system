import { useEffect } from 'react';
import { alertStore } from '@stores/alertStore';
import { useWebSocket } from './useWebSocket';
import type { Alert } from '@/types';
import { notifyInfo } from '@services/notifications';

export const useAlerts = () => {
  const { alerts, addAlert, updateStatus } = alertStore();

  useWebSocket<Alert>('/alerts', (data) => {
    addAlert(data);
    notifyInfo(`${data.severity.toUpperCase()}: ${data.title}`);
  });

  useEffect(() => {}, []);

  return { alerts, addAlert, updateStatus };
};


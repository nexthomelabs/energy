import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'appointment' | 'reminder' | 'cancellation' | 'reschedule';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  appointmentId?: string;
  appointmentDate?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  scheduleReminder: (appointmentId: string, appointmentDate: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  addNotification: (notification) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));

    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/src/assets/favicon.svg'
      });
    }
  },

  markAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({ ...notification, read: true })),
      unreadCount: 0
    }));
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },

  scheduleReminder: (appointmentId, appointmentDate) => {
    const appointmentTime = new Date(appointmentDate).getTime();
    const now = new Date().getTime();

    // Schedule 24-hour reminder
    const dayBefore = appointmentTime - (24 * 60 * 60 * 1000);
    if (dayBefore > now) {
      setTimeout(() => {
        get().addNotification({
          type: 'reminder',
          title: 'Appointment Tomorrow',
          message: 'You have an appointment scheduled for tomorrow. Don\'t forget!',
          appointmentId,
          appointmentDate
        });
      }, dayBefore - now);
    }

    // Schedule 2-hour reminder
    const twoHoursBefore = appointmentTime - (2 * 60 * 60 * 1000);
    if (twoHoursBefore > now) {
      setTimeout(() => {
        get().addNotification({
          type: 'reminder',
          title: 'Upcoming Appointment',
          message: 'Your appointment is in 2 hours. See you soon!',
          appointmentId,
          appointmentDate
        });
      }, twoHoursBefore - now);
    }
  }
}));

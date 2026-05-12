// src/store/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
  sidebarCollapsed: false,
  notifications: [
    {
      id: 1,
      type: 'success',
      title: 'Payment Received',
      message: 'You received $1,500 from Client XYZ',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Budget Alert',
      message: 'You\'ve spent 80% of your shopping budget',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Card Payment Due',
      message: 'Premium Card payment due in 3 days',
      time: '2 hours ago',
      read: true
    }
  ],
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { toggleTheme, toggleSidebar, markNotificationRead, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
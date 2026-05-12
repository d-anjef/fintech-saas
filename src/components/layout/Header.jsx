// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationRead } from '../../store/uiSlice';
import './Header.css';

const Header = () => {
  const { theme, toggle } = useTheme();
  const notifications = useSelector(state => state.ui.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header glass">
      <div className="header-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search transactions, categories..."
          className="search-input"
        />
        <kbd className="search-shortcut">⌘K</kbd>
      </div>

      <div className="header-actions">
        <button className="header-btn" onClick={toggle}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="notification-wrapper">
          <button
            className="header-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="notification-dropdown glass"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <span className="badge">{unreadCount} new</span>
                </div>
                <div className="notification-list">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                      onClick={() => dispatch(markNotificationRead(notification.id))}
                    >
                      <div className={`notification-icon ${notification.type}`}>
                        {notification.type === 'success' && '✓'}
                        {notification.type === 'warning' && '⚠'}
                        {notification.type === 'info' && 'ℹ'}
                      </div>
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="profile-wrapper">
          <button
            className="profile-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="profile-avatar">
              <User size={18} />
            </div>
            <div className="profile-info">
              <span className="profile-name">John Doe</span>
              <span className="profile-role">Premium User</span>
            </div>
            <ChevronDown size={16} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                className="profile-dropdown glass"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="profile-dropdown-header">
                  <div className="profile-avatar large">
                    <User size={24} />
                  </div>
                  <div>
                    <h4>John Doe</h4>
                    <p>john.doe@example.com</p>
                  </div>
                </div>
                <div className="profile-dropdown-menu">
                  <button className="dropdown-item">
                    <User size={18} />
                    <span>My Profile</span>
                  </button>
                  <button className="dropdown-item">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  <hr />
                  <button className="dropdown-item danger">
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
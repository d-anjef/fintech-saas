// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  Target,
  CreditCard,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { toggleSidebar } from '../../store/uiSlice';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector(state => state.ui.sidebarCollapsed);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/budget', icon: Wallet, label: 'Budget' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/cards', icon: CreditCard, label: 'Cards' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <div className="logo-icon">₿</div>
            <span className="logo-text">FinTrack</span>
          </div>
        )}
        <button
          className="sidebar-toggle"
          onClick={() => dispatch(toggleSidebar())}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <motion.div
          className="sidebar-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="upgrade-card glass">
            <div className="upgrade-icon">✨</div>
            <h4>Upgrade to Pro</h4>
            <p>Unlock premium features and insights</p>
            <button className="btn btn-primary btn-sm">Upgrade Now</button>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
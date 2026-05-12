// src/components/dashboard/QuickActions.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, ArrowDownLeft, Repeat } from 'lucide-react';
import './QuickActions.css';

const QuickActions = () => {
  const actions = [
    { icon: ArrowUpRight, label: 'Send', color: '#6366f1' },
    { icon: ArrowDownLeft, label: 'Receive', color: '#10b981' },
    { icon: Plus, label: 'Add', color: '#f59e0b' },
    { icon: Repeat, label: 'Exchange', color: '#8b5cf6' }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          className="quick-action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="quick-action-icon" style={{ background: `${action.color}20`, color: action.color }}>
            <action.icon size={20} />
          </div>
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
// src/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import SpendingChart from '../components/dashboard/SpendingChart';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import GoalsWidget from '../components/dashboard/GoalsWidget';
import AIInsights from '../components/dashboard/AIInsights';
import './Dashboard.css';

const Dashboard = () => {
  const { balance, income, expenses, savings } = useSelector(state => state.finance);

  const stats = [
    {
      title: 'Total Balance',
      value: balance,
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: '#6366f1'
    },
    {
      title: 'Income',
      value: income,
      change: '+8.2%',
      trend: 'up',
      icon: '📈',
      color: '#10b981'
    },
    {
      title: 'Expenses',
      value: expenses,
      change: '-3.1%',
      trend: 'down',
      icon: '💸',
      color: '#ef4444'
    },
    {
      title: 'Savings',
      value: savings,
      change: '+15.3%',
      trend: 'up',
      icon: '🎯',
      color: '#f59e0b'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, John! 👋</h1>
          <p>Here's what's happening with your money today</p>
        </div>
        <QuickActions />
      </div>

      <motion.div className="stats-grid" variants={itemVariants}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      <motion.div className="dashboard-content" variants={itemVariants}>
        <div className="dashboard-main">
          <AIInsights />
          <SpendingChart />
          <RecentTransactions />
        </div>
        
        <div className="dashboard-sidebar">
          <BudgetOverview />
          <GoalsWidget />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
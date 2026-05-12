// src/components/dashboard/SpendingChart.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSelector } from 'react-redux';
import './SpendingChart.css';

const SpendingChart = () => {
  const { monthlyExpenses } = useSelector(state => state.finance.analytics);
  const [activeTab, setActiveTab] = useState('expenses');

  const tabs = [
    { id: 'expenses', label: 'Expenses' },
    { id: 'income', label: 'Income' },
    { id: 'savings', label: 'Savings' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass">
          <p className="tooltip-label">{payload[0].payload.month}</p>
          <p className="tooltip-value">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="spending-chart glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="chart-header">
        <h2>Spending Overview</h2>
        <div className="chart-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`chart-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyExpenses}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text-tertiary)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--text-tertiary)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-stats">
        <div className="chart-stat">
          <span className="stat-label">Average</span>
          <span className="stat-value">$4,650</span>
        </div>
        <div className="chart-stat">
          <span className="stat-label">Highest</span>
          <span className="stat-value">$5,400</span>
        </div>
        <div className="chart-stat">
          <span className="stat-label">Lowest</span>
          <span className="stat-value">$3,800</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingChart;
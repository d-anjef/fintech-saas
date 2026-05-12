import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const { categoryBreakdown, monthlyExpenses } = useSelector(state => state.finance.analytics);
  
  const totalSpent = categoryBreakdown.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip glass">
          <p className="tooltip-label">{payload[0].name || payload[0].payload.month}</p>
          <p className="tooltip-value">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div className="analytics-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Deep dive into your financial habits</p>
        </div>
        <button className="btn btn-primary">
          Download Report <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="analytics-grid">
        {/* Category Breakdown */}
        <motion.div className="analytics-card glass" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <h3>Spending by Category</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="category-legend">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="legend-item">
                <span className="legend-dot" style={{ background: cat.color }}></span>
                <span className="legend-name">{cat.name}</span>
                <span className="legend-value">${cat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div className="analytics-card glass" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3>Monthly Trends</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Prediction Card */}
        <motion.div className="analytics-card ai-prediction glass" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="ai-header">
            <span className="ai-badge">AI Prediction</span>
            <TrendingUp size={20} className="text-success" />
          </div>
          <h2>Next Month Forecast</h2>
          <p className="prediction-amount">$4,250.00</p>
          <p className="prediction-desc">Based on your last 3 months, your spending is expected to <span className="text-success">decrease by 8%</span>.</p>
          <div className="prediction-tags">
            <span className="tag"><TrendingDown size={12} /> Food & Dining</span>
            <span className="tag"><TrendingUp size={12} /> Transport</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
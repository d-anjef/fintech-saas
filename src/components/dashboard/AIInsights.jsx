// src/components/dashboard/AIInsights.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertCircle, Target } from 'lucide-react';
import './AIInsights.css';

const AIInsights = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Smart Savings Opportunity',
      description: 'You could save $234 this month by reducing dining out expenses',
      color: '#10b981',
      action: 'View Details'
    },
    {
      icon: AlertCircle,
      title: 'Budget Alert',
      description: 'You\'re approaching your shopping budget limit (80% used)',
      color: '#f59e0b',
      action: 'Adjust Budget'
    },
    {
      icon: Target,
      title: 'Goal Progress',
      description: 'You\'re on track to reach your vacation goal 2 months early!',
      color: '#6366f1',
      action: 'View Goals'
    }
  ];

  return (
    <motion.div 
      className="ai-insights glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="ai-insights-header">
        <div className="ai-insights-title">
          <Sparkles size={24} className="sparkle-icon" />
          <h2>AI Financial Insights</h2>
        </div>
        <span className="ai-badge">Powered by AI</span>
      </div>

      <div className="insights-grid">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className="insight-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="insight-icon" style={{ background: `${insight.color}20`, color: insight.color }}>
              <insight.icon size={20} />
            </div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
              <button className="insight-action" style={{ color: insight.color }}>
                {insight.action} →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIInsights;
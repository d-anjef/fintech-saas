// src/components/dashboard/BudgetOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { TrendingUp } from 'lucide-react';
import './BudgetOverview.css';

const BudgetOverview = () => {
  const budgets = useSelector(state => state.finance.budgets);

  return (
    <motion.div 
      className="budget-overview glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="budget-header">
        <h2>Budget Overview</h2>
        <TrendingUp size={20} className="header-icon" />
      </div>

      <div className="budget-list">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          const isOverBudget = percentage > 100;

          return (
            <motion.div
              key={budget.id}
              className="budget-item"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="budget-info">
                <div className="budget-category">
                  <div 
                    className="category-dot" 
                    style={{ background: budget.color }}
                  />
                  <span>{budget.category}</span>
                </div>
                <div className="budget-amounts">
                  <span className="spent">${budget.spent}</span>
                  <span className="separator">/</span>
                  <span className="allocated">${budget.allocated}</span>
                </div>
              </div>

              <div className="budget-progress">
                <div className="progress-bar">
                  <motion.div
                    className={`progress-fill ${isOverBudget ? 'over' : ''}`}
                    style={{ background: isOverBudget ? 'var(--accent-error)' : budget.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <span className={`percentage ${isOverBudget ? 'over' : ''}`}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="btn btn-secondary w-100">
        Manage Budgets
      </button>
    </motion.div>
  );
};

export default BudgetOverview;
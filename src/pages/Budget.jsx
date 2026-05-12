import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Plus, Wallet } from 'lucide-react';
import './Budget.css';

const Budget = () => {
  const budgets = useSelector(state => state.finance.budgets);
  const totalAllocated = budgets.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);

  return (
    <motion.div className="budget-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Budget Planner</h1>
          <p>Manage your monthly spending limits</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> Add Budget</button>
      </div>

      <div className="budget-summary glass">
        <div className="summary-item">
          <span className="label">Total Allocated</span>
          <span className="value">${totalAllocated.toLocaleString()}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-item">
          <span className="label">Total Spent</span>
          <span className="value text-danger">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-item">
          <span className="label">Remaining</span>
          <span className="value text-success">${(totalAllocated - totalSpent).toLocaleString()}</span>
        </div>
      </div>

      <div className="budget-grid">
        {budgets.map((budget, index) => {
          const percentage = (budget.spent / budget.allocated) * 100;
          return (
            <motion.div 
              key={budget.id} 
              className="budget-card glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="budget-card-header">
                <div className="budget-icon" style={{ background: `${budget.color}20`, color: budget.color }}>
                  <Wallet size={20} />
                </div>
                <span className="budget-percentage" style={{ color: percentage > 90 ? 'var(--accent-error)' : budget.color }}>
                  {percentage.toFixed(0)}%
                </span>
              </div>
              <h3>{budget.category}</h3>
              <div className="budget-amounts">
                <span className="spent">${budget.spent}</span>
                <span className="total"> / ${budget.allocated}</span>
              </div>
              <div className="budget-progress-bar">
                <motion.div 
                  className="progress-fill" 
                  style={{ background: percentage > 90 ? 'var(--accent-error)' : budget.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <button className="btn-text">Edit Limit</button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Budget;
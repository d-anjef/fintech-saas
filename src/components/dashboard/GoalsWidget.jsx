// src/components/dashboard/GoalsWidget.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Target, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import './GoalsWidget.css';

const GoalsWidget = () => {
  const goals = useSelector(state => state.finance.goals);

  return (
    <motion.div 
      className="goals-widget glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="goals-header">
        <h2>Savings Goals</h2>
        <Target size={20} className="header-icon" />
      </div>

      <div className="goals-list">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100;

          return (
            <motion.div
              key={goal.id}
              className="goal-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="goal-header">
                <h4>{goal.name}</h4>
                <span className="goal-percentage" style={{ color: goal.color }}>
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="goal-amounts">
                <span className="goal-current">
                  ${goal.current.toLocaleString()}
                </span>
                <span className="goal-target">
                  of ${goal.target.toLocaleString()}
                </span>
              </div>

              <div className="goal-progress">
                <motion.div
                  className="goal-progress-fill"
                  style={{ background: goal.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>

              <div className="goal-footer">
                <div className="goal-deadline">
                  <Calendar size={14} />
                  <span>{format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
                </div>
                <button className="goal-add-btn" style={{ color: goal.color }}>
                  + Add Funds
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="btn btn-primary w-100">
        Create New Goal
      </button>
    </motion.div>
  );
};

export default GoalsWidget;
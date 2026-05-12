import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Target, Plus, Calendar, ArrowUpRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './Goals.css';

const Goals = () => {
  const goals = useSelector(state => state.finance.goals);

  return (
    <motion.div className="goals-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Savings Goals</h1>
          <p>Track your progress towards financial milestones</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> New Goal</button>
      </div>

      <div className="goals-grid">
        {goals.map((goal, index) => {
          const percentage = (goal.current / goal.target) * 100;
          return (
            <motion.div 
              key={goal.id} 
              className="goal-card-large glass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="goal-top">
                <div className="goal-icon" style={{ background: `${goal.color}20`, color: goal.color }}>
                  <Target size={24} />
                </div>
                <span className="goal-status">On Track</span>
              </div>
              
              <h3>{goal.name}</h3>
              
              <div className="goal-progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-elevated)" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="40" fill="none" stroke={goal.color} strokeWidth="8" 
                    strokeLinecap="round" strokeDasharray="251.2" 
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="circle-text">
                  <span className="percentage">{percentage.toFixed(0)}%</span>
                  <span className="label">Funded</span>
                </div>
              </div>

              <div className="goal-financials">
                <div className="fin-item">
                  <span className="fin-label">Current</span>
                  <span className="fin-value">${goal.current.toLocaleString()}</span>
                </div>
                <div className="fin-item">
                  <span className="fin-label">Target</span>
                  <span className="fin-value">${goal.target.toLocaleString()}</span>
                </div>
              </div>

              <div className="goal-meta">
                <span><Calendar size={14} /> Due {formatDistanceToNow(new Date(goal.deadline), { addSuffix: true })}</span>
              </div>

              <button className="btn btn-secondary w-100" style={{ marginTop: '16px' }}>
                Add Funds <ArrowUpRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Goals;
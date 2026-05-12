// src/components/dashboard/RecentTransactions.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ArrowUpRight, ArrowDownLeft, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './RecentTransactions.css';

const RecentTransactions = () => {
  const transactions = useSelector(state => state.finance.transactions.slice(0, 5));

  return (
    <motion.div 
      className="recent-transactions glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="transactions-header">
        <h2>Recent Transactions</h2>
        <button className="btn-text">View All</button>
      </div>

      <div className="transactions-list">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            className="transaction-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01, backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className="transaction-icon">
              <span className="transaction-emoji">{transaction.icon}</span>
              <div className={`transaction-type-icon ${transaction.type}`}>
                {transaction.type === 'income' ? 
                  <ArrowDownLeft size={12} /> : 
                  <ArrowUpRight size={12} />
                }
              </div>
            </div>

            <div className="transaction-details">
              <h4>{transaction.description}</h4>
              <div className="transaction-meta">
                <span className="transaction-category">{transaction.category}</span>
                <span className="transaction-separator">•</span>
                <span className="transaction-time">
                  {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="transaction-amount">
              <span className={`amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : ''}
                ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className={`status-badge ${transaction.status}`}>
                {transaction.status}
              </span>
            </div>

            <button className="transaction-more">
              <MoreVertical size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
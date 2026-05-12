// src/pages/Transactions.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import './Transactions.css';

const Transactions = () => {
  const transactions = useSelector(state => state.finance.transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'Shopping', 'Food', 'Transport', 'Salary', 'Freelance'];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      className="transactions-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>View and manage all your transactions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Calendar size={18} />
            Last 30 days
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="transactions-filters glass">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-chip ${filterCategory === category ? 'active' : ''}`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="transactions-table glass">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'var(--bg-elevated)' }}
              >
                <td>
                  <div className="transaction-desc">
                    <span className="emoji">{transaction.icon}</span>
                    <div>
                      <div className="desc">{transaction.description}</div>
                      <div className="merchant">{transaction.merchant}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{transaction.category}</span>
                </td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : ''}
                    ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Transactions;
// src/store/financeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 45234.67,
  income: 12500.00,
  expenses: 8342.32,
  savings: 15234.00,
  transactions: [
    {
      id: 1,
      type: 'expense',
      category: 'Shopping',
      description: 'Amazon Purchase',
      amount: -234.50,
      date: new Date().toISOString(),
      status: 'completed',
      merchant: 'Amazon',
      icon: '🛍️'
    },
    {
      id: 2,
      type: 'income',
      category: 'Salary',
      description: 'Monthly Salary',
      amount: 5000.00,
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
      merchant: 'Company Inc',
      icon: '💼'
    },
    {
      id: 3,
      type: 'expense',
      category: 'Food',
      description: 'Whole Foods Market',
      amount: -87.32,
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'completed',
      merchant: 'Whole Foods',
      icon: '🍔'
    },
    {
      id: 4,
      type: 'expense',
      category: 'Transport',
      description: 'Uber Ride',
      amount: -24.50,
      date: new Date(Date.now() - 259200000).toISOString(),
      status: 'completed',
      merchant: 'Uber',
      icon: '🚗'
    },
    {
      id: 5,
      type: 'income',
      category: 'Freelance',
      description: 'Design Project',
      amount: 1500.00,
      date: new Date(Date.now() - 345600000).toISOString(),
      status: 'pending',
      merchant: 'Client XYZ',
      icon: '💻'
    }
  ],
  budgets: [
    {
      id: 1,
      category: 'Shopping',
      allocated: 1000,
      spent: 645,
      color: '#6366f1'
    },
    {
      id: 2,
      category: 'Food & Dining',
      allocated: 800,
      spent: 523,
      color: '#10b981'
    },
    {
      id: 3,
      category: 'Transport',
      allocated: 400,
      spent: 287,
      color: '#f59e0b'
    },
    {
      id: 4,
      category: 'Entertainment',
      allocated: 500,
      spent: 412,
      color: '#8b5cf6'
    }
  ],
  goals: [
    {
      id: 1,
      name: 'Emergency Fund',
      target: 10000,
      current: 6500,
      deadline: '2024-12-31',
      color: '#10b981'
    },
    {
      id: 2,
      name: 'Vacation',
      target: 5000,
      current: 2300,
      deadline: '2024-08-15',
      color: '#6366f1'
    },
    {
      id: 3,
      name: 'New Laptop',
      target: 2500,
      current: 1800,
      deadline: '2024-06-30',
      color: '#f59e0b'
    }
  ],
  cards: [
    {
      id: 1,
      name: 'Premium Card',
      last4: '4532',
      type: 'visa',
      balance: 12450.00,
      limit: 15000,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Business Card',
      last4: '8765',
      type: 'mastercard',
      balance: 8340.00,
      limit: 20000,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ],
  analytics: {
    monthlyExpenses: [
      { month: 'Jan', amount: 4200 },
      { month: 'Feb', amount: 3800 },
      { month: 'Mar', amount: 5100 },
      { month: 'Apr', amount: 4600 },
      { month: 'May', amount: 5400 },
      { month: 'Jun', amount: 4800 }
    ],
    categoryBreakdown: [
      { name: 'Shopping', value: 2400, color: '#6366f1' },
      { name: 'Food', value: 1800, color: '#10b981' },
      { name: 'Transport', value: 1200, color: '#f59e0b' },
      { name: 'Entertainment', value: 900, color: '#8b5cf6' },
      { name: 'Bills', value: 1500, color: '#ef4444' }
    ]
  }
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    updateBudget: (state, action) => {
      const budget = state.budgets.find(b => b.id === action.payload.id);
      if (budget) {
        Object.assign(budget, action.payload);
      }
    },
    updateGoal: (state, action) => {
      const goal = state.goals.find(g => g.id === action.payload.id);
      if (goal) {
        Object.assign(goal, action.payload);
      }
    }
  }
});

export const { addTransaction, updateBalance, updateBudget, updateGoal } = financeSlice.actions;
export default financeSlice.reducer;
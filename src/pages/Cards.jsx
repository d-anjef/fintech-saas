// src/pages/Cards.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { CreditCard, Lock, Eye, Plus } from 'lucide-react';
import './Cards.css';

const Cards = () => {
  const cards = useSelector(state => state.finance.cards);

  return (
    <motion.div className="cards-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>My Cards</h1>
          <p>Manage your payment cards</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add New Card
        </button>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="credit-card"
            style={{ background: card.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
          >
            <div className="card-header">
              <CreditCard size={32} />
              <div className="card-chip" />
            </div>
            <div className="card-number">
              •••• •••• •••• {card.last4}
            </div>
            <div className="card-footer">
              <div>
                <div className="card-label">Card Holder</div>
                <div className="card-value">John Doe</div>
              </div>
              <div>
                <div className="card-label">Expires</div>
                <div className="card-value">12/25</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cards;
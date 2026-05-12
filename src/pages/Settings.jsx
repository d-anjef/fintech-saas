import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Moon, Sun, Save } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { theme, toggle } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button className={`toggle-switch ${enabled ? 'active' : ''}`} onClick={onToggle}>
      <span className="toggle-knob"></span>
    </button>
  );

  return (
    <motion.div className="settings-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>
        <button className="btn btn-primary"><Save size={18} /> Save Changes</button>
      </div>

      <div className="settings-grid">
        {/* Profile Section */}
        <motion.div className="settings-card glass" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="card-title"><User size={20} /> Profile Information</div>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="John Doe" className="input-field" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="john.doe@example.com" className="input-field" />
          </div>
          <div className="form-group">
            <label>Currency</label>
            <select className="input-field">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div className="settings-card glass" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="card-title">{theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />} Appearance</div>
          <div className="setting-row">
            <div>
              <h4>Dark Mode</h4>
              <p>Switch between light and dark themes</p>
            </div>
            <ToggleSwitch enabled={theme === 'dark'} onToggle={toggle} />
          </div>
          <div className="setting-row">
            <div>
              <h4>Compact View</h4>
              <p>Reduce spacing for denser information</p>
            </div>
            <ToggleSwitch enabled={false} onToggle={() => {}} />
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div className="settings-card glass" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="card-title"><Bell size={20} /> Notifications</div>
          <div className="setting-row">
            <div>
              <h4>Push Notifications</h4>
              <p>Get alerts for transactions and goals</p>
            </div>
            <ToggleSwitch enabled={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>
          <div className="setting-row">
            <div>
              <h4>Email Reports</h4>
              <p>Weekly financial summary via email</p>
            </div>
            <ToggleSwitch enabled={true} onToggle={() => {}} />
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div className="settings-card glass" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="card-title"><Shield size={20} /> Security</div>
          <div className="setting-row">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security</p>
            </div>
            <ToggleSwitch enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} />
          </div>
          <div className="form-group" style={{ marginTop: '20px' }}>
            <button className="btn btn-secondary w-100">Change Password</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
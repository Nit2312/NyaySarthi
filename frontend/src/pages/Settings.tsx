import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  KeyIcon,
  CogIcon,
  BellIcon,
  UserIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    apiKeys: {
      indianKanoon: '',
      huggingface: ''
    },
    llmBackend: 'huggingface',
    notifications: {
      email: true,
      hearingReminders: true,
      systemUpdates: false
    },
    preferences: {
      language: 'en',
      timezone: 'Asia/Kolkata',
      resultsPerPage: 20
    }
  });

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your Nyay Sarthi experience
          </p>
        </motion.div>

        {/* API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-6">
            <KeyIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              API Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indian Kanoon API Key
              </label>
              <input
                type="password"
                value={settings.apiKeys.indianKanoon}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  apiKeys: { ...prev.apiKeys, indianKanoon: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your Indian Kanoon API key"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Required for fetching case law from Indian Kanoon database
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                HuggingFace API Key (Optional)
              </label>
              <input
                type="password"
                value={settings.apiKeys.huggingface}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  apiKeys: { ...prev.apiKeys, huggingface: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your HuggingFace API key"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                For enhanced AI model performance (optional for local models)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LLM Backend
              </label>
              <select
                value={settings.llmBackend}
                onChange={(e) => setSettings(prev => ({ ...prev, llmBackend: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                <option value="huggingface">HuggingFace Inference</option>
                <option value="local">Local Model Server</option>
              </select>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Choose between cloud-based or local AI model deployment
              </p>
            </div>
          </div>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-6">
            <UserIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Legal Professional"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Organization
              </label>
              <input
                type="text"
                placeholder="Law Firm or Company"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bar Council Registration
              </label>
              <input
                type="text"
                placeholder="Registration Number"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-6">
            <BellIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {key === 'email' ? 'Email Notifications' :
                     key === 'hearingReminders' ? 'Hearing Reminders' :
                     'System Updates'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {key === 'email' ? 'Receive notifications via email' :
                     key === 'hearingReminders' ? 'Get reminders for upcoming hearings' :
                     'Stay updated with system changes'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [key]: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-6">
            <CogIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Preferences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, language: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Results Per Page
              </label>
              <select
                value={settings.preferences.resultsPerPage}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  preferences: { ...prev.preferences, resultsPerPage: parseInt(e.target.value) }
                }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <ComputerDesktopIcon className="w-4 h-4 inline mr-1" />
                Theme
              </label>
              <button
                onClick={toggleTheme}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                  isDark
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-400'
                }`}
              >
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-primary-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Security & Privacy
            </h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Change Password
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update your account password
              </p>
            </button>

            <button className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable 2FA for enhanced security
              </p>
            </button>

            <button className="w-full text-left p-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Data Export
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download your data and search history
              </p>
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-end space-x-4"
        >
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Reset to Defaults
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            Save Settings
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Settings;
import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Analyze legal documents with AI',
      icon: DocumentArrowUpIcon,
      href: '/upload',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Ask Assistant',
      description: 'Get instant legal insights',
      icon: ChatBubbleLeftRightIcon,
      href: '/chat',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Find Precedents',
      description: 'Search case law database',
      icon: MagnifyingGlassIcon,
      href: '/precedent',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Track Cases',
      description: 'Monitor case progress',
      icon: ClipboardDocumentListIcon,
      href: '/cases',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const recentActivity = [
    {
      title: 'Contract Analysis Completed',
      description: 'Employment agreement reviewed',
      time: '2 hours ago',
      type: 'analysis'
    },
    {
      title: 'Precedent Found',
      description: 'Similar case from Delhi High Court',
      time: '4 hours ago',
      type: 'search'
    },
    {
      title: 'Document Uploaded',
      description: 'Lease agreement processed',
      time: '1 day ago',
      type: 'upload'
    },
  ];

  const stats = [
    { label: 'Documents Analyzed', value: '247', change: '+12%' },
    { label: 'Queries Resolved', value: '1,834', change: '+8%' },
    { label: 'Precedents Found', value: '156', change: '+23%' },
    { label: 'Time Saved', value: '48h', change: '+15%' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your legal research today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <ChartBarIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link
                  to={action.href}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'analysis' ? 'bg-blue-500' :
                      activity.type === 'search' ? 'bg-green-500' : 'bg-purple-500'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Insights
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
            >
              <h3 className="font-semibold mb-2">Top Trending</h3>
              <p className="text-sm opacity-90 mb-4">
                Contract disputes are up 15% this month. Review our latest precedent analysis.
              </p>
              <button className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
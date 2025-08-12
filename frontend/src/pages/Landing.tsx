import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScaleIcon, 
  DocumentTextIcon, 
  MagnifyingGlassIcon, 
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoginModal from '../components/LoginModal';

const Landing: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: DocumentTextIcon,
      title: 'Document Analysis',
      description: 'Upload and analyze legal documents with AI-powered insights and summaries.',
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Precedent Search',
      description: 'Find relevant case laws and precedents from comprehensive Indian legal databases.',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'AI Legal Assistant',
      description: 'Get instant answers to legal questions with contextual citations and references.',
    },
  ];

  const stats = [
    { label: 'Pending Cases', value: '4.7M+', icon: ClockIcon },
    { label: 'Legal Documents', value: '500K+', icon: DocumentTextIcon },
    { label: 'Active Users', value: '25K+', icon: UserGroupIcon },
    { label: 'Accuracy Rate', value: '95%+', icon: ShieldCheckIcon },
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Documents',
      description: 'Upload your legal documents or search our extensive database of Indian case laws.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes the content and finds relevant precedents and insights.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'Receive comprehensive analysis, summaries, and actionable legal insights.',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <ScaleIcon className="h-10 w-10 text-primary-600" />
              <motion.div
                className="absolute inset-0 bg-primary-600 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Nyay Sarthi
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            {user ? (
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Go to Dashboard
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </motion.button>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300 mb-6"
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                AI-Powered Legal Research Platform
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your AI Legal
                <span className="block bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                  Assistant
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Harness the power of AI to research Indian law, analyze legal documents, and find relevant precedents with unprecedented speed and accuracy.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLoginModal(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Indian Supreme Court"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-semibold mb-2">
                    Supreme Court of India
                  </p>
                  <p className="text-gray-200 text-sm">
                    Accessing comprehensive legal knowledge powered by AI
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI Analysis Active
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-4 shadow-xl text-white"
              >
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-90">Accuracy Rate</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500 rounded-full opacity-10 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Legal Professionals Across India
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Making legal research faster, smarter, and more accessible
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to streamline your legal research workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Nyay Sarthi Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple steps to powerful legal insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <div className="w-full h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600" />
                    <ArrowRightIcon className="w-6 h-6 text-gray-400 absolute top-1/2 right-4 transform -translate-y-1/2" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Legal Research?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of legal professionals who trust Nyay Sarthi for accurate, fast, and comprehensive legal insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <ScaleIcon className="h-8 w-8 text-primary-400" />
            <span className="text-2xl font-bold">Nyay Sarthi</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering legal professionals with AI-driven insights and research tools.
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-500">
              © 2024 Nyay Sarthi. All rights reserved. | 
              <span className="text-accent-400 font-medium ml-2">
                Information provided is for reference only and does not constitute legal advice.
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
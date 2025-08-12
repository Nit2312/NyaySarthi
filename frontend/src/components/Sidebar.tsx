import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
  CogIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';



const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Chat Assistant', href: '/chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Upload Documents', href: '/upload', icon: DocumentArrowUpIcon },
    { name: 'Precedent Finder', href: '/precedent', icon: MagnifyingGlassIcon },
    ...(user?.role === 'admin' ? [{ name: 'Settings', href: '/settings', icon: CogIcon }] : []),
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4 mb-8">
            <ScaleIcon className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Nyay Sarthi
            </h1>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`}
                  />
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="ml-auto w-1 h-6 bg-primary-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
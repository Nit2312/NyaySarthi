import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ScaleIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import Layout from '../components/Layout';

interface Precedent {
  id: string;
  title: string;
  court: string;
  date: string;
  citation: string;
  summary: string;
  keyPoints: string[];
  similarity: number;
  url?: string;
  tags: string[];
  isFavorite?: boolean;
  relevance: string;
  howItHelps: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PrecedentFinder: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your legal assistant. Please describe your case or legal issue, and I'll help you find relevant precedents and case law that can support your argument.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [precedents, setPrecedents] = useState<Precedent[]>([]);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockPrecedents: Precedent[] = [
    {
      id: '1',
      title: 'Kesavananda Bharati v. State of Kerala',
      court: 'Supreme Court of India',
      date: '1973-04-24',
      citation: 'AIR 1973 SC 1461',
      summary: 'Landmark case establishing the basic structure doctrine of the Indian Constitution. The court held that while Parliament has wide powers to amend the Constitution, it cannot destroy its basic structure.',
      keyPoints: [
        'Basic structure doctrine established',
        'Limits on parliamentary power to amend Constitution',
        'Judicial review of constitutional amendments'
      ],
      similarity: 0.95,
      url: 'https://indiankanoon.org/doc/257876/',
      tags: ['Constitutional Law', 'Basic Structure', 'Judicial Review'],
      isFavorite: true,
      relevance: 'This case is highly relevant as it establishes fundamental principles about constitutional limitations and judicial review.',
      howItHelps: 'You can use this precedent to argue that certain constitutional amendments may be subject to judicial review if they violate the basic structure of the Constitution.'
    },
    {
      id: '2',
      title: 'Mohini Jain v. State of Karnataka',
      court: 'Supreme Court of India',
      date: '1992-07-30',
      citation: 'AIR 1992 SC 1858',
      summary: 'Established right to education as a fundamental right under Article 21. The court held that right to education flows from right to life.',
      keyPoints: [
        'Right to education as fundamental right',
        'Article 21 interpretation',
        'Capitation fee prohibition'
      ],
      similarity: 0.87,
      url: 'https://indiankanoon.org/doc/1775396/',
      tags: ['Right to Education', 'Article 21', 'Fundamental Rights'],
      relevance: 'This case is relevant for education-related legal issues and fundamental rights arguments.',
      howItHelps: 'You can cite this case when arguing for educational rights or when dealing with issues related to Article 21 of the Constitution.'
    },
    {
      id: '3',
      title: 'Vishaka v. State of Rajasthan',
      court: 'Supreme Court of India',
      date: '1997-08-13',
      citation: 'AIR 1997 SC 3011',
      summary: 'Landmark judgment on sexual harassment at workplace. Laid down guidelines for prevention of sexual harassment in absence of specific legislation.',
      keyPoints: [
        'Sexual harassment guidelines',
        'Workplace safety for women',
        'International law application'
      ],
      similarity: 0.82,
      url: 'https://indiankanoon.org/doc/1031794/',
      tags: ['Women Rights', 'Workplace Safety', 'Sexual Harassment'],
      relevance: 'This precedent is relevant for workplace harassment cases and women\'s rights issues.',
      howItHelps: 'You can use this case to establish guidelines and principles for handling workplace harassment cases.'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've analyzed your case description. Here are the most relevant precedents that could help strengthen your legal argument:`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setPrecedents(mockPrecedents);
      setShowResults(true);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePrecedentClick = (precedent: Precedent) => {
    navigate(`/precedent/${precedent.id}`, { state: { precedent } });
  };

  const toggleFavorite = (id: string) => {
    setPrecedents(prev => 
      prev.map(result => 
        result.id === id ? { ...result, isFavorite: !result.isFavorite } : result
      )
    );
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (similarity >= 0.8) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
  };

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Precedent Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Describe your case and get AI-powered legal precedent recommendations
          </p>
        </motion.div>

        <div className="flex-1 flex gap-6">
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'assistant' && (
                          <SparklesIcon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="w-5 h-5 text-primary-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your case, legal issue, or question..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    rows={3}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>Send</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-96 space-y-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <LightBulbIcon className="w-5 h-5 mr-2 text-primary-600" />
                  Relevant Precedents
                </h3>
                
                <div className="space-y-4">
                  {precedents.map((precedent, index) => (
                    <motion.div
                      key={precedent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handlePrecedentClick(precedent)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                          {precedent.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(precedent.id);
                          }}
                          className="text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                          {precedent.isFavorite ? (
                            <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <StarIcon className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSimilarityColor(precedent.similarity)}`}>
                          {Math.round(precedent.similarity * 100)}% match
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {precedent.court}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {precedent.summary}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PrecedentFinder;
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaperAirplaneIcon,
  DocumentTextIcon,
  LinkIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{
    id: string;
    title: string;
    excerpt: string;
    url?: string;
    score: number;
  }>;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI legal assistant. I can help you with Indian law queries, document analysis, case precedents, and legal research. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
        sources: [
          {
            id: '1',
            title: 'Indian Contract Act, 1872 - Section 10',
            excerpt: 'All agreements are contracts if they are made by the free consent of parties competent to contract...',
            url: 'https://indiankanoon.org/doc/1953529/',
            score: 0.95
          },
          {
            id: '2',
            title: 'Carlill v Carbolic Smoke Ball Co. (1893)',
            excerpt: 'The court held that an advertisement can constitute an offer if it shows clear intent to be bound...',
            url: 'https://indiankanoon.org/doc/example',
            score: 0.87
          }
        ]
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('contract')) {
      return `Based on Indian Contract Law, specifically the Indian Contract Act, 1872, a valid contract requires several essential elements:

1. **Offer and Acceptance** - There must be a clear offer by one party and acceptance by another
2. **Consideration** - Each party must provide something of value
3. **Capacity to Contract** - Both parties must be legally competent
4. **Free Consent** - Agreement must be without coercion, fraud, or mistake
5. **Lawful Object** - The purpose must be legal

The Indian Contract Act governs most contractual relationships in India, with exceptions for specialized contracts like those related to negotiable instruments, insurance, etc.

Would you like me to elaborate on any specific aspect of contract law?`;
    }
    
    if (lowerQuery.includes('property') || lowerQuery.includes('real estate')) {
      return `Regarding property law in India, the legal framework is primarily governed by:

1. **Transfer of Property Act, 1882** - Governs transfer of immovable property
2. **Registration Act, 1908** - Mandates registration of property documents
3. **Indian Stamp Act, 1899** - Prescribes stamp duty on property transactions

Key points for property transactions:
- All property sales above ₹100 must be registered
- Title verification is crucial before purchase
- RERA (Real Estate Regulation Act) protects homebuyers
- Property documents must be properly stamped

For specific property disputes, courts often refer to landmark cases and local municipal laws.`;
    }
    
    return `Thank you for your question. Based on Indian legal framework, I can provide comprehensive analysis of your query. However, I'd need more specific details to give you the most relevant legal insights.

Please note that this information is for educational purposes only and does not constitute legal advice. For specific legal matters, please consult with a qualified legal practitioner.

How can I help you further with your legal research?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestionQuestions = [
    "What are the essential elements of a valid contract under Indian law?",
    "How does the Indian Evidence Act apply in civil cases?",
    "What are the recent amendments to the IT Act 2000?",
    "Explain the concept of anticipatory bail under CrPC"
  ];

  return (
    <Layout>
      <div className="flex h-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Chat Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Legal Assistant
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Get instant answers to your legal questions with citations
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-3xl rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white ml-12'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white mr-12'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.sources && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold opacity-75">Sources:</p>
                        {message.sources.map((source) => (
                          <motion.div
                            key={source.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-3 text-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium mb-1">{source.title}</p>
                                <p className="opacity-75 text-xs mb-2">{source.excerpt}</p>
                                {source.url && (
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs opacity-75 hover:opacity-100 transition-opacity"
                                  >
                                    <LinkIcon className="w-3 h-3 mr-1" />
                                    View Source
                                  </a>
                                )}
                              </div>
                              <div className="text-xs opacity-50">
                                {Math.round(source.score * 100)}%
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 mr-12">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Try asking:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestionQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="text-left text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything about Indian law..."
                  className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-600 p-4 pr-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Context Panel */}
        <div className="w-80 ml-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Context & Sources
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Active Context
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Indian Contract Act, Constitutional Law, Evidence Act
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Relevant Documents
                </h3>
                <div className="space-y-2">
                  {[
                    { title: 'Indian Contract Act 1872', type: 'Act' },
                    { title: 'Constitution of India', type: 'Constitution' },
                    { title: 'Code of Civil Procedure', type: 'Procedure' }
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {doc.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <ClipboardDocumentIcon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Add Document</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;
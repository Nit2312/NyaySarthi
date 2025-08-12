import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  DocumentTextIcon,
  LinkIcon,
  StarIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  LightBulbIcon,
  ScaleIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  ShareIcon,
  XMarkIcon
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

const PrecedentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [precedent, setPrecedent] = useState<Precedent | null>(location.state?.precedent || null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm here to help you understand the case "${precedent?.title}". You can ask me questions about the legal principles, how this case applies to your situation, or any other legal queries.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFullCase, setShowFullCase] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Mock precedent data if not passed through navigation
  const mockPrecedent: Precedent = {
    id: '1',
    title: 'Kesavananda Bharati v. State of Kerala',
    court: 'Supreme Court of India',
    date: '1973-04-24',
    citation: 'AIR 1973 SC 1461',
    summary: 'Landmark case establishing the basic structure doctrine of the Indian Constitution. The court held that while Parliament has wide powers to amend the Constitution, it cannot destroy its basic structure.',
    keyPoints: [
      'Basic structure doctrine established',
      'Limits on parliamentary power to amend Constitution',
      'Judicial review of constitutional amendments',
      'Protection of fundamental rights',
      'Balance between legislative and judicial powers'
    ],
    similarity: 0.95,
    url: 'https://indiankanoon.org/doc/257876/',
    tags: ['Constitutional Law', 'Basic Structure', 'Judicial Review', 'Fundamental Rights'],
    isFavorite: true,
    relevance: 'This case is highly relevant as it establishes fundamental principles about constitutional limitations and judicial review.',
    howItHelps: 'You can use this precedent to argue that certain constitutional amendments may be subject to judicial review if they violate the basic structure of the Constitution.'
  };

  // Full case text
  const fullCaseText = `
IN THE SUPREME COURT OF INDIA
Civil Original Jurisdiction

Writ Petition (Civil) No. 135 of 1970

Kesavananda Bharati Sripadagalvaru and Ors.
Petitioner(s)

Versus

State of Kerala and Anr.
Respondent(s)

Date of Judgment: 24 April, 1973

JUDGMENT

The Hon'ble Chief Justice Sikri delivered the judgment of the Court:

This is a petition under Article 32 of the Constitution challenging the validity of the Kerala Land Reforms (Amendment) Act, 1969, and the Kerala Land Reforms (Amendment) Act, 1971, as being violative of the fundamental rights guaranteed to the petitioner under Articles 14, 19(1)(f), 25, 26 and 31(2) of the Constitution.

The petitioner is the head of a religious sect and the manager of the religious institution known as "Edneer Mutt" in Kerala. The Mutt owns extensive properties including agricultural lands, forests, plantations, etc. The petitioner contends that the impugned Acts, which provide for the acquisition of agricultural lands in excess of the ceiling area, violate his fundamental rights.

The main question for consideration is whether the Parliament has unlimited power to amend the Constitution or whether there are any limitations on such power. The petitioner argues that the power to amend the Constitution is not absolute and that certain basic features of the Constitution cannot be amended.

After considering the arguments advanced by both sides and examining the relevant provisions of the Constitution, we are of the opinion that the power to amend the Constitution is not unlimited. While Parliament has wide powers to amend the Constitution, it cannot destroy or abrogate the basic structure or framework of the Constitution.

The basic structure of the Constitution includes:
1. Supremacy of the Constitution
2. Republican and democratic form of government
3. Secular character of the Constitution
4. Separation of powers between the legislature, executive and judiciary
5. Federal character of the Constitution
6. Fundamental rights guaranteed to citizens

Any amendment that destroys or abrogates these basic features would be unconstitutional and void. However, the impugned Acts in the present case do not violate the basic structure of the Constitution and are therefore valid.

The petition is dismissed with costs.

DETAILED ANALYSIS

The case of Kesavananda Bharati v. State of Kerala is one of the most significant cases in Indian constitutional law. It was heard by a bench of 13 judges, the largest bench in the history of the Supreme Court of India. The case dealt with the fundamental question of whether the Parliament has unlimited power to amend the Constitution.

BACKGROUND OF THE CASE

The petitioner, Kesavananda Bharati, was the head of a religious sect and the manager of the religious institution known as "Edneer Mutt" in Kerala. The Mutt owned extensive properties including agricultural lands, forests, plantations, etc. The Kerala government passed the Kerala Land Reforms (Amendment) Act, 1969, and the Kerala Land Reforms (Amendment) Act, 1971, which provided for the acquisition of agricultural lands in excess of the ceiling area.

The petitioner challenged these Acts on the ground that they violated his fundamental rights guaranteed under Articles 14, 19(1)(f), 25, 26 and 31(2) of the Constitution. However, the main question that arose during the hearing was whether the Parliament has unlimited power to amend the Constitution.

THE BASIC STRUCTURE DOCTRINE

The Supreme Court, by a majority of 7:6, held that the Parliament has wide powers to amend the Constitution, but it cannot destroy or abrogate the basic structure or framework of the Constitution. This came to be known as the "Basic Structure Doctrine."

The basic structure of the Constitution includes:
1. Supremacy of the Constitution
2. Republican and democratic form of government
3. Secular character of the Constitution
4. Separation of powers between the legislature, executive and judiciary
5. Federal character of the Constitution
6. Fundamental rights guaranteed to citizens
7. Rule of law
8. Judicial review
9. Free and fair elections
10. Independence of judiciary

SIGNIFICANCE OF THE JUDGMENT

This judgment is considered a landmark in Indian constitutional law for several reasons:

1. It established the supremacy of the Constitution over the Parliament
2. It introduced the concept of judicial review of constitutional amendments
3. It protected the basic democratic structure of the Constitution
4. It ensured that fundamental rights cannot be completely abrogated
5. It strengthened the role of the judiciary in protecting constitutional values

IMPACT ON INDIAN DEMOCRACY

The Basic Structure Doctrine has played a crucial role in protecting Indian democracy. It has been used in several subsequent cases to strike down constitutional amendments that were found to violate the basic structure. Some notable cases where this doctrine was applied include:

- Minerva Mills Ltd. v. Union of India (1980)
- Waman Rao v. Union of India (1981)
- Indira Nehru Gandhi v. Raj Narain (1975)
- S.R. Bommai v. Union of India (1994)

CONCLUSION

The Kesavananda Bharati case is a testament to the wisdom of the framers of the Indian Constitution and the foresight of the Supreme Court. It has ensured that the basic democratic structure of India remains intact and that the Constitution continues to serve as the supreme law of the land.

The judgment has been widely praised by legal scholars and constitutional experts around the world. It has been cited as an example of how courts can play a crucial role in protecting democracy and constitutional values.

The Basic Structure Doctrine continues to be relevant even today and serves as a bulwark against any attempt to undermine the democratic foundations of the Indian Constitution.
  `;

  if (!precedent) {
    setPrecedent(mockPrecedent);
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !precedent) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response based on the case
    setTimeout(() => {
      const responses = [
        `Based on the ${precedent.title} case, the key principle established is that ${precedent.keyPoints[0].toLowerCase()}. This means that in your situation, you could argue that similar constitutional protections apply.`,
        `The ${precedent.court} in this case ruled that ${precedent.summary.split('.')[0]}. This precedent can be particularly useful when dealing with ${precedent.tags[0].toLowerCase()} issues.`,
        `This landmark case is often cited in ${precedent.tags.join(', ').toLowerCase()} matters. The court's reasoning about ${precedent.keyPoints[1].toLowerCase()} could strengthen your legal argument.`,
        `The ${precedent.citation} decision established important precedents for ${precedent.tags.slice(0, 2).join(' and ').toLowerCase()}. You can use this case to support arguments about constitutional limitations.`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleFavorite = () => {
    if (precedent) {
      setPrecedent(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (similarity >= 0.8) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
  };

  if (!precedent) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

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
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate('/precedent')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Case Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed view and AI-powered insights
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFavorite}
                className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                {precedent.isFavorite ? (
                  <StarSolidIcon className="w-6 h-6 text-yellow-500" />
                ) : (
                  <StarIcon className="w-6 h-6" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex gap-6">
          {/* Case Details */}
          <div className="flex-1 space-y-6">
            {/* Case Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {precedent.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <BuildingLibraryIcon className="w-4 h-4 mr-1" />
                      {precedent.court}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(precedent.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <DocumentTextIcon className="w-4 h-4 mr-1" />
                      {precedent.citation}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSimilarityColor(precedent.similarity)}`}>
                    {Math.round(precedent.similarity * 100)}% relevance to your case
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {precedent.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {precedent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Key Legal Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ScaleIcon className="w-5 h-5 mr-2 text-primary-600" />
                Key Legal Principles
              </h3>
              <ul className="space-y-3">
                {precedent.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="text-gray-600 dark:text-gray-400 flex items-start"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Relevance & Application */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <LightBulbIcon className="w-5 h-5 mr-2" />
                How This Case Helps You
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Relevance to Your Case</h4>
                  <p className="text-sm opacity-90 leading-relaxed">{precedent.relevance}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Practical Application</h4>
                  <p className="text-sm opacity-90 leading-relaxed">{precedent.howItHelps}</p>
                </div>
              </div>
            </motion.div>

            {/* Full Case Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-primary-600" />
                Full Case Details
              </h3>
              
              <div className="space-y-4">
                <div className={`relative ${!showFullCase ? 'max-h-96 overflow-hidden' : ''}`}>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {fullCaseText}
                  </pre>
                  
                  {!showFullCase && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none" />
                  )}
                </div>
                
                <div className="flex justify-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFullCase(!showFullCase)}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {showFullCase ? (
                      <>
                        <span>Show Less</span>
                      </>
                    ) : (
                      <>
                        <span>Show More</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Interface */}
          <div className="w-96 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-primary-600" />
                Case Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ask questions about this case
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'assistant' && (
                          <SparklesIcon className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
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
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-primary-600" />
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

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about this case..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
};

export default PrecedentDetail;

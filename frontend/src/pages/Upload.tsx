import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  summary?: string;
  keyTerms?: string[];
  metadata?: {
    court?: string;
    date?: string;
    caseNumber?: string;
    jurisdiction?: string;
  };
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles(prev => 
          prev.map(f => f.id === file.id ? { ...f, status: 'processing' } : f)
        );

        setTimeout(() => {
          setFiles(prev => 
            prev.map(f => f.id === file.id ? {
              ...f,
              status: 'completed',
              summary: `This document appears to be a ${getDocumentType(file.name)} containing provisions related to contract law, property rights, and legal obligations. The document references several sections of the Indian Contract Act and includes clauses for dispute resolution.`,
              keyTerms: ['Contract Law', 'Article 19', 'Section 10', 'Due Process', 'Property Rights'],
              metadata: {
                court: 'Delhi High Court',
                date: '2024-01-15',
                caseNumber: 'CS(COMM) 123/2024',
                jurisdiction: 'Delhi'
              }
            } : f)
          );
        }, 2000);
      }, 1000);
    });
  }, []);

  const getDocumentType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'legal document';
      case 'docx': case 'doc': return 'contract or agreement';
      case 'txt': return 'legal brief';
      default: return 'document';
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return (
          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        );
    }
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  };

  return (
    <Layout>
      <div className="grid lg:grid-cols-3 gap-8 h-full">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Upload & Analyze Documents
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload legal documents for AI-powered analysis and insights
            </p>
          </motion.div>

          {/* Drag & Drop Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            {...getRootProps()}
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ scale: isDragActive ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isDragActive ? 'Drop files here' : 'Upload your documents'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag & drop files here, or click to browse
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Supports PDF, DOC, DOCX, TXT (up to 10MB each)
              </div>
            </motion.div>
          </motion.div>

          {/* File List */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Uploaded Files ({files.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <DocumentTextIcon className="w-10 h-10 text-primary-600" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                            {file.status === 'processing' && (
                              <p className="text-xs text-primary-600 dark:text-primary-400">
                                Analyzing document...
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusIcon(file.status)}
                          
                          {file.status === 'completed' && (
                            <button
                              onClick={() => setSelectedFile(file)}
                              className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {file.keyTerms && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {file.keyTerms.slice(0, 3).map((term, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                            >
                              <TagIcon className="w-3 h-3 mr-1" />
                              {term}
                            </span>
                          ))}
                          {file.keyTerms.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{file.keyTerms.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Document Analysis
            </h2>
            
            {selectedFile ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {selectedFile.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Summary
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedFile.summary}
                  </p>
                </div>

                {selectedFile.keyTerms && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Key Legal Terms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFile.keyTerms.map((term, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFile.metadata && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Metadata
                    </h4>
                    <div className="space-y-2">
                      {selectedFile.metadata.court && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Court:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {selectedFile.metadata.court}
                          </span>
                        </div>
                      )}
                      {selectedFile.metadata.date && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {selectedFile.metadata.date}
                          </span>
                        </div>
                      )}
                      {selectedFile.metadata.caseNumber && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Case No:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {selectedFile.metadata.caseNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Add to Knowledge Base
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Select a completed file to view analysis
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
          >
            <h3 className="font-semibold mb-4">Processing Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90">Documents Processed:</span>
                <span className="font-semibold">{files.filter(f => f.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Total Size:</span>
                <span className="font-semibold">
                  {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Processing:</span>
                <span className="font-semibold">{files.filter(f => f.status !== 'completed').length}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
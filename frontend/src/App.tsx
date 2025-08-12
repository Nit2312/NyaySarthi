import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import Upload from './pages/Upload';
import PrecedentFinder from './pages/PrecedentFinder';
import PrecedentDetail from './pages/PrecedentDetail';

import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-500">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatAssistant />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/precedent" 
                element={
                  <ProtectedRoute>
                    <PrecedentFinder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/precedent/:id" 
                element={
                  <ProtectedRoute>
                    <PrecedentDetail />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/settings" 
                element={
                  <AdminRoute>
                    <Settings />
                  </AdminRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
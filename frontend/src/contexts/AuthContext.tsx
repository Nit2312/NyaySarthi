import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock admin credentials for demo
      if (email === 'admin@nyaysarthi.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-1',
          email: 'admin@nyaysarthi.com',
          name: 'System Administrator',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          role: 'admin' as const
        };
        setUser(adminUser);
        localStorage.setItem('token', 'admin-jwt-token');
        return;
      }
      
      // Mock regular user login
      if (email === 'user@example.com' && password === 'password') {
        const regularUser = {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Legal Professional',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          role: 'user' as const
        };
        setUser(regularUser);
        localStorage.setItem('token', 'user-jwt-token');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const loginWithGoogle = async () => {
    // Mock Google login for demo
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      name: 'Legal Professional',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'user' as const
    };
    setUser(mockUser);
    localStorage.setItem('token', 'mock-jwt-token');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
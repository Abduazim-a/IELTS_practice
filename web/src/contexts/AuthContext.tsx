import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface User {
  phoneNumber: string;
  name?: string;
  surname?: string;
  photoURL?: string;
  isAdmin: boolean;
  deviceCount: number;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phoneNumber: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
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
    const storedUser = localStorage.getItem('ielts_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Check if phone number exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', phoneNumber));
      
      if (!userDoc.exists()) {
        return false;
      }

      const userData = userDoc.data() as User;
      
      // Check device limit (this would normally be handled by Cloud Function)
      if (userData.deviceCount >= 3) {
        alert('Device limit reached. Please contact admin.');
        return false;
      }

      // For MVP, we'll simulate device registration
      const currentUser = {
        ...userData,
        phoneNumber
      };

      setUser(currentUser);
      localStorage.setItem('ielts_user', JSON.stringify(currentUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ielts_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('ielts_user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
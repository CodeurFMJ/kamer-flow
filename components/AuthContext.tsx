import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('kamerflow_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string) => {
    const usersStr = localStorage.getItem('kamerflow_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    // Simple logic: check if user exists and match password (stored in plain text for this demo only)
    const foundUser = users.find((u: any) => u.email === email && u.password === pass);
    
    if (foundUser) {
      const { password, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem('kamerflow_current_user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, pass: string) => {
    const usersStr = localStorage.getItem('kamerflow_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = { id: uuidv4(), name, email, password: pass }; // Note: hashing needed in prod
    users.push(newUser);
    localStorage.setItem('kamerflow_users', JSON.stringify(users));
    
    // Auto login
    const { password, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('kamerflow_current_user', JSON.stringify(safeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kamerflow_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

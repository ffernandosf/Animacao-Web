import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import users from '../data/db.json';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = authService.getToken();
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        
        if (token && userData) {
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Busca usuários do localStorage e do db.json
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const allUsers = [...users.users, ...storedUsers];
      
      const user = allUsers.find(u => u.username === username && u.password === password);
      
      if (user) {
        // Gera um token simulado (em produção viria do backend)
        const token = btoa(`${user.username}:${Date.now()}`);
        
        // Salva o token e dados do usuário
        authService.setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setCurrentUser(user);
        return { success: true, user };
      } else {
        setError('Usuário ou senha inválidos');
        return { success: false, error: 'Usuário ou senha inválidos' };
      }
    } catch (err) {
      setError('Erro ao fazer login');
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.removeToken();
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Pega usuários do localStorage ou usa os padrão do db.json
      const storedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users.users));
      
      // Verifica se username já existe
      const userExists = storedUsers.find(u => u.username === userData.username);
      if (userExists) {
        setError('Nome de usuário já existe!');
        return { success: false, error: 'Nome de usuário já existe!' };
      }

      // Cria novo usuário
      const newUser = {
        id: storedUsers.length + 1,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: 'User'
      };

      // Salva no localStorage
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return { success: true };
    } catch (err) {
      setError('Erro ao criar usuário');
      return { success: false, error: 'Erro ao criar usuário' };
    } finally {
      setLoading(false);
    }
  };

  // Value object with all the context data and functions
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
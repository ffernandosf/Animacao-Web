import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/api';

// Create the context
const ApiContext = createContext();

// Custom hook to use the API context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

// Provider component
export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Users functions
  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUsers();
      
      // Adiciona usuários criados localmente
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const allUsers = [...data, ...localUsers];
      
      return allUsers;
    } catch (err) {
      setError('Erro ao carregar usuários');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verifica se é um usuário local
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const localUser = localUsers.find(u => u.id === parseInt(id) || u.id === id);
      
      if (localUser) {
        return localUser;
      }
      
      // Se não for local, busca na API
      const data = await apiService.getUserById(id);
      return data;
    } catch (err) {
      setError('Usuário não encontrado!');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Para usuários locais, geramos um ID único
      if (!userData.id) {
        const timestamp = new Date().getTime();
        userData.id = `local_${timestamp}`;
      }
      
      // Salva no localStorage
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      localUsers.push(userData);
      localStorage.setItem('newUsers', JSON.stringify(localUsers));
      
      // Também chama a API para simular o comportamento real
      await apiService.createUser(userData);
      
      return userData;
    } catch (err) {
      setError('Erro ao criar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verifica se é usuário local ou da API
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const isLocalUser = localUsers.some(u => u.id === id);
      
      if (isLocalUser) {
        // Atualiza usuário local
        const updatedLocalUsers = localUsers.map(u => 
          u.id === id ? { ...u, ...userData } : u
        );
        localStorage.setItem('newUsers', JSON.stringify(updatedLocalUsers));
        return { ...userData, id };
      } else {
        // Chama API para usuários originais
        const data = await apiService.updateUser(id, userData);
        return data;
      }
    } catch (err) {
      setError('Erro ao atualizar usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verifica se é usuário local ou da API
      const localUsers = JSON.parse(localStorage.getItem('newUsers') || '[]');
      const isLocalUser = localUsers.some(u => u.id === id);
      
      if (isLocalUser) {
        // Remove usuário local
        const updatedLocalUsers = localUsers.filter(u => u.id !== id);
        localStorage.setItem('newUsers', JSON.stringify(updatedLocalUsers));
      } else {
        // Chama API para usuários originais
        await apiService.deleteUser(id);
      }
      
      return { success: true };
    } catch (err) {
      setError('Erro ao excluir usuário');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Value object with all the context data and functions
  const value = {
    loading,
    error,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
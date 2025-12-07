import { describe, it, expect, vi } from 'vitest';

// Dados mockados simples
const mockUsers = [
  { id: 1, name: 'Admin', username: 'admin', password: '1234', role: 'Admin' },
  { id: 2, name: 'User', username: 'user', password: '123456', role: 'User' }
];

const mockApiUsers = [
  { id: 1, name: 'John Doe', email: 'john@test.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Doe', email: 'jane@test.com', phone: '098-765-4321' }
];

describe('Testes com Dados Mockados', () => {
  it('deve validar estrutura dos usuários locais', () => {
    expect(mockUsers).toHaveLength(2);
    expect(mockUsers[0]).toHaveProperty('username', 'admin');
    expect(mockUsers[0]).toHaveProperty('password', '1234');
    expect(mockUsers[1]).toHaveProperty('role', 'User');
  });

  it('deve validar estrutura dos usuários da API', () => {
    expect(mockApiUsers).toHaveLength(2);
    expect(mockApiUsers[0]).toHaveProperty('name', 'John Doe');
    expect(mockApiUsers[0]).toHaveProperty('email', 'john@test.com');
    expect(mockApiUsers[1]).toHaveProperty('phone', '098-765-4321');
  });

  it('deve simular busca de usuário por username', () => {
    const findUser = (username) => mockUsers.find(u => u.username === username);
    
    const admin = findUser('admin');
    const user = findUser('user');
    const notFound = findUser('inexistente');
    
    expect(admin).toBeDefined();
    expect(admin.role).toBe('Admin');
    expect(user).toBeDefined();
    expect(user.role).toBe('User');
    expect(notFound).toBeUndefined();
  });

  it('deve simular validação de login', () => {
    const validateLogin = (username, password) => {
      const user = mockUsers.find(u => u.username === username && u.password === password);
      return user ? { success: true, user } : { success: false, error: 'Credenciais inválidas' };
    };
    
    const validLogin = validateLogin('admin', '1234');
    const invalidLogin = validateLogin('admin', 'wrong');
    
    expect(validLogin.success).toBe(true);
    expect(validLogin.user.username).toBe('admin');
    expect(invalidLogin.success).toBe(false);
    expect(invalidLogin.error).toBe('Credenciais inválidas');
  });

  it('deve simular criação de novo usuário', () => {
    const createUser = (userData) => {
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: 'User'
      };
      return newUser;
    };
    
    const newUser = createUser({
      name: 'Novo Usuario',
      username: 'novousuario',
      password: '123456',
      email: 'novo@test.com'
    });
    
    expect(newUser.id).toBe(3);
    expect(newUser.name).toBe('Novo Usuario');
    expect(newUser.role).toBe('User');
  });

  it('deve simular operações da API', () => {
    const apiOperations = {
      getUsers: () => Promise.resolve(mockApiUsers),
      getUserById: (id) => {
        const user = mockApiUsers.find(u => u.id === id);
        return user ? Promise.resolve(user) : Promise.reject(new Error('User not found'));
      },
      createUser: (userData) => Promise.resolve({ id: 3, ...userData })
    };
    
    // Teste síncrono das funções
    expect(typeof apiOperations.getUsers).toBe('function');
    expect(typeof apiOperations.getUserById).toBe('function');
    expect(typeof apiOperations.createUser).toBe('function');
  });
});
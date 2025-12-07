import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { apiService } from '../services/api';
import { mockApiUsers } from './mockData';

// Mock do apiService
vi.mock('../services/api', () => ({
  apiService: {
    getUsers: vi.fn()
  }
}));

// Mock do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  it('deve mostrar loading inicialmente', () => {
    apiService.getUsers.mockImplementation(() => new Promise(() => {}));
    renderHome();
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve carregar e exibir usuários', async () => {
    apiService.getUsers.mockResolvedValue(mockApiUsers);
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });
  });

  it('deve mostrar erro quando API falha', async () => {
    apiService.getUsers.mockRejectedValue(new Error('API Error'));
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar usuários')).toBeInTheDocument();
    });
  });

  it('deve ter links para perfis dos usuários', async () => {
    apiService.getUsers.mockResolvedValue(mockApiUsers);
    renderHome();
    
    await waitFor(() => {
      const profileLinks = screen.getAllByText('👤 Ver Perfil');
      expect(profileLinks).toHaveLength(2);
    });
  });
});
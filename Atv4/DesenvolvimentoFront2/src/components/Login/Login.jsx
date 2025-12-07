import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import anime from 'animejs';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const formRef = useRef(null);

  useEffect(() => {
    // Animation 1: CSS Entrance
    anime({
      targets: formRef.current,
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: 300
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const result = await login(usuario, senha);

    if (result.success) {
      navigate('/home');
    } else {
      setErro(result.error || 'Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      position: 'relative',
      overflow: 'hidden' // Contain the rocket
    }}>
      {/* Rocket Animation Container */}
      {/* Rocket Animation Container */}
      <div style={{
        position: 'absolute',
        top: '20%', // Move even higher up
        marginTop: '-150px',
        left: '-300px',
        width: '300px',
        height: '300px',
        animation: 'flyAcross 8s linear infinite',
        pointerEvents: 'none',
        zIndex: 10 // Force on top
      }}>
        <style>{`
          @keyframes flyAcross {
            from { transform: translateX(0) rotate(90deg); }
            to { transform: translateX(calc(100vw + 400px)) rotate(90deg); }
          }
        `}</style>
        <img
          src={`/assets/svgs/animated/rocket.svg?v=${Date.now()}`} // Force cache refresh
          alt="Rocket Animation"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      <div ref={formRef} style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        opacity: 0, // Start hidden for animation
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              required
            />
          </div>
          {erro && (
            <div style={{
              color: 'red',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {erro}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/registro')}
            style={{
              backgroundColor: 'transparent',
              color: '#007bff',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Não tem conta? Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
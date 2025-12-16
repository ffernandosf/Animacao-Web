import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LayoutPadrao = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  React.useEffect(() => {
    import('animejs').then((module) => {
      const anime = module.default;
      anime({
        targets: '.logo-svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        direction: 'alternate',
        loop: true
      });
    });
  }, []);

  return (
    <div>
      <nav style={{
        backgroundColor: '#343a40',
        padding: '15px 20px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="40" height="40" viewBox="0 0 100 100" className="logo-svg">
              <path
                d="M50 5 L15 95 L95 25 L5 75 L85 5 Z"
                fill="none"
                stroke="#61dafb"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 style={{ color: 'white', margin: 0 }}>EcoWATT</h2>
          </div>
          <div>
            <Link
              to="/home"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '15px',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              Home
            </Link>
            <Link
              to="/adicionar"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '15px',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              Adicionar
            </Link>
            <Link
              to="/3d"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '15px',
                padding: '8px 12px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              3D
            </Link>
            <button
              onClick={handleLogout}
              style={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPadrao;
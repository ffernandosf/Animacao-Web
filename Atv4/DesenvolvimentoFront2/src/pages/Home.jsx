import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import anime from 'animejs';

const Home = () => {
  const { loading, error, getUsers, updateUser, deleteUser } = useApi();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  // Refs for animations
  // Refs for animations
  // Refs for animations
  const ctaRef = useRef(null);
  const listRef = useRef(null);

  // Animation 3: Motion Path (CTA Highlight)
  useEffect(() => {
    if (loading) return;
    const container = ctaRef.current;
    if (!container) return;

    // Use a rounded rectangle path for the button border
    // Approximating button size ~ 180x44 (padding 10px 20px + text)
    // We can just rely on the SVG viewBox/path defined in render

    const pathEl = container.querySelector('path');
    if (!pathEl) return;

    const path = anime.path(pathEl);

    anime({
      targets: container.querySelector('.cta-particle'),
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: 3000,
      loop: true
    });

    // Cleanup
    return () => anime.remove(container.querySelector('.cta-particle'));
  }, [loading]);

  // Animation 1: CSS Staggered Entrance for List
  useEffect(() => {
    if (users.length > 0 && listRef.current) {
      anime({
        targets: listRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(100)
      });
    }
  }, [users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper for Morph Animation (Button Icon)
  // Helper for Morph Animation (Button Icon)
  const morphIcon = (e, isSave) => {
    // Intentionally left for reference or future use if needed, 
    // but we use toggleFavorite for the main Morph demo now.
  };

  const toggleFavorite = (e) => {
    // Morph Star: Outline <-> Filled
    // Outline Star: M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z (Actually this is filled, let's just morph stroke/fill or path)

    // Simple Path 1 (Star): M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z
    // Simple Path 2 (Circle/Sun for contrast or just a different star shape? Let's do Circle -> Star morph)
    // Circle: M12 2 C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z

    // Let's morph from a "Circle" (Inactive) to "Star" (Active) visually

    const targetPath = e.currentTarget.querySelector('path');
    if (!targetPath) return;

    const isActive = e.currentTarget.dataset.active === 'true';
    e.currentTarget.dataset.active = !isActive;

    const starPath = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
    const circlePath = "M12 2 C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z";

    if (!isActive) {
      // Morph to Star
      anime({
        targets: targetPath,
        d: starPath,
        fill: "#ffc107",
        easing: 'easeInOutQuad',
        duration: 600
      });
    } else {
      // Morph to Circle
      anime({
        targets: targetPath,
        d: circlePath,
        fill: "#ccc",
        easing: 'easeInOutQuad',
        duration: 600
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const allUsers = await getUsers();
      setUsers(allUsers);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser(id, editForm);
      setUsers(users.map(u => u.id === id ? { ...u, ...editForm } : u));
      setEditingUser(null);
    } catch (err) {
      alert('Erro ao atualizar usuário');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Erro ao excluir usuário');
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Carregando...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        color: '#333',
        textAlign: 'center',
        marginBottom: '30px'
      }}>Página Inicial</h1>

      <p style={{
        fontSize: '18px',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#666'
      }}>Bem-vindo ao painel EcoWATT!</p>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', margin: 0 }}>Usuários do Sistema</h2>

          {/* CTA Button with Motion Path Highlight */}
          <div ref={ctaRef} style={{ position: 'relative', display: 'inline-block' }}>
            <Link to="/adicionar" style={{
              position: 'relative',
              zIndex: 2,
              display: 'block',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>+ Adicionar Usuário</Link>

            {/* Motion Path SVG Layer */}
            <svg width="100%" height="100%" style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              width: 'calc(100% + 10px)',
              height: 'calc(100% + 10px)',
              pointerEvents: 'none',
              zIndex: 1,
              overflow: 'visible'
            }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d="M 10 0 H 180 Q 190 0 190 10 V 40 Q 190 50 180 50 H 10 Q 0 50 0 40 V 10 Q 0 0 10 0 Z" fill="none" stroke="transparent" />

              {/* The Line of Light (Rect) */}
              <rect className="cta-particle" x="-15" y="-2" width="30" height="4" rx="2" fill="#00ff00" filter="url(#glow)" />
            </svg>
          </div>
        </div>
        <div ref={listRef} style={{
          display: 'grid',
          gap: '15px'
        }}>
          {users.map(user => (
            <div key={user.id} style={{
              backgroundColor: 'white',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              {editingUser === user.id ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{ padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    style={{ padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                  <button onClick={(e) => {
                    handleUpdate(user.id);
                    // Trigger morph back to edit on next render or keep as save? 
                    // Logic simplified for demo
                  }} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px' }}>
                      <path d="M 5 12 L 10 17 L 20 6" />
                    </svg>
                    Salvar
                  </button>
                  <button onClick={() => setEditingUser(null)} style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Cancelar</button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{user.name}</h3>
                      {/* Morph Button (Star/Circle) */}
                      <button onClick={toggleFavorite} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Favoritar (Morph)">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          {/* Start inside Circle shape */}
                          <path d="M12 2 C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#ccc" />
                        </svg>
                      </button>
                    </div>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{user.email}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/perfil/${user.id}`} style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Ver</Link>
                    <button onClick={(e) => {
                      handleEdit(user);
                      // Initial state is Pencil, we can animate it entering if we want
                    }} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px' }}>
                        <path d="M 3 17 L 17 3 L 21 7 L 7 21 L 3 21 L 3 21 L 3 17" />
                      </svg>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(user.id)} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Excluir</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default Home;
import React from 'react';
import JetScene from '../components/Three/JetScene';

const Page3D = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                color: 'white',
                background: 'rgba(0,0,0,0.5)',
                padding: '1rem',
                borderRadius: '8px',
                pointerEvents: 'none'
            }}>
                <h1 style={{ margin: 0, fontSize: '2rem' }}>Jet 3D</h1>
                <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>
                    Clique e arraste para inclinar o jato.
                </p>
            </div>
            <JetScene />
        </div>
    );
};

export default Page3D;

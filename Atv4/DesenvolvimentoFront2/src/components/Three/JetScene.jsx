import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const JetScene = () => {
    const mountRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Scene Setup
        const scene = new THREE.Scene();
        // Load Clean Sky Background
        const textureLoader = new THREE.TextureLoader();
        // Switching to 'sky.png' which should be just the sky
        textureLoader.load('/img/sky.png', (texture) => {
            scene.background = texture;
        });

        scene.fog = new THREE.Fog(0x87CEEB, 200, 1000);

        // 2. Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 10, 30);

        // 3. Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        // 4. Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 10;
        controls.maxDistance = 100;

        // 5. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // 6. Load F15 Model
        let jetModel = null;
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath('/models/f15c/');
        mtlLoader.load('f15c.mtl', (materials) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('/models/f15c/');
            objLoader.load('f15c.obj', (object) => {
                jetModel = object;
                // Scale UP
                object.scale.set(3, 3, 3);
                object.rotation.y = -Math.PI / 2; // Face forward
                object.position.y = -2;

                scene.add(object);
                setLoading(false);
            }, undefined, (error) => console.error(error));
        });

        // 7. Interaction Logic
        let targetBank = 0;
        const onMouseMove = (e) => {
            const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
            targetBank = -ndcX * Math.PI / 3;
        };
        window.addEventListener('mousemove', onMouseMove);

        // 8. Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();

            if (jetModel) {
                jetModel.rotation.z += (targetBank - jetModel.rotation.z) * 0.1;
            }

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100vh', overflow: 'hidden' }}
        >
            {loading && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'white', fontSize: '24px', fontWeight: 'bold', pointerEvents: 'none'
                }}>
                    Carregando F-15 Eagle (Céu Limpo)...
                </div>
            )}
        </div>
    );
};

export default JetScene;

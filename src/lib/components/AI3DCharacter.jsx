import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const AI3DCharacter = () => {
  const mountRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a1628);
      sceneRef.current = scene;

      // Camera
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 3;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;

      // Add renderer to DOM
      mountRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x00bfff, 1.5);
      pointLight.position.set(5, 5, 5);
      pointLight.castShadow = true;
      scene.add(pointLight);

      const rimLight = new THREE.DirectionalLight(0x7b2ff7, 0.8);
      rimLight.position.set(-5, 3, -5);
      scene.add(rimLight);

      // Create character group
      const group = new THREE.Group();
      scene.add(group);

      // Head
      const headGeometry = new THREE.SphereGeometry(1, 32, 32);
      const headMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b4d5c,
        shininess: 100,
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.castShadow = true;
      head.receiveShadow = true;
      group.add(head);

      // Eyes
      const eyeGeometry = new THREE.SphereGeometry(0.25, 16, 16);
      const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff });

      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.4, 0.35, 0.9);
      group.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.4, 0.35, 0.9);
      group.add(rightEye);

      // Mouth
      const mouthGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.05);
      const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x00bfff });
      const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
      mouth.position.set(0, -0.3, 0.95);
      group.add(mouth);

      // Antenna
      const antennaGeometry = new THREE.ConeGeometry(0.1, 0.8, 8);
      const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x7b2ff7 });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(0, 1.2, 0);
      antenna.castShadow = true;
      group.add(antenna);

      // Animation state
      let isHoveringState = false;
      let isTalkingState = false;

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        // Rotation
        group.rotation.y += 0.005;

        // Hover effect
        if (isHoveringState) {
          group.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
          group.position.y += Math.sin(Date.now() * 0.003) * 0.01;
        } else {
          group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          group.position.y = Math.sin(Date.now() * 0.001) * 0.2;
        }

        // Talking animation
        if (isTalkingState) {
          mouth.scale.y = 1 + Math.sin(Date.now() * 0.01) * 0.5;
          leftEye.scale.y = 1 - Math.abs(Math.sin(Date.now() * 0.005)) * 0.3;
          rightEye.scale.y = 1 - Math.abs(Math.sin(Date.now() * 0.005)) * 0.3;
        } else {
          mouth.scale.y = 1;
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
        }

        // Antenna sway
        antenna.rotation.z = Math.sin(Date.now() * 0.002) * 0.2;

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current) return;
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (rendererRef.current && mountRef.current) {
          try {
            mountRef.current.removeChild(rendererRef.current.domElement);
          } catch (e) {
            console.warn('Error removing renderer:', e);
          }
        }
        renderer.dispose();
        headGeometry.dispose();
        eyeGeometry.dispose();
        mouthGeometry.dispose();
        antennaGeometry.dispose();
        headMaterial.dispose();
        eyeMaterial.dispose();
        mouthMaterial.dispose();
        antennaMaterial.dispose();
      };
    } catch (error) {
      console.error('AI3DCharacter Error:', error);
    }
  }, []);

  // Update hover state
  useEffect(() => {
    sceneRef.current && (sceneRef.current.userData.isHovering = isHovering);
  }, [isHovering]);

  // Update talking state
  useEffect(() => {
    sceneRef.current && (sceneRef.current.userData.isTalking = isTalking);
  }, [isTalking]);

  const handleTalk = () => {
    setIsTalking(true);

    const messages = [
      "Hi! I'm an AI assistant ready to help.",
      "I build amazing web experiences.",
      "Let's create something incredible together!",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsTalking(false);
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsTalking(false), 2000);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {/* Info Panel */}
      <div className="absolute bottom-8 left-8 right-8 z-10 backdrop-blur-md bg-blue-900/30 border border-cyan-500/30 rounded-xl p-6 max-w-md">
        <h3 className="text-cyan-400 font-bold text-lg mb-2">AI Assistant</h3>
        <p className="text-gray-300 text-sm mb-4">
          Meet your digital companion. Hover to activate, click to talk.
        </p>
        <button
          onClick={handleTalk}
          disabled={isTalking}
          className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTalking ? '🎤 Speaking...' : '🎤 Talk to Me'}
        </button>
      </div>

      {/* Hover indicator */}
      {isHovering && (
        <div className="absolute top-8 right-8 z-10 flex items-center gap-2 text-cyan-400 animate-pulse">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          <span className="text-sm font-medium">Active</span>
        </div>
      )}
    </div>
  );
};

export default AI3DCharacter;
/**
 * Three.js Scene Module
 * Implements a modular, documented 3D hero scene with:
 * 1. Procedural primary object (TorusKnot)
 * 2. Ambient particle field with parallax
 * 3. Soft rim lighting + directional key light
 * 4. Subtle bloom/postprocessing (optional)
 * 5. Contact soft shadow approximation
 * 6. Cursor-driven parallax and microinteractions
 * 7. GLTF/GLB placeholder support
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';

/**
 * Scene configuration
 */
const CONFIG = {
  // Respect prefers-reduced-motion
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Performance settings
  maxPixelRatio: Math.min(window.devicePixelRatio, 2),
  
  // Primary object settings
  primaryObject: {
    type: 'torusKnot', // 'torusKnot' or 'icosahedron'
    color: 0x8b5cf6, // Violet
    metalness: 0.7,
    roughness: 0.2,
  },
  
  // Particle settings
  particles: {
    count: 500,
    size: 0.02,
    spread: 5,
    color: 0xa78bfa,
  },
  
  // Lighting
  lighting: {
    ambientIntensity: 0.3,
    directionalIntensity: 1.0,
    rimIntensity: 0.5,
  },
  
  // Postprocessing
  bloom: {
    enabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    strength: 0.4,
    radius: 0.5,
    threshold: 0.85,
  },
  
  // Interaction
  parallax: {
    enabled: true,
    strength: 0.15,
  },
};

/**
 * Create the primary procedural object
 */
function createPrimaryObject() {
  let geometry;
  
  if (CONFIG.primaryObject.type === 'torusKnot') {
    geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
  } else {
    geometry = new THREE.IcosahedronGeometry(1.2, 1);
  }
  
  const material = new THREE.MeshStandardMaterial({
    color: CONFIG.primaryObject.color,
    metalness: CONFIG.primaryObject.metalness,
    roughness: CONFIG.primaryObject.roughness,
    emissive: CONFIG.primaryObject.color,
    emissiveIntensity: 0.1,
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  
  return mesh;
}

/**
 * Create ambient particle field
 */
function createParticleField() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(CONFIG.particles.count * 3);
  const colors = new Float32Array(CONFIG.particles.count * 3);
  
  const color = new THREE.Color(CONFIG.particles.color);
  
  for (let i = 0; i < CONFIG.particles.count * 3; i += 3) {
    // Random position in a sphere
    const radius = CONFIG.particles.spread * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);
    
    // Gradient color variation
    const variation = 0.8 + Math.random() * 0.2;
    colors[i] = color.r * variation;
    colors[i + 1] = color.g * variation;
    colors[i + 2] = color.b * variation;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: CONFIG.particles.size,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  
  const particles = new THREE.Points(geometry, material);
  
  return particles;
}

/**
 * Setup scene lighting
 */
function setupLighting(scene) {
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, CONFIG.lighting.ambientIntensity);
  scene.add(ambientLight);
  
  // Directional key light (main light source)
  const directionalLight = new THREE.DirectionalLight(0xffffff, CONFIG.lighting.directionalIntensity);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);
  
  // Rim light (backlight for edge highlighting)
  const rimLight = new THREE.DirectionalLight(0xa78bfa, CONFIG.lighting.rimIntensity);
  rimLight.position.set(-5, 2, -5);
  scene.add(rimLight);
  
  // Fill light (subtle side lighting)
  const fillLight = new THREE.PointLight(0xc084fc, 0.3);
  fillLight.position.set(-3, 0, 3);
  scene.add(fillLight);
  
  return { ambientLight, directionalLight, rimLight, fillLight };
}

/**
 * Create soft shadow plane (contact shadow approximation)
 */
function createShadowPlane() {
  const geometry = new THREE.PlaneGeometry(5, 5);
  const material = new THREE.ShadowMaterial({ opacity: 0.3 });
  
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -2;
  plane.receiveShadow = true;
  
  return plane;
}

/**
 * Initialize the Three.js scene
 * @param {HTMLCanvasElement} canvas - The canvas element to render to
 * @returns {Function} cleanup - Function to dispose of resources
 */
export function initScene(canvas) {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  scene.fog = new THREE.Fog(0x0f172a, 5, 15);
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 5);
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setPixelRatio(CONFIG.maxPixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  
  // Controls setup (subtle interaction only)
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 1.5;
  controls.autoRotate = !CONFIG.reducedMotion;
  controls.autoRotateSpeed = 0.5;
  
  // Create scene objects
  const primaryObject = createPrimaryObject();
  scene.add(primaryObject);
  
  const particles = createParticleField();
  scene.add(particles);
  
  const lights = setupLighting(scene);
  
  const shadowPlane = createShadowPlane();
  scene.add(shadowPlane);
  
  // Postprocessing setup (optional bloom)
  let composer = null;
  if (CONFIG.bloom.enabled) {
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      CONFIG.bloom.strength,
      CONFIG.bloom.radius,
      CONFIG.bloom.threshold
    );
    composer.addPass(bloomPass);
  }
  
  // Pointer tracking for parallax
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  const handlePointerMove = (event) => {
    if (!CONFIG.parallax.enabled) return;
    
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };
  
  const handlePointerEnter = () => {
    if (CONFIG.reducedMotion) return;
    
    gsap.to(primaryObject.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };
  
  const handlePointerLeave = () => {
    if (CONFIG.reducedMotion) return;
    
    gsap.to(primaryObject.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
    
    pointer.targetX = 0;
    pointer.targetY = 0;
  };
  
  const handleClick = () => {
    if (CONFIG.reducedMotion) return;
    
    // Micro-interaction on click
    gsap.to(primaryObject.rotation, {
      y: primaryObject.rotation.y + Math.PI * 2,
      duration: 1,
      ease: 'power2.inOut',
    });
  };
  
  // Add event listeners
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerenter', handlePointerEnter);
  canvas.addEventListener('pointerleave', handlePointerLeave);
  canvas.addEventListener('click', handleClick);
  
  // Handle window resize
  const handleResize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height, false);
    
    if (composer) {
      composer.setSize(width, height);
    }
  };
  
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);
  
  // Animation loop
  let animationId = null;
  const clock = new THREE.Clock();
  
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Update controls
    controls.update();
    
    // Smooth pointer parallax
    pointer.x += (pointer.targetX - pointer.x) * 0.05;
    pointer.y += (pointer.targetY - pointer.y) * 0.05;
    
    if (CONFIG.parallax.enabled) {
      camera.position.x = pointer.x * CONFIG.parallax.strength;
      camera.position.y = pointer.y * CONFIG.parallax.strength;
      camera.lookAt(scene.position);
    }
    
    // Animate primary object (gentle floating)
    if (!CONFIG.reducedMotion) {
      primaryObject.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      primaryObject.rotation.z = Math.cos(elapsedTime * 0.2) * 0.1;
      primaryObject.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
    }
    
    // Animate particles (gentle drift)
    if (!CONFIG.reducedMotion && particles) {
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;
    }
    
    // Render
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  };
  
  animate();
  
  // Cleanup function
  const cleanup = () => {
    console.log('🧹 Cleaning up scene resources...');
    
    // Cancel animation loop
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // Remove event listeners
    canvas.removeEventListener('pointermove', handlePointerMove);
    canvas.removeEventListener('pointerenter', handlePointerEnter);
    canvas.removeEventListener('pointerleave', handlePointerLeave);
    canvas.removeEventListener('click', handleClick);
    
    // Disconnect resize observer
    resizeObserver.disconnect();
    
    // Dispose of geometries and materials
    primaryObject.geometry.dispose();
    primaryObject.material.dispose();
    
    particles.geometry.dispose();
    particles.material.dispose();
    
    shadowPlane.geometry.dispose();
    shadowPlane.material.dispose();
    
    // Dispose of controls and renderer
    controls.dispose();
    
    if (composer) {
      composer.dispose();
    }
    
    renderer.dispose();
    
    // Clear scene
    scene.clear();
    
    console.log('✅ Scene cleanup complete');
  };
  
  return cleanup;
}

/**
 * Placeholder for GLTF/GLB model loading
 * To use a custom 3D model:
 * 
 * 1. Add your .glb/.gltf file to the /public folder (keep it < 500KB)
 * 2. Import GLTFLoader:
 *    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
 * 
 * 3. Load the model in initScene:
 *    const loader = new GLTFLoader();
 *    loader.load('/your-model.glb', (gltf) => {
 *      const model = gltf.scene;
 *      model.position.set(0, 0, 0);
 *      scene.add(model);
 *    });
 * 
 * 4. Remember to dispose of the model in the cleanup function
 */

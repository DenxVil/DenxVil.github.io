// HARSH 3D Monogram using Three.js

window.initHarshMonogram = function(canvas) {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not available for HARSH monogram');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);

    // Create enhanced geometric representation of HARSH
    function createHarshGeometry() {
        const group = new THREE.Group();
        
        // Letter definitions with more complex shapes
        const letters = [
            // H
            {
                shapes: [
                    { type: 'box', x: -2.2, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                    { type: 'box', x: -1.8, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                    { type: 'box', x: -2.0, y: 0, z: 0, w: 0.4, h: 0.2, d: 0.2 }
                ]
            },
            // A
            {
                shapes: [
                    { type: 'box', x: -1.2, y: -0.3, z: 0, w: 0.2, h: 1.4, d: 0.2, rotation: -Math.PI / 12 },
                    { type: 'box', x: -0.8, y: -0.3, z: 0, w: 0.2, h: 1.4, d: 0.2, rotation: Math.PI / 12 },
                    { type: 'box', x: -1.0, y: 0.8, z: 0, w: 0.3, h: 0.15, d: 0.2 },
                    { type: 'box', x: -1.0, y: 0.2, z: 0, w: 0.3, h: 0.15, d: 0.2 }
                ]
            },
            // R
            {
                shapes: [
                    { type: 'box', x: -0.3, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                    { type: 'box', x: 0.0, y: 0.5, z: 0, w: 0.4, h: 0.2, d: 0.2 },
                    { type: 'box', x: 0.0, y: 0.8, z: 0, w: 0.4, h: 0.2, d: 0.2 },
                    { type: 'box', x: 0.2, y: 0.65, z: 0, w: 0.2, h: 0.3, d: 0.2 },
                    { type: 'box', x: 0.1, y: -0.2, z: 0, w: 0.3, h: 0.2, d: 0.2, rotation: Math.PI / 6 }
                ]
            },
            // S
            {
                shapes: [
                    { type: 'box', x: 0.8, y: 0.6, z: 0, w: 0.5, h: 0.2, d: 0.2 },
                    { type: 'box', x: 0.6, y: 0.2, z: 0, w: 0.2, h: 0.6, d: 0.2 },
                    { type: 'box', x: 0.8, y: 0, z: 0, w: 0.4, h: 0.2, d: 0.2 },
                    { type: 'box', x: 1.0, y: -0.4, z: 0, w: 0.2, h: 0.6, d: 0.2 },
                    { type: 'box', x: 0.8, y: -0.7, z: 0, w: 0.5, h: 0.2, d: 0.2 }
                ]
            },
            // H
            {
                shapes: [
                    { type: 'box', x: 1.6, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                    { type: 'box', x: 2.0, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                    { type: 'box', x: 1.8, y: 0, z: 0, w: 0.4, h: 0.2, d: 0.2 }
                ]
            }
        ];
        
        // Create materials with different colors for variety
        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x8b5cf6, 
                shininess: 100,
                transparent: true,
                opacity: 0.9
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x06b6d4, 
                shininess: 100,
                transparent: true,
                opacity: 0.9
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x10b981, 
                shininess: 100,
                transparent: true,
                opacity: 0.9
            })
        ];
        
        letters.forEach((letter, letterIndex) => {
            letter.shapes.forEach((shape, shapeIndex) => {
                const geometry = new THREE.BoxGeometry(shape.w, shape.h, shape.d);
                const material = materials[letterIndex % materials.length];
                const mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(shape.x, shape.y, shape.z);
                
                if (shape.rotation) {
                    mesh.rotation.z = shape.rotation;
                }
                
                group.add(mesh);
            });
        });
        
        return group;
    }

    // Create the text object
    const textMesh = createHarshGeometry();
    scene.add(textMesh);

    // Lighting setup with more dynamic colors
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 0.6, 100);
    pointLight.position.set(-1, 1, 2);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0x10b981, 0.5, 50, Math.PI / 6, 0.1);
    spotLight.position.set(0, 3, 2);
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Camera position
    camera.position.z = 5;

    // Animation variables
    let time = 0;
    const mouse = { x: 0, y: 0 };

    // Mouse tracking for interactivity
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        mouse.y = -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    });

    // Enhanced animation loop with different motion patterns
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        if (textMesh) {
            // Counter-rotation to DENVIL for visual variety
            textMesh.rotation.y = -time * 0.7 + mouse.x * 0.15;
            textMesh.rotation.x = Math.cos(time * 0.4) * 0.15 + mouse.y * 0.08;
            textMesh.rotation.z = Math.cos(time * 0.3) * 0.08;
            
            // Different floating pattern
            textMesh.position.y = Math.cos(time * 1.2) * 0.25;
            textMesh.position.x = Math.sin(time * 0.6) * 0.1;
            
            // Scale pulsing with different timing
            const scale = 1 + Math.cos(time * 1.5) * 0.08;
            textMesh.scale.set(scale, scale, scale);
        }
        
        // Dynamic lighting effects
        directionalLight.intensity = 0.6 + Math.sin(time * 2) * 0.2;
        pointLight.intensity = 0.4 + Math.cos(time * 1.5) * 0.2;
        
        // Camera movement with different pattern
        camera.position.x = Math.cos(time * 0.7) * 0.15;
        camera.position.y = Math.sin(time * 0.4) * 0.1;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }

    // Start animation
    animate();

    // Handle canvas resize
    function handleResize() {
        const size = Math.min(canvas.clientWidth, canvas.clientHeight);
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    }

    // Set up resize observer
    let resizeObserver;
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);
    }

    // Initial resize
    handleResize();

    // Cleanup function
    return function cleanup() {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
        
        // Dispose of geometries and materials
        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        renderer.dispose();
    };
};

// Particle system for enhanced visual effects
function createParticleSystem() {
    if (typeof THREE === 'undefined') return null;
    
    const particleCount = 50;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // Random colors
        colors[i * 3] = Math.random();
        colors[i * 3 + 1] = Math.random();
        colors[i * 3 + 2] = Math.random();
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    return new THREE.Points(particles, particleMaterial);
}

// Enhanced version with particle effects
window.initHarshMonogramEnhanced = function(canvas) {
    const basicInit = window.initHarshMonogram(canvas);
    
    // Add particle system if Three.js is available
    if (typeof THREE !== 'undefined') {
        const scene = canvas._threeScene; // This would need to be exposed from the main function
        if (scene) {
            const particles = createParticleSystem();
            if (particles) {
                scene.add(particles);
            }
        }
    }
    
    return basicInit;
};

// Export for potential external use
window.createHarshGeometry = createParticleSystem;
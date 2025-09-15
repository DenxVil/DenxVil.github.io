// DENVIL 3D Monogram using Three.js

window.initDenvilMonogram = function(canvas) {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not available for DENVIL monogram');
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

    // Create text geometry for DENVIL
    const loader = new THREE.FontLoader();
    
    // Fallback: Create geometric shapes if font loading fails
    function createFallbackGeometry() {
        const group = new THREE.Group();
        
        // Create simple geometric representation of DENVIL
        const shapes = [
            { x: -2, y: 0, width: 0.3, height: 2 }, // D
            { x: -1.3, y: 0, width: 0.3, height: 2 }, // E
            { x: -0.6, y: 0, width: 0.3, height: 2 }, // N
            { x: 0.1, y: 0, width: 0.3, height: 2 }, // V
            { x: 0.8, y: 0, width: 0.3, height: 2 }, // I
            { x: 1.5, y: 0, width: 0.3, height: 2 }  // L
        ];
        
        shapes.forEach(shape => {
            const geometry = new THREE.BoxGeometry(shape.width, shape.height, 0.2);
            const material = new THREE.MeshPhongMaterial({ 
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.8
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(shape.x, shape.y, 0);
            group.add(cube);
        });
        
        return group;
    }

    // Create the text object
    let textMesh;
    
    // Try to load a font, fallback to geometric shapes
    try {
        // For now, use geometric fallback
        textMesh = createFallbackGeometry();
        scene.add(textMesh);
    } catch (error) {
        console.warn('Font loading failed, using geometric fallback');
        textMesh = createFallbackGeometry();
        scene.add(textMesh);
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 0.6, 100);
    pointLight.position.set(-1, 1, 2);
    scene.add(pointLight);

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

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        if (textMesh) {
            // Rotation animation
            textMesh.rotation.y = time * 0.5 + mouse.x * 0.1;
            textMesh.rotation.x = Math.sin(time * 0.3) * 0.1 + mouse.y * 0.05;
            textMesh.rotation.z = Math.sin(time * 0.2) * 0.05;
            
            // Floating animation
            textMesh.position.y = Math.sin(time * 0.8) * 0.2;
            
            // Scale pulsing
            const scale = 1 + Math.sin(time * 2) * 0.05;
            textMesh.scale.set(scale, scale, scale);
        }
        
        // Camera slight movement
        camera.position.x = Math.sin(time * 0.5) * 0.1;
        camera.position.y = Math.cos(time * 0.3) * 0.1;
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
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);
    }

    // Initial resize
    handleResize();

    // Cleanup function
    return function cleanup() {
        if (window.ResizeObserver) {
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

// Enhanced geometric text creation for better visual appeal
function createEnhancedDenvilGeometry() {
    if (typeof THREE === 'undefined') return null;
    
    const group = new THREE.Group();
    
    // Letter definitions with more complex shapes
    const letters = [
        // D
        {
            shapes: [
                { type: 'box', x: -2.5, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: -2.2, y: 0.8, z: 0, w: 0.6, h: 0.2, d: 0.2 },
                { type: 'box', x: -2.2, y: -0.8, z: 0, w: 0.6, h: 0.2, d: 0.2 },
                { type: 'box', x: -1.8, y: 0, z: 0, w: 0.2, h: 1.2, d: 0.2 }
            ]
        },
        // E
        {
            shapes: [
                { type: 'box', x: -1.5, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: -1.2, y: 0.8, z: 0, w: 0.6, h: 0.2, d: 0.2 },
                { type: 'box', x: -1.2, y: 0, z: 0, w: 0.4, h: 0.2, d: 0.2 },
                { type: 'box', x: -1.2, y: -0.8, z: 0, w: 0.6, h: 0.2, d: 0.2 }
            ]
        },
        // N
        {
            shapes: [
                { type: 'box', x: -0.5, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: -0.1, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: -0.3, y: 0.2, z: 0, w: 0.4, h: 0.2, d: 0.2, rotation: Math.PI / 6 }
            ]
        },
        // V
        {
            shapes: [
                { type: 'box', x: 0.5, y: 0.3, z: 0, w: 0.2, h: 1.4, d: 0.2, rotation: -Math.PI / 8 },
                { type: 'box', x: 0.9, y: 0.3, z: 0, w: 0.2, h: 1.4, d: 0.2, rotation: Math.PI / 8 }
            ]
        },
        // I
        {
            shapes: [
                { type: 'box', x: 1.5, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: 1.5, y: 0.8, z: 0, w: 0.4, h: 0.2, d: 0.2 },
                { type: 'box', x: 1.5, y: -0.8, z: 0, w: 0.4, h: 0.2, d: 0.2 }
            ]
        },
        // L
        {
            shapes: [
                { type: 'box', x: 2.2, y: 0, z: 0, w: 0.2, h: 2, d: 0.2 },
                { type: 'box', x: 2.5, y: -0.8, z: 0, w: 0.6, h: 0.2, d: 0.2 }
            ]
        }
    ];
    
    // Create materials with gradient effect
    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6, 
            shininess: 100,
            transparent: true,
            opacity: 0.9
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x8b5cf6, 
            shininess: 100,
            transparent: true,
            opacity: 0.9
        })
    ];
    
    letters.forEach((letter, letterIndex) => {
        letter.shapes.forEach((shape, shapeIndex) => {
            const geometry = new THREE.BoxGeometry(shape.w, shape.h, shape.d);
            const material = materials[shapeIndex % materials.length];
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

// Export for potential external use
window.createEnhancedDenvilGeometry = createEnhancedDenvilGeometry;
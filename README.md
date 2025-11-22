# DenxVil.github.io

A polished, modern 3D-forward portfolio website combining top design inspirations and advanced Three.js 3D elements.

## 🎨 Design Inspirations

### Top 5 Template Ideas
1. **Spline-like editable 3D scene affordance** - Modular scene architecture allowing easy scene swapping
2. **Bruno Simon-style playful interaction** - Pointer-driven orbit/parallax and cursor microinteractions
3. **Active Theory cinematic polish** - Smooth scene fades, refined lighting, subtle postprocessing
4. **react-three-fiber aesthetic** - Componentized, well-documented scene code for maintainability
5. **Tailwind + minimal markup** - Utility-first styling with custom button utilities

### Top 7 3D Element Concepts
1. **Procedural primary object** - TorusKnot with stylized MeshStandardMaterial
2. **Ambient particle field** - Subtle particle cloud with pointer parallax
3. **Soft rim lighting** - Multi-light setup with directional, rim, and fill lights
4. **Subtle bloom postprocessing** - Optional, respects reduced-motion preferences
5. **Contact soft shadow** - Shadow plane approximation for depth
6. **Cursor-driven parallax** - Object reacts to pointer with GSAP micro-tweens
7. **GLTF/GLB placeholder** - Instructions for custom model integration

## 🚀 Tech Stack

- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D rendering and WebGL
- **GSAP** - Smooth animations and micro-interactions
- **Vanilla ES Modules** - No framework dependency

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DenxVil/DenxVil.github.io.git
cd DenxVil.github.io

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the site
npm run build

# Preview the production build
npm run preview
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

### GitHub Actions Workflow
- Triggers on push to `main` or `redesign/3d-gh-pages` branches
- Installs dependencies, builds the project, and deploys to GitHub Pages
- Uses official GitHub Actions for Pages deployment

### Manual Deployment Trigger
You can manually trigger deployment from the Actions tab in the GitHub repository.

## ✨ Features

### Accessibility
- Semantic HTML structure
- Keyboard-focusable interactive elements
- Visible focus-visible outlines
- ARIA labels for enhanced screen reader support
- Respects `prefers-reduced-motion` user preference

### Performance
- Capped pixel ratio (max 2x) for optimal WebGL performance
- Minimal lights and low-poly geometry
- Optional postprocessing based on device capabilities
- Lazy loading and code splitting

### HMR Safe
- Proper WebGL context cleanup on hot module reload
- No memory leaks during development
- Automatic resource disposal

## 🎮 3D Scene Customization

### Swapping the 3D Model
To replace the procedural geometry with a custom GLTF/GLB model:

1. Add your model file (< 500KB recommended) to the `/public` folder
2. Uncomment and configure the GLTF loader in `src/scene.js`
3. Follow the inline instructions in the file

### Configuration
Scene settings can be adjusted in `src/scene.js`:
- Primary object type and materials
- Particle count and appearance
- Lighting intensity and colors
- Postprocessing effects
- Interaction behavior

## 📁 Project Structure

```
.
├── index.html              # Main HTML entry point
├── src/
│   ├── main.js            # Application entry (HMR, initialization)
│   ├── scene.js           # Three.js scene implementation
│   └── styles.css         # Tailwind utilities and custom styles
├── public/                # Static assets
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # GitHub Actions deployment
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## 🧪 Testing

### Development Testing
1. Run `npm run dev`
2. Validate 3D scene loads without errors
3. Test pointer parallax and microinteractions
4. Verify HMR by editing source files
5. Check accessibility with keyboard navigation
6. Enable reduced-motion in browser settings to verify animation disable

### Production Testing
1. Run `npm run build && npm run preview`
2. Verify all assets load correctly
3. Test on different devices and browsers
4. Check performance metrics

## 📝 License

All rights reserved © 2024 Denvil (Harsh)

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!
# DenxVil.github.io

A production-ready 3D portfolio website for Denvil (Harsh) - Developer, Designer, and Esports Gamer.

## 🚀 Overview

This is a modern, interactive portfolio website featuring advanced 3D elements and animations built with pure HTML, CSS, and JavaScript. The site showcases projects, skills, and provides contact information.

## ✨ Features

### 3D Elements
- **DENVIL Rotating Cube**: 140x140px 6-faced cube with letter rotation in hero section
- **HARSH Letter Tower**: 5-layer stacked letters with mouse-follow parallax effect
- **3D Project Cards**: Flip cards with front/back faces for featured projects
- **Background Shapes**: Animated geometric shapes (cube, pyramid, sphere) with floating particles
- **3D Navigation**: Brand cube with rotation and 3D hover effects on links
- **Contact Cards**: Floating icons with 3D lift effects

### Pages
- **index.html**: Homepage with hero, about, projects, and contact sections
- **projects.html**: Complete project showcase with filtering by status
- **nexus.html**: Dedicated page for Nexus AI project

### Performance & Accessibility
- Total page size under 150KB
- Respects `prefers-reduced-motion` user preference
- Keyboard-accessible navigation
- Mobile responsive design
- SEO optimized with meta tags and Open Graph
- No external dependencies (pure vanilla JS)

## 💻 Local Development

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/DenxVil/DenxVil.github.io.git
cd DenxVil.github.io
```

2. Open the site:
Simply open `index.html` in your web browser. No build process required!

For live reloading during development, you can use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
.
├── index.html              # Homepage
├── projects.html           # All projects page
├── nexus.html             # Nexus AI dedicated page
├── assets/
│   ├── css/
│   │   └── style.css      # All styles including 3D effects
│   └── js/
│       └── main.js        # JavaScript interactions
├── logo/                   # Logo assets (SVG/CSS)
│   ├── harsh-tower-style.css
│   ├── nexus-ai-badge.svg
│   ├── dark-userbot-icon.svg
│   └── denvil-cube-letters.svg
└── README.md
```

## 🎨 3D Elements Guide

### DENVIL Rotating Cube
- Located in hero section
- 6 faces spelling D-E-N-V-I-L
- 16s rotation, slows to 4s on hover
- Gradient: `linear-gradient(135deg, #141727, #3b82f6, #9333ea)`

### HARSH Letter Tower
- Located in about section
- 5 layers with 20px Z-offset increments
- Mouse-follow parallax effect (±10deg rotation)
- Gradient: `linear-gradient(135deg, #1f2937, #4f46e5, #7c3aed)`

### 3D Project Cards
- 300x280px flip cards
- Y-axis flip on hover with X-axis tilt
- Custom gradients per project
- Front: Project info, Back: Tech stack & links

### Background Shapes
- Particle system: 5 floating particles
- Geometric shapes: cube, pyramid, sphere
- All with 3D rotation animations
- Opacity: 0.05 (subtle background effect)

## 🛠️ Customization

### Updating Projects
Edit the project cards in `index.html` and `projects.html`. Each project has:
- Icon (emoji or SVG)
- Title and description
- Status (completed/development/planned)
- Tech stack tags
- Link (internal or external)

### Changing Colors
All colors are defined in CSS custom properties at the top of `assets/css/style.css`:

```css
:root {
    --color-bg: #0a0e1a;
    --color-primary: #3b82f6;
    --color-secondary: #9333ea;
    /* ... */
}
```

### Adding New Pages
1. Create new HTML file
2. Copy header and footer from existing pages
3. Link new CSS file: `<link rel="stylesheet" href="assets/css/style.css">`
4. Add link in navigation

## 🌐 Deployment

### GitHub Pages
The site is automatically deployed to GitHub Pages. Any push to the `main` branch will update the live site at `https://denxvil.github.io/`

### Manual Deployment
Simply upload all files to any static hosting service:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3
- Any web server

No build process required!

## 📊 Performance

- **Total Size**: ~75KB (HTML+CSS+JS combined)
- **Load Time**: <1s on fast connections
- **Mobile Optimized**: Responsive breakpoints at 768px
- **Animations**: Disabled automatically for users with `prefers-reduced-motion`

## 🎯 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

Requires support for:
- CSS 3D Transforms
- CSS Custom Properties
- ES6 JavaScript

## 👤 Author

**Denvil (Harsh)**
- Age: 20
- Education: MBBS 2nd Year, Maulana Azad Medical College, Delhi
- Experience: 4+ years in coding
- Specialties: Python, Telethon, HTML, CSS, SQL, GitHub, Telegram bots
- Gaming: TEAM KYRO Esports

### Contact
- Telegram: [@xDenvil_bot](https://t.me/xDenvil_bot)
- Email: xdenvil0@gmail.com
- GitHub: [@DenxVil](https://github.com/DenxVil)

## 📝 License

All rights reserved © 2024 Denvil (Harsh)

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use, but please give credit and don't claim it as your own work.

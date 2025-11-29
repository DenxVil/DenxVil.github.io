# DenxVil.github.io

A modern, interactive portfolio website for Denvil (Harsh) - Developer, Designer, and Esports Gamer.

## 🚀 Overview

This is a modern portfolio website featuring a **Bento Grid Layout** with advanced 3D elements, animations, and interactions. Built with **Astro** and **Tailwind CSS** for optimal performance and developer experience.

## ✨ Features

### Design
- **Bento Grid Layout** - Modular, asymmetric grid design inspired by modern SaaS websites
- **Glassmorphism Effects** - Frosted glass cards with backdrop blur
- **3D Card Tilt** - Perspective tilt effects on hover
- **Dark/Light Theme** - System preference detection with smooth transitions

### Animations & Interactions
- **GSAP ScrollTrigger** - Scroll-driven animations throughout the site
- **Custom Cursor** - Morphing cursor with trail effect
- **Magnetic Buttons** - Buttons that attract cursor with elastic animations
- **Typing Effect** - Animated text typing in hero section
- **Parallax Elements** - Floating background shapes with depth
- **Scroll Progress** - Visual indicator showing scroll position

### Technical
- **Astro Framework** - Static site generation with island architecture
- **Tailwind CSS** - Utility-first CSS for rapid development
- **No Runtime Dependencies** - All animations use GSAP (client-side only)
- **Mobile-First Design** - Responsive across all device sizes
- **SEO Optimized** - Meta tags, Open Graph, and JSON-LD structured data

### Pages
- **index.astro** - Homepage with hero, about, projects, and contact sections
- **projects.astro** - Complete project showcase with filtering and search
- **nexus.astro** - Dedicated page for Nexus AI project
- **pulse-protector.astro** - Dedicated page for Pulse Protector project

## 💻 Local Development

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/DenxVil/DenxVil.github.io.git
cd DenxVil.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
.
├── src/
│   ├── components/     # Reusable Astro components
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # Route pages
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   ├── nexus.astro
│   │   └── pulse-protector.astro
│   └── styles/         # Global styles
│       └── global.css
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
├── package.json
├── CNAME              # Custom domain (denx.me)
└── README.md
```

## 🎨 Customization

### Colors
All colors are defined in `tailwind.config.mjs`:

```javascript
colors: {
  'primary': '#3b82f6',
  'secondary': '#9333ea',
  'accent': '#f97316',
  'bg-dark': '#0a0e1a',
  'bg-card': '#141727',
}
```

### Adding New Pages
1. Create new `.astro` file in `src/pages/`
2. Import and use the Layout component
3. Add navigation links in `Header.astro`

## 🌐 Deployment

### GitHub Pages
The site is automatically deployed via GitHub Actions. Any push to the `main` branch triggers:
1. Build the Astro project
2. Deploy to GitHub Pages

### Manual Deployment
Build the project and deploy the `dist/` folder to any static hosting:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3

## 📊 Performance
- **Total Size**: ~150KB (initial load)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Animations**: Disabled for users with `prefers-reduced-motion`

## 🎯 Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

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

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      name: 'Telegram',
      url: 'https://t.me/xDenvil_bot',
    },
    {
      name: 'Email',
      url: 'mailto:xdenvil0@gmail.com',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/DenxVil',
    },
    {
      name: 'NexusAI',
      url: 'https://denx.me/NexusAI',
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 text-xl font-bold hover:text-primary-400 transition-colors mx-auto md:mx-0"
            >
              <span className="text-gradient">DENVIL</span>
              <span className="text-2xl">⚡</span>
            </button>
            <p className="text-dark-400 mt-2">
              &copy; {currentYear} Denvil (Harsh). Code, Design, Compete.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-dark-300 mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center space-x-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-dark-300 mb-4">Built With</h4>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm text-dark-400">
              <span className="hover:text-blue-400 transition-colors">React</span>
              <span className="hover:text-purple-400 transition-colors">Vite</span>
              <span className="hover:text-cyan-400 transition-colors">TailwindCSS</span>
              <span className="hover:text-orange-400 transition-colors">Three.js</span>
            </div>
            <p className="text-xs text-dark-500 mt-2">
              Deployed on GitHub Pages
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-dark-700 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-dark-500 text-sm">
            <span>Made with passion</span>
            <span className="text-red-400">❤️</span>
            <span>in Delhi, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 text-xl font-bold hover:text-primary-400 transition-colors"
          >
            <span className="text-gradient">DENVIL</span>
            <span className="text-2xl">⚡</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-dark-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* NexusAI Link */}
            <a
              href="https://denx.me/NexusAI"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              NexusAI
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 bg-dark-800/95 backdrop-blur-xl rounded-lg mt-2 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-dark-300 hover:text-white transition-colors duration-200 py-2"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile NexusAI Link */}
            <a
              href="https://denx.me/NexusAI"
              target="_blank"
              rel="noopener noreferrer"
              className="block btn btn-primary text-center mt-4"
            >
              NexusAI
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
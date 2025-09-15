import React from 'react';

export default function Contact() {
  const contactLinks = [
    {
      name: 'Telegram',
      handle: '@xDenvil_bot',
      url: 'https://t.me/xDenvil_bot',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.58 7.44c-.12.539-.432.672-.864.42l-2.388-1.764-1.152 1.116c-.128.128-.236.236-.48.236l.168-2.388 4.356-3.936c.192-.168-.036-.264-.3-.096l-5.388 3.396-2.316-.732c-.504-.156-.516-.504.108-.744l9.024-3.492c.42-.156.792.096.66.54z"/>
        </svg>
      ),
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'Email',
      handle: 'xdenvil0@gmail.com',
      url: 'mailto:xdenvil0@gmail.com',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
      ),
      color: 'text-red-400 hover:text-red-300'
    },
    {
      name: 'GitHub',
      handle: 'DenxVil',
      url: 'https://github.com/DenxVil',
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'text-gray-400 hover:text-gray-300'
    }
  ];

  const features = [
    {
      icon: '🚀',
      title: 'Development Projects',
      description: 'Custom applications, bots, and web solutions tailored to your needs'
    },
    {
      icon: '🎮',
      title: 'Esports Collaboration',
      description: 'Team partnerships, tournament strategies, and gaming-related projects'
    },
    {
      icon: '🎨',
      title: 'Design Services',
      description: 'Logo design, UI/UX, and visual identity creation'
    },
    {
      icon: '💡',
      title: 'Technical Consulting',
      description: 'Technology advice, code reviews, and solution architecture'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Let's Connect</h2>
          <p className="section-subtitle">
            Ready to collaborate on your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <div className="card mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-6">Get In Touch</h3>
              <p className="text-dark-300 leading-relaxed mb-8">
                Whether you're interested in development work, esports collaboration, 
                or just want to chat about technology and gaming, I'm always open to 
                new connections and opportunities.
              </p>

              {/* Contact Links */}
              <div className="space-y-4">
                {contactLinks.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.url}
                    target={contact.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={contact.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className={`flex items-center space-x-4 p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-all duration-300 ${contact.color} group`}
                  >
                    <div className="flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-dark-400 group-hover:text-current transition-colors">
                        {contact.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="card bg-gradient-primary">
              <h4 className="text-xl font-bold mb-4">Ready to Collaborate?</h4>
              <p className="text-dark-200 mb-6">
                Let's build something amazing together. Whether it's a new project, 
                collaboration, or just a conversation about tech and gaming.
              </p>
              <a
                href="mailto:xdenvil0@gmail.com"
                className="btn btn-secondary w-full bg-white text-dark-900 hover:bg-dark-100"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Services & Collaboration Areas */}
          <div>
            <div className="card">
              <h3 className="text-2xl font-bold text-gradient mb-6">What I Offer</h3>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 text-2xl">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-dark-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <div className="mt-6 p-6 bg-dark-700/30 rounded-lg border border-dark-600">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-400">Usually responds within 24 hours</span>
              </div>
              <p className="text-dark-400 text-sm">
                I check my messages regularly and aim to respond to all inquiries promptly. 
                For urgent matters, Telegram is the fastest way to reach me.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-dark-400">
            <span>Made with</span>
            <span className="text-red-400 animate-pulse">❤️</span>
            <span>and lots of</span>
            <span className="text-yellow-400">☕</span>
            <span>by Denvil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
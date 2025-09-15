import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Nexus AI',
      description: 'Advanced AI-powered application platform featuring multi-model support, Telegram bot integration, and stunning 3D-enhanced user interface with custom three.js elements.',
      icon: '🤖',
      tags: ['AI', 'Telegram Bot', 'Three.js', 'Python'],
      link: 'https://denx.me/NexusAI',
      isExternal: true,
      status: 'Featured'
    },
    {
      id: 2,
      title: 'Dark Userbot',
      description: 'Powerful Telegram userbot with advanced automation features, custom plugins, and extensive customization options for power users.',
      icon: '🌙',
      tags: ['Telegram', 'Python', 'Automation', 'Telethon'],
      link: 'https://github.com/DenxVil/Dark-Userbot',
      isExternal: true,
      status: 'Open Source'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React, Three.js, and TailwindCSS featuring interactive 3D elements and smooth animations.',
      icon: '🌐',
      tags: ['React', 'Three.js', 'TailwindCSS', 'Vite'],
      link: '#',
      isExternal: false,
      status: 'Current'
    }
  ];

  const pipeline = {
    completed: [
      'Dark Userbot v2.0',
      'TEAM KRYO Website',
      'Personal Portfolio v1',
      'Telegram Bot Framework',
      'Logo Design Collection'
    ],
    development: [
      'Nexus AI v2.0',
      'Advanced Telethon Library',
      'Esports Analytics Dashboard',
      'Multi-language Bot Support',
      '3D Portfolio Animations'
    ],
    planned: [
      'AI Voice Assistant',
      'Gaming Performance Tracker',
      'Open Source Bot Template',
      'Design System Library',
      'Mobile App Development'
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Featured':
        return 'bg-primary-600/20 text-primary-300 border-primary-500/30';
      case 'Open Source':
        return 'bg-accent-600/20 text-accent-300 border-accent-500/30';
      case 'Current':
        return 'bg-secondary-600/20 text-secondary-300 border-secondary-500/30';
      default:
        return 'bg-dark-600/20 text-dark-300 border-dark-500/30';
    }
  };

  const getPipelineStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 border-green-500/30';
      case 'development':
        return 'text-yellow-400 border-yellow-500/30';
      case 'planned':
        return 'text-blue-400 border-blue-500/30';
      default:
        return 'text-dark-400 border-dark-500/30';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="container mx-auto px-4">
        {/* Featured Projects Section */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions and creative works
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project) => (
            <div key={project.id} className="card group hover:scale-105 transition-all duration-300">
              {/* Project Icon & Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{project.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Project Content */}
              <h3 className="text-xl font-bold text-gradient mb-3">{project.title}</h3>
              <p className="text-dark-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded border border-dark-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Link */}
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target={project.isExternal ? "_blank" : "_self"}
                  rel={project.isExternal ? "noopener noreferrer" : ""}
                  className="btn btn-primary w-full group-hover:shadow-lg group-hover:shadow-primary-500/25"
                >
                  {project.isExternal ? 'View Project' : 'Learn More'}
                  {project.isExternal && (
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Project Pipeline Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gradient mb-4">Project Pipeline</h3>
          <p className="text-dark-300 text-lg">
            Current status of ongoing and planned projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Completed Projects */}
          <div className="card">
            <h4 className={`text-xl font-bold mb-6 pb-3 border-b ${getPipelineStatusColor('completed')}`}>
              ✅ Completed
            </h4>
            <ul className="space-y-3">
              {pipeline.completed.map((project, index) => (
                <li key={index} className="flex items-center text-dark-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  {project}
                </li>
              ))}
            </ul>
          </div>

          {/* In Development */}
          <div className="card">
            <h4 className={`text-xl font-bold mb-6 pb-3 border-b ${getPipelineStatusColor('development')}`}>
              🚧 In Development
            </h4>
            <ul className="space-y-3">
              {pipeline.development.map((project, index) => (
                <li key={index} className="flex items-center text-dark-300">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                  {project}
                </li>
              ))}
            </ul>
          </div>

          {/* Planned Projects */}
          <div className="card">
            <h4 className={`text-xl font-bold mb-6 pb-3 border-b ${getPipelineStatusColor('planned')}`}>
              📋 Planned
            </h4>
            <ul className="space-y-3">
              {pipeline.planned.map((project, index) => (
                <li key={index} className="flex items-center text-dark-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  {project}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
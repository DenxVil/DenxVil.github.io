import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const personalInfo = [
    { label: 'Name', value: 'Denvil (Harsh)' },
    { label: 'Age', value: '20' },
    { label: 'Location', value: 'Delhi' },
    { label: 'Experience', value: '4+ years coding' },
  ];

  const skills = [
    'Python',
    'Telethon',
    'HTML',
    'CSS',
    'React',
    'Three.js',
    'SQL',
    'Logo Design',
  ];

  const teamMembers = [
    'Ğhóšț',
    '『DENVIL』',
    '么SpїÐɣ๛',
    '「MYLO」',
    'ÚTKÂRSH卐',
  ];

  return (
    <motion.section 
      id="about" 
      className="py-20 bg-gradient-to-b from-dark-900 to-dark-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">About Me</h2>
          <p className="section-subtitle">
            Developer, Designer, and Esports Competitor
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Info Card */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gradient mb-6">Personal Info</h3>
            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-dark-400 font-medium">{info.label}</span>
                  <span className="text-white font-semibold">{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Card */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gradient mb-6">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-primary-600/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium hover:bg-primary-600/30 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Esports Team Card */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gradient mb-2">
              Esports: 𝐓𝐄𝐀𝐌 𝐊𝐑𝐘𝐎
            </h3>
            <p className="text-dark-400 mb-6">Professional Esports Team</p>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-secondary-600/20 border border-secondary-500/30 rounded-lg text-secondary-300 text-sm font-medium text-center hover:bg-secondary-600/30 transition-all duration-200"
                >
                  {member}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Description */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="card">
            <h3 className="text-2xl font-bold text-gradient mb-6">My Journey</h3>
            <p className="text-dark-300 leading-relaxed text-lg">
              With over 4 years of coding experience, I've evolved from a curious developer to a 
              multifaceted creator who bridges the gap between technology and competition. My passion 
              lies in crafting innovative digital solutions while dominating the esports arena with 
              Team KRYO. Whether it's building advanced Telegram bots, designing stunning user 
              interfaces, or strategizing in competitive gaming, I bring the same level of dedication 
              and precision to everything I do.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h4 className="font-semibold text-primary-400 mb-2">Development</h4>
                <p className="text-sm text-dark-400">Building innovative solutions with modern technologies</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-semibold text-secondary-400 mb-2">Design</h4>
                <p className="text-sm text-dark-400">Creating visually stunning and user-friendly interfaces</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="font-semibold text-accent-400 mb-2">Esports</h4>
                <p className="text-sm text-dark-400">Competing professionally with Team KRYO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
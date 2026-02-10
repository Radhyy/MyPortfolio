'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram, Linkedin, Music, Github } from 'lucide-react';

export default function ContactPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const contactCards = [
    {
      title: 'Stay in Touch',
      description: 'Reach out via email for inquiries or collaborations.',
      buttonText: 'Go to Gmail',
      buttonLink: 'mailto:raakb87@gmail.com',
      gradient: 'bg-gradient-to-br from-red-500 to-red-700',
      icon: Mail,
      iconBg: 'bg-red-900/30',
    },
    {
      title: 'Follow My Journey',
      description: 'Follow my creative journey.',
      buttonText: 'Go to Instagram',
      buttonLink: 'https://instagram.com/radhy._akbar',
      gradient: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
      icon: Instagram,
      iconBg: 'bg-orange-900/30',
    },
    {
      title: "Let's Connect",
      description: 'Connect with me professionally.',
      buttonText: 'Go to LinkedIn',
      buttonLink: 'https://linkedin.com/in/radhiyya-alea-akbar-144363384',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
      icon: Linkedin,
      iconBg: 'bg-blue-900/30',
    },
    {
      title: 'Join the Fun',
      description: 'Watch engaging and fun content.',
      buttonText: 'Go to Tiktok',
      buttonLink: 'https://tiktok.com/@radhy_akbar',
      gradient: 'bg-gradient-to-br from-gray-700 to-gray-900',
      icon: Music,
      iconBg: 'bg-gray-800/30',
    },
    {
      title: 'Explore the Code',
      description: 'Explore my open-source work.',
      buttonText: 'Go to Github',
      buttonLink: 'https://github.com/Radhyy',
      gradient: 'bg-gradient-to-br from-slate-800 to-slate-950',
      icon: Github,
      iconBg: 'bg-slate-900/30',
    },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Contact
          </h1>
          <p className={`text-base lg:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's get in touch.
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px mb-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />

        {/* Social Media Section */}
        <h2 className={`text-xl lg:text-2xl font-bold mb-6 lg:mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Find me on social media
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <a
                key={index}
                href={card.buttonLink}
                target={card.buttonLink.startsWith('http') ? '_blank' : '_self'}
                rel={card.buttonLink.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`${card.gradient} rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
              >
                {/* Background Icon (Tilted Shadow) */}
                <div className="absolute -right-8 -bottom-8 opacity-20">
                  <Icon 
                    size={200} 
                    className="transform rotate-12 text-white/40"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {card.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group-hover:gap-3">
                      {card.buttonText}
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </button>

                    {/* Icon Badge */}
                    <div className={`${card.iconBg} backdrop-blur-sm p-4 rounded-2xl`}>
                      <Icon size={40} className="text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

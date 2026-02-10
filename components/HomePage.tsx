'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, MessageCircle } from 'lucide-react';
import { 
  SiHtml5, SiCss3, SiBootstrap, SiTailwindcss, SiJavascript, SiTypescript,
  SiReact, SiVite, SiAstro, SiPrisma, SiNpm, SiVsco,
  SiSupabase, SiNextdotjs, SiNestjs,
  SiGraphql, SiPostgresql, SiMysql, SiFirebase, SiDocker,
  SiRedis, SiGithub, SiGoogle, SiLinux, SiDebian, SiNginx, SiApache,
  SiCloudflare, SiGooglecloud, SiGit, SiLaravel, SiPython, SiWakatime, SiPhp,
  SiClaude
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import { BsRobot } from 'react-icons/bs';

const techIcons = [
  // Row 1
  { name: 'HTML5', color: 'from-orange-500 to-orange-600', icon: SiHtml5, text: 'white' },
  { name: 'CSS3', color: 'from-blue-500 to-blue-600', icon: SiCss3, text: 'white' },
  { name: 'Bootstrap', color: 'from-purple-500 to-purple-600', icon: SiBootstrap, text: 'white' },
  { name: 'Tailwind', color: 'from-cyan-400 to-cyan-500', icon: SiTailwindcss, text: 'white' },
  { name: 'JavaScript', color: 'from-yellow-400 to-yellow-500', icon: SiJavascript, text: 'gray-900' },
  { name: 'TypeScript', color: 'from-blue-600 to-blue-700', icon: SiTypescript, text: 'white' },
  { name: 'React', color: 'from-cyan-400 to-cyan-500', icon: SiReact, text: 'white' },
  { name: 'Vite', color: 'from-purple-500 to-purple-600', icon: SiVite, text: 'white' },
  { name: 'Astro', color: 'from-purple-600 to-purple-700', icon: SiAstro, text: 'white' },
  { name: 'Framer', color: 'from-gray-700 to-gray-800', icon: TbBrandFramerMotion, text: 'white' },
  { name: 'Shield', color: 'from-gray-600 to-gray-700', icon: RiShieldKeyholeFill, text: 'white' },
  
  // Row 2
  { name: 'NPM', color: 'from-red-500 to-red-600', icon: SiNpm, text: 'white' },
  { name: 'VSCode', color: 'from-blue-500 to-blue-600', icon: SiVsco, text: 'white' },
  { name: 'Supabase', color: 'from-green-500 to-green-600', icon: SiSupabase, text: 'white' },
  { name: 'Next.js', color: 'from-gray-800 to-gray-900', icon: SiNextdotjs, text: 'white' },
  { name: 'Nest.js', color: 'from-red-600 to-red-700', icon: SiNestjs, text: 'white' },
  { name: 'Linux', color: 'from-yellow-500 to-yellow-600', icon: SiLinux, text: 'gray-900' },
  { name: 'Debian', color: 'from-red-600 to-red-700', icon: SiDebian, text: 'white' },
  { name: 'Nginx', color: 'from-green-600 to-green-700', icon: SiNginx, text: 'white' },
  { name: 'Apache', color: 'from-red-500 to-red-600', icon: SiApache, text: 'white' },
  { name: 'Cloudflare', color: 'from-orange-500 to-orange-600', icon: SiCloudflare, text: 'white' },
  { name: 'GCP', color: 'from-blue-500 to-blue-600', icon: SiGooglecloud, text: 'white' },
  { name: 'Git', color: 'from-orange-600 to-orange-700', icon: SiGit, text: 'white' },
  
  // Row 3
  { name: 'GraphQL', color: 'from-pink-500 to-pink-600', icon: SiGraphql, text: 'white' },
  { name: 'Laravel', color: 'from-red-500 to-red-600', icon: SiLaravel, text: 'white' },
  { name: 'Python', color: 'from-blue-500 to-yellow-500', icon: SiPython, text: 'white' },
  { name: 'PHP', color: 'from-indigo-600 to-indigo-700', icon: SiPhp, text: 'white' },
  { name: 'Claude', color: 'from-orange-500 to-orange-600', icon: SiClaude, text: 'white' },
  { name: 'WakaTime', color: 'from-gray-700 to-gray-800', icon: SiWakatime, text: 'white' },
  { name: 'PostgreSQL', color: 'from-blue-600 to-blue-700', icon: SiPostgresql, text: 'white' },
  { name: 'MySQL', color: 'from-teal-600 to-teal-700', icon: SiMysql, text: 'white' },
  { name: 'Firebase', color: 'from-yellow-500 to-yellow-600', icon: SiFirebase, text: 'white' },
  { name: 'Supabase2', color: 'from-green-600 to-green-700', icon: SiSupabase, text: 'white' },
  { name: 'Docker', color: 'from-blue-500 to-blue-600', icon: SiDocker, text: 'white' },
  { name: 'Redis', color: 'from-red-600 to-red-700', icon: SiRedis, text: 'white' },
  { name: 'GitHub', color: 'from-purple-600 to-purple-700', icon: SiGithub, text: 'white' },
  { name: 'Google', color: 'from-gray-200 to-gray-300', icon: SiGoogle, text: 'gray-900' },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16">
      <div className="max-w-4xl">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Hi, I'm Radhiyya Alea Akbar
        </h1>

        {/* Location Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>{t('basedIn')}</span>
          </div>
          <div className="flex items-center gap-2">
            • <span>{t('onsite')}</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>{t('intro')}</p>
          <p>{t('focus')}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-4">
            <svg 
              className="w-6 h-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <h2 className="text-3xl font-bold">{t('skills')}</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('skillsSubtitle')}
          </p>

          {/* Tech Stack Icons */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-4 mb-16">
            {techIcons.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={index}
                  className="group relative flex items-center justify-center"
                  title={tech.name}
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full ring-4 ring-gray-800/50 dark:ring-gray-700/50 group-hover:ring-gray-700/70 transition-all duration-300"></div>
                  
                  {/* Colored background circle */}
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 cursor-pointer relative z-10`}>
                    {/* Icon with white/transparent color */}
                    <IconComponent 
                      size={26} 
                      className={`${tech.text === 'white' ? 'text-white' : 'text-gray-900'} drop-shadow-sm`}
                    />
                  </div>
                  
                  {/* Hover effect - glow */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}></div>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Github size={24} />
            </a>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

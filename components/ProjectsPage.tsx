'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { projects, Project } from '@/lib/projects';
import { Search, X, ExternalLink, Github, Folder } from 'lucide-react';
import Link from 'next/link';
import { 
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiFirebase, SiSupabase, SiVercel, SiDocker, SiKotlin,
  SiAndroid, SiFlutter, SiGo, SiPython, SiDjango,
  SiVuedotjs, SiAngular, SiSvelte, SiRedis, SiGraphql,
  SiPrisma, SiNestjs, SiLaravel, SiPhp
} from 'react-icons/si';

// Tech stack icon mapping
const techIcons: Record<string, React.ReactNode> = {
  'TypeScript': <SiTypescript />,
  'JavaScript': <SiJavascript />,
  'React': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js': <SiNodedotjs />,
  'Express': <SiExpress />,
  'MongoDB': <SiMongodb />,
  'PostgreSQL': <SiPostgresql />,
  'MySQL': <SiMysql />,
  'Firebase': <SiFirebase />,
  'Supabase': <SiSupabase />,
  'Vercel': <SiVercel />,
  'Docker': <SiDocker />,
  'Kotlin': <SiKotlin />,
  'Android': <SiAndroid />,
  'Flutter': <SiFlutter />,
  'Go': <SiGo />,
  'Python': <SiPython />,
  'Django': <SiDjango />,
  'Vue.js': <SiVuedotjs />,
  'Angular': <SiAngular />,
  'Svelte': <SiSvelte />,
  'Redis': <SiRedis />,
  'GraphQL': <SiGraphql />,
  'Prisma': <SiPrisma />,
  'NestJS': <SiNestjs />,
  'Laravel': <SiLaravel />,
  'PHP': <SiPhp />,
};

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStack, setSelectedStack] = useState<string>('');
  const allStacks = Array.from(new Set(projects.flatMap((project) => project.stacks))).sort();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStack = !selectedStack || project.stacks.includes(selectedStack);

    return matchesSearch && matchesStack;
  });

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('projects')}</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-8`}>
            {t('projectsSubtitle')}
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder={t('searchProjects')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Stack Filter */}
            <select
              value={selectedStack}
              onChange={(e) => setSelectedStack(e.target.value)}
              className={`px-4 py-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px]`}
            >
              <option value="">{t('filterByStack')}</option>
              {allStacks.map(stack => (
                <option key={stack} value={stack}>{stack}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group cursor-pointer rounded-2xl overflow-hidden border ${
                  theme === 'dark'
                    ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
                    : 'bg-gray-100/50 border-gray-200/50 hover:bg-gray-100/80'
                } transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full flex items-center gap-1">
                        ⭐ {t('featured')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Icons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stacks.slice(0, 6).map((stack, index) => (
                      <div
                        key={index}
                        className={`text-2xl ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        } hover:text-orange-500 transition-colors`}
                        title={stack}
                      >
                        {techIcons[stack] || <Folder size={24} />}
                      </div>
                    ))}
                    {project.stacks.length > 6 && (
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      } self-center`}>
                        +{project.stacks.length - 6}
                      </span>
                    )}
                  </div>

                  {/* View More Badge */}
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                      theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      View Details
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className={`text-center py-16 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Folder size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">{t('noProjects')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

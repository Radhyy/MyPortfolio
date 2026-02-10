'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase, Project } from '@/lib/supabase';
import { ArrowLeft, ExternalLink, Github, Folder } from 'lucide-react';
import { 
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiFirebase, SiSupabase, SiVercel, SiDocker, SiKotlin,
  SiAndroid, SiFlutter, SiGo, SiPython, SiDjango,
  SiVuedotjs, SiAngular, SiSvelte, SiRedis, SiGraphql,
  SiPrisma, SiNestjs, SiLaravel, SiPhp
} from 'react-icons/si';

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', params.slug)
          .eq('is_show', true)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16 flex items-center justify-center">
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${
            theme === 'dark' ? 'border-orange-500' : 'border-orange-600'
          }`} />
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('loading')}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16 flex items-center justify-center">
        <div className="text-center">
          <Folder size={64} className={`mx-auto mb-4 ${
            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Project not found
          </p>
          <button
            onClick={() => router.push('/projects')}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            {t('back')} to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 mb-8 ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          } transition-colors`}
        >
          <ArrowLeft size={20} />
          {t('back')}
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className={`text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {project.title}
            </h1>
            {project.is_featured && (
              <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full flex-shrink-0">
                ⭐ {t('featured')}
              </span>
            )}
          </div>
          
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-8">
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t('techStack')} : 
            <div className="flex flex-wrap gap-2 ml-2">
              {project.stacks.map((stack, index) => (
                <div
                  key={index}
                  className="text-2xl text-orange-500"
                  title={stack}
                >
                  {techIcons[stack] || <Folder size={24} />}
                </div>
              ))}
            </div>
          </h3>
        </div>

        {/* Project Image */}
        {project.image && (
          <div className="relative rounded-2xl overflow-hidden mb-8 border border-gray-700/30">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Full Content - only show if available */}
        {project.content && (
          <div className={`mb-8 p-6 rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border-gray-700/30' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } leading-relaxed whitespace-pre-wrap`}>
              {project.content}
            </div>
          </div>
        )}

        {/* Project Links */}
        {(project.link_demo || project.link_github) && (
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('projectLinks')}
            </h3>
            <div className="flex flex-wrap gap-4">
              {project.link_demo && (
                <a
                  href={project.link_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all hover:scale-105 font-medium shadow-lg shadow-orange-500/20"
                >
                  <ExternalLink size={20} />
                  {t('viewDemo')}
                </a>
              )}
              {project.link_github && (
                <a
                  href={project.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <Github size={20} />
                  {t('viewGithub')}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

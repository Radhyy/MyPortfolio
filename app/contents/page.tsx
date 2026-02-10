'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Meteors } from '@/components/Meteors';

export default function ContentsPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Contents
          </h1>
          <p className={`text-base lg:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Articles, tutorials, and more.
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px mb-8 lg:mb-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />

        {/* Meteor Section */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          <Meteors number={30} />
          <span className={`pointer-events-none bg-gradient-to-b bg-clip-text text-center text-6xl lg:text-8xl leading-none font-bold whitespace-pre-wrap text-transparent ${
            theme === 'dark' 
              ? 'from-white to-slate-900/10' 
              : 'from-black to-gray-300/80'
          }`}>
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

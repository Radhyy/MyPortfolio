'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft, Folder } from 'lucide-react';

export default function AddProjectPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16 flex items-center justify-center">
      <div
        className={`w-full max-w-xl rounded-3xl border p-8 text-center ${
          theme === 'dark' ? 'bg-gray-900/60 border-gray-700/30' : 'bg-white border-gray-200'
        }`}
      >
        <Folder size={56} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Project data is now static
        </h1>
        <p className={`mt-3 text-base leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          The Supabase project API has been closed, so project content is now maintained as local static data.
        </p>
        <button
          onClick={() => router.push('/projects')}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </button>
      </div>
    </div>
  );
}

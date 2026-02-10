'use client';

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Sidebar from "@/components/Sidebar";
import ScrollProgress from "@/components/ScrollProgress";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollProgress />
        <div className="flex min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-[380px] transition-all duration-300">
            {children}
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

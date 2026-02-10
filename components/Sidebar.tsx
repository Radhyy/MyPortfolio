'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  User, 
  FileText, 
  Award, 
  Folder, 
  BarChart3, 
  MessageCircle, 
  Mail,
  Sun,
  Moon,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/about', icon: User },
  { key: 'contents', href: '/contents', icon: FileText },
  { key: 'achievements', href: '/achievements', icon: Award },
  { key: 'projects', href: '/projects', icon: Folder },
  { key: 'dashboard', href: '/dashboard', icon: BarChart3 },
  { key: 'chatRoom', href: '/chat-room', icon: MessageCircle },
  { key: 'contact', href: '/contact', icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-[260px] lg:w-[340px] bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Profile Section */}
      <div className="p-8 border-b border-gray-200 dark:border-gray-800">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
            RA
          </div>
        </div>

        {/* Name and Username */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            Radhiyya Alea
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">@radhy._akbar</p>
        </div>

        {/* Language and Theme Toggle */}
        <div className="flex gap-2 justify-center">
          {/* Language Toggle */}
          <div
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            <span>{language.toUpperCase()}</span>
            <ChevronRight size={16} />
            <span>{language === 'en' ? 'ID' : 'EN'}</span>
          </div>

          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            <ChevronRight size={16} />
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all ${
                isActive
                  ? 'bg-gray-200 dark:bg-dark-hover text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover'
              }`}
            >
              <Icon size={20} />
              <span className="flex-1">{t(item.key)}</span>
              {isActive && <ChevronRight size={18} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>{t('copyright')}</p>
        <p>{t('rights')}</p>
      </div>
    </aside>
    </>
  );
}

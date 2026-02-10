'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'home': 'Home',
    'about': 'About',
    'contents': 'Contents',
    'achievements': 'Achievements',
    'projects': 'Projects',
    'dashboard': 'Dashboard',
    'chatRoom': 'Chat Room',
    'contact': 'Contact',
    'basedIn': 'Based in Sidoarjo, Indonesia 🇮🇩',
    'onsite': 'Onsite',
    'intro': "A Full-Stack Software Engineer and coding content creator dedicated to building impactful digital solutions. I specialize in developing scalable web platforms and mobile applications using a modern tech stack, including Next.js, TypeScript, and cloud-based technologies.",
    'focus': "My focus is on designing software architectures that are well-structured, maintainable, and aligned with business objectives. I combine strong technical expertise with proactive communication, leadership, and cloud engineering practices to ensure every project delivers logical clarity, system efficiency, and meaningful real-world impact.",
    'skills': 'Skills',
    'skillsSubtitle': 'My professional skills.',
    'copyright': 'COPYRIGHT © 2026',
    'rights': 'RadhiyyaAlea. All rights reserved.',
    
    // About Page
    'aboutSubtitle': 'A brief introduction to who I am.',
    'aboutPara1': "I'm Radhiyya Alea Akbar, a Jambi-based Full-Stack Developer and Cloud Engineer passionate about building scalable, impactful digital solutions. I work across the full development lifecycle—designing robust backend systems, crafting responsive frontends, and deploying reliable cloud-based infrastructures.",
    'aboutPara2': "My expertise spans modern web and application technologies, with a strong focus on clean architecture, maintainable code, and performance-driven systems. I believe great software is not just functional, but thoughtfully structured, secure, and aligned with real business needs.",
    'aboutPara3': "With a background in cloud computing, I design and manage infrastructure that is efficient, scalable, and production-ready. I enjoy optimizing systems, improving deployment workflows, and ensuring applications run smoothly in real-world environments.",
    'aboutPara4': "Beyond technical skills, I value proactive communication, critical problem-solving, and effective time management. I thrive in collaborative teams, take ownership of my work, and aim to deliver solutions that create measurable impact and long-term value.",
    'bestRegards': 'Best regards,',
    'education': 'Education',
    'educationSubtitle': 'My educational journey.',
    'smkTelkom': 'SMK Telkom Sidoarjo',
    'smkTelkomDegree': 'Sistem Informasi Jaringan Aplikasi (SIJA)',
    'smkTelkomYear': '2024 - Now',
    'smkTelkomLocation': 'Sidoarjo, Jawa Timur 🇮🇩',
    'mtss': 'MTSS Darul Hikmah',
    'mtssDegree': 'Pondok Modern',
    'mtssYear': '2021 - 2024',
    'mtssLocation': 'Tulungagung, Jawa Timur 🇮🇩',
    
    // Achievements Page
    'achievementsSubtitle': 'A curated collection of certificates and badges I\'ve earned throughout my professional and academic journey.',
    
    // Projects Page
    'projectsSubtitle': 'A showcase of both private and open-source projects I\'ve built or contributed to.',
    'featured': 'Featured',
    'allProjects': 'All Projects',
    'searchProjects': 'Search projects...',
    'filterByStack': 'Filter by Stack',
    'viewDemo': 'View Demo',
    'viewGithub': 'View GitHub',
    'viewDetails': 'View Details',
    'back': 'Back',
    'techStack': 'Tech Stack',
    'projectLinks': 'Project Links',
    'noProjects': 'No projects found',
    'loading': 'Loading...',
  },
  id: {
    'home': 'Beranda',
    'about': 'Tentang',
    'contents': 'Konten',
    'achievements': 'Pencapaian',
    'projects': 'Proyek',
    'dashboard': 'Dasbor',
    'chatRoom': 'Ruang Obrolan',
    'contact': 'Kontak',
    'basedIn': 'Berdomisili di Sidoarjo, Indonesia 🇮🇩',
    'onsite': 'Onsite',
    'intro': "Seorang Full-Stack Software Engineer dan pembuat konten coding yang berdedikasi untuk membangun solusi digital yang berdampak. Saya mengkhususkan diri dalam mengembangkan platform web yang scalable dan aplikasi mobile menggunakan tech stack modern, termasuk Next.js, TypeScript, dan teknologi berbasis cloud.",
    'focus': "Fokus saya adalah merancang arsitektur software yang terstruktur dengan baik, maintainable, dan selaras dengan tujuan bisnis. Saya menggabungkan keahlian teknis yang kuat dengan komunikasi proaktif, kepemimpinan, dan praktik cloud engineering untuk memastikan setiap proyek memberikan kejelasan logis, efisiensi sistem, dan dampak nyata yang bermakna.",
    'skills': 'Keahlian',
    'skillsSubtitle': 'Keahlian profesional saya.',
    'copyright': 'HAK CIPTA © 2026',
    'rights': 'RadhiyyaAlea. Semua hak dilindungi.',
    
    // About Page
    'aboutSubtitle': 'Perkenalan singkat tentang siapa saya.',
    'aboutPara1': "Saya Radhiyya Alea Akbar, seorang Full-Stack Developer dan Cloud Engineer yang berbasis di Jambi dengan passion membangun solusi digital yang scalable dan berdampak. Saya bekerja di seluruh siklus pengembangan—merancang sistem backend yang robust, membuat frontend yang responsif, dan men-deploy infrastruktur berbasis cloud yang andal.",
    'aboutPara2': "Keahlian saya mencakup teknologi web dan aplikasi modern, dengan fokus kuat pada arsitektur yang bersih, kode yang maintainable, dan sistem yang performance-driven. Saya percaya software yang hebat tidak hanya fungsional, tetapi juga terstruktur dengan baik, aman, dan selaras dengan kebutuhan bisnis nyata.",
    'aboutPara3': "Dengan latar belakang di cloud computing, saya merancang dan mengelola infrastruktur yang efisien, scalable, dan production-ready. Saya menikmati mengoptimalkan sistem, meningkatkan alur deployment, dan memastikan aplikasi berjalan lancar di lingkungan dunia nyata.",
    'aboutPara4': "Di luar keterampilan teknis, saya menghargai komunikasi proaktif, pemecahan masalah kritis, dan manajemen waktu yang efektif. Saya berkembang dalam tim kolaboratif, mengambil kepemilikan atas pekerjaan saya, dan bertujuan memberikan solusi yang menciptakan dampak terukur dan nilai jangka panjang.",
    'bestRegards': 'Salam hormat,',
    'education': 'Pendidikan',
    'educationSubtitle': 'Perjalanan pendidikan saya.',
    'smkTelkom': 'SMK Telkom Sidoarjo',
    'smkTelkomDegree': 'Sistem Informasi Jaringan Aplikasi (SIJA)',
    'smkTelkomYear': '2024 - Sekarang',
    'smkTelkomLocation': 'Sidoarjo, Jawa Timur 🇮🇩',
    'mtss': 'MTSS Darul Hikmah',
    'mtssDegree': 'Pondok Modern',
    'mtssYear': '2021 - 2024',
    'mtssLocation': 'Tulungagung, Jawa Timur 🇮🇩',
    
    // Achievements Page
    'achievementsSubtitle': 'Koleksi kurasi sertifikat dan lencana yang saya peroleh sepanjang perjalanan profesional dan akademis saya.',
    
    // Projects Page
    'projectsSubtitle': 'Pameran proyek privat dan open-source yang telah saya bangun atau kontribusikan.',
    'featured': 'Unggulan',
    'allProjects': 'Semua Proyek',
    'searchProjects': 'Cari proyek...',
    'filterByStack': 'Filter berdasarkan Stack',
    'viewDemo': 'Lihat Demo',
    'viewGithub': 'Lihat GitHub',
    'viewDetails': 'Lihat Detail',
    'back': 'Kembali',
    'techStack': 'Tech Stack',
    'projectLinks': 'Link Proyek',
    'noProjects': 'Tidak ada proyek ditemukan',
    'loading': 'Memuat...',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prevLang => {
      const newLang = prevLang === 'en' ? 'id' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

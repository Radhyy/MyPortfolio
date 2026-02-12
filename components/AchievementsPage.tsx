'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useMemo, useEffect } from 'react';
import { Award, Search, X } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  type: string;
  category: string;
}

export default function AchievementsPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const certificates: Certificate[] = [
    {
      id: '196/EKS/HCLGA/ATI/VIII/2025',
      title: 'Lomba Baris Berbaris Pandawa',
      issuer: 'LKBB Pandawa 2024',
      date: 'July 2024',
      credentialId: '196/EKS/HCLGA/ATI/VIII/2025',
      image: '/certificates/Lomba Baris Berbaris Pandawa.png',
      type: 'Professional',
      category: 'Backend'
    },
    {
      id: 'LKBB-SEJATI',
      title: 'Lomba Baris Berbaris Sejati',
      issuer: 'Panitia Kegiatan LKBB Sejati II 2024',
      date: 'September 2025',
      image: '/certificates/Lomba Baris Berbaris Sejati.png',
      type: 'Competition',
      category: 'Other'
    },
    {
      id: 'AZURE-CERT',
      title: 'Microsoft Azure Certificates',
      issuer: 'Microsoft',
      date: 'August 2025',
      image: '/certificates/Microsoft Azure Certificates.jpg',
      type: 'Professional',
      category: 'Cloud'
    },
    {
      id: 'KOMPAS-INFO-2025',
      title: 'Olimpiade Informatika - KOMPAS 2025',
      issuer: 'KOMPAS Organization',
      date: 'January 2025',
      image: '/certificates/Olimpiade_Informatika - KOMPAS 2025_page-0001.jpg',
      type: 'Competition',
      category: 'Informatics'
    },
    {
      id: 'OSN-INFO-2025',
      title: 'Olimpiade Informatika - OSN 2025',
      issuer: 'Olimpiade Sains Nasional',
      date: 'February 2025',
      image: '/certificates/Olimpiade_Informatika - OSN 2025_page-0001.jpg',
      type: 'Competition',
      category: 'Informatics'
    },
    {
      id: 'OSSN-INFO-2025',
      title: 'Olimpiade Informatika - OSSN 2025',
      issuer: 'Olimpiade Sains Sekolah Nasional',
      date: 'March 2025',
      image: '/certificates/Olimpiade_Informatika - OSSN 2025_page-0001.jpg',
      type: 'Competition',
      category: 'Informatics'
    },
    {
      id: 'KOMPAS-PKN-2025',
      title: 'Olimpiade PKN - KOMPAS 2025',
      issuer: 'KOMPAS Organization',
      date: 'January 2025',
      image: '/certificates/Olimpiade_PKN - KOMPAS 2025_page-0001 (2).jpg',
      type: 'Competition',
      category: 'Civics'
    },
    {
      id: 'OSSN-PKN-2025',
      title: 'Olimpiade PKN - OSSN 2025',
      issuer: 'Olimpiade Sains Sekolah Nasional',
      date: 'March 2025',
      image: '/certificates/Olimpiade_PKN - OSSN 2025 (1)_page-0001.jpg',
      type: 'Competition',
      category: 'Civics'
    },
    {
      id: 'KOMPAS-SEJARAH-2025',
      title: 'Olimpiade Sejarah - KOMPAS 2025',
      issuer: 'KOMPAS Organization',
      date: 'January 2025',
      image: '/certificates/Olimpiade_Sejarah - KOMPAS 2025_page-0001.jpg',
      type: 'Competition',
      category: 'History'
    },
    {
      id: 'OSN-SEJARAH-2025',
      title: 'Olimpiade Sejarah - OSN 2025',
      issuer: 'Olimpiade Sains Nasional',
      date: 'February 2025',
      image: '/certificates/Olimpiade_Sejarah - OSN 2025_page-0001.jpg',
      type: 'Competition',
      category: 'History'
    },
    {
      id: 'AI-TRAINING',
      title: 'Pelatihan Artificial Intelligence',
      issuer: 'AI Training Center',
      date: 'May 2024',
      image: '/certificates/Pelatihan Artifisial Intelegent.jpg',
      type: 'Training',
      category: 'AI/ML'
    },
    {
      id: 'CYBER-SEC',
      title: 'Sertifikat Attendance Pelatihan Cyber Security',
      issuer: 'Cyber Security Institute',
      date: 'April 2024',
      image: '/certificates/Sertifikat Attendance Pelatihan Cyber Security.pdf.png',
      type: 'Training',
      category: 'Security'
    },
    {
      id: 'COMP-THINK',
      title: 'Computational Thinking - Cara Berpikir Logis untuk Mengatasi Masalah (Jenjang SMA)',
      issuer: 'Dicoding Indonesia',
      date: 'March 2024',
      image: '/certificates/Sertifikat_RADHIYYA ALEA AKBAR_Computational Thinking _ Cara Berpikir Logis untuk Mengatasi Masalah (Jenjang SMA)-images-0.jpg',
      type: 'Course',
      category: 'Logic'
    },
    {
      id: 'DASAR-AI',
      title: 'Dasar-Dasar Implementasi Kecerdasan Artifisial',
      issuer: 'Dicoding Indonesia',
      date: 'February 2024',
      image: '/certificates/Sertifikat_RADHIYYA ALEA AKBAR_Dasar-Dasar Implementasi Kecerdasan Artifisial-images-0 - Copy.jpg',
      type: 'Course',
      category: 'AI/ML'
    },
    {
      id: 'ASPEK-AI',
      title: 'Memahami Aspek Pengembangan Produk AI',
      issuer: 'Dicoding Indonesia',
      date: 'January 2024',
      image: '/certificates/Sertifikat_RADHIYYA ALEA AKBAR_Memahami Aspek Pengembangan Produk AI-images-0.jpg',
      type: 'Course',
      category: 'AI/ML'
    },
    {
      id: 'SMART-TELKOM',
      title: 'SMART TELKOM FINALIS - Web Programming',
      issuer: 'SMART TELKOM',
      date: 'December 2023',
      image: '/certificates/SMART TELKOM FINALIS_Web Programing.jpg',
      type: 'Competition',
      category: 'Web Development'
    },
    {
      id: 'WORDPRESS',
      title: 'WordPress Certificates',
      issuer: 'WordPress Training',
      date: 'November 2023',
      image: '/certificates/Wordpress Certivicates-compressed.jpg',
      type: 'Course',
      category: 'CMS'
    },
    {
      id: 'AWS-S3-BASIC',
      title: 'AWS S3 Basic Certificates',
      issuer: 'Amazon Web Services',
      date: 'October 2024',
      image: '/certificates/Aws S3 Basic Certificates.jpg',
      type: 'Professional',
      category: 'Cloud'
    },
    {
      id: 'WORDPRESS-FULLSITE',
      title: 'Build a Full Website Using WordPress Certificates',
      issuer: 'WordPress Training',
      date: 'September 2024',
      image: '/certificates/Build a Full Website Using Wordprees Certificates.jpg',
      type: 'Course',
      category: 'CMS'
    },
    {
      id: 'GLIDE-APP',
      title: 'Build App With Google Sheets On Glide Certificates',
      issuer: 'Glide Academy',
      date: 'August 2024',
      image: '/certificates/Build App With Google Sheets On Glide Certificates.jpg',
      type: 'Course',
      category: 'No-Code'
    },
    {
      id: 'GOOGLE-ADS',
      title: 'Google Ads Certificates',
      issuer: 'Google',
      date: 'July 2024',
      image: '/certificates/Google Ads Certificates.jpg',
      type: 'Professional',
      category: 'Marketing'
    },
    {
      id: 'MS-EXCEL',
      title: 'Microsoft Excel Certificates',
      issuer: 'Microsoft',
      date: 'June 2024',
      image: '/certificates/Microsoft Excel Certificates.jpg',
      type: 'Professional',
      category: 'Productivity'
    },
    {
      id: 'SEO-OPT',
      title: 'SEO Optimization Certificates',
      issuer: 'SEO Training Institute',
      date: 'May 2024',
      image: '/certificates/SEO Optimazion Certificates.jpg',
      type: 'Course',
      category: 'Marketing'
    }
  ];

  const types = ['All', 'Course', 'Professional', 'Competition', 'Training'];
  const categories = ['All', 'Backend', 'Cloud', 'Informatics', 'Civics', 'History', 'AI/ML', 'Security', 'Logic', 'Web Development', 'CMS', 'No-Code', 'Marketing', 'Productivity', 'Other'];

  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || cert.type === selectedType;
      const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8">
      {/* Header Section */}
      <div className="mb-8 animate-fadeIn">
        <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t('achievements')}
        </h1>
        <p className={`text-base max-w-4xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('achievementsSubtitle')}
        </p>
        <div className={`w-full h-px bg-gradient-to-r mt-6 ${theme === 'dark' ? 'from-gray-800 via-gray-700' : 'from-gray-300 via-gray-200'} to-transparent`}></div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 animate-slideUp">
        {/* Search and Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative w-full lg:flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition-all ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-white placeholder-gray-500 focus:ring-gray-700 focus:border-gray-700'
                  : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-gray-300 focus:border-gray-300'
              }`}
            />
          </div>

          {/* Type Filter */}
          <div className="relative w-full lg:w-[200px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`w-full rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-white focus:ring-gray-700 focus:border-gray-700'
                  : 'bg-white border border-gray-200 text-gray-900 focus:ring-gray-300 focus:border-gray-300'
              }`}
            >
              {types.map(type => (
                <option key={type} value={type} className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>
                  {type === 'All' ? 'Filter by Type' : type}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative w-full lg:w-[220px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 text-white focus:ring-gray-700 focus:border-gray-700'
                  : 'bg-white border border-gray-200 text-gray-900 focus:ring-gray-300 focus:border-gray-300'
              }`}
            >
              {categories.map(category => (
                <option key={category} value={category} className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>
                  {category === 'All' ? 'Filter by Category' : category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total: <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{filteredCertificates.length}</span>
          </p>
          {(searchQuery || selectedType !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedCategory('All');
              }}
              className={`text-xs transition-colors flex items-center gap-1 ${
                theme === 'dark' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-slideUp">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden animate-pulse ${
                theme === 'dark' ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-gray-200'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`h-40 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}`}></div>
              <div className="p-4 space-y-2.5">
                <div>
                  <div className={`h-4 rounded w-3/4 mb-2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}`}></div>
                  <div className={`h-3 rounded w-1/2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex items-center justify-between pt-2.5 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
                  <div className={`h-3 rounded w-20 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}`}></div>
                  <div className={`h-3 rounded w-16 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-200'}`}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCertificate(cert)}
              className={`group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-800 hover:border-gray-700 hover:shadow-xl hover:shadow-black/30'
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50'
              }`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className={`relative h-40 overflow-hidden ${theme === 'dark' ? 'bg-neutral-950' : 'bg-gray-100'}`}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  theme === 'dark' ? 'from-neutral-900/80' : 'from-white/80'
                }`} />
                <div className="absolute top-2.5 right-2.5">
                  <span className={`px-2.5 py-1 backdrop-blur-sm border rounded-md text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-black/60 border-neutral-700/50 text-gray-300'
                      : 'bg-white/60 border-gray-300/50 text-gray-700'
                  }`}>
                    {cert.type}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2.5">
                <div>
                  <h3 className={`font-semibold text-sm line-clamp-2 transition-colors mb-1.5 leading-snug ${
                    theme === 'dark' ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-gray-700'
                  }`}>
                    {cert.title}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    {cert.issuer}
                  </p>
                </div>
                <div className={`flex items-center justify-between pt-2.5 border-t ${
                  theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'
                }`}>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    {cert.date}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                    {cert.category}
                  </div>
                </div>
                {cert.credentialId && (
                  <div className={`pt-2 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
                    <p className="text-xs">
                      <span className={`font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{cert.credentialId}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && filteredCertificates.length === 0 && (
        <div className="text-center py-16">
          <Award className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}`} />
          <h3 className={`text-base mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>No certificates found</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className={`rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-slideUp ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex-1 flex items-center justify-center p-4 md:p-6 ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
              {selectedCertificate.image.endsWith('.pdf') ? (
                <div className="w-full h-full flex items-center justify-center">
                  <iframe
                    src={selectedCertificate.image}
                    className="w-full h-[600px] rounded-lg"
                    title={selectedCertificate.title}
                  />
                </div>
              ) : (
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[700px] object-contain"
                />
              )}
            </div>
            <div className={`w-full md:w-[380px] flex flex-col ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
            }`}>
              <div className={`p-5 border-b flex items-start justify-between ${
                theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'
              }`}>
                <div className="flex-1 pr-4">
                  <h2 className={`text-lg font-bold mb-1.5 leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedCertificate.title}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{selectedCertificate.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className={`transition-colors p-1.5 rounded-lg flex-shrink-0 ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-neutral-800'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                {selectedCertificate.credentialId && (
                  <div className={`border rounded-lg p-4 ${
                    theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`text-xs mb-2 uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                    }`}>Credential ID</p>
                    <p className={`text-sm font-medium font-mono break-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedCertificate.credentialId}
                    </p>
                  </div>
                )}
                <div className={`border rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-xs mb-2 uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                  }`}>Type</p>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{selectedCertificate.type}</p>
                </div>
                <div className={`border rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-xs mb-2 uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                  }`}>Category</p>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{selectedCertificate.category}</p>
                </div>
                <div className={`border rounded-lg p-4 ${
                  theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-xs mb-2 uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                  }`}>Issue Date</p>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{selectedCertificate.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

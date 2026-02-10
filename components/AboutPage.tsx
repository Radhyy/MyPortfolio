'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-8 lg:p-16">
      <div className="max-w-4xl">
        {/* About Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('about')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {t('aboutSubtitle')}
          </p>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            <p>{t('aboutPara1')}</p>
            <p>{t('aboutPara2')}</p>
            <p>{t('aboutPara3')}</p>
            <p>{t('aboutPara4')}</p>
          </div>

          {/* Signature */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t('bestRegards')}</p>
            <div className="relative w-32 h-16">
              <Image
                src="/signature.png"
                alt="Radhiyya Signature"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap size={28} />
            <h2 className="text-3xl font-bold">{t('education')}</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('educationSubtitle')}
          </p>

          {/* Education Items */}
          <div className="space-y-6">
            {/* SMK Telkom Sidoarjo */}
            <div className="flex gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/school/LogoSmkTelkomSidoarjo.png"
                    alt="SMK Telkom Sidoarjo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('smkTelkom')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {t('smkTelkomDegree')}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-500">
                  <span>{t('smkTelkomYear')}</span>
                  <span>•</span>
                  <span>{t('smkTelkomLocation')}</span>
                </div>
              </div>
            </div>

            {/* MTSS Darul Hikmah */}
            <div className="flex gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/school/DarulHikmah.png"
                    alt="MTSS Darul Hikmah"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{t('mtss')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {t('mtssDegree')}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-500">
                  <span>{t('mtssYear')}</span>
                  <span>•</span>
                  <span>{t('mtssLocation')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Globe, Clock, Code, Award, Keyboard, Loader2, Github, Mail, MessageCircle, FileText, Zap, Database
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { AnimatedBeam } from '@/components/AnimatedBeam';
import { cn } from '@/lib/utils';

// Disable static generation for this page
export const dynamic = 'force-dynamic';

interface GithubData {
  totalContributions: number;
  thisWeek: number;
  average: number;
  weeks: Array<Array<{ count: number; date: string }>>;
}

interface UmamiData {
  pageViews: number;
  visitors: number;
  visits: number;
  bounces: number;
  countries?: Array<{
    country: string;
    visitors: number;
  }>;
  chartData?: Array<{
    date: string;
    pageviews: number;
    visits: number;
  }>;
}

interface WakaTimeData {
  dailyAverage: string;
  totalTime: string;
  bestDay: { date: string; text: string } | null;
  languages: Array<{ name: string; percent: number; digital: string }>;
  allTime: string | null;
  range: { start: string; end: string };
}

interface MonkeytypeData {
  totalTests: number;
  bestWpm: number;
  avgWpm: number;
  bestAccuracy: number;
  avgAccuracy: number;
  rateLimited?: boolean;
  recentTests: Array<{
    wpm: number;
    accuracy: number;
    mode: string;
    duration: string;
    timestamp: number;
  }>;
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; visitors: number; x: number; y: number } | null>(null);

  const [githubData, setGithubData] = useState<GithubData | null>(null);
  const [umamiData, setUmamiData] = useState<UmamiData | null>(null);
  const [wakatimeData, setWakatimeData] = useState<WakaTimeData | null>(null);
  const [monkeytypeData, setMonkeytypeData] = useState<MonkeytypeData | null>(null);
  
  const [loading, setLoading] = useState({
    github: true,
    umami: true,
    wakatime: true,
    monkeytype: true,
  });

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setGithubData(data);
      })
      .catch(err => console.error('GitHub fetch error:', err))
      .finally(() => setLoading(prev => ({ ...prev, github: false })));

    fetch('/api/umami')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setUmamiData(data);
      })
      .catch(err => console.error('Umami fetch error:', err))
      .finally(() => setLoading(prev => ({ ...prev, umami: false })));

    fetch('/api/wakatime')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setWakatimeData(data);
      })
      .catch(err => console.error('WakaTime fetch error:', err))
      .finally(() => setLoading(prev => ({ ...prev, wakatime: false })));

    fetch('/api/monkeytype')
      .then(res => res.json())
      .then(data => {
        console.log('Monkeytype data:', data);
        if (!data.error) {
          setMonkeytypeData(data);
        } else {
          console.error('Monkeytype error:', data.error);
        }
      })
      .catch(err => console.error('Monkeytype fetch error:', err))
      .finally(() => setLoading(prev => ({ ...prev, monkeytype: false })));

    // Auto-refresh Umami stats every 30 seconds
    const umamiInterval = setInterval(() => {
      fetch('/api/umami')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setUmamiData(data);
        })
        .catch(err => console.error('Umami auto-refresh error:', err));
    }, 30000); // 30 seconds

    return () => clearInterval(umamiInterval);
  }, []);

  const getContributionColor = (count: number) => {
    if (count === 0) return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
    if (count <= 3) return 'bg-yellow-400/30';
    if (count <= 6) return 'bg-yellow-400/50';
    if (count <= 9) return 'bg-yellow-400/75';
    return 'bg-yellow-400';
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-16 p-4 lg:p-8 xl:p-16">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        <div className="mb-6 lg:mb-8">
          <h1 className={`text-2xl lg:text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Dashboard
          </h1>
          <p className={`text-sm lg:text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            My personal dashboard built with Next.js API routes, visualizing development statistics and contributions in real-time.
          </p>
        </div>

        {/* Umami */}
        <section className={`rounded-2xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-6">
            <Globe className={theme === 'dark' ? 'text-white' : 'text-gray-900'} size={24} />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Umami
            </h2>
          </div>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor real-time traffic and interactions from my portfolio site.
          </p>
          {loading.umami ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
            </div>
          ) : umamiData ? (
            <>
              {/* Debug log */}
              {console.log('Umami countries data:', umamiData.countries)}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
                <div className={`p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Page Views</p>
                  <p className="text-2xl lg:text-2xl font-bold text-yellow-400">{formatNumber(umamiData.pageViews)}</p>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Visitors</p>
                  <p className="text-2xl lg:text-2xl font-bold text-yellow-400">{formatNumber(umamiData.visitors)}</p>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Visits</p>
                  <p className="text-2xl lg:text-2xl font-bold text-yellow-400">{formatNumber(umamiData.visits)}</p>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Bounces</p>
                  <p className="text-2xl lg:text-2xl font-bold text-yellow-400">{formatNumber(umamiData.bounces)}</p>
                </div>
              </div>
              
              {/* Chart */}
              {umamiData.chartData && umamiData.chartData.length > 0 && (
                <div className={`hidden lg:block p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <h3 className={`text-base lg:text-lg font-semibold mb-3 lg:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Last 7 Days Activity
                  </h3>
                  <div className="overflow-x-auto -mx-3 lg:mx-0">
                    <div className="min-w-[420px] lg:min-w-0">
                      <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={umamiData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="date" 
                        stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                        style={{ fontSize: '12px' }}
                      />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          color: theme === 'dark' ? '#f3f4f6' : '#111827'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="visits" fill="#a3a3a3" name="Visits" />
                      <Bar dataKey="pageviews" fill="#eab308" name="Page Views" />
                    </BarChart>
                  </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* World Map */}
              {umamiData.countries && umamiData.countries.length > 0 && (
                <div className={`p-3 lg:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <h3 className={`text-base lg:text-lg font-semibold mb-3 lg:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Visitor Locations
                  </h3>
                  <div className="w-full h-[220px] lg:h-[500px] relative overflow-hidden">
                    <ComposableMap
                      projection="geoMercator"
                      projectionConfig={{
                        scale: typeof window !== 'undefined' && window.innerWidth < 1024 ? 70 : 120,
                        center: [0, 20],
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                        {({ geographies }: any) =>
                          geographies.map((geo: any) => {
                            // Country code mapping (ISO Alpha-2 to numeric ID)
                            const countryCodeMap: { [key: string]: string } = {
                              'ID': '360', // Indonesia
                              'US': '840', // United States
                              'GB': '826', // United Kingdom
                              'AU': '036', // Australia
                              'SG': '702', // Singapore
                              'MY': '458', // Malaysia
                              'JP': '392', // Japan
                              'CN': '156', // China
                              'IN': '356', // India
                              'DE': '276', // Germany
                              'FR': '250', // France
                              'CA': '124', // Canada
                            };
                            
                            // Find matching country from visitor data
                            const countryData = umamiData.countries?.find((c: any) => {
                              const visitorCode = c.country?.toUpperCase();
                              const numericId = countryCodeMap[visitorCode];
                              return numericId === geo.id;
                            });
                            
                            const isHighlighted = !!countryData;
                            
                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={isHighlighted ? '#3b82f6' : theme === 'dark' ? '#1f2937' : '#e5e7eb'}
                                stroke={theme === 'dark' ? '#374151' : '#d1d5db'}
                                strokeWidth={0.5}
                                onMouseEnter={(evt) => {
                                  if (isHighlighted && countryData) {
                                    const { clientX, clientY } = evt;
                                    setHoveredCountry({
                                      name: geo.properties.name,
                                      visitors: countryData.visitors,
                                      x: clientX,
                                      y: clientY,
                                    });
                                  }
                                }}
                                onMouseLeave={() => {
                                  setHoveredCountry(null);
                                }}
                                onMouseMove={(evt) => {
                                  if (isHighlighted && countryData) {
                                    const { clientX, clientY } = evt;
                                    setHoveredCountry({
                                      name: geo.properties.name,
                                      visitors: countryData.visitors,
                                      x: clientX,
                                      y: clientY,
                                    });
                                  }
                                }}
                                style={{
                                  default: { 
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                  },
                                  hover: { 
                                    outline: 'none',
                                    fill: isHighlighted ? '#60a5fa' : theme === 'dark' ? '#374151' : '#f3f4f6',
                                    cursor: isHighlighted ? 'pointer' : 'default',
                                    strokeWidth: isHighlighted ? 1 : 0.5,
                                    filter: isHighlighted ? 'brightness(1.1)' : 'none',
                                  },
                                  pressed: { outline: 'none' },
                                }}
                              />
                            );
                          })
                        }
                      </Geographies>
                    </ComposableMap>
                    
                    {/* Custom Tooltip */}
                    {hoveredCountry && (
                      <div
                        style={{
                          position: 'fixed',
                          left: hoveredCountry.x + 10,
                          top: hoveredCountry.y + 10,
                          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                          color: theme === 'dark' ? '#ffffff' : '#000000',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                          pointerEvents: 'none',
                          zIndex: 1000,
                          fontSize: '14px',
                          fontWeight: '500',
                          border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                        }}
                      >
                        <div>{hoveredCountry.name}</div>
                        <div style={{ color: '#3b82f6', marginTop: '4px' }}>
                          {hoveredCountry.visitors} visitor{hoveredCountry.visitors !== 1 ? 's' : ''}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {umamiData.countries.slice(0, 5).map((country, idx) => (
                      <div key={idx} className={`px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {country.country}: <strong className="text-yellow-400">{country.visitors}</strong> visitors
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className={`text-center py-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Failed to load data</p>
          )}
        </section>

        {/* GitHub */}
        <section className={`rounded-2xl border p-4 lg:p-6 ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6 gap-2">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className={`w-5 h-5 lg:w-6 lg:h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <h2 className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GitHub Contributions</h2>
            </div>
            <span className={`text-xs lg:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>@radhy._akbar</span>
          </div>
          <p className={`mb-4 lg:mb-6 text-sm lg:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>My GitHub activity over the past year.</p>
          {loading.github ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
            </div>
          ) : githubData ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                <div className={`p-3 lg:p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-400">{githubData.totalContributions}</p>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>This week</p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-400">{githubData.thisWeek}</p>
                </div>
                <div className={`p-3 lg:p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-xs lg:text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average</p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-400">{githubData.average} <span className="text-base lg:text-lg">/day</span></p>
                </div>
              </div>
              <div className="hidden lg:block overflow-x-auto pb-4 -mx-3 lg:mx-0">
                <div className="inline-flex gap-1 min-w-max px-3 lg:px-0">
                  {githubData.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm ${getContributionColor(day.count)} transition-all hover:scale-110`}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className={`text-center py-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Failed to load data</p>
          )}
        </section>

        {/* WakaTime */}
        <section className={`rounded-2xl border p-4 lg:p-6 ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            <Clock className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} w-5 h-5 lg:w-6 lg:h-6`} />
            <h2 className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>WakaTime Stats</h2>
          </div>
          <p className={`mb-4 lg:mb-6 text-sm lg:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Coding activity over the past 7 days.</p>
          {loading.wakatime ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
            </div>
          ) : wakatimeData ? (
            <>
              {/* Date Range */}
              {wakatimeData.range && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Start Date</p>
                    <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {wakatimeData.range.start ? new Date(wakatimeData.range.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>End Date</p>
                    <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {wakatimeData.range.end ? new Date(wakatimeData.range.end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Daily Coding Time</p>
                  <p className="text-2xl font-bold text-yellow-400">{wakatimeData.dailyAverage}</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total This Week</p>
                  <p className="text-2xl font-bold text-yellow-400">{wakatimeData.totalTime}</p>
                </div>
              </div>

              {/* Best Day & All-Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {wakatimeData.bestDay && (
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Best Day</p>
                    <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(wakatimeData.bestDay.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ({wakatimeData.bestDay.text})
                    </p>
                  </div>
                )}
                {wakatimeData.allTime && (
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>All-Time Coding Since Joined</p>
                    <p className="text-2xl font-bold text-yellow-400">{wakatimeData.allTime}</p>
                  </div>
                )}
              </div>
              {wakatimeData.languages && wakatimeData.languages.length > 0 && (
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Languages</h3>
                  <div className="space-y-3">
                    {wakatimeData.languages.slice(0, 6).map((lang, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{lang.name}</span>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{lang.percent.toFixed(1)}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div className="h-full bg-yellow-400" style={{ width: `${lang.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className={`text-center py-12 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Failed to load data</p>
          )}
        </section>

        {/* Tech Stack Connection */}
        <section className={`rounded-2xl border p-6 lg:p-8 ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="mb-6">
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tech Stack Integration</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Technologies and tools I work with daily
            </p>
          </div>
          <TechStackBeam theme={theme} />
        </section>

        {/* Codewars */}
        <section className={`rounded-2xl border p-6 ${
          theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-6">
            <Award className={theme === 'dark' ? 'text-white' : 'text-gray-900'} size={24} />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Codewars</h2>
          </div>
          <div className="text-center py-12">
            <Code className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} size={64} />
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Coding challenge stats coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
}

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Circle.displayName = "Circle";

function TechStackBeam({ theme }: { theme: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-lg p-10",
        theme === 'dark' ? 'bg-gray-900/30' : 'bg-white'
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[400px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <Github className="text-purple-500" />
          </Circle>
          <Circle ref={div5Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <Database className="text-green-500" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <Code className="text-blue-500" />
          </Circle>
          <Circle ref={div4Ref} className="size-16 border-gray-700 bg-gray-900">
            <Zap className="text-yellow-400" size={24} />
          </Circle>
          <Circle ref={div6Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <FileText className="text-orange-500" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <MessageCircle className="text-pink-500" />
          </Circle>
          <Circle ref={div7Ref} className={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
            <Mail className="text-red-500" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

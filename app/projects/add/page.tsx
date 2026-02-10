'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Plus, Folder, Star, Lock } from 'lucide-react';

export default function AddProjectPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    link_demo: '',
    link_github: '',
    stacks: [] as string[],
    content: '',
    is_featured: false,
  });
  const [stackInput, setStackInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const addStack = () => {
    if (stackInput.trim() && !formData.stacks.includes(stackInput.trim())) {
      setFormData({
        ...formData,
        stacks: [...formData.stacks, stackInput.trim()],
      });
      setStackInput('');
    }
  };

  const removeStack = (stack: string) => {
    setFormData({
      ...formData,
      stacks: formData.stacks.filter(s => s !== stack),
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File, slug: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading image to Supabase Storage...', filePath);

      const { data, error } = await supabase.storage
        .from('projects')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase storage error:', error);
        throw error;
      }

      console.log('Image uploaded successfully:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + (error as any).message + '. Make sure "projects" bucket exists and is public in Supabase Storage.');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Starting project submission...');
      let imageUrl = formData.image;

      // Upload image file if exists
      if (imageFile) {
        console.log('Uploading image file...');
        const uploadedUrl = await uploadImage(imageFile, formData.slug);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
          console.log('Image uploaded successfully:', imageUrl);
        }
      }

      console.log('Inserting project to database...');
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            image: imageUrl || null,
            link_demo: formData.link_demo || null,
            link_github: formData.link_github || null,
            stacks: formData.stacks,
            content: formData.content || null,
            is_featured: formData.is_featured,
            is_show: true,
          },
        ])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Project inserted successfully:', data);
      alert('✅ Project berhasil ditambahkan!');
      
      setFormData({
        title: '',
        slug: '',
        image: '',
        description: '',
        link_demo: '',
        link_github: '',
        stacks: [],
        content: '',
        is_featured: false,
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error: any) {
      console.error('Error adding project:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hash password untuk keamanan (menggunakan SHA-256)
    const hashPassword = async (pwd: string) => {
      const msgBuffer = new TextEncoder().encode(pwd);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    };

    // Hash dari password "Radhiyya1512" (sudah di-hash dengan SHA-256 untuk keamanan)
    const correctPasswordHash = '096f7f937f46394a1888d9980233f80f194a1a3fb140fe02899c94e3a802076d';
    
    try {
      const inputHash = await hashPassword(password);
      
      if (inputHash === correctPasswordHash) {
        setIsAuthenticated(true);
        setPasswordError('');
      } else {
        setPasswordError('Password salah! Coba lagi.');
        setPassword('');
      }
    } catch (error) {
      setPasswordError('Terjadi error. Coba lagi.');
      setPassword('');
    }
  };

  // Jika belum authenticated, tampilkan form password
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md rounded-2xl border p-8 ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700/30' : 'bg-white border-gray-200'}`}>
          <div className="text-center mb-8">
            <div className={`inline-flex p-4 rounded-full mb-4 ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-500/10'}`}>
              <Lock className="text-yellow-500" size={40} />
            </div>
            <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Protected Area
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Please enter password to access this page
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-yellow-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
                } focus:outline-none focus:ring-2 focus:ring-yellow-500/20`}
                placeholder="Enter password"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-orange-500/10' : 'bg-orange-500/10'}`}>
              <Folder className="text-orange-500" size={32} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Add New Project
              </h1>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Fill in the details below to add a new project to your portfolio
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-8 ${theme === 'dark' ? 'bg-gray-900/30 border-gray-700/30' : 'bg-white border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                placeholder="My Awesome Project"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Slug (Auto-generated)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800/30 border-gray-700 text-gray-400 placeholder-gray-600'
                    : 'bg-gray-100 border-gray-300 text-gray-600 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                placeholder="my-awesome-project"
              />
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                URL-friendly version of the title
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Short Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                placeholder="A brief description of your project..."
              />

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Project Image (Optional)
              </label>
              
              {/* Image Upload */}
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600'
                      : 'bg-gray-50 border-gray-300 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
                
                {/* Or divider */}
                <div className="flex items-center gap-3">
                  <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>OR</span>
                  <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                </div>
                
                {/* Image URL */}
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.png"
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
                
                {/* Image Preview */}
                {(imagePreview || formData.image) && (
                  <div className={`relative rounded-xl overflow-hidden border ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                  }`}>
                    <img 
                      src={imagePreview || formData.image} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        setFormData({ ...formData, image: '' });
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                Upload an image file or paste an image URL
              </p>
            </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Content (Optional)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                placeholder="Detailed information about the project, features, challenges, etc..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Tech Stack *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStack())}
                  className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                  placeholder="e.g., Next.js, TypeScript, Tailwind CSS"
                />
                <button
                  type="button"
                  onClick={addStack}
                  className="px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all hover:scale-105"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {formData.stacks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.stacks.map((stack, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{stack}</span>
                      <button
                        type="button"
                        onClick={() => removeStack(stack)}
                        className={`transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-500 hover:text-red-400'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Demo Link
                </label>
                <input
                  type="url"
                  value={formData.link_demo}
                  onChange={(e) => setFormData({ ...formData, link_demo: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={formData.link_github}
                  onChange={(e) => setFormData({ ...formData, link_github: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-orange-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className={`flex items-center gap-3 p-4 rounded-xl border ${
              theme === 'dark'
                ? 'bg-orange-500/5 border-orange-500/20'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <label htmlFor="is_featured" className={`text-sm font-medium cursor-pointer flex items-center gap-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Star size={16} className="text-orange-500" />
                Mark as Featured Project
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !formData.title || !formData.description || formData.stacks.length === 0}
                onClick={(e) => {
                  console.log('Button clicked!');
                  console.log('Form data:', formData);
                  console.log('Stacks:', formData.stacks);
                  console.log('Is disabled:', loading || !formData.title || !formData.description || formData.stacks.length === 0);
                  
                  if (!formData.title || !formData.description || formData.stacks.length === 0) {
                    e.preventDefault();
                    alert('⚠️ Please fill in all required fields:\n\n' + 
                          (!formData.title ? '❌ Project Title\n' : '') +
                          (!formData.description ? '❌ Description\n' : '') +
                          (formData.stacks.length === 0 ? '❌ At least 1 Tech Stack' : ''));
                  }
                }}
                className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover:scale-[1.02] font-medium shadow-lg shadow-orange-500/20"
              >
                {loading ? 'Adding Project...' : 'Add Project'}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className={`px-6 py-4 rounded-xl font-medium transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className={`mt-8 p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-blue-500/5 border-blue-500/20'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-900'
          }`}>
            📝 Instructions
          </h3>
          <ul className={`space-y-2 text-sm ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
          }`}>
            <li>• Make sure you have configured Supabase credentials in .env.local</li>
            <li>• Create a storage bucket named "projects" in Supabase Dashboard (Storage section)</li>
            <li>• Make the bucket public for image access</li>
            <li>• Tech stack names should match the icons defined in ProjectsPage</li>
            <li>• Featured projects will appear first in the projects list</li>
            <li>• You can access this page at: <code className={`px-2 py-1 rounded font-mono ${
              theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>/projects/add</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

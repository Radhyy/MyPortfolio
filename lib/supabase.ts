import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  link_demo: string | null;
  link_github: string | null;
  stacks: string[];
  content: string | null;
  is_show: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  image: string | null;
  message: string;
  is_reply: boolean;
  reply_to: string | null;
  is_show: boolean;
  created_at: string;
}

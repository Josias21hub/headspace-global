import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  language: string;
  region: string;
}

export interface Activity {
  id: string;
  user_id: string;
  type: 'meditation' | 'workout' | 'breathing' | 'sleep';
  title: string;
  duration: number;
  completed: boolean;
  created_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_sessions: number;
  total_minutes: number;
  current_streak: number;
  longest_streak: number;
  weekly_goal: number;
  weekly_completed: number;
  updated_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
  unlocked_at?: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  type: 'meditation' | 'workout';
  time: string;
  days: string[];
  enabled: boolean;
  created_at: string;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  goal: 'muscle' | 'fat-loss';
  workout_type: 'gym' | 'calisthenics';
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
}

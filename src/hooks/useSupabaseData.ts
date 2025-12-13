import { useState, useEffect } from 'react';
import { supabase, Activity, UserStats, Achievement, Reminder } from '@/lib/supabase';

export function useUserStats(userId: string | null) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchStats() {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data) setStats(data);
      setLoading(false);
    }

    fetchStats();
  }, [userId]);

  return { stats, loading };
}

export function useActivities(userId: string | null) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchActivities() {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (data) setActivities(data);
      setLoading(false);
    }

    fetchActivities();
  }, [userId]);

  const addActivity = async (activity: Omit<Activity, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('activities')
      .insert([{ ...activity, user_id: userId }])
      .select()
      .single();

    if (data) {
      setActivities([data, ...activities]);
      // Atualizar estatísticas
      await updateStats(userId);
    }
  };

  return { activities, loading, addActivity };
}

export function useAchievements(userId: string | null) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchAchievements() {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', userId);

      if (data) setAchievements(data);
      setLoading(false);
    }

    fetchAchievements();
  }, [userId]);

  return { achievements, loading };
}

export function useReminders(userId: string | null) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchReminders() {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', userId);

      if (data) setReminders(data);
      setLoading(false);
    }

    fetchReminders();
  }, [userId]);

  const toggleReminder = async (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return;

    const { data, error } = await supabase
      .from('reminders')
      .update({ enabled: !reminder.enabled })
      .eq('id', id)
      .select()
      .single();

    if (data) {
      setReminders(reminders.map(r => r.id === id ? data : r));
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('reminders')
      .insert([{ ...reminder, user_id: userId }])
      .select()
      .single();

    if (data) {
      setReminders([...reminders, data]);
    }
  };

  return { reminders, loading, toggleReminder, addReminder };
}

async function updateStats(userId: string) {
  // Buscar todas as atividades do usuário
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId);

  if (!activities) return;

  const totalSessions = activities.length;
  const totalMinutes = activities.reduce((sum, a) => sum + a.duration, 0);

  // Calcular streak atual
  const sortedActivities = activities.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;

  for (const activity of sortedActivities) {
    const activityDate = new Date(activity.created_at);
    activityDate.setHours(0, 0, 0, 0);

    if (!lastDate) {
      tempStreak = 1;
      lastDate = activityDate;
    } else {
      const diffDays = Math.floor((lastDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        tempStreak = 1;
      }
      
      lastDate = activityDate;
    }
  }

  if (tempStreak > longestStreak) longestStreak = tempStreak;
  currentStreak = tempStreak;

  // Calcular meta semanal
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyCompleted = activities.filter(a => 
    new Date(a.created_at) >= oneWeekAgo
  ).length;

  // Atualizar no banco
  await supabase
    .from('user_stats')
    .upsert({
      user_id: userId,
      total_sessions: totalSessions,
      total_minutes: totalMinutes,
      current_streak: currentStreak,
      longest_streak: longestStreak,
      weekly_goal: 5,
      weekly_completed: weeklyCompleted,
      updated_at: new Date().toISOString()
    });
}

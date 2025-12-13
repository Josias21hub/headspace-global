"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Target,
  Flame,
  Clock,
  CheckCircle2,
  Bell,
  BellOff,
  ChevronRight,
  Trophy,
  Star,
  Activity,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useUserStats, useActivities, useAchievements, useReminders } from "@/hooks/useSupabaseData";

export default function ProgressPage() {
  const { userId } = useUser();
  const { stats, loading: statsLoading } = useUserStats(userId);
  const { activities, loading: activitiesLoading } = useActivities(userId);
  const { achievements, loading: achievementsLoading } = useAchievements(userId);
  const { reminders, loading: remindersLoading, toggleReminder, addReminder } = useReminders(userId);

  const [currentTab, setCurrentTab] = useState<"overview" | "history" | "achievements" | "reminders">("overview");

  const isLoading = statsLoading || activitiesLoading || achievementsLoading || remindersLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4CB09A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  const handleAddReminder = async () => {
    await addReminder({
      type: "meditation",
      time: "09:00",
      days: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
      enabled: true,
    });
  };

  const achievementIcons: Record<string, any> = {
    first_session: Star,
    streak_7: Flame,
    master_50: Trophy,
    warrior_30: Award,
  };

  // Tela Overview
  if (currentTab === "overview") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Progresso</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Visão Geral", icon: TrendingUp },
              { id: "history", label: "Histórico", icon: Calendar },
              { id: "achievements", label: "Conquistas", icon: Trophy },
              { id: "reminders", label: "Lembretes", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  variant={currentTab === tab.id ? "default" : "outline"}
                  className={currentTab === tab.id 
                    ? "bg-[#4CB09A] text-white" 
                    : "text-gray-600 hover:text-[#4CB09A]"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#4CB09A] flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-[#4CB09A]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.total_sessions || 0}</div>
              <p className="text-gray-600 text-sm">Sessões Totais</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#F7D97E] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-900" />
                </div>
                <TrendingUp className="w-5 h-5 text-[#F7D97E]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.total_minutes || 0}</div>
              <p className="text-gray-600 text-sm">Minutos Praticados</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-500/5 to-red-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.current_streak || 0}</div>
              <p className="text-gray-600 text-sm">Dias Consecutivos</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-500/5 to-pink-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.longest_streak || 0}</div>
              <p className="text-gray-600 text-sm">Maior Sequência</p>
            </Card>
          </div>

          {/* Weekly Goal */}
          <Card className="mb-8 p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Meta Semanal</h3>
                <p className="text-gray-600 text-sm">
                  {stats?.weekly_completed || 0} de {stats?.weekly_goal || 5} sessões completas
                </p>
              </div>
              <Target className="w-8 h-8 text-[#4CB09A]" />
            </div>
            <Progress 
              value={((stats?.weekly_completed || 0) / (stats?.weekly_goal || 5)) * 100} 
              className="h-3 mb-2"
            />
            <p className="text-sm text-gray-600">
              Faltam {(stats?.weekly_goal || 5) - (stats?.weekly_completed || 0)} sessões para completar sua meta!
            </p>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Atividade Recente</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "meditation" ? "bg-[#4CB09A]" :
                        activity.type === "workout" ? "bg-orange-500" :
                        activity.type === "breathing" ? "bg-blue-500" :
                        "bg-purple-500"
                      }`}>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.duration} min • {new Date(activity.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Button 
                onClick={() => setCurrentTab("history")}
                variant="ghost" 
                className="w-full text-[#4CB09A] hover:text-[#4CB09A]/80"
              >
                Ver Todo Histórico
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // Tela History
  if (currentTab === "history") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Histórico</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Visão Geral", icon: TrendingUp },
              { id: "history", label: "Histórico", icon: Calendar },
              { id: "achievements", label: "Conquistas", icon: Trophy },
              { id: "reminders", label: "Lembretes", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  variant={currentTab === tab.id ? "default" : "outline"}
                  className={currentTab === tab.id 
                    ? "bg-[#4CB09A] text-white" 
                    : "text-gray-600 hover:text-[#4CB09A]"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-lg">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Todas as Atividades</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {activities.map((activity) => (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "meditation" ? "bg-[#4CB09A]" :
                        activity.type === "workout" ? "bg-orange-500" :
                        activity.type === "breathing" ? "bg-blue-500" :
                        "bg-purple-500"
                      }`}>
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{activity.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.duration} minutos
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(activity.created_at).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            activity.type === "meditation" ? "bg-[#4CB09A]/10 text-[#4CB09A]" :
                            activity.type === "workout" ? "bg-orange-500/10 text-orange-600" :
                            activity.type === "breathing" ? "bg-blue-500/10 text-blue-600" :
                            "bg-purple-500/10 text-purple-600"
                          }`}>
                            {activity.type === "meditation" ? "Meditação" :
                             activity.type === "workout" ? "Treino" :
                             activity.type === "breathing" ? "Respiração" :
                             "Sono"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-[#4CB09A]" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    );
  }

  // Tela Achievements
  if (currentTab === "achievements") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Conquistas</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Visão Geral", icon: TrendingUp },
              { id: "history", label: "Histórico", icon: Calendar },
              { id: "achievements", label: "Conquistas", icon: Trophy },
              { id: "reminders", label: "Lembretes", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  variant={currentTab === tab.id ? "default" : "outline"}
                  className={currentTab === tab.id 
                    ? "bg-[#4CB09A] text-white" 
                    : "text-gray-600 hover:text-[#4CB09A]"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F7D97E] to-orange-500 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Suas Conquistas</h2>
            <p className="text-gray-600">
              {achievements.filter(a => a.unlocked).length} de {achievements.length} desbloqueadas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.achievement_type] || Star;
              return (
                <Card 
                  key={achievement.id}
                  className={`p-6 border-2 transition-all ${
                    achievement.unlocked 
                      ? "border-[#F7D97E] bg-gradient-to-br from-[#F7D97E]/5 to-orange-500/5 shadow-lg" 
                      : "border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked 
                        ? "bg-gradient-to-br from-[#F7D97E] to-orange-500" 
                        : "bg-gray-200"
                    }`}>
                      <Icon className={`w-8 h-8 ${achievement.unlocked ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      {!achievement.unlocked && (
                        <div>
                          <Progress 
                            value={(achievement.progress / achievement.target) * 100} 
                            className="h-2 mb-2"
                          />
                          <p className="text-xs text-gray-600">
                            {achievement.progress} / {achievement.target}
                          </p>
                        </div>
                      )}
                      {achievement.unlocked && (
                        <div className="flex items-center gap-2 text-[#F7D97E]">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-semibold">Desbloqueada!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Tela Reminders
  if (currentTab === "reminders") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Lembretes</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Visão Geral", icon: TrendingUp },
              { id: "history", label: "Histórico", icon: Calendar },
              { id: "achievements", label: "Conquistas", icon: Trophy },
              { id: "reminders", label: "Lembretes", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  variant={currentTab === tab.id ? "default" : "outline"}
                  className={currentTab === tab.id 
                    ? "bg-[#4CB09A] text-white" 
                    : "text-gray-600 hover:text-[#4CB09A]"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-6 p-6 border-0 shadow-lg bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-[#4CB09A] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Configure seus lembretes</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Receba notificações para manter sua prática consistente e alcançar seus objetivos.
                </p>
                <Button 
                  onClick={handleAddReminder}
                  className="bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white"
                >
                  + Adicionar Lembrete
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="p-6 border-0 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      reminder.enabled 
                        ? reminder.type === "meditation" 
                          ? "bg-[#4CB09A]" 
                          : "bg-orange-500"
                        : "bg-gray-200"
                    }`}>
                      {reminder.enabled ? (
                        <Bell className="w-6 h-6 text-white" />
                      ) : (
                        <BellOff className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {reminder.type === "meditation" ? "Meditação" : "Treino"}
                      </h3>
                      <p className="text-2xl font-bold text-[#4CB09A] mb-2">{reminder.time}</p>
                      <div className="flex gap-2">
                        {reminder.days.map((day) => (
                          <span 
                            key={day}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                              reminder.enabled 
                                ? "bg-[#4CB09A] text-white" 
                                : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleReminder(reminder.id)}
                    variant={reminder.enabled ? "default" : "outline"}
                    className={reminder.enabled 
                      ? "bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white" 
                      : "text-gray-600"
                    }
                  >
                    {reminder.enabled ? "Ativado" : "Desativado"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return null;
}

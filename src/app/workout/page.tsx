"use client";

import { useState } from "react";
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Flame,
  Timer,
  Calendar,
  ChevronRight,
  Play,
  Check,
  Award,
  Activity,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type Goal = "muscle" | "fat-loss" | null;
type WorkoutType = "gym" | "calisthenics" | null;
type Level = "beginner" | "intermediate" | "advanced" | null;

export default function WorkoutPage() {
  const [currentStep, setCurrentStep] = useState<"goal" | "type" | "level" | "plan">("goal");
  const [selectedGoal, setSelectedGoal] = useState<Goal>(null);
  const [selectedType, setSelectedType] = useState<WorkoutType>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level>(null);

  const goals = [
    {
      id: "muscle" as Goal,
      title: "Ganhar Massa Muscular",
      description: "Hipertrofia e força máxima",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      benefits: ["Músculos definidos", "Força aumentada", "Metabolismo acelerado"]
    },
    {
      id: "fat-loss" as Goal,
      title: "Perder Gordura",
      description: "Definição e emagrecimento",
      icon: TrendingDown,
      color: "from-orange-500 to-red-500",
      benefits: ["Corpo definido", "Mais energia", "Saúde cardiovascular"]
    }
  ];

  const workoutTypes = [
    {
      id: "gym" as WorkoutType,
      title: "Musculação",
      description: "Academia com equipamentos",
      icon: Dumbbell,
      equipment: ["Halteres", "Barras", "Máquinas", "Cabos"],
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: "calisthenics" as WorkoutType,
      title: "Calistenia",
      description: "Peso corporal em qualquer lugar",
      icon: Activity,
      equipment: ["Sem equipamento", "Barra fixa", "Paralelas", "Anéis"],
      color: "bg-gradient-to-br from-emerald-500 to-teal-500"
    }
  ];

  const levels = [
    {
      id: "beginner" as Level,
      title: "Iniciante",
      description: "0-6 meses de treino",
      frequency: "3-4x por semana",
      duration: "45-60 min"
    },
    {
      id: "intermediate" as Level,
      title: "Intermediário",
      description: "6-24 meses de treino",
      frequency: "4-5x por semana",
      duration: "60-75 min"
    },
    {
      id: "advanced" as Level,
      title: "Avançado",
      description: "+24 meses de treino",
      frequency: "5-6x por semana",
      duration: "75-90 min"
    }
  ];

  // Planos de treino personalizados
  const getWorkoutPlan = () => {
    if (!selectedGoal || !selectedType || !selectedLevel) return null;

    const plans = {
      muscle: {
        gym: {
          beginner: {
            name: "Hipertrofia Iniciante - Full Body",
            weeks: 8,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Treino Full Body A",
                exercises: [
                  { name: "Agachamento Livre", sets: "3x12", rest: "90s" },
                  { name: "Supino Reto", sets: "3x12", rest: "90s" },
                  { name: "Remada Curvada", sets: "3x12", rest: "90s" },
                  { name: "Desenvolvimento", sets: "3x12", rest: "90s" },
                  { name: "Rosca Direta", sets: "3x12", rest: "60s" },
                  { name: "Tríceps Pulley", sets: "3x12", rest: "60s" }
                ]
              }
            ]
          },
          intermediate: {
            name: "Hipertrofia Intermediário - Push/Pull/Legs",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quinta",
                name: "Push (Peito/Ombro/Tríceps)",
                exercises: [
                  { name: "Supino Reto", sets: "4x10", rest: "90s" },
                  { name: "Supino Inclinado", sets: "4x10", rest: "90s" },
                  { name: "Desenvolvimento", sets: "4x10", rest: "90s" },
                  { name: "Elevação Lateral", sets: "3x12", rest: "60s" },
                  { name: "Tríceps Testa", sets: "3x12", rest: "60s" },
                  { name: "Tríceps Corda", sets: "3x12", rest: "60s" }
                ]
              },
              {
                day: "Terça/Sexta",
                name: "Pull (Costas/Bíceps)",
                exercises: [
                  { name: "Barra Fixa", sets: "4x8-10", rest: "90s" },
                  { name: "Remada Curvada", sets: "4x10", rest: "90s" },
                  { name: "Pulldown", sets: "4x10", rest: "90s" },
                  { name: "Remada Unilateral", sets: "3x12", rest: "60s" },
                  { name: "Rosca Direta", sets: "3x12", rest: "60s" },
                  { name: "Rosca Martelo", sets: "3x12", rest: "60s" }
                ]
              },
              {
                day: "Quarta/Sábado",
                name: "Legs (Pernas/Glúteos)",
                exercises: [
                  { name: "Agachamento Livre", sets: "4x10", rest: "120s" },
                  { name: "Leg Press", sets: "4x12", rest: "90s" },
                  { name: "Stiff", sets: "4x10", rest: "90s" },
                  { name: "Cadeira Extensora", sets: "3x12", rest: "60s" },
                  { name: "Cadeira Flexora", sets: "3x12", rest: "60s" },
                  { name: "Panturrilha", sets: "4x15", rest: "60s" }
                ]
              }
            ]
          },
          advanced: {
            name: "Hipertrofia Avançado - PPLPPL",
            weeks: 16,
            sessions: [
              {
                day: "Segunda/Quinta",
                name: "Push A (Força)",
                exercises: [
                  { name: "Supino Reto", sets: "5x5", rest: "180s" },
                  { name: "Supino Inclinado", sets: "4x8", rest: "120s" },
                  { name: "Desenvolvimento", sets: "4x8", rest: "120s" },
                  { name: "Crucifixo", sets: "3x12", rest: "60s" },
                  { name: "Elevação Lateral", sets: "4x12", rest: "60s" },
                  { name: "Tríceps Francês", sets: "4x10", rest: "90s" }
                ]
              }
            ]
          }
        },
        calisthenics: {
          beginner: {
            name: "Calistenia Iniciante - Full Body",
            weeks: 8,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Treino Completo",
                exercises: [
                  { name: "Flexões", sets: "3x10-15", rest: "90s" },
                  { name: "Agachamento Livre", sets: "3x15-20", rest: "90s" },
                  { name: "Remada Australiana", sets: "3x10-12", rest: "90s" },
                  { name: "Pike Push-up", sets: "3x8-10", rest: "90s" },
                  { name: "Prancha", sets: "3x30-45s", rest: "60s" },
                  { name: "Hollow Body Hold", sets: "3x20-30s", rest: "60s" }
                ]
              }
            ]
          },
          intermediate: {
            name: "Calistenia Intermediário - Push/Pull/Legs",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quinta",
                name: "Push (Empurrar)",
                exercises: [
                  { name: "Flexão Diamante", sets: "4x12-15", rest: "90s" },
                  { name: "Flexão Declinada", sets: "4x10-12", rest: "90s" },
                  { name: "Pike Push-up", sets: "4x10-12", rest: "90s" },
                  { name: "Dips nas Paralelas", sets: "3x8-12", rest: "90s" },
                  { name: "Pseudo Planche Push-up", sets: "3x6-8", rest: "90s" }
                ]
              },
              {
                day: "Terça/Sexta",
                name: "Pull (Puxar)",
                exercises: [
                  { name: "Barra Fixa Pronada", sets: "4x8-10", rest: "120s" },
                  { name: "Barra Fixa Supinada", sets: "4x8-10", rest: "120s" },
                  { name: "Remada Australiana", sets: "4x12-15", rest: "90s" },
                  { name: "Archer Pull-up", sets: "3x6-8", rest: "90s" },
                  { name: "L-Sit", sets: "3x15-20s", rest: "60s" }
                ]
              }
            ]
          },
          advanced: {
            name: "Calistenia Avançado - Skills + Força",
            weeks: 16,
            sessions: [
              {
                day: "Segunda/Quinta",
                name: "Push + Skills",
                exercises: [
                  { name: "Handstand Push-up", sets: "5x5-8", rest: "180s" },
                  { name: "Planche Lean", sets: "5x20s", rest: "120s" },
                  { name: "Dips com Peso", sets: "4x8-10", rest: "120s" },
                  { name: "Flexão Explosiva", sets: "4x8", rest: "90s" },
                  { name: "Front Lever Tuck", sets: "4x15s", rest: "90s" }
                ]
              }
            ]
          }
        }
      },
      "fat-loss": {
        gym: {
          beginner: {
            name: "Emagrecimento Iniciante - Circuit Training",
            weeks: 8,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Circuito Full Body",
                exercises: [
                  { name: "Agachamento", sets: "3x15", rest: "30s" },
                  { name: "Flexão", sets: "3x12", rest: "30s" },
                  { name: "Remada Máquina", sets: "3x15", rest: "30s" },
                  { name: "Afundo", sets: "3x12/perna", rest: "30s" },
                  { name: "Burpees", sets: "3x10", rest: "30s" },
                  { name: "Mountain Climbers", sets: "3x20", rest: "30s" }
                ]
              }
            ]
          },
          intermediate: {
            name: "Emagrecimento Intermediário - HIIT + Força",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "HIIT Metabólico",
                exercises: [
                  { name: "Agachamento Jump", sets: "4x15", rest: "45s" },
                  { name: "Supino", sets: "4x12", rest: "45s" },
                  { name: "Remada", sets: "4x12", rest: "45s" },
                  { name: "Swing Kettlebell", sets: "4x20", rest: "45s" },
                  { name: "Box Jump", sets: "4x12", rest: "45s" },
                  { name: "Battle Rope", sets: "4x30s", rest: "45s" }
                ]
              }
            ]
          },
          advanced: {
            name: "Emagrecimento Avançado - Metabólico Intenso",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Complexo Metabólico",
                exercises: [
                  { name: "Thruster", sets: "5x12", rest: "60s" },
                  { name: "Deadlift", sets: "5x10", rest: "60s" },
                  { name: "Burpee Box Jump", sets: "5x10", rest: "60s" },
                  { name: "Renegade Row", sets: "5x12", rest: "60s" },
                  { name: "Assault Bike", sets: "5x30s sprint", rest: "60s" },
                  { name: "Sled Push", sets: "5x20m", rest: "90s" }
                ]
              }
            ]
          }
        },
        calisthenics: {
          beginner: {
            name: "Calistenia Emagrecimento - HIIT Básico",
            weeks: 8,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "HIIT Peso Corporal",
                exercises: [
                  { name: "Burpees", sets: "3x12", rest: "30s" },
                  { name: "Mountain Climbers", sets: "3x20", rest: "30s" },
                  { name: "Jump Squats", sets: "3x15", rest: "30s" },
                  { name: "Flexões", sets: "3x12", rest: "30s" },
                  { name: "High Knees", sets: "3x30s", rest: "30s" },
                  { name: "Prancha Dinâmica", sets: "3x30s", rest: "30s" }
                ]
              }
            ]
          },
          intermediate: {
            name: "Calistenia Intermediário - Metabólico",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Circuito Intenso",
                exercises: [
                  { name: "Burpee Pull-up", sets: "4x10", rest: "45s" },
                  { name: "Pistol Squat", sets: "4x8/perna", rest: "45s" },
                  { name: "Muscle-up Negativa", sets: "4x6", rest: "45s" },
                  { name: "Jump Lunges", sets: "4x12/perna", rest: "45s" },
                  { name: "Toes to Bar", sets: "4x12", rest: "45s" },
                  { name: "Sprint 100m", sets: "4x", rest: "90s" }
                ]
              }
            ]
          },
          advanced: {
            name: "Calistenia Avançado - Atlético",
            weeks: 12,
            sessions: [
              {
                day: "Segunda/Quarta/Sexta",
                name: "Complexo Atlético",
                exercises: [
                  { name: "Muscle-up", sets: "5x8", rest: "90s" },
                  { name: "Pistol Jump Squat", sets: "5x8/perna", rest: "60s" },
                  { name: "Handstand Push-up", sets: "5x10", rest: "90s" },
                  { name: "Burpee Box Jump Over", sets: "5x12", rest: "60s" },
                  { name: "Dragon Flag", sets: "5x8", rest: "90s" },
                  { name: "Sprint Intervals", sets: "8x200m", rest: "90s" }
                ]
              }
            ]
          }
        }
      }
    };

    return plans[selectedGoal][selectedType][selectedLevel];
  };

  const plan = getWorkoutPlan();

  // Tela 1: Seleção de Objetivo
  if (currentStep === "goal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  ← Voltar
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-white">Treinos</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Qual é o seu objetivo?
            </h2>
            <p className="text-xl text-gray-400">
              Escolha seu objetivo para receber um plano personalizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <Card
                  key={goal.id}
                  onClick={() => {
                    setSelectedGoal(goal.id);
                    setCurrentStep("type");
                  }}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 overflow-hidden ${
                    selectedGoal === goal.id 
                      ? 'border-orange-500 shadow-2xl shadow-orange-500/20' 
                      : 'border-gray-700 hover:border-orange-500/50'
                  } bg-gray-800`}
                >
                  <div className={`bg-gradient-to-br ${goal.color} p-8`}>
                    <Icon className="w-16 h-16 text-white mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{goal.title}</h3>
                    <p className="text-white/80 mb-6">{goal.description}</p>
                    
                    <div className="space-y-2">
                      {goal.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/90">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900 flex items-center justify-between">
                    <span className="text-white font-semibold">Selecionar</span>
                    <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Tela 2: Tipo de Treino
  if (currentStep === "type") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setCurrentStep("goal")}
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
              >
                ← Voltar
              </Button>
              <h1 className="text-xl font-bold text-white">Tipo de Treino</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Onde você vai treinar?
            </h2>
            <p className="text-xl text-gray-400">
              Escolha entre academia ou treino com peso corporal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {workoutTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setCurrentStep("level");
                  }}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 overflow-hidden ${
                    selectedType === type.id 
                      ? 'border-orange-500 shadow-2xl shadow-orange-500/20' 
                      : 'border-gray-700 hover:border-orange-500/50'
                  } bg-gray-800`}
                >
                  <div className={`${type.color} p-8`}>
                    <Icon className="w-16 h-16 text-white mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{type.title}</h3>
                    <p className="text-white/80 mb-6">{type.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-white/90 font-semibold text-sm mb-2">Equipamentos:</p>
                      {type.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-900 flex items-center justify-between">
                    <span className="text-white font-semibold">Selecionar</span>
                    <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Tela 3: Nível
  if (currentStep === "level") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setCurrentStep("type")}
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
              >
                ← Voltar
              </Button>
              <h1 className="text-xl font-bold text-white">Nível</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Qual é o seu nível?
            </h2>
            <p className="text-xl text-gray-400">
              Selecione baseado na sua experiência de treino
            </p>
          </div>

          <div className="grid gap-6">
            {levels.map((level) => (
              <Card
                key={level.id}
                onClick={() => {
                  setSelectedLevel(level.id);
                  setCurrentStep("plan");
                }}
                className={`group cursor-pointer transition-all duration-300 hover:scale-102 border-2 ${
                  selectedLevel === level.id 
                    ? 'border-orange-500 shadow-2xl shadow-orange-500/20' 
                    : 'border-gray-700 hover:border-orange-500/50'
                } bg-gray-800`}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{level.title}</h3>
                    <p className="text-gray-400 mb-4">{level.description}</p>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{level.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Timer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{level.duration}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-orange-500 group-hover:translate-x-2 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Tela 4: Plano Personalizado
  if (currentStep === "plan" && plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setCurrentStep("level")}
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
              >
                ← Voltar
              </Button>
              <h1 className="text-xl font-bold text-white">Seu Plano</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header do Plano */}
          <Card className="mb-8 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-orange-500 to-red-500">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-6 h-6 text-white" />
                    <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                      Plano Personalizado
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    {plan.name}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{plan.weeks} semanas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      <span className="capitalize">{selectedGoal === "muscle" ? "Hipertrofia" : "Emagrecimento"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span className="capitalize">{selectedLevel}</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Começar Treino
              </Button>
            </div>
          </Card>

          {/* Sessões de Treino */}
          <div className="space-y-6">
            {plan.sessions.map((session, sessionIdx) => (
              <Card key={sessionIdx} className="border-0 shadow-xl bg-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{session.name}</h3>
                      <p className="text-gray-400">{session.day}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-500">{session.exercises.length}</div>
                      <div className="text-sm text-gray-400">exercícios</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {session.exercises.map((exercise, exerciseIdx) => (
                      <div 
                        key={exerciseIdx}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 hover:bg-gray-900 transition-colors border border-gray-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                            {exerciseIdx + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{exercise.name}</h4>
                            <div className="flex gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                {exercise.sets}
                              </span>
                              <span className="flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {exercise.rest}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Dicas */}
          <Card className="mt-8 border-0 shadow-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Dicas para Máximos Resultados
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Progressão</p>
                    <p className="text-gray-400 text-sm">Aumente carga/repetições semanalmente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Nutrição</p>
                    <p className="text-gray-400 text-sm">Proteína adequada e déficit/superávit calórico</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Descanso</p>
                    <p className="text-gray-400 text-sm">7-9h de sono para recuperação muscular</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold mb-1">Consistência</p>
                    <p className="text-gray-400 text-sm">Treine regularmente sem pular sessões</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return null;
}

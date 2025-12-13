"use client";

import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Globe, 
  Clock, 
  Heart, 
  Sparkles, 
  Moon, 
  Wind, 
  Flower2,
  Brain,
  Smile,
  Meh,
  Frown,
  Coffee,
  ChevronRight,
  Star,
  Check,
  Users,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Language, languages, getTranslation } from "@/lib/i18n";
import { detectRegion, formatPrice, getPricing, Region } from "@/lib/pricing";
import { getCulturalContent } from "@/lib/cultural-content";

export default function ZenoraApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "checkin" | "home" | "library" | "premium">("welcome");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>("US");

  // Atualizar região quando idioma mudar
  useEffect(() => {
    setRegion(detectRegion(selectedLanguage));
  }, [selectedLanguage]);

  const t = getTranslation(selectedLanguage);
  const cultural = getCulturalContent(selectedLanguage);
  const pricing = getPricing(region);

  const moods = [
    { id: "happy", icon: Smile, label: t.checkin.moods.happy, color: "text-[#F7D97E]" },
    { id: "neutral", icon: Meh, label: t.checkin.moods.neutral, color: "text-[#CFCFCF]" },
    { id: "anxious", icon: Brain, label: t.checkin.moods.anxious, color: "text-[#4CB09A]" },
    { id: "tired", icon: Coffee, label: t.checkin.moods.tired, color: "text-[#F7D97E]" },
    { id: "sad", icon: Frown, label: t.checkin.moods.sad, color: "text-[#CFCFCF]" },
  ];

  const mainCategories = [
    { 
      id: "meditate", 
      name: t.home.categories.meditate.name, 
      icon: Sparkles, 
      color: "bg-[#4CB09A]",
      items: t.home.categories.meditate.items
    },
    { 
      id: "sleep", 
      name: t.home.categories.sleep.name, 
      icon: Moon, 
      color: "bg-[#4CB09A]",
      items: t.home.categories.sleep.items
    },
    { 
      id: "breathe", 
      name: t.home.categories.breathe.name, 
      icon: Wind, 
      color: "bg-[#4CB09A]",
      items: t.home.categories.breathe.items
    },
    { 
      id: "move", 
      name: t.home.categories.move.name, 
      icon: Heart, 
      color: "bg-[#F7D97E]",
      items: t.home.categories.move.items
    },
  ];

  const libraryCategories = [
    { name: t.library.categories.anxiety, sessions: 42, color: "bg-[#4CB09A]" },
    { name: t.library.categories.sleep, sessions: 38, color: "bg-[#4CB09A]" },
    { name: t.library.categories.focus, sessions: 35, color: "bg-[#F7D97E]" },
    { name: t.library.categories.healing, sessions: 28, color: "bg-[#4CB09A]" },
    { name: t.library.categories.energy, sessions: 31, color: "bg-[#F7D97E]" },
    { name: t.library.categories.spirituality, sessions: 24, color: "bg-[#4CB09A]" },
    { name: t.library.categories.kids, sessions: 19, color: "bg-[#F7D97E]" },
  ];

  const programs = cultural.specialPrograms.map((program, index) => ({
    name: program.name,
    description: program.description,
    price: formatPrice(
      index === 0 ? pricing.programs.anxiety21 :
      index === 1 ? pricing.programs.sleep14 :
      index === 2 ? pricing.programs.mantras :
      pricing.programs.reset5,
      region
    ),
    popular: index === 0 || index === 3,
  }));

  // Tela 1 - Bem-vindo
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] flex items-center justify-center shadow-lg">
            <Flower2 className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-3 text-gray-900">
            {t.welcome.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 italic">
            {t.welcome.subtitle}
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => setCurrentScreen("checkin")}
              className="w-full bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white py-6 text-lg rounded-2xl shadow-lg"
            >
              {t.welcome.login}
            </Button>
            <Button 
              onClick={() => setCurrentScreen("checkin")}
              variant="outline"
              className="w-full border-2 border-[#4CB09A] text-[#4CB09A] hover:bg-[#4CB09A]/5 py-6 text-lg rounded-2xl"
            >
              {t.welcome.signup}
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="text-sm text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Indicador de Região */}
          <div className="mt-4 text-xs text-gray-500">
            {region !== "US" && `${t.premium.monthly}: ${formatPrice(pricing.monthly, region)}`}
          </div>
        </Card>
      </div>
    );
  }

  // Tela 2 - Check-in Diário
  if (currentScreen === "checkin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10 p-4">
        <div className="max-w-2xl mx-auto pt-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] flex items-center justify-center">
              <Flower2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t.checkin.title}
            </h2>
            <p className="text-gray-600">
              {t.checkin.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <Card
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                    selectedMood === mood.id 
                      ? 'border-[#4CB09A] bg-[#4CB09A]/5 shadow-lg' 
                      : 'border-[#CFCFCF]/30 hover:border-[#4CB09A]/50'
                  }`}
                >
                  <div className="text-center">
                    <Icon className={`w-12 h-12 mx-auto mb-3 ${mood.color}`} />
                    <p className="text-sm font-medium text-gray-700">{mood.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {selectedMood && (
            <Card className="p-6 bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] border-0 shadow-xl mb-6">
              <div className="flex items-start gap-4 text-white">
                <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">{t.checkin.aiRecommendation}</h3>
                  <p className="text-white/90 mb-4">
                    {t.checkin.aiMessage}
                  </p>
                  <Button 
                    onClick={() => setCurrentScreen("home")}
                    className="bg-white text-[#4CB09A] hover:bg-white/90"
                  >
                    {t.checkin.startNow}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="text-center">
            <Button 
              onClick={() => setCurrentScreen("home")}
              variant="ghost"
              className="text-gray-600 hover:text-[#4CB09A]"
            >
              {t.checkin.skip}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Tela 3 - Home
  if (currentScreen === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ZENORA
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setCurrentScreen("library")}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-[#4CB09A]"
                >
                  {t.home.library}
                </Button>
                <a href="/workout">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-[#4CB09A]"
                  >
                    💪 Treinos
                  </Button>
                </a>
                <a href="/progress">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-[#4CB09A]"
                  >
                    📊 Progresso
                  </Button>
                </a>
                <Button 
                  onClick={() => setCurrentScreen("premium")}
                  size="sm"
                  className="bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white"
                >
                  <Star className="w-4 h-4 mr-1" />
                  {t.home.premium}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Daily Practice */}
          <Card className="mb-8 overflow-hidden border-0 shadow-xl">
            <div className="relative bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] p-8 sm:p-12">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                    {t.home.dailyPractice}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {cultural.dailyPractice.title}
                </h2>
                <p className="text-white/90 text-lg mb-6 max-w-2xl">
                  {cultural.dailyPractice.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-[#4CB09A] hover:bg-white/90 shadow-lg rounded-2xl"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        {t.common.pause}
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        {t.common.start}
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{cultural.dailyPractice.duration}</span>
                    </div>
                  </div>
                </div>

                {isPlaying && (
                  <div className="mt-6 space-y-2">
                    <Progress value={progress} className="h-2 bg-white/30" />
                    <div className="flex items-center justify-between text-white/80 text-sm">
                      <span>0:00</span>
                      <span>1:00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Main Categories */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.home.explore}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
                  >
                    <div className={`${category.color} p-6`}>
                      <div className="w-14 h-14 mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-xl mb-3">{category.name}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="text-white/80 text-sm flex items-center gap-2">
                            <ChevronRight className="w-3 h-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Premium Programs */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{t.home.specialPrograms}</h3>
              <Button 
                onClick={() => setCurrentScreen("premium")}
                variant="ghost" 
                className="text-[#4CB09A] hover:text-[#4CB09A]/80"
              >
                {t.home.viewAll}
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden relative"
                >
                  {program.popular && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#F7D97E] text-gray-900 text-xs font-bold">
                      {t.common.popular}
                    </div>
                  )}
                  <div className="bg-gradient-to-br from-[#4CB09A]/10 to-[#F7D97E]/10 h-32 flex items-center justify-center">
                    <Award className="w-12 h-12 text-[#4CB09A]" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{program.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#4CB09A]">{program.price}</span>
                      <Button size="sm" className="bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white">
                        {t.premium.buy}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="grid sm:grid-cols-3 gap-6">
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
              <Users className="w-8 h-8 mx-auto mb-3 text-[#4CB09A]" />
              <div className="text-3xl font-bold text-gray-900 mb-1">2M+</div>
              <p className="text-gray-600 text-sm">{t.home.stats.users}</p>
            </Card>
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-[#4CB09A]" />
              <div className="text-3xl font-bold text-gray-900 mb-1">300+</div>
              <p className="text-gray-600 text-sm">{t.home.stats.practices}</p>
            </Card>
            <Card className="p-6 text-center border-0 bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5">
              <Star className="w-8 h-8 mx-auto mb-3 text-[#F7D97E]" />
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8★</div>
              <p className="text-gray-600 text-sm">{t.home.stats.rating}</p>
            </Card>
          </section>
        </main>
      </div>
    );
  }

  // Tela 4 - Biblioteca
  if (currentScreen === "library") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setCurrentScreen("home")}
                variant="ghost"
                size="sm"
              >
                ← {t.library.back}
              </Button>
              <h1 className="text-xl font-bold text-gray-900">{t.library.title}</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.library.title}</h2>
            <p className="text-gray-600">{t.library.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryCategories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
              >
                <div className={`${category.color} p-8 relative`}>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.sessions} {t.library.sessions}</p>
                  <ChevronRight className="w-6 h-6 text-white mt-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Tela 5 - Premium
  if (currentScreen === "premium") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F7D97E]/10 to-[#4CB09A]/10">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#CFCFCF]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setCurrentScreen("home")}
                variant="ghost"
                size="sm"
              >
                ← {t.library.back}
              </Button>
              <h1 className="text-xl font-bold text-gray-900">{t.premium.title}</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4CB09A] to-[#F7D97E] flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.premium.subtitle}
            </h2>
            <p className="text-xl text-gray-600">
              {t.premium.description}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 border-2 border-[#CFCFCF]/30 hover:border-[#4CB09A] transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.premium.monthly}</h3>
                <div className="text-5xl font-bold text-[#4CB09A] mb-2">
                  {formatPrice(pricing.monthly, region)}
                </div>
                <p className="text-gray-600">{t.premium.perMonth}</p>
              </div>
              <Button className="w-full bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white py-6 text-lg rounded-2xl">
                {t.premium.startNow}
              </Button>
            </Card>

            <Card className="p-8 border-2 border-[#4CB09A] bg-gradient-to-br from-[#4CB09A]/5 to-[#F7D97E]/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#F7D97E] text-gray-900 text-xs font-bold">
                {t.premium.bestValue}
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.premium.annual}</h3>
                <div className="text-5xl font-bold text-[#4CB09A] mb-2">
                  {formatPrice(pricing.annual, region)}
                </div>
                <p className="text-gray-600">{t.premium.perYear}</p>
                <p className="text-sm text-[#4CB09A] font-semibold mt-2">
                  {t.premium.save} 62%
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-[#4CB09A] to-[#F7D97E] text-white py-6 text-lg rounded-2xl shadow-lg">
                {t.premium.subscribe}
              </Button>
            </Card>
          </div>

          {/* Features */}
          <Card className="p-8 border-0 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t.premium.features}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.premium.featuresList.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4CB09A] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Programs */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t.premium.individualPrograms}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {programs.map((program, index) => (
                <Card
                  key={index}
                  className="p-6 border-0 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex-1">{program.name}</h4>
                    {program.popular && (
                      <span className="px-2 py-1 rounded-full bg-[#F7D97E] text-gray-900 text-xs font-bold">
                        {t.common.top}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#4CB09A]">{program.price}</span>
                    <Button size="sm" className="bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white">
                      {t.premium.buy}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

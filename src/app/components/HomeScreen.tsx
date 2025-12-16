"use client";

import { useState } from "react";
import { 
  Play, 
  Pause, 
  Clock, 
  Heart, 
  Sparkles, 
  Moon, 
  Wind, 
  Flower2,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Language } from "@/lib/i18n";
import { Region, formatPrice, getPricing } from "@/lib/pricing";
import { getCulturalContent } from "@/lib/cultural-content";

interface HomeScreenProps {
  t: any;
  selectedLanguage: Language;
  region: Region;
  onNavigate: (screen: "library" | "premium") => void;
}

export function HomeScreen({ t, selectedLanguage, region, onNavigate }: HomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const cultural = getCulturalContent(selectedLanguage);
  const pricing = getPricing(region);

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
                onClick={() => onNavigate("library")}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-[#4CB09A]"
              >
                {t.home.library}
              </Button>
              <Button 
                onClick={() => onNavigate("premium")}
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
              onClick={() => onNavigate("premium")}
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

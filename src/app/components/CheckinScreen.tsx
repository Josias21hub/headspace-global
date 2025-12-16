"use client";

import { Sparkles, Flower2, Smile, Meh, Brain, Coffee, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CheckinScreenProps {
  t: any;
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
  onContinue: () => void;
}

export function CheckinScreen({ t, selectedMood, setSelectedMood, onContinue }: CheckinScreenProps) {
  const moods = [
    { id: "happy", icon: Smile, label: t.checkin.moods.happy, color: "text-[#F7D97E]" },
    { id: "neutral", icon: Meh, label: t.checkin.moods.neutral, color: "text-[#CFCFCF]" },
    { id: "anxious", icon: Brain, label: t.checkin.moods.anxious, color: "text-[#4CB09A]" },
    { id: "tired", icon: Coffee, label: t.checkin.moods.tired, color: "text-[#F7D97E]" },
    { id: "sad", icon: Frown, label: t.checkin.moods.sad, color: "text-[#CFCFCF]" },
  ];

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
                  onClick={onContinue}
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
            onClick={onContinue}
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

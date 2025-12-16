"use client";

import { Globe, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Language, languages } from "@/lib/i18n";
import { Region, formatPrice, getPricing } from "@/lib/pricing";

interface WelcomeScreenProps {
  t: any;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  onContinue: () => void;
  region: Region;
}

export function WelcomeScreen({ 
  t, 
  selectedLanguage, 
  setSelectedLanguage, 
  onContinue,
  region 
}: WelcomeScreenProps) {
  const pricing = getPricing(region);

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
            onClick={onContinue}
            className="w-full bg-[#4CB09A] hover:bg-[#4CB09A]/90 text-white py-6 text-lg rounded-2xl shadow-lg"
          >
            {t.welcome.login}
          </Button>
          <Button 
            onClick={onContinue}
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

        {region !== "US" && (
          <div className="mt-4 text-xs text-gray-500">
            {t.premium.monthly}: {formatPrice(pricing.monthly, region)}
          </div>
        )}
      </Card>
    </div>
  );
}

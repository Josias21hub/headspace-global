"use client";

import { useState, useEffect } from "react";
import { Language } from "@/lib/i18n";
import { detectRegion, Region } from "@/lib/pricing";
import { getTranslation } from "@/lib/i18n";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { CheckinScreen } from "./components/CheckinScreen";
import { HomeScreen } from "./components/HomeScreen";

export default function ZenoraApp() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "checkin" | "home">("welcome");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>("US");

  useEffect(() => {
    setRegion(detectRegion(selectedLanguage));
  }, [selectedLanguage]);

  const t = getTranslation(selectedLanguage);

  if (currentScreen === "welcome") {
    return (
      <WelcomeScreen
        t={t}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onContinue={() => setCurrentScreen("checkin")}
        region={region}
      />
    );
  }

  if (currentScreen === "checkin") {
    return (
      <CheckinScreen
        t={t}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        onContinue={() => setCurrentScreen("home")}
      />
    );
  }

  if (currentScreen === "home") {
    return (
      <HomeScreen
        t={t}
        selectedLanguage={selectedLanguage}
        region={region}
        onNavigate={setCurrentScreen}
      />
    );
  }

  return null;
}

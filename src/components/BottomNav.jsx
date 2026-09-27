import React from "react";
import { Compass, Swords, Users, BookOpen, Palette } from "lucide-react";
import { sounds } from "../utils/soundEffects";

export function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", label: "HUD", icon: Compass },
    { id: "battle", label: "Battle", icon: Swords },
    { id: "team", label: "Team", icon: Users },
    { id: "pokedex", label: "Dex", icon: BookOpen },
    { id: "design", label: "Design", icon: Palette },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-white/10 px-3 py-2 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`bottom-nav-${tab.id}`}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl relative transition-all tactile-button ${
                isActive
                  ? "text-brand-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-brand-primary/15 text-brand-primary shadow-[0_0_12px_rgba(238,21,21,0.4)]"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-display text-[10px] tracking-wide mt-0.5">
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-brand-primary rounded-full shadow-[0_0_8px_#ee1515]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

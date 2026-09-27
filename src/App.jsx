import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { TrainerHome } from "./components/TrainerHome/TrainerHome";
import { BattleArena } from "./components/BattleArena/BattleArena";
import { TeamBuilder } from "./components/TeamBuilder/TeamBuilder";
import { Pokedex } from "./components/Pokedex/Pokedex";
import { DesignSystemShowcase } from "./components/DesignSystem/DesignSystemShowcase";
import { AvatarStudio } from "./components/AvatarStudio/AvatarStudio";
import { AvatarSelectorModal } from "./components/common/AvatarSelectorModal";
import { PROJECT_AVATARS, POKEMON_DATA } from "./data/pokemonData";

export function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Persistent Trainer Avatar state
  const [trainerAvatar, setTrainerAvatar] = useState(() => {
    try {
      const saved = localStorage.getItem("pokehub_trainer_avatar");
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = PROJECT_AVATARS.find((a) => a.id === parsed.id);
        if (match) return { ...match, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load saved avatar:", e);
    }
    return PROJECT_AVATARS[0]; // Default: Lucario
  });

  // Active Buddy Pokémon state
  const [activeBuddy, setActiveBuddy] = useState(() => {
    return POKEMON_DATA.find((p) => p.name === "Lucario") || POKEMON_DATA[0];
  });

  const handleSelectAvatar = (newAvatar) => {
    setTrainerAvatar(newAvatar);
    try {
      localStorage.setItem("pokehub_trainer_avatar", JSON.stringify(newAvatar));
    } catch (e) {
      console.warn("Could not save avatar to localStorage:", e);
    }
  };

  const handleSetBuddy = (avatarPoke) => {
    const fullPoke = POKEMON_DATA.find((p) => p.name.toLowerCase() === avatarPoke.name.toLowerCase()) || POKEMON_DATA[0];
    setActiveBuddy(fullPoke);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative selection:bg-brand-primary selection:text-white">
      {/* Top Fixed Header with Trainer Avatar HUD */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        trainerAvatar={trainerAvatar}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1 pt-16 sm:pt-20">
        {activeTab === "home" && (
          <TrainerHome
            onNavigateTab={setActiveTab}
            trainerAvatar={trainerAvatar}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            buddy={activeBuddy}
          />
        )}
        {activeTab === "studio" && (
          <AvatarStudio
            trainerAvatar={trainerAvatar}
            onSelectAvatar={handleSelectAvatar}
            onSetBuddy={handleSetBuddy}
          />
        )}
        {activeTab === "battle" && (
          <BattleArena
            trainerAvatar={trainerAvatar}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
          />
        )}
        {activeTab === "team" && (
          <TeamBuilder
            trainerAvatar={trainerAvatar}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
          />
        )}
        {activeTab === "pokedex" && (
          <Pokedex
            trainerAvatar={trainerAvatar}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            onNavigateStudio={() => setActiveTab("studio")}
          />
        )}
        {activeTab === "design" && <DesignSystemShowcase />}
      </main>

      {/* Floating Tactical Bottom Nav on Mobile */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        trainerAvatar={trainerAvatar}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Global Pokémon Avatar Vault Modal */}
      <AvatarSelectorModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={trainerAvatar}
        onSelectAvatar={handleSelectAvatar}
        onSetBuddy={handleSetBuddy}
        onOpenStudio={() => {
          setIsAvatarModalOpen(false);
          setActiveTab("studio");
        }}
      />
    </div>
  );
}

export default App;

import React from "react";
import { PassportCard } from "./PassportCard";
import { BuddyCard } from "./BuddyCard";
import { AdventureMap } from "./AdventureMap";
import { QuestsDock } from "./QuestsDock";
import { POKEMON_DATA } from "../../data/pokemonData";

export function TrainerHome({ onNavigateTab, trainerAvatar, onOpenAvatarModal, buddy }) {
  const activeBuddy = buddy || POKEMON_DATA.find((p) => p.name === "Lucario") || POKEMON_DATA[0];

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* 1. Trainer Identity & Level Passport */}
      <PassportCard
        trainerAvatar={trainerAvatar}
        onOpenAvatarModal={onOpenAvatarModal}
      />

      {/* 2. Active Buddy Showcase (e.g. Best Buddy Lucario) */}
      <BuddyCard 
        buddy={activeBuddy} 
        onStartBattle={() => onNavigateTab("battle")} 
      />

      {/* 3. Cyber Radar Adventure Map with Spawns */}
      <AdventureMap 
        onSelectPokemon={(p) => onNavigateTab("pokedex")}
      />

      {/* 4. Daily Field Research Objectives */}
      <QuestsDock 
        onNavigateBattle={() => onNavigateTab("battle")}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Volume2, VolumeX, Radio, Shield, Palette, Sparkles } from "lucide-react";
import { sounds } from "../utils/soundEffects";

export function Header({ activeTab, setActiveTab, trainerAvatar, onOpenAvatarModal }) {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const isEnabled = sounds.toggle();
    setSoundOn(isEnabled);
    if (isEnabled) sounds.playClick();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between gap-3">
        
        {/* Left: Logo & Emblem */}
        <div 
          onClick={() => { sounds.playClick(); setActiveTab("home"); }}
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="btn-nav-logo"
        >
          <div className="relative flex items-center justify-center">
            <img 
              src="/emblem.svg" 
              alt="PokéHub Emblem" 
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-[0_0_12px_rgba(238,21,21,0.6)] group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-tertiary rounded-full border-2 border-surface-container-lowest animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base sm:text-xl text-on-surface tracking-wider group-hover:text-brand-primary transition-colors">
                POKÉHUB
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-brand-tertiary font-bold tracking-widest border border-brand-tertiary/20">
                PRO HUD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] sm:text-xs font-extrabold text-brand-secondary bg-surface-container-high px-1.5 py-0.2 rounded-full">
                LV. 38
              </span>
              <span className="font-body text-[11px] sm:text-xs text-on-surface-variant font-medium">
                Ace Trainer
              </span>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation shortcuts */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-container-low/70 p-1.5 rounded-full border border-white/5">
          {[
            { id: "home", label: "Trainer HUD" },
            { id: "battle", label: "Battle Arena" },
            { id: "team", label: "Team Builder" },
            { id: "pokedex", label: "Pokédex" },
            { id: "design", label: "Design System" },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`nav-link-${tab.id}`}
              onClick={() => { sounds.playClick(); setActiveTab(tab.id); }}
              className={`px-4 py-1.5 rounded-full font-display text-xs font-bold transition-all tactile-button ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-brand-primary to-rose-600 text-white shadow-glow-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right: Status Pills & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Signal / Battery Indicator */}
          <div className="hidden sm:flex flex-col items-end gap-0.5 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high/80 text-brand-tertiary border border-brand-tertiary/20">
              <Radio className="w-3 h-3 animate-pulse" />
              <span className="font-bold tracking-wider">SYNCED</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>98% BATTERY</span>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-2 sm:p-2.5 rounded-full bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-brand-secondary tactile-button"
            title={soundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-brand-secondary" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Design System Quick Link (Mobile & Desktop) */}
          <button
            id="btn-quick-design-system"
            onClick={() => { sounds.playClick(); setActiveTab("design"); }}
            className={`p-2 sm:p-2.5 rounded-full border border-white/10 tactile-button ${
              activeTab === "design" 
                ? "bg-brand-tertiary text-slate-900 shadow-glow-cyan" 
                : "bg-surface-container text-brand-tertiary hover:bg-surface-container-highest"
            }`}
            title="Open Design System Tokens"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Trainer Avatar Profile Badge (Click to open Avatar Vault) */}
          <button
            id="btn-header-avatar"
            onClick={() => {
              sounds.playClick();
              if (onOpenAvatarModal) onOpenAvatarModal();
            }}
            className="flex items-center gap-2 pl-1 pr-2.5 sm:pr-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high border border-amber-400/40 hover:border-amber-400 text-on-surface shadow-glow-gold/20 tactile-button group"
            title={`Trainer Avatar: ${trainerAvatar?.name || "Pokémon"} (Click to change)`}
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-slate-900 border border-amber-400/80 flex items-center justify-center p-0.5">
              <img
                src={trainerAvatar?.avatar || "/assets/avatars/lucario.png"}
                alt={trainerAvatar?.name || "Trainer Avatar"}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-950" />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[11px] font-display font-extrabold text-amber-300 group-hover:text-amber-200">
                {trainerAvatar?.name || "Trainer"}
              </span>
              <span className="text-[9px] font-mono text-on-surface-variant uppercase tracking-wider">
                Avatar
              </span>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}

import React, { useState } from "react";
import { X, Sparkles, Volume2, Shield, Zap, Info } from "lucide-react";
import { TypeBadge } from "../common/TypeBadge";
import { ProgressBar } from "../common/ProgressBar";
import { sounds } from "../../utils/soundEffects";

export function PokemonModal({ pokemon, onClose, onEquipAvatar }) {
  const [showShiny, setShowShiny] = useState(false);

  if (!pokemon) return null;

  const currentSprite = showShiny && pokemon.shinySprite ? pokemon.shinySprite : pokemon.sprite;

  const handlePlayCry = () => {
    sounds.playAttack(pokemon.types[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-level-3 p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 my-auto">
        
        {/* Close button */}
        <button
          id="btn-close-pokedex-modal"
          onClick={() => { sounds.playClick(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-white border border-white/10 tactile-button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-mono text-xs font-bold text-brand-secondary tracking-widest uppercase">
              National Dex #{String(pokemon.id).padStart(3, "0")} • {pokemon.generation}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-on-surface tracking-tight mt-0.5">
              {pokemon.name}
            </h2>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant italic mt-1">
              "{pokemon.title}"
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex gap-1.5">
              {pokemon.types.map((t) => (
                <TypeBadge key={t} type={t} size="md" />
              ))}
            </div>
            <span className="font-mono text-sm font-extrabold text-brand-tertiary">
              CP {pokemon.cp.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Middle: Creature Sprite Stage & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Sprite Stage with Shiny toggle */}
          <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-lowest/80 border border-white/10 shadow-inner">
            <div className="absolute inset-8 rounded-full bg-brand-tertiary/10 blur-xl pointer-events-none" />
            
            <img
              src={currentSprite}
              alt={pokemon.name}
              className="relative z-10 w-44 h-44 object-contain animate-float drop-shadow-[0_12px_20px_rgba(0,0,0,0.8)]"
            />

            {/* Utility Toggles */}
            <div className="flex items-center gap-2 mt-4 z-20">
              <button
                id="btn-toggle-shiny"
                onClick={() => { sounds.playClick(); setShowShiny(!showShiny); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-bold transition-all tactile-button ${
                  showShiny
                    ? "bg-amber-400 text-slate-950 shadow-glow-gold"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {showShiny ? "Shiny Active" : "Shiny Form"}
              </button>

              <button
                id="btn-play-cry"
                onClick={handlePlayCry}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-bold bg-surface-container-high text-brand-tertiary hover:bg-surface-container-highest transition-all tactile-button"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Play Cry
              </button>
            </div>
          </div>

          {/* Lore & Physical Specs */}
          <div className="space-y-4">
            <div className="bg-surface-container-lowest/60 p-4 rounded-xl border border-white/5">
              <span className="font-display text-xs font-bold text-brand-tertiary uppercase tracking-wider block mb-1.5">
                Biological Lore Entry
              </span>
              <p className="font-body text-xs sm:text-sm text-on-surface leading-relaxed">
                {pokemon.lore}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                <span className="text-on-surface-variant block text-[10px] uppercase">Height</span>
                <span className="font-bold text-on-surface text-sm">{pokemon.height}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                <span className="text-on-surface-variant block text-[10px] uppercase">Weight</span>
                <span className="font-bold text-on-surface text-sm">{pokemon.weight}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                <span className="text-on-surface-variant block text-[10px] uppercase">Primary Ability</span>
                <span className="font-bold text-brand-tertiary text-xs">{pokemon.ability}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                <span className="text-on-surface-variant block text-[10px] uppercase">Hidden Ability</span>
                <span className="font-bold text-brand-secondary text-xs">{pokemon.hiddenAbility}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Base Stats Matrix */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="font-display text-xs font-bold text-on-surface uppercase tracking-wider block">
            Base Stat Ratings
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs">
            {Object.entries(pokemon.stats).map(([stat, val]) => (
              <div key={stat} className="flex items-center gap-2">
                <span className="w-24 uppercase text-on-surface-variant text-[11px] font-semibold">
                  {stat.replace(/([A-Z])/g, " $1")}
                </span>
                <div className="flex-1 bg-surface-container-lowest h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-amber-500"
                    style={{ width: `${Math.min(100, (val / 160) * 100)}%` }}
                  />
                </div>
                <span className="w-8 text-right font-bold text-on-surface">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Moveset Table */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="font-display text-xs font-bold text-on-surface uppercase tracking-wider block">
            Learnable Combat Moveset
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pokemon.moves.map((move) => (
              <div key={move.name} className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-on-surface">{move.name}</span>
                    <TypeBadge type={move.type} size="sm" />
                  </div>
                  <span className="font-body text-[11px] text-on-surface-variant">{move.desc}</span>
                </div>
                <div className="text-right font-mono text-xs pl-2 flex-shrink-0">
                  <span className="font-bold text-brand-secondary block">PWR {move.power}</span>
                  <span className="text-[10px] text-on-surface-variant">PP {move.maxPp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
          <span className="text-xs text-on-surface-variant font-mono">
            ID: #{String(pokemon.id).padStart(3, "0")} • {pokemon.category || "Project Roster"}
          </span>

          {onEquipAvatar && (
            <button
              id="btn-modal-equip-avatar"
              onClick={() => {
                onEquipAvatar(pokemon);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-glow-gold tactile-button"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Equip as Trainer Avatar
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

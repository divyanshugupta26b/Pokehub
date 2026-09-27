import React, { useState } from "react";
import { Sparkles, Coins, Calendar, Award, Flame, Zap, ShieldCheck } from "lucide-react";
import { ProgressBar } from "../common/ProgressBar";
import { sounds } from "../../utils/soundEffects";

export function PassportCard({ onLevelUp, trainerAvatar, onOpenAvatarModal }) {
  const [xp, setXp] = useState(184250);
  const [level, setLevel] = useState(38);
  const [stardust, setStardust] = useState(428950);
  const [coins, setCoins] = useState(1450);
  const maxXp = 200000;

  const handleClaimBonus = () => {
    sounds.playVictory();
    setXp((prev) => {
      const nextXp = prev + 5000;
      if (nextXp >= maxXp) {
        setLevel((l) => l + 1);
        if (onLevelUp) onLevelUp(level + 1);
        return nextXp - maxXp;
      }
      return nextXp;
    });
    setStardust((prev) => prev + 2500);
    setCoins((prev) => prev + 50);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-level-2 p-5 sm:p-6 shadow-2xl border border-white/10 group">
      {/* Ambient background glows */}
      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-tertiary/15 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col space-y-4">
        {/* Top Header: Identity & Currencies */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Trainer Chosen Pokémon Avatar Portrait */}
            <div
              id="btn-passport-avatar"
              onClick={() => {
                sounds.playClick();
                if (onOpenAvatarModal) onOpenAvatarModal();
              }}
              className="relative group cursor-pointer tactile-button flex-shrink-0"
              title="Click to customize Trainer Avatar"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface-container-highest border-2 border-amber-400/80 hover:border-amber-400 p-1 shadow-glow-gold flex items-center justify-center overflow-hidden transition-all">
                <img
                  src={trainerAvatar?.avatar || "/assets/avatars/lucario.png"}
                  alt={trainerAvatar?.name || "Trainer Avatar"}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow"
                />
              </div>
              {/* Edit Camera / Change badge */}
              <div className="absolute -bottom-1.5 -right-1 bg-slate-900 border border-amber-400/80 text-amber-300 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                <span>AVATAR</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-lg sm:text-xl text-on-surface">
                  {trainerAvatar?.name ? `${trainerAvatar.name}_Red` : "Red_Kanto"}
                </h2>
                <span className="font-display text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-brand-tertiary/20 text-brand-tertiary border border-brand-tertiary/30">
                  LV. {level}
                </span>
                {trainerAvatar?.badge && (
                  <span className="font-display text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {trainerAvatar.badge}
                  </span>
                )}
              </div>
              <span className="font-body text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                {trainerAvatar?.tagline || "Indigo Plateau League Champion"}
              </span>
            </div>
          </div>

          {/* Currencies Pills */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Stardust */}
            <div 
              onClick={() => { sounds.playClick(); setStardust(s => s + 100); }}
              id="pill-stardust"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 border border-white/10 hover:border-brand-secondary/40 transition-all cursor-pointer tactile-button"
              title="Click to gather stardust!"
            >
              <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
              <div className="flex flex-col leading-none">
                <span className="font-mono text-xs font-bold text-on-surface">
                  {stardust.toLocaleString()}
                </span>
                <span className="text-[9px] font-body text-on-surface-variant uppercase">
                  Stardust
                </span>
              </div>
            </div>

            {/* PokéCoins */}
            <div 
              onClick={() => { sounds.playClick(); setCoins(c => c + 10); }}
              id="pill-pokecoins"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer tactile-button"
              title="Click to gather PokéCoins!"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col leading-none">
                <span className="font-mono text-xs font-bold text-on-surface">
                  {coins.toLocaleString()}
                </span>
                <span className="text-[9px] font-body text-on-surface-variant uppercase">
                  PokéCoins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* XP Bar Gauge */}
        <div className="bg-surface-container-lowest/60 p-3.5 rounded-xl border border-white/5 space-y-2">
          <ProgressBar
            value={xp}
            max={maxXp}
            label="Trainer Experience"
            type="exp"
            height="h-3"
          />
        </div>

        {/* Bottom Ribbon: Streak + Claim Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <div className="p-1.5 rounded-lg bg-surface-container-high text-brand-tertiary">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-on-surface">Daily PokéStop Streak: </span>
              <span className="text-brand-tertiary font-bold font-mono">Day 6 of 7</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-brand-tertiary animate-ping ml-1" />
          </div>

          <button
            id="btn-claim-daily-bonus"
            onClick={handleClaimBonus}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-xs tracking-wider uppercase shadow-glow-gold tactile-button"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            Claim Daily Training (+5000 XP)
          </button>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Heart, Zap, Sparkles, Swords, Apple, Smile, Shield } from "lucide-react";
import { TypeBadge } from "../common/TypeBadge";
import { ProgressBar } from "../common/ProgressBar";
import { sounds } from "../../utils/soundEffects";
import confetti from "canvas-confetti";

export function BuddyCard({ buddy, onStartBattle }) {
  const [isMega, setIsMega] = useState(false);
  const [hearts, setHearts] = useState(4);
  const [happiness, setHappiness] = useState(100);
  const [buddyMsg, setBuddyMsg] = useState("Lucario senses your battling resolve!");

  const handleMegaEvolve = () => {
    sounds.playVictory();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#ee1515', '#facc15']
    });
    setIsMega(!isMega);
    setBuddyMsg(
      !isMega
        ? "MEGA EVOLUTION ACTIVATED! Aura levels surging to 100%!"
        : "Lucario returned to standard battle stance."
    );
  };

  const handleFeed = () => {
    sounds.playHeal();
    setHearts((h) => Math.min(5, h + 1));
    setHappiness(100);
    setBuddyMsg("Lucario enjoyed the Golden Poffin! Maximum friendship energy!");
  };

  const handlePet = () => {
    sounds.playClick();
    setBuddyMsg("Lucario's aura spikes with joy! Friendship intensified.");
  };

  const currentCp = isMega ? buddy.cp + 850 : buddy.cp;
  const currentSprite = isMega && buddy.megaSprite ? buddy.megaSprite : buddy.sprite;

  return (
    <section className="relative overflow-hidden rounded-2xl glass-level-2 p-5 sm:p-6 shadow-2xl border border-white/10 group">
      {/* Background Elemental Auras */}
      <div 
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: isMega ? "rgba(238, 21, 21, 0.2)" : "rgba(6, 182, 212, 0.2)"
        }}
      />
      <div className="absolute left-6 bottom-4 w-40 h-40 rounded-full bg-brand-primary/10 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Meta details & status */}
        <div className="flex-1 flex flex-col space-y-3.5 w-full">
          {/* Top Tags */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-display font-extrabold uppercase tracking-wider text-brand-secondary bg-brand-secondary/15 px-2.5 py-0.5 rounded-full border border-brand-secondary/30">
                <Sparkles className="w-3 h-3 text-brand-secondary" />
                Best Buddy
              </span>
              {isMega && (
                <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-brand-primary bg-brand-primary/15 px-2.5 py-0.5 rounded-full border border-brand-primary/40 animate-pulse">
                  Mega Form
                </span>
              )}
            </div>

            {/* Friendship Hearts */}
            <div className="flex items-center gap-1 bg-surface-container-lowest/80 px-2.5 py-1 rounded-full border border-white/5">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < hearts 
                      ? "text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" 
                      : "text-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Creature Name & CP */}
          <div>
            <div className="flex items-baseline gap-3">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-on-surface tracking-tight">
                {isMega ? "Mega Lucario" : buddy.name}
              </h3>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high border border-white/10">
                <span className="font-body text-xs text-on-surface-variant font-semibold">CP</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-brand-tertiary">
                  {currentCp.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Types */}
            <div className="flex items-center gap-2 mt-2">
              {buddy.types.map((type) => (
                <TypeBadge key={type} type={type} size="sm" />
              ))}
            </div>
          </div>

          {/* Dynamic Dialogue Speech Box */}
          <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/5 flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-tertiary mt-1.5 animate-ping flex-shrink-0" />
            <p className="font-body text-xs sm:text-sm text-on-surface italic">
              "{buddyMsg}"
            </p>
          </div>

          {/* Mega Energy & Stats Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <ProgressBar
              value={isMega ? 200 : 200}
              max={200}
              label="Mega Energy"
              type="energy"
              height="h-2"
            />
            <ProgressBar
              value={buddy.hp}
              max={buddy.maxHp}
              label="Battle HP"
              type="hp"
              height="h-2"
            />
          </div>

          {/* Interactive Buddy Controls */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              id="btn-buddy-feed"
              onClick={handleFeed}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-display font-bold border border-white/10 tactile-button"
            >
              <Apple className="w-3.5 h-3.5 text-rose-400" />
              Feed Berry
            </button>
            <button
              id="btn-buddy-play"
              onClick={handlePet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-display font-bold border border-white/10 tactile-button"
            >
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              Play
            </button>
            <button
              id="btn-buddy-mega"
              onClick={handleMegaEvolve}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-display font-extrabold uppercase tracking-wider border transition-all tactile-button ${
                isMega
                  ? "bg-brand-primary text-white border-brand-primary shadow-glow-primary"
                  : "bg-surface-container-highest text-brand-primary hover:bg-brand-primary hover:text-white border-brand-primary/40"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {isMega ? "Revert Mega" : "Mega Evolve"}
            </button>
            <button
              id="btn-buddy-quick-battle"
              onClick={() => { sounds.playClick(); onStartBattle(); }}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-rose-600 hover:from-rose-500 hover:to-red-600 text-white font-display font-extrabold text-xs uppercase tracking-wider shadow-glow-primary tactile-button"
            >
              <Swords className="w-4 h-4 text-white" />
              Deploy to Battle
            </button>
          </div>
        </div>

        {/* Right: Buddy Visual Showcase */}
        <div className="relative flex items-center justify-center w-full md:w-64 h-64 flex-shrink-0">
          {/* Holographic Hexagon Stage */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-surface-container-lowest via-brand-tertiary/10 to-transparent border border-white/10 shadow-inner" />
          <div className="absolute bottom-4 inset-x-8 h-8 rounded-full bg-brand-tertiary/30 blur-xl pointer-events-none" />
          
          <img
            src={currentSprite}
            alt={buddy.name}
            className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 object-contain animate-float drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform"
          />

          <span className="absolute bottom-2 font-mono text-[10px] text-brand-tertiary font-bold tracking-widest uppercase bg-surface-container-lowest/80 px-2 py-0.5 rounded-full border border-white/10">
            Aura Resonance Active
          </span>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Compass, Sun, MapPin, Sparkles, Navigation, Disc, CheckCircle2 } from "lucide-react";
import { sounds } from "../../utils/soundEffects";
import { TypeBadge } from "../common/TypeBadge";
import confetti from "canvas-confetti";

export function AdventureMap({ onSelectPokemon }) {
  const [lureActive, setLureActive] = useState(true);
  const [captured, setCaptured] = useState({});

  const spawns = [
    { id: 6, name: "Charizard", cp: 2840, type: "Fire", x: 65, y: 30, timer: "12m", sprite: "/assets/avatars/charizard.png" },
    { id: 25, name: "Pikachu", cp: 1120, type: "Electric", x: 30, y: 45, timer: "08m", sprite: "/assets/avatars/pikachu.png" },
    { id: 658, name: "Greninja", cp: 2910, type: "Water", x: 75, y: 70, timer: "15m", sprite: "/assets/avatars/greninja.png" },
    { id: 94, name: "Gengar", cp: 2430, type: "Ghost", x: 22, y: 78, timer: "04m", sprite: "/assets/avatars/gengar.png" },
  ];

  const handleCatch = (spawn) => {
    sounds.playVictory();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ee1515', '#facc15', '#ffffff']
    });
    setCaptured((prev) => ({ ...prev, [spawn.id]: true }));
  };

  const handleSpinStop = () => {
    sounds.playHeal();
    alert("PokéStop Spun! Acquired: 3x Ultra Balls, 2x Max Potions, 500 XP!");
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-level-2 p-5 sm:p-6 shadow-2xl border border-white/10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-tertiary/20 text-brand-tertiary border border-brand-tertiary/30">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-on-surface">
              Tactical Adventure Radar
            </h3>
            <span className="font-body text-xs text-on-surface-variant">
              Live Sensor Field: Mt. Silver Perimeter
            </span>
          </div>
        </div>

        {/* Weather Boost Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/90 border border-amber-500/30 text-amber-300">
          <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "20s" }} />
          <span className="font-display text-xs font-bold">Sunny Weather</span>
          <span className="font-mono text-[10px] text-amber-200 bg-amber-500/20 px-1.5 py-0.5 rounded-full">
            +25% FIRE BUFF
          </span>
        </div>
      </div>

      {/* Cyber Radar Map Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl bg-slate-950 cyber-grid-bg border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Radar concentric circular waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full border border-brand-tertiary/20" />
          <div className="w-64 h-64 rounded-full border border-brand-tertiary/15" />
          <div className="w-96 h-96 rounded-full border border-brand-tertiary/10" />
          
          {/* Rotating radar scan beam */}
          <div 
            className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-brand-tertiary/20 via-transparent to-transparent pointer-events-none animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>

        {/* Center: Trainer Blip */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 animate-ping absolute" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-rose-500 border-2 border-white shadow-glow-primary flex items-center justify-center">
              <Navigation className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="font-mono text-[10px] text-brand-primary font-extrabold uppercase mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-brand-primary/40">
            YOU
          </span>
        </div>

        {/* PokéStop Marker */}
        <div 
          onClick={handleSpinStop}
          className="absolute z-20 cursor-pointer flex flex-col items-center group tactile-button"
          style={{ left: "48%", top: "20%" }}
          title="Click to spin PokéStop!"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-400 group-hover:scale-125 transition-transform flex items-center justify-center shadow-[0_0_12px_#38bdf8]">
            <Disc className="w-4 h-4 text-sky-300 animate-spin" style={{ animationDuration: "4s" }} />
          </div>
          <span className="font-mono text-[9px] text-sky-300 bg-slate-900/90 px-1.5 py-0.2 rounded mt-1 border border-sky-400/40">
            PokéStop (Spin)
          </span>
        </div>

        {/* Wild Pokémon Spawns */}
        {spawns.map((spawn) => {
          const isCaught = captured[spawn.id];

          return (
            <div
              key={spawn.id}
              className="absolute z-20 flex flex-col items-center transition-all group"
              style={{ left: `${spawn.x}%`, top: `${spawn.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {isCaught ? (
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-slate-900 px-1 rounded mt-0.5">
                    CAPTURED
                  </span>
                </div>
              ) : (
                <div 
                  onClick={() => handleCatch(spawn)}
                  className="flex flex-col items-center cursor-pointer tactile-button"
                >
                  {/* Glowing Radar Circle */}
                  <div className="relative">
                    <span className="absolute -inset-1 rounded-full bg-brand-secondary/30 blur-sm group-hover:bg-brand-primary/40 transition-colors animate-pulse" />
                    <div className="relative w-12 h-12 rounded-full bg-surface-container-high/90 border border-white/20 p-1 flex items-center justify-center group-hover:scale-115 transition-transform">
                      <img src={spawn.sprite} alt={spawn.name} className="w-10 h-10 object-contain drop-shadow" />
                    </div>
                  </div>

                  {/* Spawn Details Tag */}
                  <div className="flex items-center gap-1 bg-surface-container-lowest/95 px-2 py-0.5 rounded-full border border-white/10 mt-1 shadow-md">
                    <span className="font-display text-[10px] font-bold text-on-surface">{spawn.name}</span>
                    <span className="font-mono text-[9px] text-brand-secondary font-bold">CP {spawn.cp}</span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-tertiary">
                    Expires in {spawn.timer}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Compass Heading Corner */}
        <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 px-2.5 py-1 rounded-lg border border-white/10 font-mono text-[10px] text-on-surface-variant flex items-center gap-2">
          <span className="text-emerald-400">● LIVE GPS</span>
          <span>LAT: 35.6764° N</span>
          <span>LON: 139.6500° E</span>
        </div>

      </div>
    </section>
  );
}

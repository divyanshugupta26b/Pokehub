import React, { useState } from "react";
import { Users, Shield, Zap, Sparkles, ArrowRightLeft, Search, Plus, Trash2, CheckCircle2, Sliders } from "lucide-react";
import { POKEMON_DATA, TYPE_COLORS } from "../../data/pokemonData";
import { TypeBadge } from "../common/TypeBadge";
import { ProgressBar } from "../common/ProgressBar";
import { sounds } from "../../utils/soundEffects";

export function TeamBuilder({ trainerAvatar, onOpenAvatarModal }) {
  const [activeParty, setActiveParty] = useState([
    POKEMON_DATA[0], // Lucario
    POKEMON_DATA[1], // Charizard
    POKEMON_DATA[2], // Greninja
    POKEMON_DATA[3], // Gengar
    POKEMON_DATA[4], // Pikachu
    POKEMON_DATA[5], // Garchomp
  ]);

  const [boxStorage, setBoxStorage] = useState(POKEMON_DATA);
  const [selectedPartySlot, setSelectedPartySlot] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [boxFilter, setBoxFilter] = useState("all");

  const selectedPokemon = activeParty[selectedPartySlot] || activeParty[0];

  // Swap box member into selected party slot
  const handleSwapIntoParty = (boxPoke) => {
    sounds.playClick();
    setActiveParty((prev) => {
      const nextParty = [...prev];
      nextParty[selectedPartySlot] = boxPoke;
      return nextParty;
    });
  };

  // Filter box storage
  const filteredBox = boxStorage.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.types.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (boxFilter === "high-cp") return p.cp >= 3000;
    return true;
  });

  // Calculate team total CP & Unique types
  const totalCp = activeParty.reduce((sum, p) => sum + p.cp, 0);
  const uniqueTypes = Array.from(new Set(activeParty.flatMap((p) => p.types)));

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      
      {/* Top Section: Team Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-tertiary/20 text-brand-tertiary border border-brand-tertiary/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-on-surface">
              Battle Party Configuration
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Competitive 6-Slot Roster & Type Coverage Matrix
            </p>
          </div>
        </div>

        {/* Team Synergy Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 flex flex-col items-end">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">Total Team CP</span>
            <span className="font-mono text-base font-extrabold text-brand-secondary">
              {totalCp.toLocaleString()}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-surface-container-high border border-white/10 flex flex-col items-end">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">Type Diversity</span>
            <span className="font-mono text-base font-extrabold text-brand-tertiary">
              {uniqueTypes.length} Types
            </span>
          </div>

          {onOpenAvatarModal && (
            <button
              id="btn-teambuilder-avatar"
              onClick={() => { sounds.playClick(); onOpenAvatarModal(); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-display font-bold tactile-button shadow-glow-gold/10"
              title="Change Trainer Avatar"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-900 border border-amber-400/80 p-0.5">
                <img src={trainerAvatar?.avatar || "/assets/avatars/lucario.png"} alt="Avatar" className="w-full h-full object-contain" />
              </div>
              <span className="hidden sm:inline">Avatar Vault</span>
            </button>
          )}
        </div>
      </div>

      {/* Active 6-Member Battle Roster Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {activeParty.map((poke, index) => {
          const isSelected = selectedPartySlot === index;

          return (
            <div
              key={index}
              id={`party-slot-${index}`}
              onClick={() => {
                sounds.playClick();
                setSelectedPartySlot(index);
              }}
              className={`relative overflow-hidden rounded-2xl p-3 border transition-all cursor-pointer tactile-button flex flex-col items-center justify-between ${
                isSelected
                  ? "glass-level-3 border-brand-primary shadow-glow-primary/40 -translate-y-1"
                  : "glass-level-2 border-white/10 hover:border-white/20"
              }`}
            >
              {/* Slot Badge */}
              <div className="w-full flex items-center justify-between">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-brand-primary text-white" : "bg-surface-container-high text-on-surface-variant"
                }`}>
                  SLOT 0{index + 1}
                </span>
                <span className="font-mono text-[11px] font-extrabold text-brand-tertiary">
                  CP {poke.cp}
                </span>
              </div>

              {/* Sprite Image */}
              <div className="relative my-2 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/5 blur-sm" />
                <img
                  src={poke.avatar || poke.sprite}
                  alt={poke.name}
                  className="relative z-10 w-full h-full object-contain drop-shadow"
                />
              </div>

              {/* Name & Primary Type */}
              <div className="w-full text-center space-y-1">
                <h4 className="font-display font-bold text-xs sm:text-sm text-on-surface truncate">
                  {poke.name}
                </h4>
                <div className="flex justify-center gap-1">
                  {poke.types.map((t) => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Inspection Drawer & Storage Box Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Detailed Inspector of Selected Member (5 cols) */}
        <div className="lg:col-span-5 glass-level-2 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[10px] text-brand-secondary uppercase font-bold tracking-wider">
                Slot {selectedPartySlot + 1} Profile
              </span>
              <h3 className="font-display font-black text-2xl text-on-surface">
                {selectedPokemon.name}
              </h3>
              <p className="font-body text-xs text-on-surface-variant italic mt-0.5">
                {selectedPokemon.title}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-xl font-extrabold text-brand-tertiary">
                CP {selectedPokemon.cp}
              </span>
              <div className="flex gap-1 mt-1">
                {selectedPokemon.types.map((t) => (
                  <TypeBadge key={t} type={t} size="sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Base Stats Bar Chart */}
          <div className="space-y-2">
            <span className="font-display text-xs font-bold text-on-surface uppercase tracking-wider block">
              Combat Statistics Matrix
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              {Object.entries(selectedPokemon.stats).map(([stat, val]) => (
                <div key={stat} className="flex items-center gap-3">
                  <span className="w-20 uppercase text-on-surface-variant text-[11px] font-semibold">
                    {stat.replace(/([A-Z])/g, " $1")}
                  </span>
                  <div className="flex-1 bg-surface-container-lowest h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-tertiary to-sky-400"
                      style={{ width: `${Math.min(100, (val / 150) * 100)}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold text-on-surface">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Moveset */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="font-display text-xs font-bold text-on-surface uppercase tracking-wider block">
              Equipped Moveset
            </span>
            <div className="grid grid-cols-2 gap-2">
              {selectedPokemon.moves.map((move) => (
                <div key={move.name} className="p-2.5 rounded-xl bg-surface-container-lowest border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-on-surface">{move.name}</span>
                    <span className="font-mono text-[10px] text-brand-secondary font-bold">PWR {move.power}</span>
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant">PP {move.maxPp}/{move.maxPp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pokémon Storage Box (7 cols) */}
        <div className="lg:col-span-7 glass-level-2 p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
          
          <div>
            {/* Box Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">
                  Reserve Pokémon Storage Box
                </h3>
                <span className="font-body text-xs text-on-surface-variant">
                  Click any reserve to swap into Slot 0{selectedPartySlot + 1}
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-brand-tertiary"
                />
              </div>
            </div>

            {/* Storage Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredBox.map((poke) => {
                const isInParty = activeParty.some((p) => p.name === poke.name);

                return (
                  <div
                    key={poke.name}
                    id={`box-pokemon-${poke.name.toLowerCase()}`}
                    onClick={() => handleSwapIntoParty(poke)}
                    className="p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-white/5 hover:border-brand-tertiary transition-all cursor-pointer tactile-button group flex flex-col items-center justify-between"
                  >
                    <div className="w-full flex items-center justify-between">
                      <span className="font-mono text-[10px] text-brand-secondary font-bold">
                        CP {poke.cp}
                      </span>
                      {isInParty && (
                        <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1 rounded">
                          IN PARTY
                        </span>
                      )}
                    </div>

                    <img src={poke.avatar || poke.sprite} alt={poke.name} className="w-16 h-16 object-contain my-1 group-hover:scale-110 transition-transform" />

                    <div className="w-full text-center">
                      <h5 className="font-display font-bold text-xs text-on-surface truncate">{poke.name}</h5>
                      <div className="flex justify-center gap-1 mt-0.5">
                        {poke.types.slice(0, 1).map((t) => (
                          <TypeBadge key={t} type={t} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Storage: {filteredBox.length} Pokémon Available</span>
            <span className="text-brand-tertiary font-bold">Quick-Swap Mode Ready</span>
          </div>

        </div>

      </div>

    </div>
  );
}

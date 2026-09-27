import React, { useState } from "react";
import { Search, SlidersHorizontal, BookOpen, Sparkles, Filter } from "lucide-react";
import { POKEMON_DATA, TYPE_COLORS } from "../../data/pokemonData";
import { TypeBadge } from "../common/TypeBadge";
import { PokemonModal } from "./PokemonModal";
import { sounds } from "../../utils/soundEffects";

export function Pokedex({ trainerAvatar, onOpenAvatarModal }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedGen, setSelectedGen] = useState("All");
  const [sortBy, setSortBy] = useState("dex"); // "dex" | "cp" | "alpha"
  const [modalPokemon, setModalPokemon] = useState(null);

  const typesList = ["All", "Fire", "Water", "Grass", "Electric", "Steel", "Fighting", "Dragon", "Ghost", "Dark", "Psychic", "Rock"];
  const gensList = ["All", "Gen I", "Gen II", "Gen III", "Gen IV", "Gen VI"];

  // Filter & Sort logic
  const filteredList = POKEMON_DATA.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.types.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
                          String(p.id).includes(search);
    if (!matchesSearch) return false;
    if (selectedType !== "All" && !p.types.includes(selectedType)) return false;
    if (selectedGen !== "All" && p.generation !== selectedGen) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "cp") return b.cp - a.cp;
    if (sortBy === "alpha") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-secondary to-amber-500 text-slate-950 font-bold shadow-glow-gold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-on-surface">
              National Creature Encyclopedia
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Comprehensive Database of Species, Typings & Combat Parameters
            </p>
          </div>
        </div>

        {/* Global Dex Count & Avatar Vault Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onOpenAvatarModal && (
            <button
              id="btn-pokedex-open-avatars"
              onClick={() => { sounds.playClick(); onOpenAvatarModal(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-display font-bold tactile-button shadow-glow-gold/10"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Avatar Vault</span>
            </button>
          )}

          <div className="flex items-center gap-2 font-mono text-xs bg-surface-container-high px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-on-surface-variant">Registered:</span>
            <span className="text-brand-secondary font-bold">{filteredList.length} / {POKEMON_DATA.length} Species</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Type Pills & Sorter */}
      <div className="glass-level-2 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4 shadow-xl">
        
        {/* Row 1: Search & Sort options */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-pokedex-search"
              placeholder="Search by name, type, or #000..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-sm font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-brand-primary"
            />
          </div>

          {/* Sorter & Generation selectors */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <span className="text-on-surface-variant">Sort:</span>
              <select
                id="select-pokedex-sort"
                value={sortBy}
                onChange={(e) => { sounds.playClick(); setSortBy(e.target.value); }}
                className="bg-transparent text-on-surface font-bold focus:outline-none cursor-pointer"
              >
                <option value="dex" className="bg-slate-900">Dex Number</option>
                <option value="cp" className="bg-slate-900">Highest CP</option>
                <option value="alpha" className="bg-slate-900">Alphabetical</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <span className="text-on-surface-variant">Gen:</span>
              <select
                id="select-pokedex-gen"
                value={selectedGen}
                onChange={(e) => { sounds.playClick(); setSelectedGen(e.target.value); }}
                className="bg-transparent text-brand-tertiary font-bold focus:outline-none cursor-pointer"
              >
                {gensList.map((g) => (
                  <option key={g} value={g} className="bg-slate-900">{g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {typesList.map((type) => {
            const isSelected = selectedType === type;
            const typeColor = TYPE_COLORS[type]?.bg || "#38bdf8";

            return (
              <button
                key={type}
                id={`btn-filter-type-${type.toLowerCase()}`}
                onClick={() => {
                  sounds.playClick();
                  setSelectedType(type);
                }}
                className={`px-3 py-1 rounded-full text-xs font-display font-extrabold uppercase tracking-wider flex-shrink-0 transition-all tactile-button ${
                  isSelected
                    ? "bg-white text-slate-950 shadow-lg scale-105"
                    : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant border border-white/5"
                }`}
                style={
                  isSelected && type !== "All"
                    ? { backgroundColor: typeColor, color: "#FFFFFF", boxShadow: `0 0 12px ${typeColor}66` }
                    : {}
                }
              >
                {type}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Grid: Creature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredList.map((pokemon) => {
          const mainType = pokemon.types[0];
          const typeStyle = TYPE_COLORS[mainType] || { bg: "#38bdf8" };

          return (
            <div
              key={pokemon.id}
              id={`card-pokemon-${pokemon.name.toLowerCase()}`}
              onClick={() => {
                sounds.playClick();
                setModalPokemon(pokemon);
              }}
              className="relative overflow-hidden rounded-2xl glass-level-2 p-5 border border-white/10 hover:border-white/25 hover:shadow-2xl transition-all cursor-pointer group tactile-button flex flex-col justify-between"
            >
              {/* Subtle ambient aura */}
              <div
                className="absolute -right-12 -top-12 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                style={{ backgroundColor: typeStyle.bg }}
              />

              {/* Card Header: Dex # & CP */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider">
                    #{String(pokemon.id).padStart(3, "0")}
                  </span>
                  {trainerAvatar?.name === pokemon.name && (
                    <span className="text-[9px] font-mono font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.2 rounded-full">
                      AVATAR
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-extrabold text-brand-secondary bg-surface-container-lowest px-2 py-0.5 rounded-full border border-white/5">
                  CP {pokemon.cp.toLocaleString()}
                </span>
              </div>

              {/* Creature Artwork */}
              <div className="relative my-3 flex items-center justify-center h-40">
                <div className="absolute inset-4 rounded-full bg-white/5 blur-sm" />
                <img
                  src={pokemon.avatar || pokemon.sprite}
                  alt={pokemon.name}
                  className="relative z-10 w-36 h-36 object-contain group-hover:scale-110 group-hover:-translate-y-1 transition-transform drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Card Footer: Name & Type Pills */}
              <div className="z-10 space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-black text-lg text-on-surface group-hover:text-brand-primary transition-colors">
                    {pokemon.name}
                  </h3>
                  <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                    {pokemon.generation}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {pokemon.types.map((t) => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal Overlay */}
      {modalPokemon && (
        <PokemonModal
          pokemon={modalPokemon}
          onClose={() => setModalPokemon(null)}
          onEquipAvatar={(p) => {
            if (onOpenAvatarModal) onOpenAvatarModal();
          }}
        />
      )}

    </div>
  );
}

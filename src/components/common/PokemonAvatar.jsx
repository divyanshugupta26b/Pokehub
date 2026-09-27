import React, { useState } from "react";
import { TYPE_COLORS } from "../../data/pokemonData";
import { sounds } from "../../utils/soundEffects";
import { Sparkles as SparklesIcon } from "lucide-react";

const SIZE_MAP = {
  xs: "w-6 h-6 text-[9px]",
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
  xl: "w-20 h-20 text-lg",
  "2xl": "w-28 h-28 text-2xl",
  "3xl": "w-36 h-36 text-3xl",
  hero: "w-44 h-44 sm:w-52 sm:h-52 text-4xl",
};

const AURA_MAP = {
  plasma: "radial-gradient(circle at center, rgba(239, 68, 68, 0.6) 0%, rgba(249, 115, 22, 0.3) 45%, transparent 75%)",
  celestial: "radial-gradient(circle at center, rgba(6, 182, 212, 0.65) 0%, rgba(99, 102, 241, 0.35) 45%, transparent 75%)",
  electric: "radial-gradient(circle at center, rgba(250, 204, 21, 0.7) 0%, rgba(234, 179, 8, 0.35) 45%, transparent 75%)",
  magma: "radial-gradient(circle at center, rgba(220, 38, 38, 0.7) 0%, rgba(180, 83, 9, 0.35) 50%, transparent 75%)",
  abyss: "radial-gradient(circle at center, rgba(14, 165, 233, 0.7) 0%, rgba(30, 58, 138, 0.4) 50%, transparent 75%)",
  spectral: "radial-gradient(circle at center, rgba(168, 85, 247, 0.7) 0%, rgba(88, 28, 135, 0.45) 50%, transparent 75%)",
  gold: "radial-gradient(circle at center, rgba(250, 204, 21, 0.75) 0%, rgba(217, 119, 6, 0.4) 50%, transparent 75%)",
  prism: "radial-gradient(circle at center, rgba(236, 72, 153, 0.6) 0%, rgba(6, 182, 212, 0.4) 50%, transparent 75%)",
};

export function PokemonAvatar({
  pokemon,
  size = "md",
  shape = "rounded-2xl",
  showGlow = true,
  selected = false,
  badge = null,
  interactive = false,
  onClick = null,
  className = "",
  frameStyle = "default", // "default" | "cyber" | "champion" | "elemental" | "hologram" | "void" | "prism"
  auraTheme = "default", // "default" | "plasma" | "celestial" | "electric" | "magma" | "abyss" | "spectral" | "gold" | "prism"
  isShiny = false,
  sparkles = false,
  animate = false,
}) {
  const [imgError, setImgError] = useState(false);

  if (!pokemon) return null;

  // Resolve name, types, and image
  const name = pokemon.name || "Pokémon";
  const types = pokemon.types || ["Normal"];
  const primaryType = types[0] || "Normal";
  const typeStyle = TYPE_COLORS[primaryType] || { bg: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" };

  // Use shiny sprite if shiny mode is on and available
  const avatarSrc = (isShiny && pokemon.shinySprite)
    ? pokemon.shinySprite
    : (pokemon.avatar || pokemon.sprite || "/assets/avatar.png");

  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  const handleClick = (e) => {
    if (interactive || onClick) {
      sounds.playClick();
      if (onClick) onClick(e);
    }
  };

  // Determine frame styling
  let frameClasses = "border-white/15 bg-surface-container-low";
  let outerGlowBg = selected ? "#FACC15" : typeStyle.bg;

  if (selected) {
    frameClasses = "border-amber-400 bg-surface-container-highest ring-2 ring-amber-400/50 shadow-glow-gold";
  } else if (frameStyle === "champion") {
    frameClasses = "border-amber-400/90 bg-gradient-to-br from-amber-500/10 to-surface-container-high ring-2 ring-amber-400/60 shadow-[0_0_20px_rgba(250,204,21,0.55)]";
    outerGlowBg = "#FACC15";
  } else if (frameStyle === "cyber") {
    frameClasses = "border-cyan-400 bg-surface-container-lowest ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.5)]";
    outerGlowBg = "#06B6D4";
  } else if (frameStyle === "elemental") {
    frameClasses = "bg-surface-container-high ring-2 ring-white/40 shadow-xl";
  } else if (frameStyle === "hologram") {
    frameClasses = "border-fuchsia-400/90 bg-gradient-to-tr from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 ring-2 ring-fuchsia-400/50 shadow-[0_0_22px_rgba(236,72,153,0.5)]";
    outerGlowBg = "#EC4899";
  } else if (frameStyle === "void") {
    frameClasses = "border-purple-600 bg-surface-container-lowest ring-2 ring-purple-500/60 shadow-[0_0_24px_rgba(139,92,246,0.6)]";
    outerGlowBg = "#8B5CF6";
  } else if (frameStyle === "prism") {
    frameClasses = "border-emerald-400 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 ring-2 ring-emerald-400/60 shadow-[0_0_22px_rgba(16,185,129,0.5)]";
    outerGlowBg = "#10B981";
  }

  // Aura background gradient
  const customAura = AURA_MAP[auraTheme];

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center flex-shrink-0 transition-all select-none ${
        interactive ? "cursor-pointer group hover:scale-105 active:scale-95" : ""
      } ${animate ? "animate-float" : ""} ${className}`}
    >
      {/* Outer ambient glow if enabled or selected */}
      {showGlow && (
        <div
          className={`absolute inset-0 ${shape} blur-md transition-opacity pointer-events-none ${
            selected ? "opacity-90 scale-110" : "opacity-45 group-hover:opacity-80"
          }`}
          style={{
            backgroundColor: frameStyle === "elemental" ? typeStyle.bg : outerGlowBg,
            boxShadow: `0 0 28px ${frameStyle === "elemental" ? typeStyle.bg : outerGlowBg}88`,
          }}
        />
      )}

      {/* Cyber Corner brackets for cyber frame style */}
      {frameStyle === "cyber" && (
        <>
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-300 z-20 pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-300 z-20 pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-300 z-20 pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-300 z-20 pointer-events-none" />
        </>
      )}

      {/* Champion Corner rivets for champion frame style */}
      {frameStyle === "champion" && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#FACC15] z-20 pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#FACC15] z-20 pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#FACC15] z-20 pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#FACC15] z-20 pointer-events-none" />
        </>
      )}

      {/* Avatar Container */}
      <div
        className={`relative ${sizeClasses} ${shape} overflow-hidden flex items-center justify-center border transition-all ${frameClasses}`}
        style={frameStyle === "elemental" ? { borderColor: typeStyle.bg } : {}}
      >
        {/* Ambient background tint using type color or custom aura */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: customAura || `radial-gradient(circle at center, ${typeStyle.bg} 40%, transparent 80%)`,
            opacity: customAura ? 0.85 : 0.25,
          }}
        />

        {/* Shiny Sparkles Overlay */}
        {(sparkles || isShiny) && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <span className="absolute top-1 left-2 text-amber-300 animate-ping text-[10px]">✦</span>
            <span className="absolute top-3 right-2 text-amber-200 animate-pulse text-[12px]">★</span>
            <span className="absolute bottom-2 left-3 text-cyan-300 animate-pulse text-[9px]">✦</span>
            <span className="absolute bottom-1 right-2 text-yellow-300 animate-ping text-[10px]">✨</span>
          </div>
        )}

        {/* Avatar Image or Initial Fallback */}
        {!imgError ? (
          <img
            src={avatarSrc}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-1.5 relative z-10 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)]"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-display font-extrabold text-white"
            style={{ backgroundColor: typeStyle.bg }}
          >
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Selected Indicator */}
      {selected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md z-20">
          <svg className="w-2.5 h-2.5 fill-current stroke-current" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Shiny Star Badge */}
      {isShiny && !selected && (
        <div className="absolute -top-1 -left-1 p-0.5 rounded-full bg-amber-400 text-slate-950 shadow-md z-20 flex items-center justify-center" title="Shiny Variant">
          <SparklesIcon className="w-2.5 h-2.5 fill-current" />
        </div>
      )}

      {/* Optional Badge (e.g. Title or Level) */}
      {badge && !selected && (
        <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-900 border border-white/20 text-[9px] font-mono font-bold text-brand-secondary z-20 shadow-sm truncate max-w-[85px]">
          {badge}
        </div>
      )}
    </div>
  );
}

export default PokemonAvatar;

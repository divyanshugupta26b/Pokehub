import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Download, 
  Check, 
  Shuffle, 
  RotateCcw, 
  Shield, 
  Flame, 
  Zap, 
  Heart, 
  Layers, 
  Palette, 
  Camera, 
  Sliders, 
  Tag, 
  Eye, 
  ChevronRight,
  Sparkle
} from "lucide-react";
import { 
  PROJECT_AVATARS, 
  POKEMON_DATA, 
  TYPE_COLORS, 
  AVATAR_FRAMES, 
  AVATAR_AURAS, 
  AVATAR_PRESET_BADGES 
} from "../../data/pokemonData";
import { PokemonAvatar } from "../common/PokemonAvatar";
import { TypeBadge } from "../common/TypeBadge";
import { sounds } from "../../utils/soundEffects";
import confetti from "canvas-confetti";

export function AvatarStudio({ trainerAvatar, onSelectAvatar, onSetBuddy }) {
  // Current Pokémon selection
  const [selectedPokemon, setSelectedPokemon] = useState(() => {
    if (trainerAvatar) {
      const match = PROJECT_AVATARS.find((p) => p.id === trainerAvatar.id) || PROJECT_AVATARS[0];
      return match;
    }
    return PROJECT_AVATARS[0];
  });

  // Customization controls
  const [frameStyle, setFrameStyle] = useState("cyber");
  const [auraTheme, setAuraTheme] = useState("celestial");
  const [isShiny, setIsShiny] = useState(false);
  const [isMega, setIsMega] = useState(false);
  const [badgeText, setBadgeText] = useState("Ace Trainer");
  const [trainerNickname, setTrainerNickname] = useState("Red");
  const [customTagline, setCustomTagline] = useState("Aura Guardian");
  const [enableSparkles, setEnableSparkles] = useState(true);
  const [enableFloat, setEnableFloat] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [equippedSuccess, setEquippedSuccess] = useState(false);

  // Sync when selectedPokemon changes
  useEffect(() => {
    if (selectedPokemon.isMega) {
      setIsMega(true);
    } else {
      setIsMega(false);
    }
    if (selectedPokemon.badge) {
      setBadgeText(selectedPokemon.badge);
    }
    if (selectedPokemon.tagline) {
      setCustomTagline(selectedPokemon.tagline);
    }
  }, [selectedPokemon.id]);

  // Resolve current active avatar representation
  const activePokemonObj = isMega 
    ? (PROJECT_AVATARS.find((p) => p.id === "lucario-mega") || selectedPokemon)
    : selectedPokemon;

  const primaryType = activePokemonObj.types[0] || "Normal";
  const typeColor = TYPE_COLORS[primaryType] || { bg: "#06B6D4", text: "#FFFFFF" };
  const isCurrentEquipped = (trainerAvatar?.id === activePokemonObj.id || trainerAvatar?.name === activePokemonObj.name) &&
    (trainerAvatar?.frameStyle === frameStyle && trainerAvatar?.badge === badgeText);

  // Handle Equip as Trainer Avatar
  const handleEquip = () => {
    sounds.playVictory();
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#FACC15", "#EE1515", "#06B6D4", "#10B981", "#8B5CF6"],
    });

    const equippedData = {
      ...activePokemonObj,
      frameStyle,
      auraTheme,
      isShiny,
      badge: badgeText,
      tagline: customTagline,
      trainerNickname,
      avatar: isShiny && activePokemonObj.shinySprite ? activePokemonObj.shinySprite : activePokemonObj.avatar,
    };

    if (onSelectAvatar) {
      onSelectAvatar(equippedData);
    }
    setEquippedSuccess(true);
    setTimeout(() => setEquippedSuccess(false), 3000);
  };

  // Handle Set as Active Buddy
  const handleSetBuddyClick = () => {
    sounds.playLevelUp ? sounds.playLevelUp() : sounds.playVictory();
    if (onSetBuddy) {
      onSetBuddy(activePokemonObj);
    }
  };

  // Handle Randomize / Surprise Me
  const handleRandomize = () => {
    sounds.playClick();
    const randomPoke = PROJECT_AVATARS[Math.floor(Math.random() * PROJECT_AVATARS.length)];
    const randomFrame = AVATAR_FRAMES[Math.floor(Math.random() * AVATAR_FRAMES.length)].id;
    const randomAura = AVATAR_AURAS[Math.floor(Math.random() * AVATAR_AURAS.length)].id;
    const randomBadge = AVATAR_PRESET_BADGES[Math.floor(Math.random() * AVATAR_PRESET_BADGES.length)];
    const randomShiny = Math.random() > 0.65;

    setSelectedPokemon(randomPoke);
    setFrameStyle(randomFrame);
    setAuraTheme(randomAura);
    setBadgeText(randomBadge);
    setIsShiny(randomShiny);
  };

  // Handle Reset to Default
  const handleReset = () => {
    sounds.playClick();
    setFrameStyle("cyber");
    setAuraTheme("celestial");
    setIsShiny(false);
    setIsMega(false);
    setBadgeText(selectedPokemon.badge || "Ace Trainer");
    setCustomTagline(selectedPokemon.tagline || selectedPokemon.title);
  };

  // Export Custom Avatar to PNG using HTML5 Canvas
  const handleExportPNG = async () => {
    sounds.playClick();
    setIsExporting(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      // 1. Background Fill with rounded corners
      ctx.fillStyle = "#0A0E18";
      ctx.fillRect(0, 0, 512, 512);

      // 2. Ambient Cyber Radar Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // 3. Aura Glow Gradient
      const auraGradient = ctx.createRadialGradient(256, 210, 20, 256, 210, 220);
      let auraColor1 = "rgba(6, 182, 212, 0.55)";
      let auraColor2 = "rgba(99, 102, 241, 0.2)";

      if (auraTheme === "plasma") {
        auraColor1 = "rgba(239, 68, 68, 0.6)";
        auraColor2 = "rgba(249, 115, 22, 0.25)";
      } else if (auraTheme === "electric") {
        auraColor1 = "rgba(250, 204, 21, 0.65)";
        auraColor2 = "rgba(234, 179, 8, 0.25)";
      } else if (auraTheme === "magma") {
        auraColor1 = "rgba(220, 38, 38, 0.65)";
        auraColor2 = "rgba(180, 83, 9, 0.25)";
      } else if (auraTheme === "abyss") {
        auraColor1 = "rgba(14, 165, 233, 0.65)";
        auraColor2 = "rgba(30, 58, 138, 0.3)";
      } else if (auraTheme === "spectral") {
        auraColor1 = "rgba(168, 85, 247, 0.65)";
        auraColor2 = "rgba(88, 28, 135, 0.35)";
      } else if (auraTheme === "gold") {
        auraColor1 = "rgba(250, 204, 21, 0.7)";
        auraColor2 = "rgba(217, 119, 6, 0.3)";
      } else {
        auraColor1 = `${typeColor.bg}88`;
        auraColor2 = "rgba(0, 0, 0, 0)";
      }

      auraGradient.addColorStop(0, auraColor1);
      auraGradient.addColorStop(0.5, auraColor2);
      auraGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(256, 210, 220, 0, Math.PI * 2);
      ctx.fill();

      // 4. Concentric Tech Reticle
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(256, 210, 160, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Draw Frame Ring
      ctx.save();
      if (frameStyle === "champion") {
        ctx.strokeStyle = "#FACC15";
        ctx.lineWidth = 6;
        ctx.shadowColor = "#FACC15";
        ctx.shadowBlur = 18;
      } else if (frameStyle === "cyber") {
        ctx.strokeStyle = "#06B6D4";
        ctx.lineWidth = 4;
        ctx.shadowColor = "#06B6D4";
        ctx.shadowBlur = 16;
      } else if (frameStyle === "elemental") {
        ctx.strokeStyle = typeColor.bg;
        ctx.lineWidth = 5;
        ctx.shadowColor = typeColor.bg;
        ctx.shadowBlur = 18;
      } else if (frameStyle === "void") {
        ctx.strokeStyle = "#8B5CF6";
        ctx.lineWidth = 5;
        ctx.shadowColor = "#8B5CF6";
        ctx.shadowBlur = 20;
      } else {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 3;
      }
      ctx.beginPath();
      ctx.arc(256, 210, 175, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 6. Draw Pokémon Artwork
      const imgSrc = (isShiny && activePokemonObj.shinySprite) 
        ? activePokemonObj.shinySprite 
        : (activePokemonObj.avatar || activePokemonObj.sprite);

      await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.save();
          // Drop shadow for Pokémon
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 16;
          ctx.shadowOffsetY = 8;
          ctx.drawImage(img, 256 - 130, 210 - 130, 260, 260);
          ctx.restore();
          resolve();
        };
        img.onerror = () => {
          // If image fails, draw clean symbol fallback
          ctx.fillStyle = typeColor.bg;
          ctx.beginPath();
          ctx.arc(256, 210, 80, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 64px Sora, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(activePokemonObj.name.charAt(0), 256, 230);
          resolve();
        };
        img.src = imgSrc;
      });

      // 7. Sparkle effects if enabled
      if (enableSparkles || isShiny) {
        ctx.fillStyle = "#FACC15";
        const sparklesList = [
          [130, 110, 5], [380, 120, 6], [110, 280, 4], [390, 290, 5], [256, 45, 6]
        ];
        sparklesList.forEach(([x, y, r]) => {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 8. Lower Card Dock / Banner
      ctx.fillStyle = "rgba(17, 24, 39, 0.9)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(40, 410, 432, 80, 16);
      ctx.fill();
      ctx.stroke();

      // 9. Badge pill in banner
      ctx.fillStyle = "#FACC15";
      ctx.beginPath();
      ctx.roundRect(56, 424, 130, 24, 12);
      ctx.fill();
      ctx.fillStyle = "#0A0E18";
      ctx.font = "bold 11px Sora, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(badgeText.toUpperCase(), 121, 440);

      // 10. Pokémon Name & Title
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "800 20px Sora, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(activePokemonObj.name, 200, 443);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "12px sans-serif";
      ctx.fillText(`Trainer: ${trainerNickname} • ${customTagline}`, 56, 474);

      // 11. Trigger Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${activePokemonObj.name.toLowerCase()}-avatar.png`;
      link.href = dataUrl;
      link.click();

      sounds.playVictory();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error("Canvas export failed:", err);
      alert("Could not export canvas image. Please check browser permissions.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-16 animate-in fade-in duration-300">
      
      {/* Studio Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl glass-level-2 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-tr from-amber-400 via-brand-secondary to-yellow-500 text-slate-950 font-black shadow-glow-gold">
            <Sparkles className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-on-surface tracking-tight">
                Pokémon Avatar Studio
              </h1>
              <span className="font-mono text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                PRO CREATOR
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
              Craft tactile custom profile avatars for your project Pokémon with dynamic auras, holographic frames, & badge engraving.
            </p>
          </div>
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-2.5 z-10 flex-wrap">
          <button
            id="btn-studio-randomize"
            onClick={handleRandomize}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface text-xs font-display font-bold tactile-button transition-colors"
            title="Randomize avatar combination"
          >
            <Shuffle className="w-4 h-4 text-brand-secondary" />
            <span>Surprise Me</span>
          </button>

          <button
            id="btn-studio-reset"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-white text-xs font-display font-medium tactile-button transition-colors"
            title="Reset options to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workstage: 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols): The Holographic Creator Stage & Action Bar */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
          
          {/* Main Stage Card */}
          <div className="relative overflow-hidden rounded-3xl glass-level-3 p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col items-center text-center">
            
            {/* Top Badge: Equipped Status */}
            <div className="w-full flex items-center justify-between mb-4 z-20">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-brand-tertiary" />
                Live Preview
              </span>

              {isCurrentEquipped ? (
                <span className="flex items-center gap-1 text-[11px] font-mono font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  CURRENT AVATAR
                </span>
              ) : (
                <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                  UNSAVED DRAFT
                </span>
              )}
            </div>

            {/* Glowing Hologram Containment Pod */}
            <div className="relative my-4 flex items-center justify-center p-6 w-full max-w-[320px] aspect-square rounded-3xl cyber-grid-bg border border-white/10 shadow-inner group">
              
              {/* Radial Aura Backdrop */}
              <div 
                className="absolute inset-4 rounded-full blur-2xl opacity-60 transition-all pointer-events-none"
                style={{
                  backgroundColor: auraTheme === "plasma" ? "#EF4444" :
                                   auraTheme === "electric" ? "#FACC15" :
                                   auraTheme === "magma" ? "#DC2626" :
                                   auraTheme === "abyss" ? "#0EA5E9" :
                                   auraTheme === "spectral" ? "#A855F7" :
                                   auraTheme === "gold" ? "#F59E0B" : typeColor.bg
                }}
              />

              {/* Central Big Pokémon Avatar */}
              <div className="relative z-10 scale-110 sm:scale-125 transition-transform duration-300">
                <PokemonAvatar
                  pokemon={activePokemonObj}
                  size="hero"
                  shape="rounded-3xl"
                  showGlow={true}
                  frameStyle={frameStyle}
                  auraTheme={auraTheme}
                  isShiny={isShiny}
                  sparkles={enableSparkles}
                  animate={enableFloat}
                  badge={badgeText}
                />
              </div>

              {/* Floating Shiny Badge pill if active */}
              {isShiny && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-display font-extrabold text-[10px] shadow-glow-gold z-20 animate-pulse">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>SHINY</span>
                </div>
              )}

              {/* Floating Mega Badge pill if active */}
              {isMega && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600 text-white font-display font-extrabold text-[10px] shadow-glow-primary z-20">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>MEGA</span>
                </div>
              )}
            </div>

            {/* Identity Card Details */}
            <div className="w-full mt-2 space-y-2 z-20">
              <div className="flex items-center justify-center gap-2">
                <h2 className="font-display font-black text-2xl text-on-surface">
                  {activePokemonObj.name}
                </h2>
                <span className="font-mono text-xs font-bold text-on-surface-variant">
                  #{String(activePokemonObj.pokemonId || activePokemonObj.id || 0).padStart(3, "0")}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {activePokemonObj.types.map((t) => (
                  <TypeBadge key={t} type={t} size="sm" />
                ))}
                <span className="font-display text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {badgeText}
                </span>
              </div>

              <p className="font-body text-xs text-on-surface-variant italic">
                "{customTagline || activePokemonObj.tagline || activePokemonObj.title}"
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="w-full flex flex-col gap-3 mt-6 z-20">
              
              {/* Equip as Trainer Avatar Button */}
              <button
                id="btn-studio-equip-avatar"
                onClick={handleEquip}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-brand-secondary to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-sm uppercase tracking-wider shadow-glow-gold tactile-button flex items-center justify-center gap-2 transition-all"
              >
                {equippedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950 stroke-[3]" />
                    <span>Equipped Successfully!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950 fill-current" />
                    <span>Equip As Trainer Avatar</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Download PNG Button */}
                <button
                  id="btn-studio-download-png"
                  onClick={handleExportPNG}
                  disabled={isExporting}
                  className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface font-display text-xs font-bold tactile-button flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Download 512x512 PNG card"
                >
                  <Download className="w-4 h-4 text-brand-tertiary" />
                  <span>{isExporting ? "Exporting..." : "Download PNG"}</span>
                </button>

                {/* Set as Active Buddy Button */}
                <button
                  id="btn-studio-set-buddy"
                  onClick={handleSetBuddyClick}
                  className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface font-display text-xs font-bold tactile-button flex items-center justify-center gap-1.5 transition-colors"
                  title="Set active companion on Trainer HUD"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Set As Buddy</span>
                </button>
              </div>

            </div>

          </div>

          {/* Micro HUD Tip */}
          <div className="px-4 py-3 rounded-2xl bg-surface-container-low/70 border border-white/5 flex items-center gap-3 text-xs text-on-surface-variant font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            <span>Equipping updates your Trainer Avatar across HUD, Passport, and Battle Arena.</span>
          </div>

        </div>

        {/* Right Column (7 Cols): Customizer Control Deck */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Deck 1: Choose Pokémon Companion */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-surface-container-highest text-brand-secondary">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base text-on-surface">
                    1. Select Project Pokémon
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant">
                    Choose from the {PROJECT_AVATARS.length} registered project species
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-brand-tertiary font-bold">
                {selectedPokemon.name}
              </span>
            </div>

            {/* Pokémon Scrollable / Wrap Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
              {PROJECT_AVATARS.map((poke) => {
                const isSelected = selectedPokemon.id === poke.id;
                const pType = poke.types[0] || "Normal";
                const pColor = TYPE_COLORS[pType]?.bg || "#38bdf8";

                return (
                  <div
                    key={poke.id}
                    id={`studio-select-${poke.id}`}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedPokemon(poke);
                    }}
                    className={`relative p-2.5 rounded-2xl border transition-all cursor-pointer tactile-button flex flex-col items-center text-center group ${
                      isSelected
                        ? "bg-surface-container-highest border-amber-400 shadow-glow-gold/40 scale-105"
                        : "bg-surface-container-low hover:bg-surface-container border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center mb-1">
                      <img
                        src={poke.avatar || poke.sprite}
                        alt={poke.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow"
                      />
                    </div>
                    <span className="font-display font-bold text-[11px] text-on-surface truncate w-full">
                      {poke.name}
                    </span>
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase">
                      {poke.types[0]}
                    </span>

                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deck 2: Form & Special Variants (Shiny / Mega) */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-surface-container-highest text-amber-400">
                <Sparkle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">
                  2. Variant & Evolution
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Toggle rare shiny sparkle color palettes and mega transformations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Shiny Form Toggle */}
              <div
                id="btn-studio-toggle-shiny"
                onClick={() => {
                  sounds.playClick();
                  setIsShiny(!isShiny);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer tactile-button flex items-center justify-between ${
                  isShiny
                    ? "bg-amber-400/15 border-amber-400 shadow-glow-gold/30"
                    : "bg-surface-container-low border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isShiny ? "bg-amber-400 text-slate-950" : "bg-surface-container text-on-surface-variant"}`}>
                    <Sparkles className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-on-surface block">
                      Shiny Palette
                    </span>
                    <span className="text-[11px] font-body text-on-surface-variant">
                      Rare colorway with particle sparkles
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isShiny ? "border-amber-400 bg-amber-400" : "border-white/30"}`}>
                  {isShiny && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                </div>
              </div>

              {/* Mega Evolution (if Lucario or available) */}
              <div
                id="btn-studio-toggle-mega"
                onClick={() => {
                  if (selectedPokemon.name.toLowerCase().includes("lucario")) {
                    sounds.playClick();
                    setIsMega(!isMega);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all ${
                  selectedPokemon.name.toLowerCase().includes("lucario")
                    ? "cursor-pointer tactile-button"
                    : "opacity-40 cursor-not-allowed"
                } ${
                  isMega
                    ? "bg-rose-600/15 border-rose-500 shadow-glow-primary/30"
                    : "bg-surface-container-low border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isMega ? "bg-rose-600 text-white" : "bg-surface-container text-on-surface-variant"}`}>
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm text-on-surface block">
                        Mega Evolution
                      </span>
                      <span className="text-[11px] font-body text-on-surface-variant">
                        {selectedPokemon.name.toLowerCase().includes("lucario") ? "Awaken Mega Lucario" : "Only Lucario has Mega in project"}
                      </span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isMega ? "border-rose-500 bg-rose-500" : "border-white/30"}`}>
                    {isMega && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deck 3: Frame Architect */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-surface-container-highest text-brand-tertiary">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">
                  3. Tactical Frame Styles
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Select high-tech cyber borders, royal gold filigree, or elemental rings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {AVATAR_FRAMES.map((f) => {
                const isSelected = frameStyle === f.id;
                return (
                  <div
                    key={f.id}
                    id={`frame-option-${f.id}`}
                    onClick={() => {
                      sounds.playClick();
                      setFrameStyle(f.id);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer tactile-button flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-container-highest border-brand-tertiary shadow-glow-cyan/40 scale-[1.02]"
                        : "bg-surface-container-low hover:bg-surface-container border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-display font-bold text-xs text-on-surface">
                        {f.name}
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border ${isSelected ? "bg-brand-tertiary border-brand-tertiary" : "border-white/20"}`} />
                    </div>
                    <span className="text-[10px] font-body text-on-surface-variant leading-tight line-clamp-2">
                      {f.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deck 4: Aura & Energy Themes */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-surface-container-highest text-brand-primary">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">
                  4. Energy Aura & Ambient Glow
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Cast radiant radial heat, sub-zero cold, or plasma pulses behind your Pokémon
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {AVATAR_AURAS.map((a) => {
                const isSelected = auraTheme === a.id;
                return (
                  <div
                    key={a.id}
                    id={`aura-option-${a.id}`}
                    onClick={() => {
                      sounds.playClick();
                      setAuraTheme(a.id);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer tactile-button flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-container-highest border-amber-400 shadow-glow-gold/40 scale-[1.02]"
                        : "bg-surface-container-low hover:bg-surface-container border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-xs text-on-surface">
                        {a.name}
                      </span>
                      <div className={`w-3 h-3 rounded-full border ${isSelected ? "bg-amber-400 border-amber-400" : "border-white/20"}`} />
                    </div>
                    <span className="text-[10px] font-body text-on-surface-variant truncate">
                      {a.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deck 5: Prestige Badges & Custom Titles */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-surface-container-highest text-amber-400">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">
                  5. Prestige Badges & Trainer Identity
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Engrave your title banner, trainer callsign, and custom motto
                </p>
              </div>
            </div>

            {/* Preset Badge Chips */}
            <div className="space-y-2 pt-1">
              <span className="font-display font-bold text-xs text-on-surface-variant uppercase tracking-wider block">
                Quick Badges:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {AVATAR_PRESET_BADGES.map((badge) => {
                  const isSelected = badgeText === badge;
                  return (
                    <button
                      key={badge}
                      onClick={() => {
                        sounds.playClick();
                        setBadgeText(badge);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-display font-bold transition-all tactile-button ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 shadow-glow-gold"
                          : "bg-surface-container hover:bg-surface-container-highest text-on-surface-variant border border-white/10"
                      }`}
                    >
                      {badge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-mono text-on-surface-variant uppercase">
                  Badge Custom Text
                </label>
                <input
                  type="text"
                  value={badgeText}
                  maxLength={18}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. Ace Trainer"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-sm font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-on-surface-variant uppercase">
                  Trainer Callsign
                </label>
                <input
                  type="text"
                  value={trainerNickname}
                  maxLength={16}
                  onChange={(e) => setTrainerNickname(e.target.value)}
                  placeholder="e.g. Red"
                  className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-sm font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-brand-tertiary"
                />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs font-mono text-on-surface-variant uppercase">
                Custom Tagline / Motto
              </label>
              <input
                type="text"
                value={customTagline}
                maxLength={45}
                onChange={(e) => setCustomTagline(e.target.value)}
                placeholder="e.g. Aura Guardian"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-sm font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Deck 6: Motion & Particle Effects */}
          <div className="glass-level-2 p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-surface-container-highest text-brand-secondary">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-on-surface">
                  6. VFX & Animation Dynamics
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Toggle floating combat bobbing and dynamic star dust sparkles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div
                onClick={() => {
                  sounds.playClick();
                  setEnableFloat(!enableFloat);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer tactile-button flex items-center justify-between ${
                  enableFloat ? "bg-surface-container-highest border-brand-tertiary" : "bg-surface-container-low border-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-brand-tertiary" />
                  <span className="font-display font-bold text-xs text-on-surface">
                    Floating Breathing Animation
                  </span>
                </div>
                <div className={`w-4 h-4 rounded-full border ${enableFloat ? "bg-brand-tertiary border-brand-tertiary" : "border-white/20"}`} />
              </div>

              <div
                onClick={() => {
                  sounds.playClick();
                  setEnableSparkles(!enableSparkles);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer tactile-button flex items-center justify-between ${
                  enableSparkles ? "bg-surface-container-highest border-amber-400" : "bg-surface-container-low border-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-display font-bold text-xs text-on-surface">
                    Ambient Sparkle Particles
                  </span>
                </div>
                <div className={`w-4 h-4 rounded-full border ${enableSparkles ? "bg-amber-400 border-amber-400" : "border-white/20"}`} />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AvatarStudio;

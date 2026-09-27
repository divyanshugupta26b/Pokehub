import React, { useState } from "react";
import { X, Check, Sparkles, Shield, Zap, Award, Flame, Heart } from "lucide-react";
import { PROJECT_AVATARS, TYPE_COLORS } from "../../data/pokemonData";
import { PokemonAvatar } from "./PokemonAvatar";
import { TypeBadge } from "./TypeBadge";
import { sounds } from "../../utils/soundEffects";
import confetti from "canvas-confetti";

export function AvatarSelectorModal({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
  onSetBuddy,
}) {
  const [selectedItem, setSelectedItem] = useState(currentAvatar || PROJECT_AVATARS[0]);

  if (!isOpen) return null;

  const handleEquip = () => {
    sounds.playVictory();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FACC15", "#EE1515", "#06B6D4", "#FFFFFF"],
    });
    if (onSelectAvatar) {
      onSelectAvatar(selectedItem);
    }
    onClose();
  };

  const handleMakeBuddy = () => {
    sounds.playLevelUp();
    if (onSetBuddy) {
      onSetBuddy(selectedItem);
    }
  };

  const isCurrentEquipped = (currentAvatar?.id || currentAvatar?.name) === (selectedItem?.id || selectedItem?.name);
  const primaryType = selectedItem.types[0] || "Normal";
  const typeStyle = TYPE_COLORS[primaryType] || { bg: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl glass-level-3 border border-white/20 shadow-2xl flex flex-col"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-surface-container-lowest/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 text-slate-950 shadow-glow-gold">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-on-surface">
                Pokémon Avatar Vault
              </h2>
              <p className="font-body text-xs text-on-surface-variant">
                Select any companion from your project to represent your Trainer Profile
              </p>
            </div>
          </div>

          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-2 rounded-full bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-white transition-colors tactile-button"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Active Inspector & Avatar Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Top Inspector Stage for Selected Avatar */}
          <div 
            className="relative overflow-hidden rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${typeStyle.bg}22 100%)`,
            }}
          >
            {/* Ambient Background Aura */}
            <div
              className="absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: typeStyle.bg }}
            />

            <div className="flex items-center gap-4 sm:gap-5 z-10 w-full sm:w-auto">
              {/* Big Avatar Frame */}
              <PokemonAvatar
                pokemon={selectedItem}
                size="2xl"
                shape="rounded-2xl"
                showGlow={true}
                selected={isCurrentEquipped}
              />

              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-brand-secondary border border-white/10">
                    {selectedItem.generation || "Special"}
                  </span>
                  {selectedItem.badge && (
                    <span className="text-[10px] font-display font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {selectedItem.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-black text-2xl text-on-surface">
                  {selectedItem.name}
                </h3>
                
                <p className="font-body text-xs text-on-surface-variant italic">
                  "{selectedItem.tagline || selectedItem.title}"
                </p>

                <div className="flex items-center gap-1.5 pt-1">
                  {selectedItem.types.map((t) => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                  {selectedItem.cp && (
                    <span className="text-xs font-mono text-on-surface-variant font-bold ml-1">
                      CP {selectedItem.cp.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2.5 z-10 w-full sm:w-auto justify-end">
              {isCurrentEquipped ? (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-display font-bold text-xs uppercase tracking-wider">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Equipped as Avatar
                </div>
              ) : (
                <button
                  id="btn-equip-trainer-avatar"
                  onClick={handleEquip}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-brand-secondary to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-display font-extrabold text-xs tracking-wider uppercase shadow-glow-gold tactile-button flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
                  Equip As Avatar
                </button>
              )}

              {onSetBuddy && !selectedItem.isTrainer && (
                <button
                  onClick={handleMakeBuddy}
                  className="px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-white font-display text-xs font-semibold tactile-button flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Set as Active Buddy
                </button>
              )}
            </div>
          </div>

          {/* Grid of Available Project Pokémon Avatars */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-xs uppercase tracking-widest text-on-surface-variant">
                Available Project Pokémon ({PROJECT_AVATARS.length})
              </span>
              <span className="text-[11px] font-mono text-brand-secondary">
                Click any avatar to preview
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PROJECT_AVATARS.map((avatar) => {
                const isSelected = selectedItem.id === avatar.id;
                const isEquipped = (currentAvatar?.id || currentAvatar?.name) === avatar.id;
                const pType = avatar.types[0] || "Normal";
                const pColor = TYPE_COLORS[pType]?.bg || "#38bdf8";

                return (
                  <div
                    key={avatar.id}
                    id={`avatar-option-${avatar.id}`}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedItem(avatar);
                    }}
                    className={`relative overflow-hidden rounded-2xl p-3.5 border transition-all cursor-pointer tactile-button flex flex-col items-center justify-between group ${
                      isSelected
                        ? "bg-surface-container-highest border-amber-400 shadow-glow-gold/40 scale-[1.02]"
                        : "bg-surface-container-low hover:bg-surface-container border-white/10 hover:border-white/25"
                    }`}
                  >
                    {/* Top Status & Badge */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono mb-2 z-10">
                      <span className="text-on-surface-variant font-semibold">
                        {avatar.pokemonId ? `#${String(avatar.pokemonId).padStart(3, "0")}` : "PRO"}
                      </span>
                      {isEquipped ? (
                        <span className="flex items-center gap-0.5 text-emerald-400 font-extrabold uppercase">
                          <Check className="w-3 h-3" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-on-surface-variant text-[9px] uppercase">
                          {avatar.types[0]}
                        </span>
                      )}
                    </div>

                    {/* Avatar Icon */}
                    <div className="relative my-1">
                      <PokemonAvatar
                        pokemon={avatar}
                        size="lg"
                        shape="rounded-2xl"
                        showGlow={isSelected}
                        selected={isEquipped}
                      />
                    </div>

                    {/* Name & Title */}
                    <div className="w-full text-center mt-2 z-10">
                      <div className="font-display font-extrabold text-sm text-on-surface group-hover:text-brand-secondary transition-colors truncate">
                        {avatar.name}
                      </div>
                      <div className="text-[10px] font-body text-on-surface-variant truncate">
                        {avatar.title}
                      </div>
                    </div>

                    {/* Selection highlight border line */}
                    {isSelected && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-400 shadow-[0_0_8px_#FACC15]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-surface-container-lowest flex items-center justify-between text-xs text-on-surface-variant">
          <span>Active Trainer Avatar is synced across HUD, Passport, and Battle Arena.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-on-surface font-semibold tactile-button"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
export default AvatarSelectorModal;

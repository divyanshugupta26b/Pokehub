import React, { useState } from "react";
import { Palette, Layers, Type, Sparkles, Volume2, Check, Copy, ExternalLink, Shield } from "lucide-react";
import { sounds } from "../../utils/soundEffects";
import { TypeBadge } from "../common/TypeBadge";

export function DesignSystemShowcase() {
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToClipboard = (token, hex) => {
    navigator.clipboard.writeText(hex);
    sounds.playClick();
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const colorPalettes = [
    {
      group: "Core Brand Primitives",
      tokens: [
        { name: "brand-neutral", hex: "#0B0F19", role: "Deep OLED Abyssal Slate Base" },
        { name: "brand-primary", hex: "#EE1515", role: "PokéBall Vermilion / Primary Triggers" },
        { name: "brand-secondary", hex: "#FACC15", role: "Electric Yellow / Stamina & Warning" },
        { name: "brand-tertiary", hex: "#06B6D4", role: "Sub-Zero Cyan / Tactical Tech Panels" },
      ]
    },
    {
      group: "Surface & Dark HUD Hierarchy",
      tokens: [
        { name: "surface-bg", hex: "#0F131D", role: "Global Background Canvas" },
        { name: "surface-lowest", hex: "#0A0E18", role: "Recessed Gauge Channels & Wells" },
        { name: "surface-low", hex: "#171B26", role: "Inset Modules & Sub-Panels" },
        { name: "surface-container", hex: "#1C1F2A", role: "Standard Cards & HUD Bases" },
        { name: "surface-high", hex: "#262A35", role: "Floating Modules & Tactile Controls" },
        { name: "surface-highest", hex: "#313540", role: "Interactive Overlays & Hover Targets" },
        { name: "surface-bright", hex: "#353944", role: "Top Rim Lighting & Highlights" },
      ]
    },
    {
      group: "Accent & Elemental Roles",
      tokens: [
        { name: "primary", hex: "#FFB4A9", role: "Primary Accent Tint" },
        { name: "primary-container", hex: "#FF5544", role: "High-Energy Combat Trigger" },
        { name: "secondary", hex: "#FFE083", role: "XP Gauge & Stardust Tint" },
        { name: "tertiary", hex: "#4CD7F6", role: "Data Shielding & Tactical Readouts" },
        { name: "element-fire", hex: "#EF4444", role: "Fire / Attack / Critical HP" },
        { name: "element-grass", hex: "#10B981", role: "Grass / Nature / Healthy HP" },
        { name: "element-electric", hex: "#FACC15", role: "Electric / Voltage Surge" },
        { name: "element-water", hex: "#06B6D4", role: "Water / Ice / Shield Reserves" },
      ]
    }
  ];

  const typographyScales = [
    { token: "display-lg", font: "Sora", size: "40px", weight: "800", lh: "48px", tracking: "-0.03em", preview: "POKÉHUB ARENA" },
    { token: "display-lg-mobile", font: "Sora", size: "32px", weight: "800", lh: "40px", tracking: "-0.02em", preview: "Tactical HUD" },
    { token: "headline-lg", font: "Sora", size: "28px", weight: "700", lh: "36px", tracking: "-0.02em", preview: "Lucario & Cynthia" },
    { token: "headline-sm", font: "Sora", size: "20px", weight: "600", lh: "28px", tracking: "-0.01em", preview: "Combat Move Matrix" },
    { token: "body-lg", font: "Plus Jakarta Sans", size: "16px", weight: "500", lh: "24px", tracking: "0em", preview: "A high-performance digital companion engineered for competitive trainers." },
    { token: "body-md", font: "Plus Jakarta Sans", size: "14px", weight: "400", lh: "20px", tracking: "0em", preview: "It can read their thoughts and movements by catching the aura emanating from others." },
    { token: "label-numeric", font: "JetBrains Mono", size: "16px", weight: "700", lh: "20px", tracking: "-0.02em", preview: "HP 280/280 • CP 3,120 • 98.4%" },
    { token: "label-badge", font: "Sora", size: "11px", weight: "800", lh: "14px", tracking: "+0.08em", preview: "FIGHTING / STEEL" },
    { token: "label-sm", font: "Plus Jakarta Sans", size: "12px", weight: "600", lh: "16px", tracking: "+0.02em", preview: "Level 38 Ace Trainer" },
  ];

  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-tertiary text-slate-950 font-bold shadow-glow-primary">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-2xl text-on-surface">
              Design System & Token Architecture
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Neo-Tactile Trainer HUD • Extracted from Stitch MCP & Root <span className="font-mono text-brand-tertiary">DESIGN.md</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-brand-secondary bg-surface-container-high px-3 py-1.5 rounded-xl border border-white/10">
            Version 1.0.0 • Dark Mode Native
          </span>
        </div>
      </div>

      {/* 1. COLOR PALETTE SWATCHES */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Palette className="w-5 h-5 text-brand-primary" />
          <h3 className="font-display font-bold text-lg text-on-surface">
            Extracted Color System
          </h3>
        </div>

        <div className="space-y-6">
          {colorPalettes.map((group) => (
            <div key={group.group} className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                {group.group}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {group.tokens.map((token) => (
                  <div
                    key={token.name}
                    onClick={() => copyToClipboard(token.name, token.hex)}
                    className="p-3.5 rounded-2xl glass-level-2 border border-white/10 hover:border-white/30 transition-all cursor-pointer group tactile-button"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl border border-white/20 shadow-md flex-shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: token.hex }}
                      />
                      <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-on-surface truncate">
                            {token.name}
                          </span>
                          {copiedToken === token.name ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-brand-secondary font-semibold">
                          {token.hex}
                        </span>
                        <span className="font-body text-[10px] text-on-surface-variant truncate mt-0.5">
                          {token.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TYPOGRAPHY SYSTEM */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Type className="w-5 h-5 text-brand-secondary" />
          <h3 className="font-display font-bold text-lg text-on-surface">
            Typography Hierarchy & Scales
          </h3>
        </div>

        <div className="glass-level-2 rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
          {typographyScales.map((item) => (
            <div key={item.token} className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="w-full lg:w-72 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-primary">{item.token}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-container-high text-brand-tertiary">
                    {item.font}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant mt-1">
                  {item.size} • Weight {item.weight} • LH {item.lh} • Track {item.tracking}
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <p
                  className="truncate text-on-surface"
                  style={{
                    fontFamily: item.font,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    lineHeight: item.lh,
                    letterSpacing: item.tracking,
                  }}
                >
                  {item.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ELEVATION & GLASSMORPHISM BENCH */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Layers className="w-5 h-5 text-brand-tertiary" />
          <h3 className="font-display font-bold text-lg text-on-surface">
            Elevation & Tactile Surface Layers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Level 1 */}
          <div className="glass-level-1 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-brand-tertiary">Level 1: Sub-Panels</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Blur 16px • 70%</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant">
              Used for recessed well groupings, sub-radar backgrounds, and subtle content frames.
            </p>
          </div>

          {/* Level 2 */}
          <div className="glass-level-2 p-6 rounded-2xl border border-white/15 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-brand-secondary">Level 2: Tactile Cards</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Blur 20px • 85%</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant">
              Used for standard interactive cards, buddy showcase, and creature encyclopedia grids.
            </p>
          </div>

          {/* Level 3 */}
          <div className="glass-level-3 p-6 rounded-2xl border border-white/20 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-brand-primary">Level 3: Modals & Trays</span>
              <span className="font-mono text-[10px] text-on-surface-variant">Blur 24px • 92%</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant">
              Used for battle victory screens, creature inspection overlays, and high-stakes combat console.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WEB AUDIO SYNTHESIZER TEST BENCH */}
      <section className="glass-level-2 p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-base text-on-surface">
            Neo-Tactile Web Audio Synthesizer Bench
          </h3>
        </div>
        <p className="font-body text-xs text-on-surface-variant">
          Synthesizes dynamic frequency sweeps and tones directly via HTML5 Web Audio API without requiring bulky audio files.
        </p>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          <button
            onClick={() => sounds.playClick()}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-white/10 text-xs font-display font-bold text-on-surface tactile-button"
          >
            Play Click Synth (880Hz → 440Hz)
          </button>
          <button
            onClick={() => sounds.playAttack("Electric")}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-brand-secondary/40 text-xs font-display font-bold text-brand-secondary tactile-button"
          >
            Play Electric Surge (1200Hz)
          </button>
          <button
            onClick={() => sounds.playAttack("Fire")}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-brand-primary/40 text-xs font-display font-bold text-brand-primary tactile-button"
          >
            Play Fire Blast (Sawtooth)
          </button>
          <button
            onClick={() => sounds.playHeal()}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-emerald-400/40 text-xs font-display font-bold text-emerald-400 tactile-button"
          >
            Play Potion Chime (Arpeggio)
          </button>
          <button
            onClick={() => sounds.playVictory()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-glow-gold tactile-button"
          >
            Play Victory Fanfare
          </button>
        </div>
      </section>

    </div>
  );
}

import React from "react";
import { TYPE_COLORS } from "../../data/pokemonData";

export function TypeBadge({ type, size = "md", className = "" }) {
  const typeConfig = TYPE_COLORS[type] || {
    bg: "#64748B",
    text: "#FFFFFF",
    glow: "rgba(100, 116, 139, 0.4)",
    gradient: "from-slate-500 to-gray-600"
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-2.5 py-1 text-[11px] tracking-widest",
    lg: "px-3.5 py-1.5 text-xs tracking-widest",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-display font-extrabold uppercase rounded-full shadow-sm border border-white/10 transition-transform hover:scale-105 ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{
        backgroundColor: `${typeConfig.bg}22`,
        color: typeConfig.bg === "#FACC15" ? "#FACC15" : typeConfig.text === "#1E293B" ? "#F1F5F9" : typeConfig.bg,
        borderColor: `${typeConfig.bg}55`,
        boxShadow: `0 0 10px ${typeConfig.glow}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: typeConfig.bg, boxShadow: `0 0 6px ${typeConfig.bg}` }}
      />
      {type}
    </span>
  );
}

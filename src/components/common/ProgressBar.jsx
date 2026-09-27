import React from "react";

export function ProgressBar({
  value,
  max,
  label = "",
  showValues = true,
  type = "hp", // "hp", "exp", "energy", "custom"
  customColor = "",
  height = "h-2.5",
  className = "",
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  // Dynamic HP color states as defined in DESIGN.md
  let barGradient = "from-emerald-500 via-emerald-400 to-teal-300";
  let glowColor = "rgba(16, 185, 129, 0.4)";

  if (type === "hp") {
    if (percent < 20) {
      barGradient = "from-red-600 via-rose-500 to-red-400 animate-pulse";
      glowColor = "rgba(238, 21, 21, 0.6)";
    } else if (percent < 50) {
      barGradient = "from-yellow-500 via-amber-400 to-yellow-300";
      glowColor = "rgba(250, 204, 21, 0.5)";
    }
  } else if (type === "exp") {
    barGradient = "from-amber-500 via-yellow-400 to-amber-300";
    glowColor = "rgba(255, 224, 131, 0.5)";
  } else if (type === "energy") {
    barGradient = "from-cyan-500 via-sky-400 to-teal-300";
    glowColor = "rgba(6, 182, 212, 0.5)";
  }

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${className}`}>
      {(label || showValues) && (
        <div className="flex justify-between items-center text-xs">
          {label && (
            <span className="font-display font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              {type === "hp" && percent < 20 && (
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
              )}
              {label}
            </span>
          )}
          {showValues && (
            <div className="font-mono font-bold text-on-surface flex items-baseline gap-1">
              <span className={percent < 20 ? "text-brand-primary font-extrabold" : "text-on-surface"}>
                {value}
              </span>
              <span className="text-on-surface-variant/70 text-[11px]">/ {max}</span>
            </div>
          )}
        </div>
      )}

      {/* Track */}
      <div className={`w-full bg-surface-container-lowest rounded-full overflow-hidden p-0.5 border border-white/5 ${height}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-500 ease-out`}
          style={{
            width: `${percent}%`,
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />
      </div>
    </div>
  );
}

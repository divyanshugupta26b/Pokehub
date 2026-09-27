import React, { useState } from "react";
import { CheckCircle, Trophy, Gift, ArrowRight } from "lucide-react";
import { sounds } from "../../utils/soundEffects";
import confetti from "canvas-confetti";

export function QuestsDock({ onNavigateBattle }) {
  const [quests, setQuests] = useState([
    { id: 1, title: "Win 1 Battle Arena Match", progress: 1, target: 1, reward: "3x Rare Candy + 1,500 Stardust", claimed: false },
    { id: 2, title: "Scan & Catch 3 Radar Spawns", progress: 2, target: 3, reward: "1x Master Ball + 500 XP", claimed: false },
    { id: 3, title: "Mega Evolve Lucario in Battle", progress: 1, target: 1, reward: "50x Mega Lucario Energy", claimed: false },
  ]);

  const handleClaim = (id) => {
    sounds.playVictory();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#facc15', '#06b6d4', '#10b981']
    });
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, claimed: true } : q))
    );
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-level-2 p-5 sm:p-6 shadow-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-on-surface">
              Daily Field Research Quests
            </h3>
            <span className="font-body text-xs text-on-surface-variant">
              Reset in 05h 42m
            </span>
          </div>
        </div>

        <span className="font-mono text-xs font-bold text-brand-secondary bg-surface-container-high px-2.5 py-1 rounded-full border border-white/5">
          {quests.filter((q) => q.claimed).length} / {quests.length} Completed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {quests.map((quest) => {
          const isComplete = quest.progress >= quest.target;

          return (
            <div
              key={quest.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                quest.claimed
                  ? "bg-surface-container-lowest/50 border-white/5 opacity-60"
                  : isComplete
                  ? "bg-surface-container-high border-brand-secondary/40 shadow-glow-gold/20"
                  : "bg-surface-container border-white/5"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display font-bold text-sm text-on-surface">
                    {quest.title}
                  </h4>
                  {quest.claimed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <span className="font-mono text-xs text-on-surface-variant flex-shrink-0">
                      {quest.progress}/{quest.target}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono mt-2">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{quest.reward}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5">
                {quest.claimed ? (
                  <span className="font-display text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    Reward Claimed
                  </span>
                ) : isComplete ? (
                  <button
                    onClick={() => handleClaim(quest.id)}
                    className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-glow-gold tactile-button"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <button
                    onClick={onNavigateBattle}
                    className="w-full py-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:text-brand-tertiary font-display font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 tactile-button"
                  >
                    <span>Go to Task</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

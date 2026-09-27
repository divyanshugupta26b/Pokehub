import React, { useState, useEffect } from "react";
import { Swords, Shield, Zap, RefreshCw, Backpack, Flag, Award, Sparkles, AlertCircle } from "lucide-react";
import { ProgressBar } from "../common/ProgressBar";
import { TypeBadge } from "../common/TypeBadge";
import { sounds } from "../../utils/soundEffects";
import { POKEMON_DATA, OPPONENT_TRAINERS } from "../../data/pokemonData";
import confetti from "canvas-confetti";

export function BattleArena({ trainerAvatar, onOpenAvatarModal }) {
  const [selectedOpponentIdx, setSelectedOpponentIdx] = useState(0);
  const opponent = OPPONENT_TRAINERS[selectedOpponentIdx];

  // Player state
  const [playerParty, setPlayerParty] = useState([
    POKEMON_DATA[0], // Lucario
    POKEMON_DATA[1], // Charizard
    POKEMON_DATA[2], // Greninja
  ]);
  const [activePlayerPokemon, setActivePlayerPokemon] = useState(playerParty[0]);
  const [playerHp, setPlayerHp] = useState(playerParty[0].hp);
  const [isMega, setIsMega] = useState(false);
  const [ppState, setPpState] = useState({
    "Aura Sphere": 20,
    "Flash Cannon": 10,
    "Close Combat": 5,
    "Dragon Pulse": 10,
  });

  // Opponent state
  const [opponentHp, setOpponentHp] = useState(opponent.leadPokemon.hp);
  const [turn, setTurn] = useState("player"); // "player" | "opponent" | "animating"
  const [combatLog, setCombatLog] = useState([
    `Battle started against ${opponent.title} ${opponent.name}!`,
    `${opponent.name} sent out ${opponent.leadPokemon.name} (CP ${opponent.leadPokemon.cp})!`,
    `Go! ${activePlayerPokemon.name}! Show your fighting spirit!`,
  ]);

  const [activeMenu, setActiveMenu] = useState("moves"); // "moves" | "bag" | "party"
  const [bag, setBag] = useState([
    { id: "max-potion", name: "Max Potion", count: 2, desc: "Fully restores HP of active Pokémon." },
    { id: "full-restore", name: "Full Restore", count: 1, desc: "Restores HP and clears all battle conditions." },
    { id: "x-attack", name: "X Attack", count: 1, desc: "Sharply raises attack power for this battle." },
  ]);

  const [attackAnimation, setAttackAnimation] = useState(null); // "player-hit" | "opponent-hit"
  const [battleOutcome, setBattleOutcome] = useState(null); // "victory" | "defeat"

  // Handle Player Move
  const handleUseMove = (move) => {
    if (turn !== "player" || battleOutcome) return;
    if (ppState[move.name] !== undefined && ppState[move.name] <= 0) {
      alert("No PP left for this move!");
      return;
    }

    sounds.playAttack(move.type);
    setTurn("animating");

    // Decrement PP
    setPpState((prev) => ({
      ...prev,
      [move.name]: Math.max(0, (prev[move.name] || 10) - 1),
    }));

    // Trigger visual hit on opponent
    setAttackAnimation("opponent-hit");

    // Calculate damage
    const multiplier = isMega ? 1.4 : 1.0;
    const baseDamage = Math.round((move.power * 0.75 + Math.random() * 20) * multiplier);
    const isCrit = Math.random() > 0.8;
    const finalDamage = isCrit ? Math.round(baseDamage * 1.5) : baseDamage;

    const newOppHp = Math.max(0, opponentHp - finalDamage);
    setOpponentHp(newOppHp);

    setCombatLog((prev) => [
      `${activePlayerPokemon.name} used ${move.name}! ${isCrit ? "CRITICAL HIT! " : ""}${finalDamage} DMG!`,
      ...prev.slice(0, 5),
    ]);

    setTimeout(() => {
      setAttackAnimation(null);

      // Check Victory
      if (newOppHp <= 0) {
        sounds.playVictory();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ee1515', '#facc15', '#06b6d4', '#10b981']
        });
        setBattleOutcome("victory");
        setCombatLog((prev) => [
          `Foe ${opponent.leadPokemon.name} fainted! You won the battle!`,
          ...prev,
        ]);
        return;
      }

      // Opponent Turn
      setTurn("opponent");
      setTimeout(() => {
        handleOpponentTurn();
      }, 1200);
    }, 600);
  };

  // Handle Opponent Turn
  const handleOpponentTurn = () => {
    const oppMoves = opponent.leadPokemon.moves;
    const randomMove = oppMoves[Math.floor(Math.random() * oppMoves.length)];

    sounds.playAttack(randomMove.type);
    setAttackAnimation("player-hit");

    const damage = Math.round(randomMove.power * 0.65 + Math.random() * 15);
    const newPlayerHp = Math.max(0, playerHp - damage);
    setPlayerHp(newPlayerHp);

    setCombatLog((prev) => [
      `Foe ${opponent.leadPokemon.name} used ${randomMove.name}! Dealt ${damage} DMG!`,
      ...prev.slice(0, 5),
    ]);

    setTimeout(() => {
      setAttackAnimation(null);

      if (newPlayerHp <= 0) {
        setBattleOutcome("defeat");
        setCombatLog((prev) => [
          `${activePlayerPokemon.name} fainted! You whited out...`,
          ...prev,
        ]);
      } else {
        setTurn("player");
      }
    }, 600);
  };

  // Use Bag Item
  const handleUseItem = (item) => {
    if (item.count <= 0 || turn !== "player") return;
    sounds.playHeal();

    setBag((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, count: i.count - 1 } : i))
    );

    if (item.id === "max-potion" || item.id === "full-restore") {
      setPlayerHp(activePlayerPokemon.maxHp);
      setCombatLog((prev) => [
        `Used ${item.name}! ${activePlayerPokemon.name}'s HP was fully restored!`,
        ...prev.slice(0, 5),
      ]);
    } else if (item.id === "x-attack") {
      setIsMega(true);
      setCombatLog((prev) => [
        `Used X Attack! ${activePlayerPokemon.name}'s attack power sharply rose!`,
        ...prev.slice(0, 5),
      ]);
    }

    setActiveMenu("moves");
    setTurn("opponent");
    setTimeout(handleOpponentTurn, 1000);
  };

  // Switch Pokémon
  const handleSwitch = (poke) => {
    if (poke.name === activePlayerPokemon.name || turn !== "player") return;
    sounds.playClick();
    setActivePlayerPokemon(poke);
    setPlayerHp(poke.hp);
    setIsMega(false);
    setActiveMenu("moves");
    setCombatLog((prev) => [
      `Called back! Go get 'em, ${poke.name}!`,
      ...prev.slice(0, 5),
    ]);
    setTurn("opponent");
    setTimeout(handleOpponentTurn, 1000);
  };

  // Reset / Rematch
  const handleRematch = () => {
    sounds.playClick();
    setOpponentHp(opponent.leadPokemon.maxHp);
    setPlayerHp(activePlayerPokemon.maxHp);
    setBattleOutcome(null);
    setTurn("player");
    setIsMega(false);
    setCombatLog([
      `Rematch initiated against ${opponent.name}!`,
      `Go! ${activePlayerPokemon.name}!`,
    ]);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      
      {/* Top Arena Navigation & Opponent Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-primary to-rose-600 text-white shadow-glow-primary">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-on-surface">
              Champion League Battle Arena
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              High-Stakes Tactical Combat Engine
            </p>
          </div>
        </div>

        {/* Opponent Selector Pills */}
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-on-surface-variant font-medium">Challenger:</span>
          {OPPONENT_TRAINERS.map((opp, idx) => (
            <button
              key={opp.name}
              id={`btn-select-opponent-${opp.name}`}
              onClick={() => {
                sounds.playClick();
                setSelectedOpponentIdx(idx);
                setOpponentHp(opp.leadPokemon.maxHp);
                setBattleOutcome(null);
                setTurn("player");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-display font-bold transition-all tactile-button ${
                selectedOpponentIdx === idx
                  ? "bg-brand-primary text-white shadow-glow-primary border border-brand-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/10"
              }`}
            >
              {opp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stadium Battle Screen */}
      <div className="relative overflow-hidden rounded-3xl glass-level-3 p-6 sm:p-8 border border-white/15 shadow-2xl">
        
        {/* Stadium Arena Background Gradients & Ambient Rings */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-tertiary/10 blur-3xl pointer-events-none" />

        {/* 1. UPPER SECTION: Opponent HUD & Sprite */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Opponent Status Card (Left) */}
          <div className="w-full sm:w-80 glass-level-2 p-4 rounded-2xl border border-white/10 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-secondary uppercase font-bold tracking-wider">
                  Opponent's Pokémon
                </span>
                <h3 className="font-display font-extrabold text-lg text-on-surface">
                  {opponent.leadPokemon.name}
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs text-on-surface-variant">
                  Lv. {opponent.leadPokemon.level}
                </span>
                <span className="font-mono text-xs font-bold text-brand-secondary">
                  CP {opponent.leadPokemon.cp}
                </span>
              </div>
            </div>

            <ProgressBar
              value={opponentHp}
              max={opponent.leadPokemon.maxHp}
              label="Foe HP"
              type="hp"
              height="h-2.5"
            />

            <div className="flex items-center gap-1.5 pt-0.5">
              {opponent.leadPokemon.types.map((t) => (
                <TypeBadge key={t} type={t} size="sm" />
              ))}
            </div>
          </div>

          {/* Opponent Pokémon Sprite Stage (Right) */}
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-60 sm:h-60">
            <div className="absolute bottom-2 w-44 h-12 rounded-full bg-black/40 blur-md" />
            <img
              src={opponent.leadPokemon.sprite}
              alt={opponent.leadPokemon.name}
              className={`relative z-10 w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
                attackAnimation === "opponent-hit" ? "animate-ping scale-95 brightness-150" : "animate-float"
              }`}
            />
          </div>
        </div>

        {/* 2. LOWER SECTION: Player Pokémon Sprite & Player HUD */}
        <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6">
          
          {/* Player Pokémon Sprite Stage (Left) */}
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-60 sm:h-60">
            <div className="absolute bottom-2 w-44 h-12 rounded-full bg-brand-tertiary/20 blur-md" />
            <img
              src={isMega && activePlayerPokemon.megaSprite ? activePlayerPokemon.megaSprite : activePlayerPokemon.sprite}
              alt={activePlayerPokemon.name}
              className={`relative z-10 w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 ${
                attackAnimation === "player-hit" ? "animate-ping scale-95 brightness-150" : "animate-float"
              }`}
            />
          </div>

          {/* Player Status Card (Right) */}
          <div className="w-full sm:w-80 glass-level-2 p-4 rounded-2xl border border-white/10 shadow-xl space-y-2.5">
            {/* Trainer Identity Tag */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div 
                onClick={() => { sounds.playClick(); if (onOpenAvatarModal) onOpenAvatarModal(); }}
                className="flex items-center gap-2 cursor-pointer group tactile-button"
                title="Click to customize Trainer Avatar"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-900 border border-amber-400/80 p-0.5 shadow-sm">
                  <img src={trainerAvatar?.avatar || "/assets/avatars/lucario.png"} alt="Trainer" className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 group-hover:text-amber-200">
                  {trainerAvatar?.name || "Red"} (Trainer)
                </span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                IN SYNC
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-brand-tertiary uppercase font-bold tracking-wider">
                    Active Battler
                  </span>
                  {isMega && (
                    <span className="text-[9px] font-mono font-bold bg-brand-primary text-white px-1.5 py-0.2 rounded-full animate-pulse">
                      MEGA
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-lg text-on-surface">
                  {isMega ? `Mega ${activePlayerPokemon.name}` : activePlayerPokemon.name}
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs text-on-surface-variant">Lv. 72</span>
                <span className="font-mono text-xs font-bold text-brand-tertiary">
                  CP {isMega ? activePlayerPokemon.cp + 850 : activePlayerPokemon.cp}
                </span>
              </div>
            </div>

            <ProgressBar
              value={playerHp}
              max={activePlayerPokemon.maxHp}
              label="Battle HP"
              type="hp"
              height="h-2.5"
            />

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-1.5">
                {activePlayerPokemon.types.map((t) => (
                  <TypeBadge key={t} type={t} size="sm" />
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-on-surface-variant">
                TURN: {turn.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* 3. COMBAT HUD DIALOGUE & ACTION CONSOLE */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left: Combat Rolling Feed Log */}
          <div className="lg:col-span-1 bg-surface-container-lowest/90 p-4 rounded-2xl border border-white/10 shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-xs font-bold text-brand-secondary uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Tactical Battle Feed
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 font-mono text-xs text-on-surface">
                {combatLog.map((log, idx) => (
                  <p key={idx} className={idx === 0 ? "text-brand-tertiary font-bold" : "text-on-surface-variant opacity-80"}>
                    {">"} {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Tactical Switch / Bag buttons */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
              <button
                id="btn-battle-moves-tab"
                onClick={() => { sounds.playClick(); setActiveMenu("moves"); }}
                className={`flex-1 py-1.5 rounded-xl font-display text-xs font-bold transition-all tactile-button ${
                  activeMenu === "moves"
                    ? "bg-brand-primary text-white shadow-glow-primary"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                Fight Moves
              </button>
              <button
                id="btn-battle-bag-tab"
                onClick={() => { sounds.playClick(); setActiveMenu("bag"); }}
                className={`flex-1 py-1.5 rounded-xl font-display text-xs font-bold flex items-center justify-center gap-1.5 transition-all tactile-button ${
                  activeMenu === "bag"
                    ? "bg-brand-secondary text-slate-900 font-extrabold shadow-glow-gold"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                <Backpack className="w-3.5 h-3.5" />
                Items Bag
              </button>
              <button
                id="btn-battle-party-tab"
                onClick={() => { sounds.playClick(); setActiveMenu("party"); }}
                className={`flex-1 py-1.5 rounded-xl font-display text-xs font-bold transition-all tactile-button ${
                  activeMenu === "party"
                    ? "bg-brand-tertiary text-slate-900 font-extrabold shadow-glow-cyan"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                Switch
              </button>
            </div>
          </div>

          {/* Right: Interactive 2x2 Move Matrix or Sub-menus */}
          <div className="lg:col-span-2">
            
            {/* Sub-menu 1: Moves Matrix */}
            {activeMenu === "moves" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePlayerPokemon.moves.map((move) => {
                  const currentPp = ppState[move.name] !== undefined ? ppState[move.name] : move.maxPp;
                  const isOutOfPp = currentPp <= 0;

                  return (
                    <button
                      key={move.name}
                      id={`btn-move-${move.name.toLowerCase().replace(/\s+/g, "-")}`}
                      disabled={turn !== "player" || isOutOfPp || battleOutcome}
                      onClick={() => handleUseMove(move)}
                      className={`relative p-4 rounded-2xl border text-left transition-all group tactile-button ${
                        isOutOfPp
                          ? "opacity-40 cursor-not-allowed bg-surface-container-lowest border-white/5"
                          : "glass-level-2 hover:border-brand-primary/60 hover:shadow-glow-primary/30 border-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-extrabold text-base text-on-surface group-hover:text-brand-primary transition-colors">
                              {move.name}
                            </span>
                            <TypeBadge type={move.type} size="sm" />
                          </div>
                          <span className="font-mono text-xs text-on-surface-variant mt-1 block">
                            PWR {move.power} • ACC {move.accuracy}%
                          </span>
                        </div>

                        {/* PP Indicator */}
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-xs font-bold text-brand-secondary">
                            PP {currentPp}/{move.maxPp}
                          </span>
                          <span className="text-[9px] font-mono uppercase text-on-surface-variant">
                            {move.category}
                          </span>
                        </div>
                      </div>

                      <p className="font-body text-xs text-on-surface-variant/80 mt-2 line-clamp-1">
                        {move.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sub-menu 2: Bag Items */}
            {activeMenu === "bag" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {bag.map((item) => (
                  <div
                    key={item.id}
                    className="glass-level-2 p-4 rounded-2xl border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-on-surface">{item.name}</span>
                        <span className="font-mono text-xs text-brand-secondary font-bold">x{item.count}</span>
                      </div>
                      <p className="font-body text-xs text-on-surface-variant mt-1.5">{item.desc}</p>
                    </div>

                    <button
                      id={`btn-use-${item.id}`}
                      disabled={item.count <= 0 || turn !== "player"}
                      onClick={() => handleUseItem(item)}
                      className={`mt-4 py-1.5 rounded-xl font-display text-xs font-extrabold uppercase tracking-wider transition-all tactile-button ${
                        item.count > 0 && turn === "player"
                          ? "bg-brand-secondary text-slate-950 shadow-glow-gold hover:bg-yellow-400"
                          : "bg-surface-container opacity-40 cursor-not-allowed text-on-surface-variant"
                      }`}
                    >
                      Use in Battle
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-menu 3: Party Switch */}
            {activeMenu === "party" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {playerParty.map((poke) => {
                  const isActive = poke.name === activePlayerPokemon.name;
                  return (
                    <div
                      key={poke.name}
                      onClick={() => !isActive && handleSwitch(poke)}
                      className={`glass-level-2 p-3.5 rounded-2xl border transition-all cursor-pointer tactile-button ${
                        isActive
                          ? "border-brand-primary bg-brand-primary/10 shadow-glow-primary/20"
                          : "border-white/10 hover:border-brand-tertiary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={poke.sprite} alt={poke.name} className="w-12 h-12 object-contain" />
                        <div>
                          <h4 className="font-display font-bold text-sm text-on-surface">{poke.name}</h4>
                          <span className="font-mono text-xs text-brand-tertiary font-bold">CP {poke.cp}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                        <span>HP {poke.hp}/{poke.maxHp}</span>
                        {isActive && <span className="text-brand-primary font-bold">ACTIVE</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

        {/* 4. VICTORY / DEFEAT MODAL OVERLAY */}
        {battleOutcome && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-6">
            <div className="glass-level-3 p-8 rounded-3xl border border-white/20 max-w-md w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto">
                <div className={`absolute inset-0 rounded-full blur-xl ${battleOutcome === "victory" ? "bg-amber-400/40" : "bg-red-500/40"}`} />
                <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${battleOutcome === "victory" ? "bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 shadow-glow-gold" : "bg-red-600 text-white shadow-glow-primary"}`}>
                  {battleOutcome === "victory" ? <Award className="w-9 h-9" /> : <Flag className="w-8 h-8" />}
                </div>
              </div>

              <h3 className="font-display font-black text-3xl text-on-surface tracking-tight">
                {battleOutcome === "victory" ? "CHAMPIONSHIP VICTORY!" : "DEFEAT ON THE FIELD"}
              </h3>

              <p className="font-body text-sm text-on-surface-variant">
                {battleOutcome === "victory"
                  ? `You outmatched ${opponent.title} ${opponent.name}! Claimed 2,500 XP and 3x Rare Candy.`
                  : "Your Pokémon exhausted all stamina. Rest your team at a PokéCenter and challenge again!"}
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  id="btn-battle-rematch"
                  onClick={handleRematch}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-rose-600 hover:from-rose-500 hover:to-red-600 text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-glow-primary tactile-button"
                >
                  <RefreshCw className="w-4 h-4" />
                  Battle Again
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

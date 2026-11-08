import { useState } from "react";
import type { Song, TierId, TierState } from "./types";
import { DropZone } from "./components/DropZone";
import "./App.css";

const songs: Record<string, Song> = {
  "1": { id: "1", title: "Opening Track", trackNumber: 1 },
  "2": { id: "2", title: "The Single", trackNumber: 2 },
  "3": { id: "3", title: "Major Feature", trackNumber: 3 },
  "4": { id: "4", title: "Interlude", trackNumber: 4 },
  "5": { id: "5", title: "Single 2", trackNumber: 5 },
  "6": { id: "6", title: "Deep Cut", trackNumber: 6 },
  "7": { id: "7", title: "Feature 2", trackNumber: 7 },
  "8": { id: "8", title: "Cypher", trackNumber: 8 },
  "9": { id: "9", title: "Outro Track", trackNumber: 9 },
};

const TIERS: { id: TierId; color: string }[] = [
  { id: "S", color: "#ff7f7f" },
  { id: "A", color: "#ffbf7f" },
  { id: "B", color: "#ffdf7f" },
  { id: "C", color: "#bfff7f" },
  { id: "D", color: "#7fbfff" },
];

export default function App() {

  // { S: ["3", "1"], A: [], ..., unranked: [...] }
  const [tiers, setTiers] = useState<TierState>({
    S: [], A: [], B: [], C: [], D: [],
    unranked: Object.keys(songs),
  });

  // one selected song or tier at a time, or none
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);

  function moveSong(songId: string, to: TierId) {
    setTiers((prev) => { // passes current state to the callback, returns new state
      if (prev[to].includes(songId)) return prev; // already there

      const next = {} as TierState;

      /*
      React decides whether to re-render by checking whether the state is a different object than before.
      Rebuilding with this forloop ensures that React will re-render, even if the contents are the same.
      */
      for (const k of Object.keys(prev) as TierId[]) { // rebuild that tier state, removing the song from wherever it was 
        next[k] = prev[k].filter((id) => id !== songId);
      }

      next[to] = [...next[to], songId];
      return next;
    });

    // deselect everything
    setSelectedSong(null);
    setSelectedTier(null);
  }

  function handleSongClick(id: string) {
    if (selectedTier) { // if tier is selected already, move song there
      moveSong(id, selectedTier);
    } else {
      setSelectedSong((cur) => (cur === id ? null : id)); // if no selected tier, simply set song
    }
  }

  function handleTierClick(tier: TierId) {
    if (selectedSong) {
      moveSong(selectedSong, tier);
    } else {
      setSelectedTier((cur) => (cur === tier ? null : tier));
    }
  }

  return (
    <main className="app">
      <h1>Album Tier List</h1>

      {TIERS.map((t) => (
        <div
          key={t.id}
          className={`tier-row ${selectedTier === t.id ? "selected" : ""}`}
          onClick={() => handleTierClick(t.id)}
        >
          <div className="tier-label" style={{ background: t.color }}>{t.id}</div>
          <DropZone
            songIds={tiers[t.id]}
            songs={songs}
            selectedSong={selectedSong}
            onSongClick={handleSongClick}
          />
        </div>
      ))}

      <h2>Click a song, then a tier (or the other way around)</h2>
      <div
        className={`pool-wrap ${selectedTier === "unranked" ? "selected" : ""}`}
        onClick={() => handleTierClick("unranked")}
      >
        <DropZone
          songIds={tiers.unranked}
          songs={songs}
          selectedSong={selectedSong}
          onSongClick={handleSongClick}
          className="pool"
        />
      </div>
    </main>
  );
}
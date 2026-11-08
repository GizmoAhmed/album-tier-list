import type { Song } from "../types";
import { SongCard } from "./SongCard";

type Props = {
  songIds: string[];
  songs: Record<string, Song>;
  selectedSong: string | null;
  onSongClick: (id: string) => void;
  className?: string;
};

export function DropZone({ songIds, songs, selectedSong, onSongClick, className = "" }: Props) {
  return (
    <div className={`tier-drop ${className}`}>
      {songIds.map((id) => (
        <SongCard key={id} song={songs[id]} selected={id === selectedSong} onSelect={onSongClick} />
      ))}
    </div>
  );
}
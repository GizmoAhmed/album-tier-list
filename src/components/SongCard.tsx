import type { Song } from "../types";

type Props = {
  song: Song;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function SongCard({ song, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`song-card ${selected ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(song.id);
      }}
    >
      {song.trackNumber}. {song.title}
    </button>
  );
}
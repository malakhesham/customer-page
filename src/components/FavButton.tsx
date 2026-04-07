"use client";
type Props = { id: string };

export default function FavButton({ id }: Props) {
  // Presentational favourite button with no logic (no localStorage or API).
  // Kept for UI only; click is a no-op.
  return (
    <button
      onClick={() => {}}
      aria-label="Add to favorites"
      className={`px-3 py-1 rounded flex items-center gap-2 bg-gray-100 text-zinc-800`}>
      <span className="text-lg">☆</span>
      <span className="text-sm font-medium">Fav</span>
    </button>
  );
}

export type Song = { id: string; title: string; trackNumber: number };
export type TierId = "S" | "A" | "B" | "C" | "D" | "unranked";
export type TierState = Record<TierId, string[]>; // ordered song IDs
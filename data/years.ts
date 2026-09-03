export type MustangYear = 1965 | 1966 | 1967 | 1968 | 1969 | 1970;

export const YEARS: MustangYear[] = [1965, 1966, 1967, 1968, 1969, 1970];

export const YEAR_NOTES: Record<MustangYear, string> = {
  1965: "First-year body. Shorter front clip. Non-adjustable strut rods.",
  1966: "Same chassis family as 1965. Still uses the early strut-rod design.",
  1967: "Wider body. New front suspension geometry and adjustable strut rods.",
  1968: "Same 67–70 platform. Most aftermarket kits target this group.",
  1969: "Longer, heavier body. Same 67–70 pickup points.",
  1970: "Last year of this chassis family before the 71 restyle.",
};

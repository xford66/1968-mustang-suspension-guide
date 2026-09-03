import type { MustangYear } from "@/data/years";

type Props = {
  year: MustangYear;
};

export function MustangIcon({ year }: Props) {
  const extraLength = year >= 1969 ? 8 : year >= 1967 ? 4 : 0;
  const roof = year >= 1969 ? 18 : 16;
  return (
    <svg viewBox="0 0 160 70" className="mustang-icon" aria-hidden="true">
      <path
        d={`M8 48 L18 48 L24 36 L38 32 L48 ${roof} L88 ${roof} L102 32 L${128 + extraLength} 34 L${148 + extraLength} 48 L${152 + extraLength} 52 L8 52 Z`}
        fill="currentColor"
      />
      <circle cx="38" cy="52" r="8" fill="#111" stroke="#c9a227" strokeWidth="2" />
      <circle cx={118 + extraLength / 2} cy="52" r="8" fill="#111" stroke="#c9a227" strokeWidth="2" />
      <rect x="54" y={roof + 2} width="28" height="10" rx="1" fill="#1a1a1a" opacity="0.45" />
    </svg>
  );
}

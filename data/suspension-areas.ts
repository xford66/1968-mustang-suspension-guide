export type SuspensionAreaId =
  | "all"
  | "upper-control-arms"
  | "lower-control-arms"
  | "springs"
  | "shocks"
  | "coilovers"
  | "spring-perches"
  | "strut-rods"
  | "sway-bars"
  | "partial-front"
  | "full-front"
  | "mustang-ii";

export type ArmStyleId = "all" | "factory" | "tubular";

export type SuspensionArea = {
  id: SuspensionAreaId;
  label: string;
  ready: boolean;
  hasArmStyles?: boolean;
};

export const SUSPENSION_AREAS: SuspensionArea[] = [
  { id: "all", label: "All", ready: true },
  { id: "upper-control-arms", label: "Upper Control Arms", ready: true, hasArmStyles: true },
  { id: "lower-control-arms", label: "Lower Control Arms", ready: false, hasArmStyles: true },
  { id: "springs", label: "Springs", ready: false },
  { id: "shocks", label: "Shocks", ready: false },
  { id: "coilovers", label: "Coilovers (for factory suspension)", ready: false },
  { id: "spring-perches", label: "Spring Perches", ready: false },
  { id: "strut-rods", label: "Strut Rods", ready: false },
  { id: "sway-bars", label: "Sway Bars", ready: false },
  { id: "partial-front", label: "Partial Front Suspension Systems", ready: false },
  { id: "full-front", label: "Full Front Suspension Systems", ready: false },
  { id: "mustang-ii", label: "Mustang II Suspension Systems", ready: true },
];

export const ARM_STYLES: { id: ArmStyleId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "factory", label: "Factory" },
  { id: "tubular", label: "Tubular" },
];

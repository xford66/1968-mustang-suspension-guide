import type { CategoryId } from "./categories";

export type SubcategoryId =
  | "engine-long-block"
  | "engine-intake"
  | "engine-headers"
  | "engine-cooling"
  | "engine-fuel"
  | "engine-ignition"
  | "engine-dress"
  | "engine-mounts"
  | "interior-seats"
  | "interior-dash"
  | "interior-carpet"
  | "interior-door-panels"
  | "interior-console"
  | "interior-headliner"
  | "interior-belts"
  | "interior-pedals"
  | "factory-uca"
  | "tubular-uca"
  | "lower-control-arms"
  | "springs"
  | "shocks"
  | "coilovers"
  | "spring-perches"
  | "strut-rods"
  | "sway-bars"
  | "partial-front"
  | "full-front"
  | "kits-bolton"
  | "kits-mii"
  | "kits-full"
  | "rear-springs"
  | "rear-suspension"
  | "steering-box"
  | "steering-rack"
  | "steering-pump"
  | "steering-column"
  | "steering-linkage"
  | "steering-wheel"
  | "brakes-front"
  | "brakes-rear"
  | "brakes-master"
  | "brakes-lines"
  | "wheels"
  | "tires"
  | "wheel-hardware"
  | "trans-manual"
  | "trans-auto"
  | "trans-clutch"
  | "trans-crossmember"
  | "trans-shifter"
  | "trans-driveshaft"
  | "rear-housing"
  | "rear-gears"
  | "rear-axles"
  | "rear-locker"
  | "body-sheetmetal"
  | "body-bumpers"
  | "body-glass"
  | "body-lights"
  | "body-floors"
  | "elec-harness"
  | "elec-charging"
  | "elec-battery"
  | "elec-switches"
  | "elec-audio";

export type Subcategory = {
  id: SubcategoryId;
  category: CategoryId;
  label: string;
  ready: boolean;
};

export const SUBCATEGORIES: Subcategory[] = [
  { id: "engine-long-block", category: "engine", label: "Long block / crate", ready: false },
  { id: "engine-intake", category: "engine", label: "Intake / carb / EFI", ready: false },
  { id: "engine-headers", category: "engine", label: "Headers / manifolds", ready: false },
  { id: "engine-cooling", category: "engine", label: "Cooling", ready: false },
  { id: "engine-fuel", category: "engine", label: "Fuel system", ready: false },
  { id: "engine-ignition", category: "engine", label: "Ignition", ready: false },
  { id: "engine-dress", category: "engine", label: "Pulleys / dress-up", ready: false },
  { id: "engine-mounts", category: "engine", label: "Motor mounts", ready: false },
  { id: "interior-seats", category: "interior", label: "Seats", ready: false },
  { id: "interior-dash", category: "interior", label: "Dash / gauges", ready: false },
  { id: "interior-carpet", category: "interior", label: "Carpet / insulation", ready: false },
  { id: "interior-door-panels", category: "interior", label: "Door panels", ready: false },
  { id: "interior-console", category: "interior", label: "Console", ready: false },
  { id: "interior-headliner", category: "interior", label: "Headliner", ready: false },
  { id: "interior-belts", category: "interior", label: "Seat belts", ready: false },
  { id: "interior-pedals", category: "interior", label: "Pedals / hardware", ready: false },
  { id: "factory-uca", category: "suspension", label: "Factory Upper Control Arms", ready: true },
  { id: "tubular-uca", category: "suspension", label: "Tubular Upper Control Arms", ready: true },
  { id: "lower-control-arms", category: "suspension", label: "Lower Control Arms", ready: false },
  { id: "springs", category: "suspension", label: "Springs", ready: false },
  { id: "shocks", category: "suspension", label: "Shocks", ready: false },
  { id: "coilovers", category: "suspension", label: "Coilovers", ready: false },
  { id: "spring-perches", category: "suspension", label: "Spring Perches", ready: false },
  { id: "strut-rods", category: "suspension", label: "Strut Rods", ready: false },
  { id: "sway-bars", category: "suspension", label: "Sway Bars", ready: false },
  { id: "partial-front", category: "suspension", label: "Partial Front Systems", ready: false },
  { id: "full-front", category: "suspension", label: "Full Front Systems", ready: false },
  { id: "kits-bolton", category: "suspension", label: "Bolt-on / Factory-style Kits", ready: true },
  { id: "kits-mii", category: "suspension", label: "Mustang II / IFS Kits", ready: true },
  { id: "kits-full", category: "suspension", label: "Full Chassis / Pro-touring Kits", ready: true },
  { id: "rear-springs", category: "suspension", label: "Rear Springs", ready: false },
  { id: "rear-suspension", category: "suspension", label: "Rear 4-link / torque arm", ready: false },
  { id: "steering-box", category: "steering", label: "Steering box", ready: false },
  { id: "steering-rack", category: "steering", label: "Rack conversion", ready: false },
  { id: "steering-pump", category: "steering", label: "Power steering pump", ready: false },
  { id: "steering-column", category: "steering", label: "Column", ready: false },
  { id: "steering-linkage", category: "steering", label: "Tie rods / idler / pitman", ready: false },
  { id: "steering-wheel", category: "steering", label: "Steering wheel", ready: false },
  { id: "brakes-front", category: "brakes", label: "Front disc conversion", ready: false },
  { id: "brakes-rear", category: "brakes", label: "Rear drums / discs", ready: false },
  { id: "brakes-master", category: "brakes", label: "Master / booster", ready: false },
  { id: "brakes-lines", category: "brakes", label: "Lines / hoses", ready: false },
  { id: "wheels", category: "wheels-tires", label: "Wheels", ready: false },
  { id: "tires", category: "wheels-tires", label: "Tires", ready: false },
  { id: "wheel-hardware", category: "wheels-tires", label: "Lugs / spacers", ready: false },
  { id: "trans-manual", category: "transmission", label: "Manual", ready: false },
  { id: "trans-auto", category: "transmission", label: "Automatic", ready: false },
  { id: "trans-clutch", category: "transmission", label: "Clutch", ready: false },
  { id: "trans-crossmember", category: "transmission", label: "Crossmember", ready: false },
  { id: "trans-shifter", category: "transmission", label: "Shifter", ready: false },
  { id: "trans-driveshaft", category: "transmission", label: "Driveshaft", ready: false },
  { id: "rear-housing", category: "rear-end", label: "Housing (8-inch / 9-inch)", ready: false },
  { id: "rear-gears", category: "rear-end", label: "Gears", ready: false },
  { id: "rear-axles", category: "rear-end", label: "Axles", ready: false },
  { id: "rear-locker", category: "rear-end", label: "Posi / locker", ready: false },
  { id: "body-sheetmetal", category: "body", label: "Fenders / hood / decklid", ready: false },
  { id: "body-bumpers", category: "body", label: "Bumpers", ready: false },
  { id: "body-glass", category: "body", label: "Glass / weatherstrip", ready: false },
  { id: "body-lights", category: "body", label: "Lights", ready: false },
  { id: "body-floors", category: "body", label: "Floors / rails", ready: false },
  { id: "elec-harness", category: "electrical", label: "Wiring harness", ready: false },
  { id: "elec-charging", category: "electrical", label: "Alternator / charging", ready: false },
  { id: "elec-battery", category: "electrical", label: "Battery / cables", ready: false },
  { id: "elec-switches", category: "electrical", label: "Switches / lights", ready: false },
  { id: "elec-audio", category: "electrical", label: "Radio / stereo", ready: false },
];

export function subsForCategory(category: CategoryId) {
  return SUBCATEGORIES.filter((s) => s.category === category);
}

export function subcategoryById(id: SubcategoryId) {
  return SUBCATEGORIES.find((s) => s.id === id);
}

export function defaultSubFor(category: CategoryId) {
  const list = subsForCategory(category);
  return list.find((s) => s.ready) ?? list[0];
}

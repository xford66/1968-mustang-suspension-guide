export type CategoryId =
  | "engine"
  | "interior"
  | "suspension"
  | "steering"
  | "brakes"
  | "wheels-tires"
  | "transmission"
  | "rear-end"
  | "body"
  | "electrical";

export type Category = {
  id: CategoryId;
  label: string;
};

export const CATEGORIES: Category[] = [
  { id: "engine", label: "Engine" },
  { id: "interior", label: "Interior" },
  { id: "suspension", label: "Suspension" },
  { id: "steering", label: "Steering" },
  { id: "brakes", label: "Brakes" },
  { id: "wheels-tires", label: "Wheels / Tires" },
  { id: "transmission", label: "Transmission" },
  { id: "rear-end", label: "Rear End" },
  { id: "body", label: "Body" },
  { id: "electrical", label: "Electrical" },
];

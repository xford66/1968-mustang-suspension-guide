export type CategoryId =
  | "engine"
  | "interior"
  | "suspension"
  | "transmission"
  | "rear-end"
  | "body";

export type Category = {
  id: CategoryId;
  label: string;
  ready: boolean;
};

export const CATEGORIES: Category[] = [
  { id: "engine", label: "Engine", ready: false },
  { id: "interior", label: "Interior", ready: false },
  { id: "suspension", label: "Suspension", ready: true },
  { id: "transmission", label: "Transmission", ready: false },
  { id: "rear-end", label: "Rear End", ready: false },
  { id: "body", label: "Body", ready: false },
];

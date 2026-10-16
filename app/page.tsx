import { HomeClient } from "@/components/HomeClient";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className="app">
      <HomeClient />
    </main>
  );
}

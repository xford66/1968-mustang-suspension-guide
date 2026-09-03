import { HomeClient } from "@/components/HomeClient";

export default function HomePage() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">First-gen Mustang</p>
        <h1>Pick a year. Then pick the part of the car.</h1>
        <p className="lede">
          Start with suspension. The rest of the car comes later.
        </p>
      </header>
      <HomeClient />
    </main>
  );
}

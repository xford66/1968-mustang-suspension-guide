"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

export function SearchBar({ autoFocus }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form className={styles.bar} role="search" onSubmit={submit}>
      <span className={styles.icon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="7" cy="7" r="4.5" />
          <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" />
        </svg>
      </span>
      <input
        className={styles.input}
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder="Search kits, brands, part numbers…"
        aria-label="Search kits and parts"
        onChange={(event) => setValue(event.target.value)}
      />
      {value.length > 0 && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => setValue("")}
        >
          ×
        </button>
      )}
    </form>
  );
}

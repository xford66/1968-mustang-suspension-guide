"use client";

import { createContext, useContext } from "react";
import type { Catalog } from "@/lib/catalog";

const CatalogContext = createContext<Catalog | null>(null);

/**
 * Hands the catalog loaded from Neon on the server (app/layout.tsx) to client
 * components. Client components read it with useCatalog() and the pure
 * helpers in lib/catalog.ts.
 */
export function CatalogProvider({
  catalog,
  children,
}: {
  catalog: Catalog;
  children: React.ReactNode;
}) {
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Catalog {
  const catalog = useContext(CatalogContext);
  if (!catalog) {
    throw new Error("useCatalog() must be used inside <CatalogProvider> (see app/layout.tsx).");
  }
  return catalog;
}

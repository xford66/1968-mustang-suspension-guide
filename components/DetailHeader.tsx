"use client";

import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import type { CategoryId } from "@/lib/catalog";

/**
 * Site chrome for detail pages. The shared SiteHeader expects the home page's
 * category state; on a detail page a category pick navigates home instead.
 */
export function DetailHeader() {
  const router = useRouter();
  return (
    <SiteHeader
      category="suspension"
      onCategory={(id: CategoryId) => router.push(`/?cat=${id}`)}
    />
  );
}

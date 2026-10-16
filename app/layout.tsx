import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareTray } from "@/components/CompareTray";
import { CatalogProvider } from "@/components/CatalogProvider";
import { getCatalog } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: "1965–1970 Mustang Parts Guide",
  description:
    "Compare first-gen Mustang suspension kits by year, install type, and budget.",
};

// Catalog comes from Neon; rebuild static pages at most once an hour (ISR).
export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const catalog = await getCatalog();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CatalogProvider catalog={catalog}>
          {children}
          <Suspense>
            <CompareTray />
          </Suspense>
        </CatalogProvider>
      </body>
    </html>
  );
}

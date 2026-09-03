import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1965–1970 Mustang Parts Guide",
  description:
    "Compare first-gen Mustang suspension kits by year, install type, and budget.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

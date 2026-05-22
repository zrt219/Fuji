import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fuji Atlas",
  description: "A cinematic Japanese visual system for AI, product, and portfolio worlds."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

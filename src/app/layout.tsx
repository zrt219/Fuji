import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fuji Gallery Atlas",
  description: "A cinematic Vercel-ready gallery for the Fuji image archive."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

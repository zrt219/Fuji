import Link from "next/link";
import Image from "next/image";
import { AtSign, BriefcaseBusiness, Code2, Film, Newspaper, Radio, Trophy } from "lucide-react";
import type { FujiImage } from "@/data/fuji-images";

type Props = {
  hero: FujiImage;
  totalFrames: number;
  categoryCount: number;
  heroCandidates: number;
  digitalTwinFrames: number;
  uncategorizedCount: number;
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/zrt219", icon: Code2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zhane-grey-987258395", icon: BriefcaseBusiness },
  { label: "X", href: "https://x.com/zrt_219", icon: AtSign },
  { label: "Achievements", href: "https://beacons.ai/zrt_219", icon: Trophy },
  { label: "Substack", href: "https://substack.com/@zrt1", icon: Newspaper },
  { label: "Kick", href: "https://kick.com/zrt-219", icon: Radio },
];

const statMeta = [
  { key: "frames", label: "Total frames", note: "Canonical atlas set" },
  { key: "categories", label: "Active categories", note: "Japanese place-worlds" },
  { key: "heroes", label: "Hero candidates", note: "Cinematic lead images" },
  { key: "digital", label: "Digital twin frames", note: "Cyber-physical systems" },
  { key: "uncategorized", label: "Uncategorized", note: "Curation backlog" },
];

export function FujiHero({ hero, totalFrames, categoryCount, heroCandidates, digitalTwinFrames, uncategorizedCount }: Props) {
  const statValues = {
    frames: totalFrames,
    categories: categoryCount,
    heroes: heroCandidates,
    digital: digitalTwinFrames,
    uncategorized: uncategorizedCount,
  };

  return (
    <section className="fa-hero" aria-labelledby="fuji-title">
      <Image src={hero.src} alt="" fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="fa-hero-image" />
      <div className="fa-hero-scrim" />
      <div className="fa-hero-inner">
        <div className="fa-hero-copy">
          <p className="fa-kicker">Fuji / Japan visual operating system</p>
          <h1 id="fuji-title">Fuji Atlas</h1>
          <p className="fa-hero-subtitle">A cinematic Japanese visual system for AI, product, and portfolio worlds.</p>
          <div className="fa-hero-actions">
            <Link href="/fuji/film" className="fa-hero-button" aria-label="Open Fuji Atlas film mode">
              <Film size={18} />
              <span>Film mode</span>
            </Link>
          </div>
          <nav className="fa-hero-socials" aria-label="Zhane Grey social links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Open ${label}`}>
                <Icon size={15} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
        <aside className="fa-stat-grid" aria-label="Fuji Atlas stats">
          <div className="fa-stat-header">
            <span>Atlas Index</span>
            <strong>Live archive state</strong>
          </div>
          {statMeta.map((stat, index) => (
            <div key={stat.key} className={index === 0 ? "fa-stat-card primary" : "fa-stat-card"}>
              <span className="fa-stat-number">{statValues[stat.key as keyof typeof statValues]}</span>
              <span className="fa-stat-label">{stat.label}</span>
              <small>{stat.note}</small>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

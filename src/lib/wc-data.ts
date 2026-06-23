export type Group = { name: string; teams: { code: string; flag: string; name: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }[] };

export type MatchStatus = "finished" | "live" | "upcoming";

export interface Match {
  id: number;
  home: string;
  hf: string;
  away: string;
  af: string;
  /** ISO 8601 kickoff time (ET converted to UTC) */
  kickoff: string;
  /** Venue / stadium name */
  venue: string;
  group: string;
  status: MatchStatus;
  /** Home score (only meaningful when status != "upcoming") */
  hs: number;
  /** Away score (only meaningful when status != "upcoming") */
  as: number;
  /** Current match minute — for live matches this is computed dynamically; for finished matches it is 90 (or 90+extra) */
  minute?: number;
  /** AI win probabilities for upcoming matches */
  hw?: number;
  d?: number;
  aw?: number;
}

// ──────────────────────────────────────────────
// Helper utilities
// ──────────────────────────────────────────────

/** Get how many minutes have elapsed since kickoff, capped at 90+stoppage */
export function getLiveMinute(kickoff: string): number {
  const elapsed = Math.floor((Date.now() - new Date(kickoff).getTime()) / 60000);
  if (elapsed < 0) return 0;
  if (elapsed > 95) return 90; // match would be over
  return elapsed;
}

/** Get the expected finish time string (kickoff + ~97 min for halftime/stoppage) */
export function getExpectedFinish(kickoff: string): string {
  const finish = new Date(new Date(kickoff).getTime() + 97 * 60000);
  return finish.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Format kickoff to readable date */
export function formatMatchDate(kickoff: string): string {
  return new Date(kickoff).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Format kickoff to readable time */
export function formatMatchTime(kickoff: string): string {
  return new Date(kickoff).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Determine real-time status of a match based on kickoff time */
export function getMatchStatus(m: Match): MatchStatus {
  if (m.status === "finished") return "finished";
  const now = Date.now();
  const kickoffMs = new Date(m.kickoff).getTime();
  if (now < kickoffMs) return "upcoming";
  // A match lasts ~97 minutes including halftime and stoppage
  if (now < kickoffMs + 97 * 60000) return "live";
  return "finished";
}

// ──────────────────────────────────────────────
// Groups
// ──────────────────────────────────────────────

export const GROUPS: Group[] = [
  { name: "A", teams: [
    { code: "MEX", flag: "🇲🇽", name: "Mexico", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "ZAF", flag: "🇿🇦", name: "South Africa", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "KOR", flag: "🇰🇷", name: "South Korea", p: 1, w: 1, d: 0, l: 0, gf: 2, ga: 1, pts: 3 },
    { code: "CZE", flag: "🇨🇿", name: "Czechia", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 2, pts: 0 },
  ]},
  { name: "B", teams: [
    { code: "CAN", flag: "🇨🇦", name: "Canada", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    { code: "BIH", flag: "🇧🇦", name: "Bosnia and Herzegovina", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    { code: "QAT", flag: "🇶🇦", name: "Qatar", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "CHE", flag: "🇨🇭", name: "Switzerland", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "C", teams: [
    { code: "BRA", flag: "🇧🇷", name: "Brazil", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "MAR", flag: "🇲🇦", name: "Morocco", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "HTI", flag: "🇭🇹", name: "Haiti", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "SCO", flag: "🏴", name: "Scotland", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "D", teams: [
    { code: "USA", flag: "🇺🇸", name: "United States", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "PRY", flag: "🇵🇾", name: "Paraguay", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "AUS", flag: "🇦🇺", name: "Australia", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "TUR", flag: "🇹🇷", name: "Türkiye", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "E", teams: [
    { code: "DEU", flag: "🇩🇪", name: "Germany", p: 1, w: 1, d: 0, l: 0, gf: 7, ga: 1, pts: 3 },
    { code: "CUW", flag: "🇨🇼", name: "Curaçao", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 7, pts: 0 },
    { code: "CIV", flag: "🇨🇮", name: "Ivory Coast", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "ECU", flag: "🇪🇨", name: "Ecuador", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "F", teams: [
    { code: "NLD", flag: "🇳🇱", name: "Netherlands", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "JPN", flag: "🇯🇵", name: "Japan", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "SWE", flag: "🇸🇪", name: "Sweden", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "TUN", flag: "🇹🇳", name: "Tunisia", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "G", teams: [
    { code: "BEL", flag: "🇧🇪", name: "Belgium", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    { code: "EGY", flag: "🇪🇬", name: "Egypt", p: 1, w: 0, d: 1, l: 0, gf: 1, ga: 1, pts: 1 },
    { code: "IRN", flag: "🇮🇷", name: "Iran", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "NZL", flag: "🇳🇿", name: "New Zealand", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "H", teams: [
    { code: "ESP", flag: "🇪🇸", name: "Spain", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "CPV", flag: "🇨🇻", name: "Cape Verde", p: 0, w: 1, d: 0, l: 0, gf: 1, ga: 0, pts: 0 },
    { code: "SAU", flag: "🇸🇦", name: "Saudi Arabia", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "URY", flag: "🇺🇾", name: "Uruguay", p: 0, w: 1, d: 0, l: 0, gf: 2, ga: 0, pts: 0 },
  ]},
  { name: "I", teams: [
    { code: "FRA", flag: "🇫🇷", name: "France", p: 1, w: 1, d: 0, l: 0, gf: 3, ga: 1, pts: 3 },
    { code: "NOR", flag: "🇳🇴", name: "Norway", p: 1, w: 1, d: 0, l: 0, gf: 4, ga: 1, pts: 3 },
    { code: "SEN", flag: "🇸🇳", name: "Senegal", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
    { code: "IRQ", flag: "🇮🇶", name: "Iraq", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 4, pts: 0 },
  ]},
  { name: "J", teams: [
    { code: "AUT", flag: "🇦🇹", name: "Austria", p: 1, w: 1, d: 0, l: 0, gf: 3, ga: 1, pts: 3 },
    { code: "JOR", flag: "🇯🇴", name: "Jordan", p: 1, w: 0, d: 0, l: 1, gf: 1, ga: 3, pts: 0 },
    { code: "ARG", flag: "🇦🇷", name: "Argentina", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "DZA", flag: "🇩🇿", name: "Algeria", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "K", teams: [
    { code: "PRT", flag: "🇵🇹", name: "Portugal", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "COD", flag: "🇨🇩", name: "DR Congo", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "UZB", flag: "🇺🇿", name: "Uzbekistan", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "COL", flag: "🇨🇴", name: "Colombia", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
  { name: "L", teams: [
    { code: "ENG", flag: "🏴", name: "England", p: 1, w: 1, d: 0, l: 0, gf: 4, ga: 2, pts: 3 },
    { code: "CRO", flag: "🇭🇷", name: "Croatia", p: 1, w: 0, d: 0, l: 1, gf: 2, ga: 4, pts: 0 },
    { code: "GHA", flag: "🇬🇭", name: "Ghana", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "PAN", flag: "🇵🇦", name: "Panama", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]},
];

// ──────────────────────────────────────────────
// Unified match list — finished, live/today, upcoming
// Times are in ET (UTC-4 during EDT)
// ──────────────────────────────────────────────

export const ALL_MATCHES: Match[] = [
  // ── Matchday 1 – Jun 11 ──
  { id: 1, home: "Mexico", hf: "🇲🇽", away: "South Africa", af: "🇿🇦", kickoff: "2026-06-11T20:00:00-04:00", venue: "Estadio Azteca, Mexico City", group: "A", status: "finished", hs: 1, as: 0, minute: 90 },

  // ── Matchday 2 – Jun 12 ──
  { id: 2, home: "Bosnia and Herzegovina", hf: "🇧🇦", away: "Canada", af: "🇨🇦", kickoff: "2026-06-12T13:00:00-04:00", venue: "BC Place, Vancouver", group: "B", status: "finished", hs: 1, as: 1, minute: 90 },
  { id: 3, home: "Czechia", hf: "🇨🇿", away: "South Korea", af: "🇰🇷", kickoff: "2026-06-12T16:00:00-04:00", venue: "MetLife Stadium, New Jersey", group: "A", status: "finished", hs: 1, as: 2, minute: 90 },

  // ── Matchday 3 – Jun 13 ──
  { id: 4, home: "Algeria", hf: "🇩🇿", away: "Jordan", af: "🇯🇴", kickoff: "2026-06-13T13:00:00-04:00", venue: "Hard Rock Stadium, Miami", group: "J", status: "finished", hs: 0, as: 0, minute: 90 },

  // ── Matchday 4 – Jun 14 ──
  { id: 5, home: "Germany", hf: "🇩🇪", away: "Curaçao", af: "🇨🇼", kickoff: "2026-06-14T16:00:00-04:00", venue: "Mercedes-Benz Stadium, Atlanta", group: "E", status: "finished", hs: 7, as: 1, minute: 90 },

  // ── Matchday 5 – Jun 15 ──
  { id: 6, home: "Belgium", hf: "🇧🇪", away: "Egypt", af: "🇪🇬", kickoff: "2026-06-15T15:00:00-04:00", venue: "SoFi Stadium, Los Angeles", group: "G", status: "finished", hs: 1, as: 1, minute: 90 },
  { id: 7, home: "Norway", hf: "🇳🇴", away: "Iraq", af: "🇮🇶", kickoff: "2026-06-15T20:00:00-04:00", venue: "Lincoln Financial Field, Philadelphia", group: "I", status: "finished", hs: 4, as: 1, minute: 90 },

  // ── Matchday 6 – Jun 16 ──
  { id: 8, home: "France", hf: "🇫🇷", away: "Senegal", af: "🇸🇳", kickoff: "2026-06-16T17:00:00-04:00", venue: "MetLife Stadium, New Jersey", group: "I", status: "finished", hs: 3, as: 1, minute: 90 },

  // ── Matchday 7 – Jun 17 (TODAY) ──
  { id: 9, home: "Portugal", hf: "🇵🇹", away: "DR Congo", af: "🇨🇩", kickoff: "2026-06-17T13:00:00-04:00", venue: "NRG Stadium, Houston", group: "K", status: "finished", hs: 1, as: 1, minute: 90 },
  { id: 10, home: "England", hf: "🏴", away: "Croatia", af: "🇭🇷", kickoff: "2026-06-17T16:00:00-04:00", venue: "AT&T Stadium, Dallas", group: "L", status: "finished", hs: 4, as: 2, minute: 90 },
  { id: 11, home: "Austria", hf: "🇦🇹", away: "Jordan", af: "🇯🇴", kickoff: "2026-06-17T16:00:00-04:00", venue: "BMO Field, Toronto", group: "J", status: "finished", hs: 3, as: 1, minute: 90 },
  { id: 12, home: "Ghana", hf: "🇬🇭", away: "Panama", af: "🇵🇦", kickoff: "2026-06-17T19:00:00-04:00", venue: "BMO Field, Toronto", group: "L", status: "live", hs: 1, as: 0, minute: 0 },
  { id: 13, home: "Uzbekistan", hf: "🇺🇿", away: "Colombia", af: "🇨🇴", kickoff: "2026-06-17T22:00:00-04:00", venue: "Estadio Azteca, Mexico City", group: "K", status: "upcoming", hs: 1, as: 3, hw: 25, d: 30, aw: 45 },

  // ── Matchday 8 – Jun 18 ──
  { id: 14, home: "Czechia", hf: "🇨🇿", away: "South Africa", af: "🇿🇦", kickoff: "2026-06-18T12:00:00-04:00", venue: "Mercedes-Benz Stadium, Atlanta", group: "A", status: "upcoming", hs: 1, as: 1, hw: 50, d: 28, aw: 22 },
  { id: 15, home: "Switzerland", hf: "🇨🇭", away: "Bosnia and Herzegovina", af: "🇧🇦", kickoff: "2026-06-18T15:00:00-04:00", venue: "SoFi Stadium, Los Angeles", group: "B", status: "upcoming", hs: 4, as: 1, hw: 48, d: 28, aw: 24 },
  { id: 16, home: "Canada", hf: "🇨🇦", away: "Qatar", af: "🇶🇦", kickoff: "2026-06-18T18:00:00-04:00", venue: "BC Place, Vancouver", group: "B", status: "upcoming", hs: 6, as: 0, hw: 60, d: 24, aw: 16 },
  { id: 17, home: "Mexico", hf: "🇲🇽", away: "South Korea", af: "🇰🇷", kickoff: "2026-06-18T22:00:00-04:00", venue: "Estadio Guadalajara", group: "A", status: "upcoming", hs: 1, as: 0, hw: 45, d: 27, aw: 28 },

  // ── Matchday 9 – Jun 19 ──
  { id: 18, home: "United States", hf: "🇺🇸", away: "Australia", af: "🇦🇺", kickoff: "2026-06-19T15:00:00-04:00", venue: "Lumen Field, Seattle", group: "D", status: "upcoming", hs: 2, as: 0, hw: 62, d: 22, aw: 16 },
  { id: 19, home: "Scotland", hf: "🏴", away: "Morocco", af: "🇲🇦", kickoff: "2026-06-19T18:00:00-04:00", venue: "Gillette Stadium, Boston", group: "C", status: "upcoming", hs: 0, as: 1, hw: 28, d: 28, aw: 44 },
  { id: 20, home: "Brazil", hf: "🇧🇷", away: "Haiti", af: "🇭🇹", kickoff: "2026-06-19T20:30:00-04:00", venue: "Lincoln Financial Field, Philadelphia", group: "C", status: "upcoming", hs: 3, as: 0, hw: 88, d: 8, aw: 4 },
  { id: 21, home: "Türkiye", hf: "🇹🇷", away: "Paraguay", af: "🇵🇾", kickoff: "2026-06-20T00:00:00-04:00", venue: "Levi's Stadium, San Francisco", group: "D", status: "upcoming", hs: 0, as: 1, hw: 42, d: 30, aw: 28 },

  // ── Matchday 10 – Jun 20 ──
  { id: 22, home: "Netherlands", hf: "🇳🇱", away: "Sweden", af: "🇸🇪", kickoff: "2026-06-20T13:00:00-04:00", venue: "NRG Stadium, Houston", group: "F", status: "upcoming", hs: 5, as: 1, hw: 55, d: 26, aw: 19 },
  { id: 23, home: "Germany", hf: "🇩🇪", away: "Ivory Coast", af: "🇨🇮", kickoff: "2026-06-20T16:00:00-04:00", venue: "BMO Field, Toronto", group: "E", status: "upcoming", hs: 2, as: 1, hw: 70, d: 18, aw: 12 },
  { id: 24, home: "Ecuador", hf: "🇪🇨", away: "Curaçao", af: "🇨🇼", kickoff: "2026-06-20T20:00:00-04:00", venue: "Arrowhead Stadium, Kansas City", group: "E", status: "upcoming", hs: 0, as: 0, hw: 72, d: 18, aw: 10 },
  { id: 25, home: "Tunisia", hf: "🇹🇳", away: "Japan", af: "🇯🇵", kickoff: "2026-06-20T23:00:00-04:00", venue: "Estadio BBVA, Monterrey", group: "F", status: "upcoming", hs: 0, as: 4, hw: 22, d: 26, aw: 52 },

  // ── Matchday 11 – Jun 21 ──
  { id: 26, home: "Spain", hf: "🇪🇸", away: "Saudi Arabia", af: "🇸🇦", kickoff: "2026-06-21T12:00:00-04:00", venue: "Mercedes-Benz Stadium, Atlanta", group: "H", status: "upcoming", hs: 4, as: 0, hw: 82, d: 12, aw: 6 },
  { id: 27, home: "Belgium", hf: "🇧🇪", away: "Iran", af: "🇮🇷", kickoff: "2026-06-21T15:00:00-04:00", venue: "SoFi Stadium, Los Angeles", group: "G", status: "upcoming", hs: 0, as: 0, hw: 62, d: 22, aw: 16 },
  { id: 28, home: "Uruguay", hf: "🇺🇾", away: "Cape Verde", af: "🇨🇻", kickoff: "2026-06-21T18:00:00-04:00", venue: "Hard Rock Stadium, Miami", group: "H", status: "upcoming", hs: 2, as: 2, hw: 72, d: 18, aw: 10 },
  { id: 29, home: "New Zealand", hf: "🇳🇿", away: "Egypt", af: "🇪🇬", kickoff: "2026-06-21T21:00:00-04:00", venue: "BC Place, Vancouver", group: "G", status: "upcoming", hs: 1, as: 3, hw: 22, d: 26, aw: 52 },

  // ── Matchday 12 – Jun 22 ──
  { id: 30, home: "Argentina", hf: "🇦🇷", away: "Austria", af: "🇦🇹", kickoff: "2026-06-22T13:00:00-04:00", venue: "AT&T Stadium, Dallas", group: "J", status: "upcoming", hs: 2, as: 0, hw: 58, d: 24, aw: 18 },
  { id: 31, home: "France", hf: "🇫🇷", away: "Iraq", af: "🇮🇶", kickoff: "2026-06-22T17:00:00-04:00", venue: "Lincoln Financial Field, Philadelphia", group: "I", status: "upcoming", hs: 2, as: 0, hw: 78, d: 14, aw: 8 },
  { id: 32, home: "Norway", hf: "🇳🇴", away: "Senegal", af: "🇸🇳", kickoff: "2026-06-22T20:00:00-04:00", venue: "Gillette Stadium, Boston", group: "I", status: "upcoming", hs: 0, as: 0, hw: 45, d: 28, aw: 27 },
  { id: 33, home: "Algeria", hf: "🇩🇿", away: "Argentina", af: "🇦🇷", kickoff: "2026-06-22T22:00:00-04:00", venue: "Hard Rock Stadium, Miami", group: "J", status: "upcoming", hs: 0, as: 3, hw: 15, d: 22, aw: 63 }
];

// ──────────────────────────────────────────────
// Predictions
// ──────────────────────────────────────────────

export const PREDICTIONS = [
  { team: "Spain", flag: "🇪🇸", chance: 16 },
  { team: "France", flag: "🇫🇷", chance: 13 },
  { team: "England", flag: "🏴", chance: 11 },
  { team: "Argentina", flag: "🇦🇷", chance: 10 },
  { team: "Portugal", flag: "🇵🇹", chance: 7 },
  { team: "Brazil", flag: "🇧🇷", chance: 6 },
  { team: "Germany", flag: "🇩🇪", chance: 6 },
  { team: "Netherlands", flag: "🇳🇱", chance: 4 },
];

// ──────────────────────────────────────────────
// Player stats
// ──────────────────────────────────────────────

export const PLAYERS = [
  { name: "Kylian Mbappé", country: "France", flag: "🇫🇷", goals: 2, assists: 0, matches: 1, minutes: 90, shots: 18, pass: 92, yc: 1 },
  { name: "Jude Bellingham", country: "England", flag: "🏴", goals: 0, assists: 4, matches: 4, minutes: 360, shots: 14, pass: 89, yc: 0 },
  { name: "Vinícius Júnior", country: "Brazil", flag: "🇧🇷", goals: 1, assists: 2, matches: 4, minutes: 340, shots: 19, pass: 84, yc: 2 },
  { name: "Lamine Yamal", country: "Spain", flag: "🇪🇸", goals: 0, assists: 5, matches: 4, minutes: 355, shots: 12, pass: 91, yc: 0 },
  { name: "Lionel Messi", country: "Argentina", flag: "🇦🇷", goals: 5, assists: 0, matches: 2, minutes: 320, shots: 11, pass: 90, yc: 0 },
  { name: "Erling Haaland", country: "Norway", flag: "🇳🇴", goals: 0, assists: 1, matches: 3, minutes: 270, shots: 16, pass: 78, yc: 1 },
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹", goals: 0, assists: 0, matches: 3, minutes: 270, shots: 17, pass: 80, yc: 1 },
  { name: "Florian Wirtz", country: "Germany", flag: "🇩🇪", goals: 0, assists: 4, matches: 3, minutes: 265, shots: 9, pass: 93, yc: 0 },
];

// ──────────────────────────────────────────────
// News & Polls (unchanged)
// ──────────────────────────────────────────────

export const NEWS = [
  { title: "England thrash Croatia 4-2 in Dallas opener", tag: "Match", time: "2h ago" },
  { title: "Germany crush Curaçao 7-1 in record rout", tag: "Match", time: "3d ago" },
  { title: "France beat Senegal 3-1 — Mbappé on fire", tag: "Player", time: "1d ago" },
  { title: "AI model: Spain now 16% favorite to lift trophy", tag: "Prediction", time: "8h ago" },
  { title: "Lamine Yamal becomes youngest WC assist leader", tag: "Record", time: "1d ago" },
];

export const POLLS = [
  { q: "Who will win the World Cup?", opts: [
    { label: "Spain 🇪🇸", v: 28 },
    { label: "France 🇫🇷", v: 22 },
    { label: "Argentina 🇦🇷", v: 19 },
    { label: "Brazil 🇧🇷", v: 15 },
    { label: "England 🏴", v: 11 },
    { label: "Other", v: 5 },
  ]},
  { q: "Who deserves the Golden Ball?", opts: [
    { label: "Jude Bellingham", v: 31 },
    { label: "Kylian Mbappé", v: 27 },
    { label: "Lamine Yamal", v: 24 },
    { label: "Vinícius Júnior", v: 18 },
  ]},
  { q: "Biggest surprise team?", opts: [
    { label: "Canada 🇨🇦", v: 34 },
    { label: "Morocco 🇲🇦", v: 26 },
    { label: "Senegal 🇸🇳", v: 22 },
    { label: "Ecuador 🇪🇨", v: 18 },
  ]},
];

export type Group = { name: string; teams: { code: string; flag: string; name: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }[] };

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
    { code: "CPV", flag: "🇨🇻", name: "Cape Verde", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "SAU", flag: "🇸🇦", name: "Saudi Arabia", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { code: "URY", flag: "🇺🇾", name: "Uruguay", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
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

export const PLAYERS = [
  { name: "Kylian Mbappé", country: "France", flag: "🇫🇷", goals: 0, assists: 3, matches: 4, minutes: 360, shots: 18, pass: 92, yc: 1 },
  { name: "Jude Bellingham", country: "England", flag: "🏴", goals: 0, assists: 4, matches: 4, minutes: 360, shots: 14, pass: 89, yc: 0 },
  { name: "Vinícius Júnior", country: "Brazil", flag: "🇧🇷", goals: 1, assists: 2, matches: 4, minutes: 340, shots: 19, pass: 84, yc: 2 },
  { name: "Lamine Yamal", country: "Spain", flag: "🇪🇸", goals: 0, assists: 5, matches: 4, minutes: 355, shots: 12, pass: 91, yc: 0 },
  { name: "Lionel Messi", country: "Argentina", flag: "🇦🇷", goals: 0, assists: 3, matches: 4, minutes: 320, shots: 11, pass: 90, yc: 0 },
  { name: "Erling Haaland", country: "Norway", flag: "🇳🇴", goals: 0, assists: 1, matches: 3, minutes: 270, shots: 16, pass: 78, yc: 1 },
  { name: "Cristiano Ronaldo", country: "Portugal", flag: "🇵🇹", goals: 0, assists: 0, matches: 3, minutes: 270, shots: 17, pass: 80, yc: 1 },
  { name: "Florian Wirtz", country: "Germany", flag: "🇩🇪", goals: 0, assists: 4, matches: 3, minutes: 265, shots: 9, pass: 93, yc: 0 },
];

export const MATCHES = [
  { home: "Spain", hf: "🇪🇸", away: "France", af: "🇫🇷", date: "Jun 22", time: "20:00", hw: 42, d: 28, aw: 30, stage: "Group H" },
  { home: "Argentina", hf: "🇦🇷", away: "Mexico", af: "🇲🇽", date: "Jun 23", time: "17:00", hw: 55, d: 25, aw: 20, stage: "Group J" },
  { home: "Brazil", hf: "🇧🇷", away: "Germany", af: "🇩🇪", date: "Jun 24", time: "20:00", hw: 47, d: 26, aw: 27, stage: "Group C" },
  { home: "England", hf: "🏴", away: "Netherlands", af: "🇳🇱", date: "Jun 25", time: "18:00", hw: 50, d: 27, aw: 23, stage: "Group L" },
  { home: "Portugal", hf: "🇵🇹", away: "Croatia", af: "🇭🇷", date: "Jun 26", time: "20:00", hw: 56, d: 24, aw: 20, stage: "Group K" },
];

export const RESULTS = [
  { home: "Germany", hf: "🇩🇪", hs: 7, away: "Curaçao", af: "🇨🇼", as: 1, stage: "Group E" },
  { home: "France", hf: "🇫🇷", hs: 3, away: "Senegal", af: "🇸🇳", as: 1, stage: "Group I" },
  { home: "England", hf: "🏴", hs: 4, away: "Croatia", af: "🇭🇷", as: 2, stage: "Group L" },
  { home: "Norway", hf: "🇳🇴", hs: 4, away: "Iraq", af: "🇮🇶", as: 1, stage: "Group I" },
  { home: "Austria", hf: "🇦🇹", hs: 3, away: "Jordan", af: "🇯🇴", as: 1, stage: "Group J" },
  { home: "Belgium", hf: "🇧🇪", hs: 1, away: "Egypt", af: "🇪🇬", as: 1, stage: "Group G" },
  { home: "Bosnia and Herzegovina", hf: "🇧🇦", hs: 1, away: "Canada", af: "🇨🇦", as: 1, stage: "Group B" },
  { home: "Czechia", hf: "🇨🇿", hs: 1, away: "South Korea", af: "🇰🇷", as: 2, stage: "Group A" },
];

export const NEWS = [
  { title: "Spain dismantle Croatia 3-0 in opener", tag: "Match", time: "2h ago" },
  { title: "Mbappé hits hat-trick to send France top of Group C", tag: "Player", time: "5h ago" },
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

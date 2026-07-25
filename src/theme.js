/* Design tokens shared across all three portals. */

export const C = {
  paper: "#F7F5F1",
  surface: "#FFFFFF",
  ink: "#1C1B19",
  subtle: "#6B6862",
  faint: "#9B978F",
  line: "#E7E3DA",
  brand: "#2E5D4B",
  brandDark: "#1E4034",
  brandSoft: "#E7EFEA",
  accent: "#C97B3E",
  good: "#2E7D4F",
  goodSoft: "#E5F3EA",
  warn: "#B8862B",
  warnSoft: "#FBF1DF",
  bad: "#B84A3E",
  badSoft: "#FBEAE7",
  info: "#3B6FA0",
  infoSoft: "#E8F0F8",
  shadow: "0 1px 2px rgba(28,27,25,0.04), 0 8px 24px rgba(28,27,25,0.06)",
  shadowLg: "0 4px 12px rgba(28,27,25,0.06), 0 24px 48px rgba(28,27,25,0.12)",
};

export const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
:root { --font-body: 'Inter', system-ui, sans-serif; --font-display: 'Fraunces', Georgia, serif; }
body { font-family: var(--font-body); color: ${C.ink}; }
h1, h2, .font-display { font-family: var(--font-display); }
`;

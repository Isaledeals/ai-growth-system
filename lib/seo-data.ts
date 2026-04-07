// ============================================================
// AI Growth System — SEO Daten (Städte für programmatic SEO)
// ============================================================

export const STAEDTE = [
  { slug: "berlin", name: "Berlin", einwohner: 3669491 },
  { slug: "hamburg", name: "Hamburg", einwohner: 1841179 },
  { slug: "muenchen", name: "München", einwohner: 1471508 },
  { slug: "koeln", name: "Köln", einwohner: 1085664 },
  { slug: "frankfurt", name: "Frankfurt am Main", einwohner: 753056 },
  { slug: "stuttgart", name: "Stuttgart", einwohner: 626275 },
  { slug: "duesseldorf", name: "Düsseldorf", einwohner: 619294 },
  { slug: "leipzig", name: "Leipzig", einwohner: 587857 },
  { slug: "dortmund", name: "Dortmund", einwohner: 586852 },
  { slug: "essen", name: "Essen", einwohner: 582415 },
  { slug: "bremen", name: "Bremen", einwohner: 567559 },
  { slug: "dresden", name: "Dresden", einwohner: 556227 },
  { slug: "hannover", name: "Hannover", einwohner: 532163 },
  { slug: "nuernberg", name: "Nürnberg", einwohner: 515543 },
  { slug: "duisburg", name: "Duisburg", einwohner: 495885 },
  { slug: "bochum", name: "Bochum", einwohner: 364628 },
  { slug: "wuppertal", name: "Wuppertal", einwohner: 354572 },
  { slug: "bielefeld", name: "Bielefeld", einwohner: 333509 },
  { slug: "bonn", name: "Bonn", einwohner: 330579 },
  { slug: "muenster", name: "Münster", einwohner: 316403 },
  { slug: "karlsruhe", name: "Karlsruhe", einwohner: 308436 },
  { slug: "mannheim", name: "Mannheim", einwohner: 309370 },
  { slug: "augsburg", name: "Augsburg", einwohner: 296478 },
  { slug: "wiesbaden", name: "Wiesbaden", einwohner: 278342 },
  { slug: "moenchengladbach", name: "Mönchengladbach", einwohner: 261454 },
  { slug: "gelsenkirchen", name: "Gelsenkirchen", einwohner: 260126 },
  { slug: "braunschweig", name: "Braunschweig", einwohner: 248867 },
  { slug: "kiel", name: "Kiel", einwohner: 246243 },
  { slug: "chemnitz", name: "Chemnitz", einwohner: 243521 },
  { slug: "aachen", name: "Aachen", einwohner: 248960 },
  { slug: "halle", name: "Halle (Saale)", einwohner: 237865 },
  { slug: "magdeburg", name: "Magdeburg", einwohner: 235775 },
  { slug: "freiburg", name: "Freiburg im Breisgau", einwohner: 230241 },
  { slug: "krefeld", name: "Krefeld", einwohner: 226812 },
  { slug: "luebeck", name: "Lübeck", einwohner: 217198 },
  { slug: "oberhausen", name: "Oberhausen", einwohner: 209567 },
  { slug: "erfurt", name: "Erfurt", einwohner: 213692 },
  { slug: "mainz", name: "Mainz", einwohner: 217123 },
  { slug: "rostock", name: "Rostock", einwohner: 209191 },
  { slug: "kassel", name: "Kassel", einwohner: 201048 },
  { slug: "hagen", name: "Hagen", einwohner: 188814 },
  { slug: "saarbruecken", name: "Saarbrücken", einwohner: 180374 },
  { slug: "potsdam", name: "Potsdam", einwohner: 182112 },
  { slug: "hamm", name: "Hamm", einwohner: 179111 },
  { slug: "ludwigshafen", name: "Ludwigshafen am Rhein", einwohner: 172145 },
  { slug: "oldenburg", name: "Oldenburg", einwohner: 169077 },
  { slug: "muelheim", name: "Mülheim an der Ruhr", einwohner: 170880 },
  { slug: "osnabrueck", name: "Osnabrück", einwohner: 165251 },
  { slug: "leverkusen", name: "Leverkusen", einwohner: 163838 },
  { slug: "darmstadt", name: "Darmstadt", einwohner: 159878 },
] as const;

export type Stadt = (typeof STAEDTE)[number];

// ---------------------------------------------------------------------------
// Helper: Get stadt by slug
// ---------------------------------------------------------------------------
export function getStadtBySlug(slug: string): Stadt | undefined {
  return STAEDTE.find((s) => s.slug === slug);
}

export const provinces = [
  "Agusan del Norte",
  "Agusan del Sur",
  "Surigao del Norte",
  "Surigao del Sur",
  "Dinagat Islands",
];

export const sectors = [
  "Agriculture & Aquaculture",
  "Disaster Resilience",
  "Health & Biotech",
  "ICT & AI",
  "Renewable Energy",
  "Marine Science",
  "MSME Innovation",
];

export const sdgs = [
  "SDG 2 — Zero Hunger",
  "SDG 3 — Good Health",
  "SDG 7 — Clean Energy",
  "SDG 9 — Innovation",
  "SDG 11 — Sustainable Cities",
  "SDG 13 — Climate Action",
  "SDG 14 — Life Below Water",
];

export type Research = {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  institution: string;
  province: string;
  sector: string;
  sdg: string;
  trl: number;
  funding: number;
  status: "Active" | "Completed" | "Pilot" | "Adopted";
  year: number;
  citations: number;
  aiSummary: string;
  keywords: string[];
};

const titles = [
  "AI-Driven Flood Prediction for Agusan River Basin",
  "Seaweed-Based Biodegradable Packaging from Surigao Waters",
  "Smart Cacao Fermentation IoT for Caraga Farmers",
  "Mangrove Carbon Sequestration Mapping in Dinagat",
  "Low-Cost Solar Dryer for Abaca Producers",
  "Telemedicine Network for Remote Caraga Barangays",
  "Geo-Hazard Mapping using LiDAR & ML",
  "Tilapia Genetic Improvement for Inland Aquaculture",
  "Coconut Coir Composite for Affordable Housing",
  "Indigenous Crop Resilience Database (Lumad Communities)",
  "Blockchain Traceability for Caraga Coffee",
  "Drone-Based Crop Disease Detection in Surigao Sur",
  "Microalgae Biofuel Pilot at Butuan Bay",
  "AI Chatbot for LGU Disaster Coordination",
  "Smart Aquaculture Water Quality Sensors",
  "Mobile Diagnostic Lab for Dengue Surveillance",
  "Agroforestry Yield Optimization Models",
  "E-Waste Recycling Innovation Hub Framework",
  "AI Tutor for Rural STEM Education",
  "Wave Energy Feasibility Study — Dinagat Coast",
];

export const researches: Research[] = titles.map((title, i) => ({
  id: `R-${1000 + i}`,
  title,
  abstract:
    "This study examines a region-specific innovation pathway with focus on measurable community outcomes, technology transfer potential, and policy alignment with the Caraga Regional Development Plan.",
  authors: [
    ["Dr. M. Bautista", "Engr. R. Lim"],
    ["Dr. J. Cariño", "Prof. A. Sanchez"],
    ["Engr. D. Mercado", "Dr. P. Tan"],
    ["Dr. S. Villanueva"],
    ["Prof. K. Domingo", "Dr. L. Reyes"],
  ][i % 5],
  institution: [
    "Caraga State University",
    "Surigao State College of Technology",
    "Father Saturnino Urios University",
    "Agusan del Sur State College",
    "ADNHS Research Center",
  ][i % 5],
  province: provinces[i % provinces.length],
  sector: sectors[i % sectors.length],
  sdg: sdgs[i % sdgs.length],
  trl: ((i * 3) % 9) + 1,
  funding: 800_000 + ((i * 137) % 50) * 120_000,
  status: (["Active", "Completed", "Pilot", "Adopted"] as const)[i % 4],
  year: 2019 + (i % 6),
  citations: ((i * 17) % 90) + 3,
  aiSummary:
    "AI summary: Bridges a regional gap in climate-resilient livelihood systems; high commercialization potential and strong SDG alignment.",
  keywords: ["caraga", "innovation", "community impact", "AI"].concat(
    sectors[i % sectors.length].toLowerCase().split(" ")[0],
  ),
}));

export const kpis = {
  totalResearch: researches.length,
  totalFunding: researches.reduce((a, b) => a + b.funding, 0),
  activeProjects: researches.filter((r) => r.status === "Active").length,
  completed: researches.filter((r) => r.status === "Completed").length,
  publications: 184,
  citations: 2_417,
  patents: 23,
  commercialized: 11,
  lguAdoption: 38,
  msmeUtilization: 64,
  impactScore: 87,
};

export const fundingTrend = [
  { year: "2020", funding: 18, projects: 9 },
  { year: "2021", funding: 24, projects: 12 },
  { year: "2022", funding: 31, projects: 16 },
  { year: "2023", funding: 42, projects: 21 },
  { year: "2024", funding: 56, projects: 28 },
  { year: "2025", funding: 71, projects: 34 },
];

export const provinceImpact = provinces.map((p, i) => ({
  province: p.replace("Surigao del ", "S. ").replace("Agusan del ", "A. "),
  research: 18 + i * 4,
  adoption: 60 + ((i * 7) % 30),
  funding: 12 + i * 3,
}));

export const sectorDist = sectors.map((s, i) => ({
  name: s,
  value: 8 + ((i * 11) % 22),
}));

export const sdgImpact = sdgs.map((s, i) => ({
  sdg: s.split("—")[0].trim(),
  score: 55 + ((i * 13) % 40),
}));

export const trlPipeline = [
  { stage: "Research", count: 42 },
  { stage: "Prototype", count: 28 },
  { stage: "Pilot Testing", count: 17 },
  { stage: "Adoption", count: 11 },
  { stage: "Commercialized", count: 6 },
];

export const challenges = [
  {
    id: "C-201",
    title: "Recurrent flooding in Agusan Marsh barangays",
    lgu: "LGU Talacogon, Agusan del Sur",
    category: "Disaster Resilience",
    votes: 184,
    proposals: 7,
    status: "Open",
    urgency: "High",
  },
  {
    id: "C-202",
    title: "Post-harvest losses for smallholder cacao farmers",
    lgu: "Surigao del Sur Agriculture Office",
    category: "Agriculture",
    votes: 142,
    proposals: 5,
    status: "In Review",
    urgency: "Medium",
  },
  {
    id: "C-203",
    title: "Limited telehealth access in Dinagat island barangays",
    lgu: "Provincial Health Office, Dinagat",
    category: "Health",
    votes: 167,
    proposals: 4,
    status: "Open",
    urgency: "High",
  },
  {
    id: "C-204",
    title: "Plastic pollution in Butuan Bay fishing grounds",
    lgu: "Butuan City ENRO",
    category: "Marine",
    votes: 121,
    proposals: 3,
    status: "Open",
    urgency: "Medium",
  },
  {
    id: "C-205",
    title: "Unstable power for upland MSMEs",
    lgu: "LGU Loreto, Dinagat Islands",
    category: "Energy",
    votes: 98,
    proposals: 6,
    status: "Matched",
    urgency: "Medium",
  },
  {
    id: "C-206",
    title: "Dengue surveillance gaps in remote sitios",
    lgu: "Surigao del Norte PHO",
    category: "Health",
    votes: 89,
    proposals: 2,
    status: "Open",
    urgency: "High",
  },
];

export const researchers = [
  {
    id: "U-01",
    name: "Dr. Maricel Bautista",
    institution: "Caraga State University",
    expertise: ["AI", "Hydrology", "Disaster"],
    hIndex: 18,
    publications: 42,
    score: 94,
  },
  {
    id: "U-02",
    name: "Engr. Rolando Lim",
    institution: "Surigao State CT",
    expertise: ["IoT", "Agriculture", "Sensors"],
    hIndex: 12,
    publications: 28,
    score: 88,
  },
  {
    id: "U-03",
    name: "Dr. Jasmine Cariño",
    institution: "FSUU",
    expertise: ["Public Health", "Telemedicine"],
    hIndex: 15,
    publications: 33,
    score: 91,
  },
  {
    id: "U-04",
    name: "Prof. Aldous Sanchez",
    institution: "Agusan del Sur State College",
    expertise: ["Marine Biology", "Aquaculture"],
    hIndex: 10,
    publications: 21,
    score: 82,
  },
  {
    id: "U-05",
    name: "Dr. Patricia Tan",
    institution: "Caraga State University",
    expertise: ["Renewable Energy", "Policy"],
    hIndex: 14,
    publications: 30,
    score: 89,
  },
  {
    id: "U-06",
    name: "Engr. Daniel Mercado",
    institution: "Surigao State CT",
    expertise: ["Robotics", "Drones", "Agriculture"],
    hIndex: 9,
    publications: 19,
    score: 85,
  },
];

export const aiInsights = [
  {
    title: "Emerging cluster: Climate-resilient aquaculture",
    detail:
      "12 new studies in the last 18 months show convergence around sensor-driven aquaculture in Surigao provinces.",
    tag: "Trend",
  },
  {
    title: "Underserved problem: Upland connectivity",
    detail:
      "Only 2 active research outputs address rural ICT access despite 9 open LGU challenges.",
    tag: "Gap",
  },
  {
    title: "High ROI: Cacao post-harvest tech",
    detail:
      "Estimated ₱4.20 of community impact per ₱1 of DOST funding based on pilot adoption rates.",
    tag: "ROI",
  },
  {
    title: "Collaboration suggestion",
    detail:
      "Dr. Bautista (CSU, hydrology) ↔ Engr. Mercado (SSCT, drones) — 92% expertise complementarity.",
    tag: "Match",
  },
];

export const activity = [
  { who: "Dr. Bautista", what: "uploaded a new dataset", when: "2m ago" },
  { who: "LGU Talacogon", what: "posted a new challenge", when: "18m ago" },
  { who: "FSUU", what: "completed a pilot in Cantilan", when: "1h ago" },
  { who: "DOST Caraga", what: "approved 4 new grants", when: "3h ago" },
  { who: "Engr. Mercado", what: "filed a utility model patent", when: "5h ago" },
];

export const impactIndex = [
  { rank: 1, name: "Caraga State University", type: "Institution", score: 94, delta: 4 },
  { rank: 2, name: "Surigao del Norte", type: "Province", score: 91, delta: 2 },
  { rank: 3, name: "Agriculture & Aquaculture", type: "Sector", score: 89, delta: 6 },
  { rank: 4, name: "FSUU", type: "Institution", score: 87, delta: 1 },
  { rank: 5, name: "Disaster Resilience", type: "Sector", score: 86, delta: 3 },
  { rank: 6, name: "Agusan del Sur", type: "Province", score: 84, delta: -1 },
  { rank: 7, name: "ICT & AI", type: "Sector", score: 82, delta: 5 },
  { rank: 8, name: "SSCT", type: "Institution", score: 80, delta: 2 },
  { rank: 9, name: "Dinagat Islands", type: "Province", score: 76, delta: 3 },
  { rank: 10, name: "Renewable Energy", type: "Sector", score: 74, delta: 0 },
];

export const formatPHP = (n: number) =>
  "₱" +
  (n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + "M"
    : n >= 1_000
      ? (n / 1_000).toFixed(0) + "K"
      : String(n));

export const club = {
  name: "RAU DEV",
  university: "Romanian-American University",
  label: "Software Engineering Club",
  description:
    "A student-led community for people curious about software engineering.",
  tagline: ["Build skills.", "Share knowledge.", "Engineer together."],
  instagram: {
    handle: "@raudev.club",
    url: "https://www.instagram.com/raudev.club/",
  },
} as const;

export type IconName = "code" | "target" | "gear" | "mic" | "spark";

export interface Activity {
  icon: IconName;
  title: string;
  description: string;
}

export const activities: Activity[] = [
  {
    icon: "code",
    title: "Coding challenges",
    description: "Solve problems and explain your approach.",
  },
  {
    icon: "target",
    title: "Mock interviews",
    description: "Practise technical and behavioural questions.",
  },
  {
    icon: "gear",
    title: "Engineering workshops",
    description: "Explore Git, testing, APIs, and more.",
  },
  {
    icon: "mic",
    title: "Guest speakers",
    description: "Hear honest stories from industry professionals.",
  },
  {
    icon: "spark",
    title: "Projects & networking",
    description: "Meet teammates and build something useful.",
  },
];

export type Tone = "mint" | "blue" | "purple" | "amber";

export interface Principle {
  title: string;
  description: string;
  tone: Tone;
}

export const principles: Principle[] = [
  {
    title: "Curiosity over ego",
    description: "Ask questions. Stay open to being wrong.",
    tone: "mint",
  },
  {
    title: "Progress over perfection",
    description: "Small steps count. Keep practising.",
    tone: "blue",
  },
  {
    title: "Collaboration over competition",
    description: "Share credit and help teammates succeed.",
    tone: "purple",
  },
  {
    title: "Respect at every level",
    description: "Make room for different backgrounds and experience.",
    tone: "amber",
  },
];

export interface Challenge {
  id: string;
  kind: string;
  title: string;
  url: string;
  xp: number;
  note?: string;
  solutionUrl?: string;
}

export const challenges: Challenge[] = [
  {
    id: "cses-1068",
    kind: "Starting challenge",
    title: "CSES · Weird Algorithm",
    url: "https://cses.fi/problemset/task/1068",
    xp: 0,
    note: "No xp :) we want to test your skills.",
    solutionUrl: "https://cses.fi/paste/f32f1ba2c3f9e940fb63c9/",
  },
  {
    id: "pbinfo-939",
    kind: "Weekly challenge",
    title: "PbInfo · sum00",
    url: "https://www.pbinfo.ro/probleme/939/sum00",
    xp: 10,
    note: "The statement is in Romanian, use Google Translate.",
  },
  {
    id: "leetcode-fizz-buzz",
    kind: "Optional challenge",
    title: "LeetCode · Fizz Buzz",
    url: "https://leetcode.com/problems/fizz-buzz/",
    xp: 25,
  },
];

/** XP awarded for showing up to a session. */
export const presenceXp = 10;

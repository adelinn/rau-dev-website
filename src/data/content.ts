export const club = {
  name: "RAU DEV",
  university: "Romanian-American University",
  city: "Bucharest",
  label: "Software Engineering Club",
  description:
    "A student-led community for people curious about software engineering.",
  tagline: ["Build Skills.", "Share Knowledge.", "Engineer Together."],
  signupUrl:
    "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Fa--e4Wf-020_9kgcQfNfchESy1MQ3pAnsE6zKK_XZBUM1hQRUM3U0pYTkowWUw5SksxQjFOTURGOC4u",
  instagram: {
    handle: "@raudev.club",
    url: "https://www.instagram.com/raudev.club/",
  },
} as const;

export type IconName =
  | "code"
  | "users"
  | "gear"
  | "mic"
  | "group"
  | "calendar"
  | "pin"
  | "form"
  | "bulb"
  | "instagram"
  | "arrow";

export type Tone = "mint" | "blue" | "amber" | "purple" | "green";

export interface Activity {
  icon: IconName;
  tone: Tone;
  title: string;
  description: string;
}

export const activities: Activity[] = [
  {
    icon: "code",
    tone: "mint",
    title: "Coding Challenges",
    description:
      "Solve problems, improve your skills, and think like an engineer.",
  },
  {
    icon: "users",
    tone: "blue",
    title: "Mock Interviews",
    description:
      "Practice technical and behavioral interviews with your peers.",
  },
  {
    icon: "gear",
    tone: "amber",
    title: "Engineering Workshops",
    description: "Learn practical tools, technologies and best practices.",
  },
  {
    icon: "mic",
    tone: "purple",
    title: "Guest Speakers",
    description: "Meet industry professionals and gain real-world insights.",
  },
  {
    icon: "group",
    tone: "green",
    title: "Community & Networking",
    description:
      "Connect with like-minded students and collaborate on projects.",
  },
];

export interface Detail {
  icon: IconName;
  tone: Tone;
  label: string;
  value: string;
  note?: string;
}

export const details: Detail[] = [
  {
    icon: "calendar",
    tone: "blue",
    label: "When?",
    value: "Fridays, 11:00 – 14:00",
  },
  {
    icon: "pin",
    tone: "mint",
    label: "Where?",
    value: "Room 515",
    note: "Romanian-American University",
  },
  {
    icon: "group",
    tone: "purple",
    label: "Who can join?",
    value: "All RAU students",
    note: "Beginners and experienced developers are welcome!",
  },
];

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

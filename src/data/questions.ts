export interface Question {
  id: number;
  text: string;
  category: 'notifications' | 'multitasking' | 'scrolling' | 'avoidance' | 'anxiety' | 'time-management';
}

export const questions: Question[] = [
  {
    id: 1,
    text: "I check my phone for notifications even when I'm in the middle of an important task.",
    category: 'notifications'
  },
  {
    id: 2,
    text: "I switch between apps or browser tabs without finishing what I started.",
    category: 'multitasking'
  },
  {
    id: 3,
    text: "I scroll through social media without a specific purpose.",
    category: 'scrolling'
  },
  {
    id: 4,
    text: "I get distracted by online content (videos, news, memes) when I should be studying or working.",
    category: 'scrolling'
  },
  {
    id: 5,
    text: "I use my phone as a way to avoid or postpone work.",
    category: 'avoidance'
  },
  {
    id: 6,
    text: "I have trouble concentrating on a single activity because of digital interruptions.",
    category: 'multitasking'
  },
  {
    id: 7,
    text: "I feel compelled to respond to messages or notifications immediately.",
    category: 'notifications'
  },
  {
    id: 8,
    text: "I find myself mindlessly browsing the internet or apps.",
    category: 'scrolling'
  },
  {
    id: 9,
    text: "I feel anxious or restless when I cannot check my phone.",
    category: 'anxiety'
  },
  {
    id: 10,
    text: "My digital habits have caused missed deadlines or reduced performance.",
    category: 'time-management'
  },
  {
    id: 11,
    text: "I lose track of time while using my phone.",
    category: 'time-management'
  },
  {
    id: 12,
    text: "I feel that my phone use interferes with my ability to focus on important tasks.",
    category: 'avoidance'
  }
];

export const answerOptions = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" }
];

export type CategoryLabel = {
  key: Question['category'];
  label: string;
  icon: string;
};

export const categoryLabels: CategoryLabel[] = [
  { key: 'notifications', label: 'Notification Dependency', icon: 'bell' },
  { key: 'multitasking', label: 'Multitasking Habits', icon: 'layers' },
  { key: 'scrolling', label: 'Mindless Scrolling', icon: 'scroll' },
  { key: 'avoidance', label: 'Digital Avoidance', icon: 'shield' },
  { key: 'anxiety', label: 'Phone Anxiety', icon: 'heart' },
  { key: 'time-management', label: 'Time Management', icon: 'clock' }
];

export interface SleepQuestion {
  id: number;
  text: string;
}

export const sleepQuestions: SleepQuestion[] = [
  {
    id: 101,
    text: "I use my phone or digital devices close to bedtime."
  },
  {
    id: 102,
    text: "I find it difficult to fall asleep after using my phone at night."
  },
  {
    id: 103,
    text: "I often stay up later than planned because of digital content."
  },
  {
    id: 104,
    text: "My sleep quality feels reduced due to screen usage."
  },
  {
    id: 105,
    text: "I feel tired or low on energy during the day."
  },
  {
    id: 106,
    text: "I lose sleep because I keep checking my phone at night."
  }
];

export const sleepAnswerOptions = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" }
];

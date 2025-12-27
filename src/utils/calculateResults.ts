import { Question, questions, categoryLabels } from "@/data/questions";

export type DistractionLevel = 'low' | 'moderate' | 'high';

export interface ResultData {
  totalScore: number;
  level: DistractionLevel;
  levelLabel: string;
  levelDescription: string;
  strengths: string[];
  weakAreas: { category: string; score: number; tip: string }[];
  improvementTips: string[];
}

const levelInfo = {
  low: {
    label: "Low Digital Distraction",
    description: "Great job! You demonstrate healthy digital habits and strong focus. Your relationship with technology appears balanced, allowing you to stay productive and present."
  },
  moderate: {
    label: "Moderate Digital Distraction",
    description: "You have a mixed relationship with digital devices. While you manage some areas well, there are opportunities to improve your focus and reduce distractions."
  },
  high: {
    label: "High Digital Distraction",
    description: "Digital distractions significantly impact your daily life. Don't worry—awareness is the first step. With intentional changes, you can regain control over your focus and time."
  }
};

const categoryTips: Record<Question['category'], string> = {
  notifications: "Try enabling 'Do Not Disturb' during focused work sessions and batch-check notifications at set intervals.",
  multitasking: "Practice single-tasking by closing unnecessary tabs and apps. Focus on one task until completion.",
  scrolling: "Set specific times for social media use and use app timers to limit mindless browsing.",
  avoidance: "When tempted to reach for your phone, pause and identify the task you're avoiding. Break it into smaller steps.",
  anxiety: "Gradually increase phone-free periods. Start with 15 minutes and build up. Keep your phone in another room during focused time.",
  'time-management': "Use time-blocking techniques and set clear boundaries for device usage during productive hours."
};

const strengthMessages = [
  "You maintain focus on important tasks",
  "You have healthy notification habits",
  "You use social media intentionally",
  "You manage your screen time effectively",
  "You stay present and avoid digital distractions"
];

export function calculateResults(answers: Record<number, number>): ResultData {
  // Calculate total score
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);

  // Determine level
  let level: DistractionLevel;
  if (totalScore <= 24) {
    level = 'low';
  } else if (totalScore <= 42) {
    level = 'moderate';
  } else {
    level = 'high';
  }

  // Calculate category scores
  const categoryScores: Record<Question['category'], { total: number; count: number }> = {
    notifications: { total: 0, count: 0 },
    multitasking: { total: 0, count: 0 },
    scrolling: { total: 0, count: 0 },
    avoidance: { total: 0, count: 0 },
    anxiety: { total: 0, count: 0 },
    'time-management': { total: 0, count: 0 }
  };

  questions.forEach((q) => {
    const answer = answers[q.id] || 0;
    categoryScores[q.category].total += answer;
    categoryScores[q.category].count += 1;
  });

  // Find weak areas (average score > 3)
  const weakAreas = Object.entries(categoryScores)
    .map(([category, data]) => ({
      category: categoryLabels.find(c => c.key === category)?.label || category,
      score: data.total / data.count,
      tip: categoryTips[category as Question['category']]
    }))
    .filter(area => area.score > 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Find strengths (average score < 2.5)
  const strengths = Object.entries(categoryScores)
    .filter(([_, data]) => data.total / data.count < 2.5)
    .map(([category]) => {
      const label = categoryLabels.find(c => c.key === category)?.label;
      return `You manage ${label?.toLowerCase()} well`;
    })
    .slice(0, 2);

  // If no strengths found based on scores, add generic ones based on level
  if (strengths.length === 0 && level !== 'high') {
    strengths.push(strengthMessages[Math.floor(Math.random() * strengthMessages.length)]);
  }

  // Generate improvement tips
  const improvementTips = weakAreas.map(area => area.tip);

  return {
    totalScore,
    level,
    levelLabel: levelInfo[level].label,
    levelDescription: levelInfo[level].description,
    strengths,
    weakAreas,
    improvementTips
  };
}

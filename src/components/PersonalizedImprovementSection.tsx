import { questions, Question } from "@/data/questions";
import { getWeakAreaByCategory, WeakAreaData } from "@/data/weakAreas";
import PersonalizedSuggestionCard from "./PersonalizedSuggestionCard";
import { Lightbulb, Target } from "lucide-react";

interface PersonalizedImprovementSectionProps {
  answers: Record<number, number>;
}

interface IdentifiedWeakArea {
  weakArea: WeakAreaData;
  severity: 4 | 5;
  maxScore: number;
}

const PersonalizedImprovementSection = ({ answers }: PersonalizedImprovementSectionProps) => {
  // Find questions with scores of 4 or 5
  const highScoreQuestions = questions.filter(q => answers[q.id] >= 4);

  // Group by category and find the highest score per category
  const categoryMaxScores: Record<Question['category'], number> = {
    notifications: 0,
    multitasking: 0,
    scrolling: 0,
    avoidance: 0,
    anxiety: 0,
    'time-management': 0
  };

  highScoreQuestions.forEach(q => {
    const score = answers[q.id];
    if (score > categoryMaxScores[q.category]) {
      categoryMaxScores[q.category] = score;
    }
  });

  // Create identified weak areas list, prioritizing score 5 over score 4
  const identifiedWeakAreas: IdentifiedWeakArea[] = Object.entries(categoryMaxScores)
    .filter(([_, score]) => score >= 4)
    .map(([category, maxScore]) => ({
      weakArea: getWeakAreaByCategory(category as Question['category'])!,
      severity: maxScore as 4 | 5,
      maxScore
    }))
    .filter(item => item.weakArea) // Filter out any undefined weak areas
    .sort((a, b) => {
      // Sort by severity (5 before 4), then by maxScore
      if (b.severity !== a.severity) return b.severity - a.severity;
      return b.maxScore - a.maxScore;
    })
    .slice(0, 2); // Only show top 2

  if (identifiedWeakAreas.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 mb-8 animate-fade-up opacity-0 stagger-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-success" />
          </div>
          <h2 className="text-xl font-semibold">Your Digital Habits</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Great news! Based on your responses, you don't have any critical areas that need immediate attention. 
          Continue maintaining your healthy digital habits and stay mindful of your screen time.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fade-up opacity-0 stagger-5">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Personalized Improvement Plan</h2>
          <p className="text-sm text-muted-foreground">
            Based on your responses, here's what to focus on first
          </p>
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="space-y-6">
        {identifiedWeakAreas.map((item, index) => (
          <PersonalizedSuggestionCard
            key={item.weakArea.key}
            weakArea={item.weakArea}
            severity={item.severity}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedImprovementSection;

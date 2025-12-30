import { SleepQuestion, sleepAnswerOptions } from "@/data/sleepQuestions";
import { cn } from "@/lib/utils";
import { Moon } from "lucide-react";

interface SleepQuestionCardProps {
  question: SleepQuestion;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswer: (questionId: number, value: number) => void;
}

const SleepQuestionCard = ({ question, questionNumber, selectedAnswer, onAnswer }: SleepQuestionCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-primary/10 transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 group">
      {/* Question number and text */}
      <div className="flex gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center font-semibold text-primary/70 group-hover:bg-primary/10 transition-colors">
          <Moon className="w-5 h-5" />
        </div>
        <p className="text-lg font-medium leading-relaxed pt-1.5">
          {question.text}
        </p>
      </div>

      {/* Answer options */}
      <div className="flex flex-wrap gap-2 md:gap-3 pl-14">
        {sleepAnswerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              "border-2 hover:-translate-y-0.5",
              selectedAnswer === option.value
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-secondary/50 text-secondary-foreground border-transparent hover:border-primary/30 hover:bg-secondary"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SleepQuestionCard;

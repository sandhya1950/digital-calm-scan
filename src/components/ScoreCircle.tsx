import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  maxScore: number;
  level: 'low' | 'moderate' | 'high';
}

const ScoreCircle = ({ score, maxScore, level }: ScoreCircleProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    low: {
      stroke: 'hsl(var(--success))',
      bg: 'hsl(var(--success) / 0.1)',
      text: 'text-success'
    },
    moderate: {
      stroke: 'hsl(var(--warning))',
      bg: 'hsl(var(--warning) / 0.1)',
      text: 'text-warning'
    },
    high: {
      stroke: 'hsl(var(--destructive))',
      bg: 'hsl(var(--destructive) / 0.1)',
      text: 'text-destructive'
    }
  };

  const colors = colorMap[level];

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="progress-circle"
          style={{
            transition: 'stroke-dashoffset 1.5s ease-out'
          }}
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl md:text-6xl font-bold ${colors.text}`}>
          {animatedScore}
        </span>
        <span className="text-muted-foreground text-sm mt-1">
          out of {maxScore}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;

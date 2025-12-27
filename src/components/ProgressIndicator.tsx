interface ProgressIndicatorProps {
  answered: number;
  total: number;
}

const ProgressIndicator = ({ answered, total }: ProgressIndicatorProps) => {
  const percentage = (answered / total) * 100;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 sticky top-20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">Progress</span>
        <span className="text-sm font-semibold">
          <span className="text-primary">{answered}</span>
          <span className="text-muted-foreground"> of {total}</span>
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full btn-gradient-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Completion message */}
      {answered === total && (
        <p className="text-sm text-success font-medium mt-3 animate-fade-in">
          ✓ All questions answered!
        </p>
      )}
    </div>
  );
};

export default ProgressIndicator;

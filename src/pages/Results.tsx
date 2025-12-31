import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { calculateResults } from "@/utils/calculateResults";
import ScoreCircle from "@/components/ScoreCircle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalizedImprovementSection from "@/components/PersonalizedImprovementSection";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Target,
  Zap,
  ArrowRight
} from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as Record<number, number> | undefined;
  const sleepAnswers = location.state?.sleepAnswers as Record<number, number> | null | undefined;
  const userInfo = location.state?.userInfo;

  // Redirect if no answers
  if (!answers) {
    return <Navigate to="/welcome" replace />;
  }

  const results = calculateResults(answers);

  const levelIllustration = {
    low: {
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20"
    },
    moderate: {
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20"
    },
    high: {
      icon: Zap,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20"
    }
  };

  const illustration = levelIllustration[results.level];
  const IllustrationIcon = illustration.icon;

  // Dynamic background based on score level
  const levelBgClasses = {
    low: "from-success/5 via-accent/5 to-success/10",
    moderate: "from-warning/5 via-amber-100/10 to-orange-100/10", 
    high: "from-destructive/5 via-red-100/10 to-orange-100/10"
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${levelBgClasses[results.level]}`}>
      {/* Dynamic background decorations based on score */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-20 -left-32 w-96 h-96 rounded-full blur-3xl animate-float ${
          results.level === 'low' ? 'bg-success/10' : 
          results.level === 'moderate' ? 'bg-warning/10' : 
          'bg-destructive/10'
        }`} />
        <div className={`absolute bottom-40 -right-32 w-80 h-80 rounded-full blur-3xl animate-float ${
          results.level === 'low' ? 'bg-accent/10' : 
          results.level === 'moderate' ? 'bg-amber-200/10' : 
          'bg-red-200/10'
        }`} style={{ animationDelay: '3s' }} />
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl ${
          results.level === 'low' ? 'bg-success/5' : 
          results.level === 'moderate' ? 'bg-warning/5' : 
          'bg-destructive/5'
        }`} />
        {/* Additional decorative shapes */}
        <div className="absolute top-1/2 left-10 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-accent/10 rounded-full" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container px-4">
          {/* Results header */}
          <div className="max-w-4xl mx-auto">
            {/* Score section */}
            <div className="text-center mb-12 animate-fade-up opacity-0 stagger-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Your Results
              </h1>
              <p className="text-muted-foreground">
                Based on your responses, here's your digital distraction profile
              </p>
            </div>

            {/* Main score card */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated border border-border/50 mb-8 animate-fade-up opacity-0 stagger-2 transition-all duration-500 hover:shadow-glow-primary">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Score circle */}
                <div className="flex-shrink-0">
                  <ScoreCircle 
                    score={results.totalScore} 
                    maxScore={60} 
                    level={results.level} 
                  />
                </div>

                {/* Level info */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${illustration.bgColor} ${illustration.borderColor} border mb-4 animate-scale-in`} style={{ animationDelay: '0.5s' }}>
                    <IllustrationIcon className={`w-5 h-5 ${illustration.color}`} />
                    <span className={`font-semibold ${illustration.color}`}>
                      {results.levelLabel}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {results.levelDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Insights grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              {results.strengths.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-fade-up opacity-0 stagger-3 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <h2 className="text-xl font-semibold">Your Strengths</h2>
                  </div>
                  <ul className="space-y-3">
                    {results.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weak areas */}
              {results.weakAreas.length > 0 && (
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 animate-fade-up opacity-0 stagger-4 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-warning" />
                    </div>
                    <h2 className="text-xl font-semibold">Areas to Improve</h2>
                  </div>
                  <ul className="space-y-3">
                    {results.weakAreas.map((area, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{area.category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Personalized Improvement Section */}
            <PersonalizedImprovementSection answers={answers} />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/quiz')}
                className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Retake Assessment
              </Button>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/improvement', { state: { answers, sleepAnswers, userInfo } });
                }}
                className="w-full sm:w-auto transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="w-5 h-5" />
                Start Improving
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;

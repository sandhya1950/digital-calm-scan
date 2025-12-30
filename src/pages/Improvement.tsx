import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { calculateResults } from "@/utils/calculateResults";
import { questions } from "@/data/questions";
import { weakAreasData } from "@/data/weakAreas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Target,
  Sparkles,
  ExternalLink,
  Play,
  Clock,
  Bell,
  ScrollText,
  ShieldOff,
  Heart,
  Layers,
  Moon,
  CheckCircle2,
  Lightbulb,
  TrendingUp
} from "lucide-react";

const categoryIcons: Record<string, typeof Clock> = {
  'time-management': Clock,
  'notifications': Bell,
  'scrolling': ScrollText,
  'avoidance': ShieldOff,
  'anxiety': Heart,
  'multitasking': Layers
};

const Improvement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as Record<number, number> | undefined;
  const sleepAnswers = location.state?.sleepAnswers as Record<number, number> | null | undefined;

  if (!answers) {
    return <Navigate to="/quiz" replace />;
  }

  const results = calculateResults(answers);

  // Get top 2 priority areas (highest severity)
  const criticalAnswers = Object.entries(answers)
    .filter(([_, value]) => value >= 4)
    .map(([questionId, value]) => {
      const question = questions.find(q => q.id === Number(questionId));
      return { questionId: Number(questionId), value, category: question?.category };
    })
    .sort((a, b) => b.value - a.value);

  // Group by category and get top 2
  const categoryScores: Record<string, { totalScore: number; maxScore: number; count: number }> = {};
  criticalAnswers.forEach(({ category, value }) => {
    if (category) {
      if (!categoryScores[category]) {
        categoryScores[category] = { totalScore: 0, maxScore: 0, count: 0 };
      }
      categoryScores[category].totalScore += value;
      categoryScores[category].maxScore += 5;
      categoryScores[category].count += 1;
    }
  });

  const priorityAreas = Object.entries(categoryScores)
    .filter(([_, scores]) => scores.count > 0)
    .sort((a, b) => b[1].totalScore - a[1].totalScore)
    .slice(0, 2)
    .map(([category]) => category);

  // Calculate sleep impact
  const hasSleepData = sleepAnswers && Object.keys(sleepAnswers).length > 0;
  const sleepScore = hasSleepData 
    ? Object.values(sleepAnswers).reduce((sum, val) => sum + val, 0) 
    : 0;
  const sleepImpactLevel = hasSleepData
    ? sleepScore <= 12 ? 'low' : sleepScore <= 20 ? 'moderate' : 'high'
    : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-success/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <button 
              onClick={() => navigate('/results', { state: { answers, sleepAnswers } })}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-up opacity-0 stagger-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Results</span>
            </button>

            {/* Header section */}
            <div className="text-center mb-12 animate-fade-up opacity-0 stagger-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Personalized for you</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Focus Improvement Plan
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Based on your assessment, we've identified key areas where small changes can make a big difference 
                in your digital well-being and focus.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 shadow-elevated border border-border/50 mb-8 animate-fade-up opacity-0 stagger-3">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Distraction Profile</h2>
                  <p className="text-muted-foreground">
                    {results.level === 'low' && "You have good digital habits, with minor areas for optimization."}
                    {results.level === 'moderate' && "You show some patterns that could benefit from mindful adjustments."}
                    {results.level === 'high' && "Digital distractions are significantly impacting your focus. Let's work on this together."}
                  </p>
                </div>
              </div>
              
              {priorityAreas.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {priorityAreas.map(category => {
                    const Icon = categoryIcons[category] || Target;
                    const areaData = weakAreasData[category as keyof typeof weakAreasData];
                    return (
                      <div key={category} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
                        <Icon className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium text-warning">{areaData?.title || category}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Priority Focus Areas */}
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-semibold animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
                Priority Focus Areas
              </h2>

              {priorityAreas.length > 0 ? (
                priorityAreas.map((category, index) => {
                  const areaData = weakAreasData[category as keyof typeof weakAreasData];
                  const Icon = categoryIcons[category] || Target;
                  
                  if (!areaData) return null;

                  return (
                    <div 
                      key={category}
                      className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 animate-fade-up opacity-0 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{areaData.title}</h3>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                              Priority
                            </span>
                          </div>
                          <p className="text-muted-foreground">{areaData.description}</p>
                        </div>
                      </div>

                      {/* Why this matters */}
                      <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">Why This Matters</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{areaData.whyItMatters}</p>
                      </div>

                      {/* What you can do today */}
                      <div className="bg-success/5 rounded-xl p-4 mb-4 border border-success/10">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="font-medium text-sm">What You Can Do Today</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{areaData.quickAction}</p>
                      </div>

                      {/* Resources */}
                      <div className="flex flex-wrap gap-3">
                        {areaData.youtubeLink && (
                          <a 
                            href={areaData.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
                          >
                            <Play className="w-4 h-4" />
                            Watch Video
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {areaData.articleLink && (
                          <a 
                            href={areaData.articleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                          >
                            Read Article
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {areaData.toolLink && (
                          <a 
                            href={areaData.toolLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
                          >
                            {areaData.toolName}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border/50 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Great Digital Habits!</h3>
                  <p className="text-muted-foreground">
                    Your responses don't indicate any critical areas of concern. Keep up the good work maintaining healthy digital habits!
                  </p>
                </div>
              )}
            </div>

            {/* Sleep Impact Section */}
            {hasSleepData && sleepImpactLevel && (
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.7s' }}>
                <h2 className="text-2xl font-semibold mb-6">Sleep & Digital Impact</h2>
                <div className={`bg-card rounded-2xl p-6 md:p-8 shadow-card border ${
                  sleepImpactLevel === 'high' ? 'border-destructive/20' : 
                  sleepImpactLevel === 'moderate' ? 'border-warning/20' : 
                  'border-success/20'
                }`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      sleepImpactLevel === 'high' ? 'bg-destructive/10' : 
                      sleepImpactLevel === 'moderate' ? 'bg-warning/10' : 
                      'bg-success/10'
                    }`}>
                      <Moon className={`w-6 h-6 ${
                        sleepImpactLevel === 'high' ? 'text-destructive' : 
                        sleepImpactLevel === 'moderate' ? 'text-warning' : 
                        'text-success'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {sleepImpactLevel === 'high' && "Significant Sleep Impact Detected"}
                        {sleepImpactLevel === 'moderate' && "Moderate Sleep Impact"}
                        {sleepImpactLevel === 'low' && "Healthy Sleep Habits"}
                      </h3>
                      <p className="text-muted-foreground">
                        {sleepImpactLevel === 'high' && "Your digital habits appear to be significantly affecting your sleep quality. This can impact your energy, focus, and overall well-being."}
                        {sleepImpactLevel === 'moderate' && "Some of your digital habits may be affecting your sleep. Small adjustments could help improve your rest quality."}
                        {sleepImpactLevel === 'low' && "Your digital habits don't seem to significantly impact your sleep. Keep maintaining these healthy boundaries!"}
                      </p>
                    </div>
                  </div>

                  {sleepImpactLevel !== 'low' && (
                    <div className="bg-secondary/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">Gentle Suggestions</span>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Set a "digital sunset" 1 hour before bed
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Keep your phone outside the bedroom
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Use night mode or blue light filters after sunset
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Replace late-night scrolling with reading or journaling
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-up opacity-0" style={{ animationDelay: '0.8s' }}>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/quiz')}
              >
                Retake Assessment
              </Button>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/')}
              >
                <Sparkles className="w-5 h-5" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Improvement;

import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { calculateResults } from "@/utils/calculateResults";
import { questions } from "@/data/questions";
import { weakAreasData } from "@/data/weakAreas";
import { UserInfo } from "@/types/userInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  TrendingUp,
  Focus,
  TreePine,
  Timer,
  Smartphone,
  Shield
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from "recharts";

const categoryIcons: Record<string, typeof Clock> = {
  'time-management': Clock,
  'notifications': Bell,
  'scrolling': ScrollText,
  'avoidance': ShieldOff,
  'anxiety': Heart,
  'multitasking': Layers
};

const categoryLabels: Record<string, string> = {
  'time-management': 'Time Management',
  'notifications': 'Notification Control',
  'scrolling': 'Mindful Browsing',
  'avoidance': 'Task Engagement',
  'anxiety': 'Digital Balance',
  'multitasking': 'Single-Tasking'
};

const appRecommendations = [
  {
    name: "Forest",
    description: "Stay focused by growing virtual trees",
    icon: TreePine,
    url: "https://www.forestapp.cc/",
    color: "text-success"
  },
  {
    name: "Freedom",
    description: "Block distracting websites and apps",
    icon: Shield,
    url: "https://freedom.to/",
    color: "text-primary"
  },
  {
    name: "Pomodoro Timer",
    description: "Work in focused 25-minute intervals",
    icon: Timer,
    url: "https://pomofocus.io/",
    color: "text-destructive"
  },
  {
    name: "Screen Time",
    description: "Built-in iOS/Android usage tracking",
    icon: Smartphone,
    url: "https://support.apple.com/en-us/HT208982",
    color: "text-warning"
  }
];

const Improvement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers as Record<number, number> | undefined;
  const sleepAnswers = location.state?.sleepAnswers as Record<number, number> | null | undefined;
  const userInfo = location.state?.userInfo as UserInfo | undefined;
  const [activeTab, setActiveTab] = useState("focus");

  if (!answers) {
    return <Navigate to="/welcome" replace />;
  }

  const results = calculateResults(answers);

  // Calculate category scores for radar chart
  const categoryScores: Record<string, { total: number; max: number; count: number }> = {};
  questions.forEach(q => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { total: 0, max: 0, count: 0 };
    }
    categoryScores[q.category].total += answers[q.id] || 0;
    categoryScores[q.category].max += 5;
    categoryScores[q.category].count += 1;
  });

  // Radar chart data - inverted to show strength (lower distraction = higher score)
  const radarData = Object.entries(categoryScores).map(([category, scores]) => ({
    category: categoryLabels[category] || category,
    value: Math.round(((scores.max - scores.total) / scores.max) * 100),
    fullMark: 100
  }));

  // Get top 2 priority areas (highest severity)
  const criticalAnswers = Object.entries(answers)
    .filter(([_, value]) => value >= 4)
    .map(([questionId, value]) => {
      const question = questions.find(q => q.id === Number(questionId));
      return { questionId: Number(questionId), value, category: question?.category };
    })
    .sort((a, b) => b.value - a.value);

  const categoryMaxScores: Record<string, { totalScore: number; maxScore: number; count: number }> = {};
  criticalAnswers.forEach(({ category, value }) => {
    if (category) {
      if (!categoryMaxScores[category]) {
        categoryMaxScores[category] = { totalScore: 0, maxScore: 0, count: 0 };
      }
      categoryMaxScores[category].totalScore += value;
      categoryMaxScores[category].maxScore += 5;
      categoryMaxScores[category].count += 1;
    }
  });

  const priorityAreas = Object.entries(categoryMaxScores)
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

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Colorful gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/10 pointer-events-none" />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-accent/15 to-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-gradient-to-tr from-primary/10 to-success/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-bl from-success/10 to-accent/5 rounded-full blur-3xl" />

        {/* Motivational abstract shapes */}
        <div className="absolute top-20 left-[20%] w-20 h-20 border border-success/15 rounded-full" />
        <div className="absolute bottom-32 right-[15%] w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute top-1/3 left-10 w-16 h-16 border border-accent/10 rounded-full" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate('/results', { state: { answers, sleepAnswers, userInfo } })}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-up opacity-0 stagger-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Results</span>
            </button>

            {/* Header section */}
            <div className="text-center mb-12 animate-fade-up opacity-0 stagger-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {userInfo?.name ? `Personalized for ${userInfo.name}` : 'Personalized for you'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Focus Improvement Plan
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Based on your assessment, we've identified key areas where small changes can make a big difference
                in your digital well-being and focus.
              </p>
            </div>

            {/* Radar Chart Section */}
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-elevated border border-border/50 mb-8 animate-fade-up opacity-0 stagger-3">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Distraction Pattern</h2>
                  <p className="text-muted-foreground text-sm">
                    Higher values indicate stronger habits in that area
                  </p>
                </div>
              </div>

              <div className="h-72 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                      name="Focus Strength"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Progress Bars */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {Object.entries(categoryScores).map(([category, scores]) => {
                  const Icon = categoryIcons[category] || Target;
                  const percentage = Math.round(((scores.max - scores.total) / scores.max) * 100);
                  const isWeak = scores.total / scores.count >= 4;

                  return (
                    <div key={category} className="bg-secondary/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isWeak ? 'text-warning' : 'text-primary'}`} />
                          <span className="text-sm font-medium">{categoryLabels[category]}</span>
                        </div>
                        <span className={`text-sm font-semibold ${isWeak ? 'text-warning' : 'text-success'}`}>
                          {percentage}%
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-2 ${isWeak ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabbed Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="focus" className="flex items-center gap-2">
                  <Focus className="w-4 h-4" />
                  <span className="hidden sm:inline">Focus</span>
                </TabsTrigger>
                <TabsTrigger value="sleep" className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sleep</span>
                </TabsTrigger>
                <TabsTrigger value="habits" className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Habits</span>
                </TabsTrigger>
              </TabsList>

              {/* Focus Tab */}
              <TabsContent value="focus" className="space-y-6">
                <h2 className="text-2xl font-semibold">Priority Focus Areas</h2>

                {priorityAreas.length > 0 ? (
                  priorityAreas.map((category, index) => {
                    const areaData = weakAreasData[category as keyof typeof weakAreasData];
                    const Icon = categoryIcons[category] || Target;

                    if (!areaData) return null;

                    return (
                      <div
                        key={category}
                        className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
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
                  <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border/50">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Great Digital Habits!</h3>
                    <p className="text-muted-foreground">
                      Your responses don't indicate any critical areas of concern. Keep up the good work maintaining healthy digital habits!
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Sleep Tab */}
              <TabsContent value="sleep" className="space-y-6">
                <h2 className="text-2xl font-semibold">Sleep & Digital Impact</h2>

                {hasSleepData && sleepImpactLevel ? (
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
                ) : (
                  <div className="bg-card rounded-2xl p-8 text-center shadow-card border border-border/50">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Moon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Sleep Data Available</h3>
                    <p className="text-muted-foreground">
                      You skipped the optional sleep section. Retake the assessment to get insights on how your digital habits may affect your sleep.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Habits Tab - App Recommendations */}
              <TabsContent value="habits" className="space-y-6">
                <h2 className="text-2xl font-semibold">Recommended Tools & Apps</h2>
                <p className="text-muted-foreground">
                  These apps can help you build better digital habits and improve focus.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {appRecommendations.map((app) => {
                    const Icon = app.icon;
                    return (
                      <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card rounded-2xl p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className={`w-6 h-6 ${app.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{app.name}</h3>
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">{app.description}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Action Checklist */}
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold">Quick Action Checklist</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Turn off non-essential notifications",
                      "Set daily screen time limits",
                      "Create a phone-free zone at bedtime",
                      "Use grayscale mode during work hours",
                      "Schedule specific times to check social media",
                      "Enable Do Not Disturb during focus time"
                    ].map((action, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                      >
                        <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                        <span className="text-sm">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Privacy Note */}
            <div className="bg-secondary/30 rounded-xl p-4 flex items-start gap-3 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                This assessment does not collect names, emails, or contact details. All responses are stored anonymously for analysis and improvement.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: '0.7s' }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/welcome')}
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

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 py-16 md:py-24">
        {/* Badge */}
        <div className="animate-fade-up opacity-0 stagger-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border/50 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Science-informed assessment</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up opacity-0 stagger-2 text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight tracking-tight">
          Measure Your{" "}
          <span className="text-primary relative">
            Digital Distraction
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8C50 4 150 2 298 8" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" className="opacity-50" />
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-up opacity-0 stagger-3 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mt-6 leading-relaxed">
          A short, science-informed assessment to help you understand how digital habits 
          affect your focus, productivity, and well-being.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up opacity-0 stagger-4 mt-10">
          <Link to="/quiz">
            <Button variant="hero" size="xl" className="group">
              Take the Quiz
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Stats or trust indicators */}
        <div className="animate-fade-up opacity-0 stagger-5 flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>12 questions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>3 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span>Instant results</span>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="animate-fade-up opacity-0 mt-16 relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Central brain/focus icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-card shadow-elevated flex items-center justify-center animate-bounce-subtle">
                <Brain className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              </div>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

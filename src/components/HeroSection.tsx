import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Network, Cpu, Wifi, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Colorful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      
      {/* Abstract tech-oriented decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-accent/10 to-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
        
        {/* Circuit/network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h80v80H10z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="90" cy="10" r="2" fill="currentColor" />
              <circle cx="10" cy="90" r="2" fill="currentColor" />
              <circle cx="90" cy="90" r="2" fill="currentColor" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <path d="M50 10v40M10 50h40M50 90V50M90 50H50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
        
        {/* Floating network nodes */}
        <div className="absolute top-32 left-[15%] w-3 h-3 bg-primary/30 rounded-full animate-pulse-soft" />
        <div className="absolute top-40 right-[20%] w-2 h-2 bg-accent/40 rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-[25%] w-2 h-2 bg-primary/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-48 right-[30%] w-3 h-3 bg-accent/30 rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        
        {/* Connection lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="20%" x2="30%" y2="35%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="70%" y1="25%" x2="85%" y2="40%" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20%" y1="70%" x2="40%" y2="55%" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
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
          <Link to="/welcome">
            <Button variant="hero" size="xl" className="group">
              Start the Questionnaire
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

        {/* Tech-oriented hero illustration */}
        <div className="animate-fade-up opacity-0 mt-16 relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Central network/tech hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin" style={{ animationDuration: '30s' }} />
                {/* Middle ring */}
                <div className="absolute inset-2 rounded-full border border-accent/30" />
                {/* Inner circle */}
                <div className="absolute inset-4 rounded-full bg-card shadow-elevated flex items-center justify-center animate-bounce-subtle">
                  <div className="relative">
                    <Network className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Orbiting tech elements */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-card shadow-soft flex items-center justify-center border border-border/50">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-card shadow-soft flex items-center justify-center border border-border/50">
                <Wifi className="w-4 h-4 text-accent" />
              </div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 rounded-lg bg-card shadow-soft flex items-center justify-center border border-border/50">
                <Zap className="w-4 h-4 text-warning" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

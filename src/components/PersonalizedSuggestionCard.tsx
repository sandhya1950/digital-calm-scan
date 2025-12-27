import { WeakAreaData } from "@/data/weakAreas";
import { 
  Clock, 
  Bell, 
  ScrollText, 
  Brain, 
  AlertTriangle, 
  Timer,
  ExternalLink,
  Play,
  FileText,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PersonalizedSuggestionCardProps {
  weakArea: WeakAreaData;
  severity: 4 | 5;
  index: number;
}

const iconMap = {
  clock: Clock,
  bell: Bell,
  scroll: ScrollText,
  brain: Brain,
  'alert-triangle': AlertTriangle,
  timer: Timer
};

const PersonalizedSuggestionCard = ({ weakArea, severity, index }: PersonalizedSuggestionCardProps) => {
  const Icon = iconMap[weakArea.icon];
  const isPriority = severity === 5;

  return (
    <div 
      className={`
        relative bg-card rounded-2xl border overflow-hidden
        animate-fade-up opacity-0
        ${isPriority ? 'border-destructive/30 shadow-lg' : 'border-border/50 shadow-card'}
      `}
      style={{ animationDelay: `${0.3 + index * 0.15}s` }}
    >
      {/* Priority Badge */}
      {isPriority && (
        <div className="absolute top-4 right-4">
          <Badge variant="destructive" className="text-xs font-medium">
            <Sparkles className="w-3 h-3 mr-1" />
            Priority Focus Area
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
            ${isPriority ? 'bg-destructive/10' : 'bg-primary/10'}
          `}>
            <Icon className={`w-6 h-6 ${isPriority ? 'text-destructive' : 'text-primary'}`} />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-semibold mb-1">{weakArea.title}</h3>
            <p className={`text-sm font-medium ${isPriority ? 'text-destructive' : 'text-warning'}`}>
              {isPriority ? 'This is a priority area for improvement' : 'This is an area worth improving'}
            </p>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="px-6 pb-4">
        <div className="bg-secondary/50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Why This Matters</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {weakArea.whyMatters}
          </p>
        </div>
      </div>

      {/* Quick Action */}
      <div className="px-6 pb-4">
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-success" />
            </div>
            <h4 className="text-sm font-semibold text-success">Quick Action</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {weakArea.quickAction}
          </p>
        </div>
      </div>

      {/* Resources */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Learn More */}
          <a
            href={weakArea.resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-auto py-3 px-4"
            >
              {weakArea.resource.type === 'youtube' ? (
                <Play className="w-4 h-4 text-destructive flex-shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <div className="text-left">
                <span className="text-xs text-muted-foreground block">Learn More</span>
                <span className="text-sm font-medium line-clamp-1">{weakArea.resource.title}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-muted-foreground flex-shrink-0" />
            </Button>
          </a>

          {/* Helpful Tool */}
          <a
            href={weakArea.tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 h-auto py-3 px-4"
            >
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
              <div className="text-left">
                <span className="text-xs text-muted-foreground block">Helpful Tool</span>
                <span className="text-sm font-medium">{weakArea.tool.name}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-muted-foreground flex-shrink-0" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedSuggestionCard;

import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg hidden sm:block">Digital Balance</span>
          </Link>

          {/* CTA */}
          <Link to="/quiz">
            <Button variant="default" size="sm">
              Take the Quiz
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

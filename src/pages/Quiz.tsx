import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import ProgressIndicator from "@/components/ProgressIndicator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showError, setShowError] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowError(false);
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const handleSubmit = () => {
    if (!allAnswered) {
      setShowError(true);
      // Scroll to first unanswered question
      const unansweredQuestion = questions.find((q) => !answers[q.id]);
      if (unansweredQuestion) {
        const element = document.getElementById(`question-${unansweredQuestion.id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Navigate to results with answers
    navigate('/results', { state: { answers } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container px-4">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up opacity-0 stagger-1">
              Digital Distraction Assessment
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-up opacity-0 stagger-2">
              Answer each question honestly based on your typical behavior over the past month.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_280px] gap-8">
              {/* Questions column */}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    id={`question-${question.id}`}
                    className="animate-fade-up opacity-0"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <QuestionCard
                      question={question}
                      questionNumber={index + 1}
                      selectedAnswer={answers[question.id] || null}
                      onAnswer={handleAnswer}
                    />
                  </div>
                ))}

                {/* Error message */}
                {showError && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive animate-fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Please answer all questions before submitting.
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-6">
                  <Button 
                    variant={allAnswered ? "hero" : "outline"} 
                    size="lg" 
                    onClick={handleSubmit}
                    className="w-full sm:w-auto"
                  >
                    View My Results
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Progress sidebar */}
              <div className="hidden lg:block">
                <ProgressIndicator answered={answeredCount} total={questions.length} />
              </div>
            </div>

            {/* Mobile progress */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{answeredCount}/{questions.length}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full btn-gradient-primary rounded-full transition-all duration-300"
                      style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
                <Button 
                  variant={allAnswered ? "hero" : "default"} 
                  size="default"
                  onClick={handleSubmit}
                  disabled={!allAnswered && !showError}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
};

export default Quiz;

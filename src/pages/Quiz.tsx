import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import { sleepQuestions } from "@/data/sleepQuestions";
import QuestionCard from "@/components/QuestionCard";
import SleepQuestionCard from "@/components/SleepQuestionCard";
import ProgressIndicator from "@/components/ProgressIndicator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Moon, SkipForward } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sleepAnswers, setSleepAnswers] = useState<Record<number, number>>({});
  const [showError, setShowError] = useState(false);
  const [showSleepSection, setShowSleepSection] = useState(false);
  const [sleepSkipped, setSleepSkipped] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowError(false);
  };

  const handleSleepAnswer = (questionId: number, value: number) => {
    setSleepAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const sleepAnsweredCount = Object.keys(sleepAnswers).length;
  const allAnswered = answeredCount === questions.length;
  const allSleepAnswered = sleepAnsweredCount === sleepQuestions.length;

  const totalQuestions = questions.length + (showSleepSection && !sleepSkipped ? sleepQuestions.length : 0);
  const totalAnswered = answeredCount + (showSleepSection && !sleepSkipped ? sleepAnsweredCount : 0);

  const handleContinueToSleep = () => {
    if (!allAnswered) {
      setShowError(true);
      const unansweredQuestion = questions.find((q) => !answers[q.id]);
      if (unansweredQuestion) {
        const element = document.getElementById(`question-${unansweredQuestion.id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setShowSleepSection(true);
    setTimeout(() => {
      const sleepSection = document.getElementById('sleep-section');
      sleepSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSkipSleep = () => {
    setSleepSkipped(true);
    navigate('/results', { state: { answers, sleepAnswers: null } });
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      setShowError(true);
      const unansweredQuestion = questions.find((q) => !answers[q.id]);
      if (unansweredQuestion) {
        const element = document.getElementById(`question-${unansweredQuestion.id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (showSleepSection && !sleepSkipped) {
      navigate('/results', { state: { answers, sleepAnswers: allSleepAnswered ? sleepAnswers : null } });
    } else {
      navigate('/results', { state: { answers, sleepAnswers: null } });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Colorful gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 pointer-events-none" />
      
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 -right-32 w-80 h-80 bg-gradient-to-tl from-accent/10 to-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/5 to-success/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-success/5 to-accent/5 rounded-full blur-3xl" />
        
        {/* Decorative circles */}
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary/10 rounded-full" />
        <div className="absolute bottom-60 left-16 w-16 h-16 border border-accent/10 rounded-full" />
      </div>

      <Header />
      
      <main className="relative z-10 pt-24 pb-32 lg:pb-20">
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
                    className="animate-fade-up opacity-0 transform transition-all duration-300 hover:scale-[1.01]"
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
                      Please answer all questions before continuing.
                    </p>
                  </div>
                )}

                {/* Continue to Sleep Section or Submit */}
                {!showSleepSection && (
                  <div className="pt-6">
                    <Button 
                      variant={allAnswered ? "hero" : "outline"} 
                      size="lg" 
                      onClick={handleContinueToSleep}
                      className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Sleep Section */}
                {showSleepSection && !sleepSkipped && (
                  <div id="sleep-section" className="pt-8 animate-fade-up">
                    {/* Section divider */}
                    <div className="relative py-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-background px-4 flex items-center gap-2">
                          <Moon className="w-5 h-5 text-primary/70" />
                          <span className="text-sm font-medium text-muted-foreground">Optional Section</span>
                        </div>
                      </div>
                    </div>

                    {/* Sleep section header */}
                    <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/10 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Moon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold mb-2">Optional: Sleep & Digital Impact</h2>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            These optional questions help understand whether digital habits may be affecting your sleep. 
                            You can skip this section if you wish.
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleSkipSleep}
                            className="mt-3 text-muted-foreground hover:text-foreground"
                          >
                            <SkipForward className="w-4 h-4 mr-2" />
                            Skip this section
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Sleep questions */}
                    <div className="space-y-4">
                      {sleepQuestions.map((question, index) => (
                        <div 
                          key={question.id}
                          className="animate-fade-up opacity-0 transform transition-all duration-300 hover:scale-[1.01]"
                          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                        >
                          <SleepQuestionCard
                            question={question}
                            questionNumber={index + 1}
                            selectedAnswer={sleepAnswers[question.id] || null}
                            onAnswer={handleSleepAnswer}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Submit button */}
                    <div className="pt-6 flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleSkipSleep}
                        className="w-full sm:w-auto"
                      >
                        <SkipForward className="w-5 h-5" />
                        Skip & View Results
                      </Button>
                      <Button 
                        variant="hero" 
                        size="lg" 
                        onClick={handleSubmit}
                        className="w-full sm:w-auto transition-all duration-300 hover:scale-105"
                      >
                        View My Results
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress sidebar */}
              <div className="hidden lg:block">
                <ProgressIndicator 
                  answered={totalAnswered} 
                  total={totalQuestions} 
                />
              </div>
            </div>

            {/* Mobile progress */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-50">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{totalAnswered}/{totalQuestions}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full btn-gradient-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
                {!showSleepSection ? (
                  <Button 
                    variant={allAnswered ? "hero" : "default"} 
                    size="default"
                    onClick={handleContinueToSleep}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    variant="hero" 
                    size="default"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden lg:block relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Quiz;

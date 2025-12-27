import { Brain, BarChart3, Target } from "lucide-react";

const faqs = [
  {
    icon: Brain,
    question: "Why should I take this test?",
    answer: "Everyday digital habits can quietly affect your attention, productivity, and mental clarity. This assessment helps you uncover patterns you might not notice, giving you a clearer picture of how technology influences your daily focus and well-being."
  },
  {
    icon: BarChart3,
    question: "What does this test measure?",
    answer: "The assessment evaluates real digital behaviors like compulsive phone checking, multitasking habits, mindless scrolling, and how notifications impact your concentration. Each question is designed to reveal specific patterns in your digital life."
  },
  {
    icon: Target,
    question: "How will the results help me?",
    answer: "You'll receive personalized, actionable insights based on your responses. These include your strengths, areas for improvement, and practical tips to enhance your focus and establish a healthier digital balance in your daily routine."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know before taking the assessment
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                <faq.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Question */}
              <h3 className="text-xl font-semibold mb-4 leading-snug">
                {faq.question}
              </h3>

              {/* Answer */}
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

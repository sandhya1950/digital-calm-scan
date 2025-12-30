import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Global colorful background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

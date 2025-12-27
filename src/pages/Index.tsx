import HeroSection from "@/components/HeroSection";
import FAQSection from "@/components/FAQSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

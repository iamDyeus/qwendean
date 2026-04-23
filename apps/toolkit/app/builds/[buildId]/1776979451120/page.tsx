import { Navbar as Navbar } from "./components/navbar";
import { Hero as HeroSection } from "./components/hero-section";
import { Features as Features } from "./components/features";
import { Component as CtaSection } from "./components/cta-section";
import { Footer as Footer } from "./components/footer";

const LandingPage = () => (
  <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <Features />
      <CtaSection />
      <Footer />
  </div>
);

export default LandingPage;

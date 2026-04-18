import { Hero } from "./components/hero-section";
import { Feature } from "./components/features-section";
import { Contact } from "./components/contact-section";

const LandingPage = () => (
  <div className="min-h-screen">
      <Hero />
      <Feature />
      <Contact />
  </div>
);

export default LandingPage;

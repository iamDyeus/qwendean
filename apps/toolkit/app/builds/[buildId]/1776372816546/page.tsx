import  Component  from "./components/hero-section";
// import { Feature as ServiceFeatures } from "./components/service-features";
// import { Feature as BenefitsSection } from "./components/benefits-section";
import { Process } from "./components/repair-process";
import { Testimonial } from "./components/testimonials";
import Gallery  from "./components/workshop-gallery";
import { Contact } from "./components/contact-form";
import About from "./components/about-team";
import Stats from "./components/workshop-stats";
import { Faq } from "./components/faq-section";
import { Footer } from "./components/footer";

const LandingPage = () => {
    return (
        <div className="min-h-screen mx-auto my-auto max-w-9/12">
        <Component />
        {/* <ServiceFeatures />
        <BenefitsSection /> */}
        <Process />
        <Testimonial />
        <Gallery />
        <Contact />
        <About />
        <Stats />
        <Faq />
        <Footer />
        </div>
    );
};

export default LandingPage;

import { Hero } from "./components/hero-section";
import { Gallery } from "./components/product-gallery";
import { Feature } from "./components/benefits-section";
import { Component514 } from "./components/process-section";
import { Testimonial } from "./components/testimonial-section";
import { About } from "./components/about-section";
import { Cta } from "./components/primary-cta";
import { Faq } from "./components/faq-section";
import { Contact } from "./components/contact-section";
import { Footer } from "./components/footer-section";

const LandingPage = () => {
    return (
        <div className="min-h-screen mx-auto my-auto max-w-9/12">
        <Hero />
        <Gallery />
        <Feature />
        <Component514 />
        <Testimonial />
        <About />
        <Cta />
        <Faq />
        <Contact />
        <Footer />
        </div>
    );
};

export default LandingPage;

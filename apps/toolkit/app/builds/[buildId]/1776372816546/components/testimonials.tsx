"use client";

import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "The support team was incredibly helpful. They provided quick answers and resolved my issues within hours.",
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      attribution: "Customer Support Experience",
    },
    {
      quote:
        "The platform made it easy to find and apply for jobs. The search filters were a lifesaver.",
      name: "Mike Chen",
      location: "Singapore",
      attribution: "Job Search Experience",
    },
    {
      quote:
        "The onboarding process was smooth and comprehensive. I felt supported every step of the way.",
      name: "Emily Davis",
      location: "London, UK",
      attribution: "Onboarding Experience",
    },
    {
      quote:
        "The platform made it easy to find and apply for jobs. The search filters were a lifesaver.",
      name: "Mike Chen",
      location: "Singapore",
      attribution: "Job Search Experience",
    },
    {
      quote:
        "The support team was incredibly helpful. They provided quick answers and resolved my issues within hours.",
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      attribution: "Customer Support Experience",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-center text-3xl font-bold md:text-4xl">
                      {testimonial.quote}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">Sarah Johnson</span>
                        <span className="text-muted-foreground text-lg">
                          San Francisco, CA
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 md:w-6" />
                        ))}
                        <span className="text-muted-foreground text-lg">
                          5.0
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-lg">
                      {testimonial.attribution}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Testimonial };
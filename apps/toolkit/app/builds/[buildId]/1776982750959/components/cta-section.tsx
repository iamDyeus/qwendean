"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

function CtaSection() {
  const benefits = [
    "30-day free trial",
    "No credit card required",
    "Full feature access",
  ];

  return (
    <section id="cta" className="relative py-20 md:py-32">
      <div className="container relative">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Heading */}
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:mb-6 md:text-5xl lg:text-6xl">
                Ready to Get Started?
              </h2>

              {/* Description */}
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Join thousands of developers building amazing interfaces with our components.
              </p>

              {/* Benefits */}
              <div className="mb-10 grid gap-2 md:flex md:flex-col md:items-center">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm md:text-base text-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 md:flex-row md:justify-center">
                <Button size="lg" className="gap-2">
                  Start Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>

              {/* Testimonial */}
              <div className="mt-12 rounded-lg border border-border/50 bg-background/50 p-6 backdrop-blur">
                <p className="mb-4 text-foreground italic">
                  &quot;These components saved us weeks of development time. Highly recommended!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20" />
                  <div className="text-left">
                    <p className="font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Product Designer at TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CtaSection };

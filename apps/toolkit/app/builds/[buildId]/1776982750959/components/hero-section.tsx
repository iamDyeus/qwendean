"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const heading = "Heading of the Section";
  const description =
    "Everything you need to create modern, responsive web applications.";
  const buttons = [
    {
      text: "Get Started",
      variant: "default",
      url: "#",
    },
    {
      text: "Learn More",
      variant: "outline",
      url: "#",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/50 pt-32 pb-20 md:pt-48 md:pb-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="z-10 flex flex-col items-center justify-center gap-8 px-4 py-16 md:px-8 lg:px-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Modern & Responsive
            </span>
          </div>

          {/* Heading and description */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-center text-5xl font-bold tracking-tighter text-foreground md:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="text-center text-lg text-muted-foreground md:text-xl lg:max-w-2xl lg:text-2xl">
              {description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                size="lg"
                asChild
              >
                <a href={button.url} className="gap-2">
                  {button.text}
                  {index === 0 && <ArrowRight className="h-5 w-5" />}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };

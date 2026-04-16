"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-2.5">
                <Star className="size-5" />
                <Star className="size-5" />
                <Star className="size-5" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Brief description of the feature and its benefits
              </h1>
              <p className="text-muted-foreground text-lg tracking-tight lg:text-xl">
                We are a team of passionate designers and developers with over
                10 years of experience in the industry.
              </p>
            </div>
            <img
              src="/placeholder.svg"
              alt="placeholder"
              className="aspect-video h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg tracking-tight lg:text-xl">
                To create innovative solutions that make a difference in the
                world.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-muted-foreground text-lg tracking-tight lg:text-xl">
                Brief description of the feature and its benefits
              </p>
              <div className="flex items-center gap-2.5">
                <Star className="size-5" />
                <Star className="size-5" />
                <Star className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };


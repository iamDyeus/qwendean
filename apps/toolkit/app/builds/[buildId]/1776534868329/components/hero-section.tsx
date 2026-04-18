"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-3xl"
        >
          <div className="relative z-20 flex flex-col items-center justify-center text-center">
            <h1 className="relative z-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Fresh Juices
            </h1>
            <p className="relative z-20 mt-4 text-xl leading-relaxed md:text-2xl lg:text-3xl">
              <span className="text-primary">Organic & Local</span> Focus
            </p>
            <Button
              variant="default"
              className="group relative mt-8 flex w-fit items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-8 py-3 transition-all duration-300 ease-in-out hover:ring-primary hover:ring-2"
            >
              Visit Us
              <ChevronRight className="ml-2 h-4 w-4 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </div>
          <Image
            src="/images/hero/hero-bg.png"
            alt="Fresh fruits and vegetables"
            width={1200}
            height={800}
            className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto h-full w-full max-w-4xl rounded-lg object-cover"
          />
        </motion.div>
      </div>
      <Separator className="bg-primary my-8 h-px w-full" />
      <div className="relative z-10 mt-8 flex flex-col items-center justify-center">
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Image
            src="/images/hero/hero-bg2.png"
            alt="Fresh fruits and vegetables"
            width={1200}
            height={800}
            className="relative z-20 h-full w-full max-w-4xl rounded-lg object-cover"
          />
          <div className="relative z-30 flex h-full w-full items-center justify-center">
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Sparkles className="absolute bottom-4 left-4 h-6 w-6 text-primary" />
              <p className="relative z-10 mb-4 max-w-2xl text-lg leading-relaxed">
                Detailed explanation of the feature, including key capabilities and improvements
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };

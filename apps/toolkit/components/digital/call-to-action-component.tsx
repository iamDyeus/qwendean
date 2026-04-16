"use client";

import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-lg border p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Get Started with Digital Agency Name
            </h2>
            <p className="text-sm leading-relaxed">
              Brief description of the feature and its benefits
            </p>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 text-sm font-medium">
                <Check className="text-emerald-500" />
                Brief description of the feature and its benefits
              </a>
              <Button asChild variant="outline" className="w-full">
                <a href="tel:1234567890">
                  <Phone className="mr-2" />
                  Get a call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta };


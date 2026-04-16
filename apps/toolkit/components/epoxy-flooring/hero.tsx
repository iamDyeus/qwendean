import { ArrowRight, CheckCircle, Circle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-background relative py-16 md:py-20">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex w-full max-w-3xl flex-col gap-10">
              <div className="flex items-center gap-2">
                <Sparkles className="size-6 fill-amber-400 stroke-amber-400" />
                <p className="text-amber-400 text-sm font-medium tracking-tight">
                  Approved for Government & Commercial Projects
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                  Anti-Skid Epoxy Flooring That Passes Every Safety Inspection —
                  First Time
                </h1>
                <p className="text-muted-foreground max-w-xl text-lg">
                  We coat bus depots, warehouses, and food storage facilities
                  with certified, heavy-duty epoxy floors built for daily
                  punishment and decades of use.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex w-full max-w-3xl items-center gap-4">
                <Button className="h-14 w-full rounded-lg text-lg shadow-lg md:h-16 md:w-fit md:rounded-xl">
                  Get a Free Site Assessment
                </Button>
                <a href="#">
                  <Button variant="ghost" className="h-14 w-fit rounded-lg">
                    <ArrowRight className="mr-2 size-4" />
                    See Our Projects →
                  </Button>
                </a>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <CheckCircle className="size-5" />
                  <p className="text-sm font-medium tracking-tighter">
                    IS 15477 Certified
                  </p>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Circle className="size-5" />
                  <p className="text-sm font-medium tracking-tighter">
                    500+ Facilities Coated
                  </p>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Circle className="size-5" />
                  <p className="text-sm font-medium tracking-tighter">
                    Pan-India Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ml-0 w-full max-w-3xl md:ml-auto">
            <img
              src="/placeholder.svg"
              alt="placeholder"
              className="aspect-5/3 h-full w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

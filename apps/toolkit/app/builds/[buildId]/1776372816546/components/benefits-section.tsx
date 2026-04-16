"use client";

import { Check } from "lucide-react";
import { use, useState } from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees. Upfront pricing ensures budget predictability and avoids unexpected costs.",
    icon: "/placeholder.svg",
  },
  {
    title: "Certified Technicians",
    description:
      "Our team of certified professionals uses industry-leading techniques for reliable results.",
    icon: "/placeholder.svg",
  },
  {
    title: "Fast Turnaround",
    description:
      "Quick turnaround times ensure minimal disruption to your schedule and business operations.",
    icon: "/placeholder.svg",
  },
];

const Feature = () => {
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  use(
    setInterval(() => {
      if (currentIndex < items.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setProgress((nextIndex / items.length) * 100);
      } else {
        setProgress(0);
        setCurrentIndex(0);
      }
    }, 3000),
  );

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-medium">Why choose our workshop?</h2>
            <ul className="flex flex-col gap-5">
              {items.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Check className="text-primary mt-1" size={16} strokeWidth={2} />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-10">
            <div className="relative h-32 w-40">
              <div className="bg-primary absolute top-0 h-full w-0 rounded-full transition-all duration-1000 ease-in-out">
                <div
                  className="bg-background absolute top-0 h-full w-[calc(100%+2rem)] rounded-full"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="grid gap-5">
              {items.map((item, index) => (
                <Card key={index} className="bg-muted relative overflow-hidden">
                  <div className="bg-background relative z-10 size-full">
                    <CardHeader className="flex justify-between p-5">
                      <CardTitle className="text-xl font-medium">
                        {item.title}
                      </CardTitle>
                      <div className="bg-background size-10 rounded-full flex justify-center items-center">
                        {index + 1}
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10 p-5">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-full rounded-md"
                      />
                    </CardContent>
                  </div>
                  <div className="bg-linear-to-r from-primary to-primary absolute bottom-0 left-0 h-1 w-full z-20" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };
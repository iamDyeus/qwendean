import type { LucideIcon } from "lucide-react";
import {
  FaBan,
  FaLeaf,
  FaPlane,
} from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    title: "Fresh Juices",
    description:
      "Our juices are made from the freshest ingredients available, ensuring you get the maximum nutritional benefit from each bottle.",
    icon: FaBan,
  },
  {
    title: "Organic Fruits",
    description:
      "We only use organic fruits and vegetables, which are grown without the use of harmful chemicals or pesticides.",
    icon: FaLeaf,
  },
  {
    title: "Reasonable Rates",
    description:
      "We believe that everyone should be able to afford healthy and nutritious food, which is why we offer our products at reasonable prices.",
    icon: FaPlane,
  },
];

const Feature = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h2 className="text-3xl font-semibold md:text-4xl">Our Features</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader className="pb-2">
                <feature.icon className="size-6" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };

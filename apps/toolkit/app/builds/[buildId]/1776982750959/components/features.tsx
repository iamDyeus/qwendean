import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Accessibility, Palette, Rocket } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for maximum performance with lazy loading and code splitting.",
      color: "bg-yellow-500/10 text-yellow-600",
    },
    {
      icon: Accessibility,
      title: "Fully Accessible",
      description: "WCAG 2.1 compliant components ensuring inclusive design for all users.",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Palette,
      title: "Highly Customizable",
      description: "Theme and customize every component to match your brand identity.",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Rocket,
      title: "Production Ready",
      description: "Battle-tested components used in production by thousands of developers.",
      color: "bg-green-500/10 text-green-600",
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-32 lg:py-40">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center md:mb-20">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Powerful Features
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Everything you need to build amazing interfaces with modern design principles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group relative overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className={`${feature.color} mb-3 inline-block rounded-lg p-2`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button size="lg" className="gap-2">
            Explore All Features
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Features };

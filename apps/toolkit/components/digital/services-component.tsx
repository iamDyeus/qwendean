"use client";

import { Code, Database, Globe, Languages, LucideIcon, Shield, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Code,
    title: "Web Development",
    description: "Build robust and scalable web applications using modern technologies and frameworks.",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Design, optimize, and maintain databases to ensure efficient data storage and retrieval.",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Implement SEO strategies to improve website visibility and drive organic traffic.",
  },
  {
    icon: Languages,
    title: "Content Creation",
    description: "Develop engaging content marketing strategies across blogs, videos, and social media.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Implement robust security measures to protect your website and user data.",
  },
];

const TechnologyStack = () => {
  const frameworks = [
    {
      icon: Code,
      title: "React",
      description: "Build interactive UI components with React and TypeScript.",
    },
    {
      icon: Code,
      title: "Next.js",
      description: "Server-rendered components for faster performance and SEO.",
    },
    {
      icon: Code,
      title: "Tailwind CSS",
      description: "Style your components with utility-first CSS.",
    },
    {
      icon: Code,
      title: "Figma",
      description: "Design and prototype with Figma before development.",
    },
    {
      icon: Code,
      title: "Postman",
      description: "Test and debug APIs with Postman.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Technology Stack</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {frameworks.map((framework, index) => (
            <Card key={index}>
              <CardHeader>
                <framework.icon className="mb-2 h-6 w-6" />
                {framework.title}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{framework.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Services</h2>
        <div className="mb-16">
          <p className="text-muted-foreground mb-8">
            We offer a comprehensive range of services to help you achieve your digital goals.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <service.icon className="mb-2 h-8 w-8" />
                  {service.title}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Separator className="mb-16" />
        <TechnologyStack />
      </div>
    </section>
  );
};

export { Services };



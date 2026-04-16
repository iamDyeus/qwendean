import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Feature = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col gap-6 lg:max-w-[400px]">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Brief description of the feature and its benefits
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Brief description of the feature and its benefits
            </p>
          </div>
          <div className="w-full">
            <BentoGrid>
              <FeatureCard
                title="Modern Architecture"
                description="Innovative design concepts that redefine urban spaces."
              >
                <img
                  src="/placeholder.svg"
                  alt="Modern Architecture"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
              <FeatureCard
                title="Sustainable Construction"
                description="Eco-friendly building practices that reduce environmental impact."
              >
                <img
                  src="/placeholder.svg"
                  alt="Sustainable Construction"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
              <FeatureCard
                title="Smart Infrastructure"
                description="Advanced systems and technologies for efficient building operations."
              >
                <img
                  src="/placeholder.svg"
                  alt="Smart Infrastructure"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
              <FeatureCard
                title="Residential Projects"
                description="Thoughtful home designs that blend with nature and enhance living spaces."
              >
                <img
                  src="/placeholder.svg"
                  alt="Residential Projects"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
              <FeatureCard
                title="Commercial Developments"
                description="State-of-the-art office spaces that foster productivity and collaboration."
              >
                <img
                  src="/placeholder.svg"
                  alt="Commercial Developments"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
              <FeatureCard
                title="Renovation & Restoration"
                description="Expertly restoring historical buildings while preserving their unique charm."
              >
                <img
                  src="/placeholder.svg"
                  alt="Renovation & Restoration"
                  className="size-full max-h-[300px] w-full rounded-md object-cover"
                />
              </FeatureCard>
            </BentoGrid>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };

export interface FeatureCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const FeatureCard = ({ title, description, children }: FeatureCardProps) => {
  return (
    <div className="bg-background group relative flex h-full max-w-[300px] flex-col justify-between gap-6 rounded-md p-6">
      <div className="flex flex-col gap-3">
        <CardTitle className="text-foreground text-xl font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          {description}
        </CardDescription>
      </div>
      <div className="group-hover:bg-muted/20 bg-muted/10 relative z-10 flex justify-center">
        {children}
      </div>
    </div>
  );
};

export interface BentoGridProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

const BentoGrid = ({
  children,
  className = "",
}: BentoGridProps) => {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
      data-slot="bento-grid"
    >
      {children}
    </div>
  );
};

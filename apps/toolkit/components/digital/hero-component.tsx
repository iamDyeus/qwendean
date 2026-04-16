import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl">
            Transform Your Idea into a Reality with{" "}
            <span className="text-primary">Digital Agency Name</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Brief description of the feature and its benefits
          </p>
          <Button>Sign up for a discovery call</Button>
        </div>
      </div>
    </section>
  );
};

export { Hero };



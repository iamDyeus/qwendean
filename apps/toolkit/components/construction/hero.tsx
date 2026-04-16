import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col gap-6 lg:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-6 lg:gap-10">
            <h1 className="text-foreground text-4xl font-semibold
leading-tight tracking-tight sm:text-5xl md:text-[4.5rem]
lg:text-6xl">
              Brief description of the feature and its
benefits
            </h1>
            <p className="text-foreground text-xl font-medium
leading-normal tracking-tight lg:text-2xl">
              Detailed explanation of the feature, including key
capabilities and improvements
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="w-full sm:w-fit">Primary</Button>
              <Button variant="outline" className="w-full sm:w-fit">
                Secondary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
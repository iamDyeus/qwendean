
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <section className="py-32">
      <div className="container relative overflow-hidden">
        {/* Background image or video with subtle loop */}
        <img
          src="/docs/images/placeholder.svg"
          alt="Clean workshop with mechanics"
          className="absolute inset-0 size-full bg-cover bg-center bg-no-repeat object-cover [aspect-ratio:16/9] [background-blend-mode:overlay] [mask-image:url(/docs/images/mask-hero.svg)]"
          width={1920}
          height={1080}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          {/* Trust badge */}
          <div className="bg-muted flex size-8 items-center justify-center rounded-full">
            <span className="text-xs font-medium leading-none">Certified Mechanics</span>
          </div>

          {/* Main heading */}
          <h1 className="text-center text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl">
            Reliable Auto Repair Near You
          </h1>

          {/* Subheading */}
          <p className="text-muted-foreground text-center text-2xl md:text-3xl lg:text-4xl">
            Detailed explanation of the feature, including key capabilities and improvements
          </p>

          {/* Call to action */}
          <Button className="text-lg" asChild>
            <a href="tel:1234567890">Call Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
}


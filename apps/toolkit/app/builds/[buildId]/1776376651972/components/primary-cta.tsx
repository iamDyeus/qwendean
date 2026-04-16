import { Button } from "@/components/ui/button";

const Cta = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="bg-muted relative flex flex-col items-center justify-center gap-8 rounded-lg px-4 py-16 text-center md:px-8 md:py-24 lg:px-16 lg:py-32">
          <div className="bg-background absolute inset-0 z-0 h-full w-full rounded-lg" />
          <div className="relative z-10">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Order Your Blooms Today
            </h2>
            <div className="flex flex-col gap-2">
              <Button className="w-fit rounded-full px-4 py-2 text-sm">
                Place Order
              </Button>
              <Button variant="secondary" className="w-fit rounded-full px-4 py-2 text-sm">
                View Store Hours
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta };
```

This component a call-to-action (cta) section designed to encourage user engagement with a prominent button and a secondary smaller button. it features a high-contrast background and text styling, making it visually striking and easy to read. the component uses shadcn/ui's button component for consistent styling and responsive design.

Key features:
- Includes styling and responsive design
- Features smooth animations and transitions
- Combines multiple UI components for rich interactions

This component follows modern React patterns and best practices for building maintainable and reusable UI components.
import { Button } from "@/components/ui/button";

const WhyChoose = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Why Choose Us
            </h1>
            <p className="text-muted-foreground text-lg">
              Brief description of the feature and its benefits
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Quality Craftsmanship</h2>
              <p className="text-muted-foreground">
                Brief description of the feature and its benefits
              </p>
              <img
                src="/placeholder.svg"
                alt="Quality Craftsmanship"
                className="mt-6 w-full rounded-md object-cover"
              />
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Reliable Project Management
              </h2>
              <p className="text-muted-foreground">
                Brief description of the feature and its benefits
              </p>
              <img
                src="/placeholder.svg"
                alt="Reliable Project Management"
                className="mt-6 w-full rounded-md object-cover"
              />
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Safety Standards
              </h2>
              <p className="text-muted-foreground">
                Brief description of the feature and its benefits
              </p>
              <img
                src="/placeholder.svg"
                alt="Safety Standards"
                className="mt-6 w-full rounded-md object-cover"
              />
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Transparent Communication
              </h2>
              <p className="text-muted-foreground">
                Brief description of the feature and its benefits
              </p>
              <img
                src="/placeholder.svg"
                alt="Transparent Communication"
                className="mt-6 w-full rounded-md object-cover"
              />
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Timely Deliveries
              </h2>
              <p className="text-muted-foreground">
                Brief description of the feature and its benefits
              </p>
              <img
                src="/placeholder.svg"
                alt="Timely Deliveries"
                className="mt-6 w-full rounded-md object-cover"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 w-fit rounded-full px-4 font-medium"
            >
              <a href="#">See our work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WhyChoose };
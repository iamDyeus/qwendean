import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <div className="flex flex-col gap-5 lg:gap-10">
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Our Story and Mission
            </h1>
            <p className="text-muted-foreground max-w-[40rem] md:text-xl lg:text-2xl">
              Detailed explanation of the feature, including key capabilities and improvements
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <Card className="w-full rounded-none border-0 bg-transparent">
              <div className="grid gap-2.5 px-4 py-2.5">
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-xs font-semibold uppercase">
                    Key Facts
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Detailed explanation of the feature, including key capabilities and improvements
                  </p>
                </div>
                <div className="grid gap-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground text-xs font-semibold">
                      Years in Business
                    </p>
                    <p className="text-muted-foreground text-xs">20</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-foreground text-xs font-semibold">
                      Products Offered
                    </p>
                    <p className="text-muted-foreground text-xs">Premium</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-foreground text-xs font-semibold">
                      Store Location
                    </p>
                    <p className="text-muted-foreground text-xs">Paris</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-foreground text-xs font-semibold">
                      Established In
                    </p>
                    <p className="text-muted-foreground text-xs">2020</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };
```

This component a dedicated 'about us' section designed to showcase the brand's story, mission, and key operational details. it features a large placeholder image on the left alongside a two-column layout on the right, with the left side containing narrative content about the brand's journey and values, while the right side presents key statistics like years in business, products offered, location, and establishment year within a styled card component. this section aims to engage visitors with both storytelling and factual information about the company.

This component follows modern React patterns, using TypeScript for typing and Tailwind CSS for styling. It focuses on creating a maintainable and reusable UI component.
import { Card, CardContent } from "@/components/ui/card";

const Credibility = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Trusted by Industry Leaders
            </h1>
            <p className="text-muted-foreground text-lg">
              Brief description of the feature and its benefits
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-muted/5 rounded-xl p-6">
              <CardContent className="text-4xl font-bold">
                25+ Years
              </CardContent>
            </Card>
            <Card className="bg-muted/5 rounded-xl p-6">
              <CardContent className="text-4xl font-bold">500+</CardContent>
            </Card>
            <Card className="bg-muted/5 rounded-xl p-6">
              <CardContent className="text-4xl font-bold">100+</CardContent>
            </Card>
            <Card className="bg-muted/5 rounded-xl p-6">
              <CardContent className="text-4xl font-bold">99%</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Credibility };
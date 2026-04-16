import { Car, Wrench } from "lucide-react";
import { CheckCircle, Compass, Diamond } from "lucide-react";
import { Card } from "@/components/ui/card";

const Feature = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-6 rounded-lg border p-6">
            <div className="flex gap-2">
              <Car className="text-muted-foreground mt-1 h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold">Oil Changes</h3>
              <p className="text-muted-foreground">
                Keep your engine running smoothly with regular oil changes.
              </p>
            </div>
            <Card className="border-none bg-background shadow-none">
              <div className="flex justify-center">
                <CheckCircle className="text-muted-foreground mt-1 h-6 w-6" />
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-6 rounded-lg border p-6">
            <div className="flex gap-2">
              <Wrench className="text-muted-foreground mt-1 h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold">Brake Repair</h3>
              <p className="text-muted-foreground">
                Ensure your brakes are in top condition for safe driving.
              </p>
            </div>
            <Card className="border-none bg-background shadow-none">
              <div className="flex justify-center">
                <Compass className="text-muted-foreground mt-1 h-6 w-6" />
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-6 rounded-lg border p-6">
            <div className="flex gap-2">
              <Diamond className="text-muted-foreground mt-1 h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold">Engine Diagnostics</h3>
              <p className="text-muted-foreground">
                Identify and fix engine issues before they become major problems.
              </p>
            </div>
            <Card className="border-none bg-background shadow-none">
              <div className="flex justify-center">
                <Diamond className="text-muted-foreground mt-1 h-6 w-6" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;

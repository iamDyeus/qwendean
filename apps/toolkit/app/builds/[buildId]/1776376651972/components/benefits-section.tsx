/* eslint-disable @next/next/no-img-element */
"use client";

import { Calendar, Flower, ShoppingCart, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Feature = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-16 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Brief description of the feature and its benefits
          </h2>
          <p className="text-muted-foreground text-lg md:text-2xl">
            Brief description of the feature and its benefits
          </p>
          <div className="flex gap-4">
            <Button size="lg">Primary</Button>
            <Button variant="outline" size="lg">
              Secondary
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <Flower className="mb-2 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">Farm Fresh Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Brief description of the feature and its benefits
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <Star className="mb-2 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">Premium Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Brief description of the feature and its benefits
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <ShoppingCart className="mb-2 h-12 w-12" />
              <CardTitle className="text-2xl font-bold">Exclusive Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Brief description of the feature and its benefits
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Feature };
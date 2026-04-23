"use client"

import { Button } from "@/components/ui/button"

function Component() {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="bg-primary text-background relative flex flex-col items-center justify-center overflow-hidden rounded-lg px-8 pt-16 md:pt-24 lg:px-12 lg:py-24 xl:px-24 xl:pt-32">
            <div className="flex flex-col items-center gap-6 md:gap-12">
              <div className="flex flex-col gap-4">
                <h2 className="text-background-foreground text-5xl font-bold md:text-6xl lg:text-7xl">
                  Brief description of the feature and its benefits
                </h2>
                <p className="text-background-foreground/80 max-w-md text-center md:text-xl">
                  Detailed explanation of the feature, including key capabilities and improvements
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button className="w-full sm:w-auto">Primary</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Component };
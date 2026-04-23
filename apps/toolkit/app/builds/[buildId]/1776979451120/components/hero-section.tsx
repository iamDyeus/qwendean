"use client"

import { Button } from "@/components/ui/button"

function Hero() {
  return (
    <section className="flex h-screen items-center justify-center bg-white">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="text-5xl font-bold">Welcome to Our Website</h1>
        <p className="text-2xl">
          Brief description of the feature and its benefits
        </p>
        <div className="flex gap-4">
          <Button className="rounded-full">Primary</Button>
          <Button variant="outline" className="rounded-full">
            Secondary
          </Button>
        </div>
      </div>
    </section>
  )
}

export { Hero };
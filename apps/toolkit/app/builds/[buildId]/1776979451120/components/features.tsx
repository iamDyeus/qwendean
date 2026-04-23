"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Clock, GitPullRequest, Menu, Search, Users } from "lucide-react"

function Features() {
  const features = [
    {
      icon: <Clock className="h-auto w-12" />,
      title: "24/7 Availability",
      description: "We're always here to help you with your needs.",
    },
    {
      icon: <GitPullRequest className="h-auto w-12" />,
      title: "Instant Updates",
      description: "Receive the latest updates as soon &nbsp; soon as possible.",
    },
    {
      icon: <Users className="h-auto w-12" />,
      title: "Community Support",
      description: "Join our community and get support from other users.",
    },
  ]

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-4xl">Our Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col gap-6 p-6">
                <div className="flex justify-center">{feature.icon}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Features }
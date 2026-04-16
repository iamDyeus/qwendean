"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-muted/40">
      <div className="container py-12 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Navigation</h2>
            <nav className="text-muted-foreground space-y-4">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
              <a href="#">Sitemap</a>
            </nav>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Social Media</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:bg-foreground/15 rounded-full p-2 transition-colors"
              >
                <Facebook className="size-6" />
              </a>
              <a
                href="#"
                className="hover:bg-foreground/15 rounded-full p-2 transition-colors"
              >
                <Twitter className="size-6" />
              </a>
              <a
                href="#"
                className="hover:bg-foreground/15 rounded-full p-2 transition-colors"
              >
                <Linkedin className="size-6" />
              </a>
              <a
                href="#"
                className="hover:bg-foreground/15 rounded-full p-2 transition-colors"
              >
                <Instagram className="size-6" />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Newsletter</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Subscribe to our newsletter for updates and news.
              </p>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full"
                />
                <Button className="rounded-full">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Company</h2>
            <nav className="text-muted-foreground space-y-4">
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </nav>
          </div>
        </div>
        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export { Footer };
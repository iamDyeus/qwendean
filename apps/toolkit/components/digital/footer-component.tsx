"use client";

import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">Contact Us</h3>
              <p className="text-muted-foreground">
                Detailed explanation of the feature, including key capabilities and improvements
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Twitter className="size-4" />
                <span className="text-muted-foreground">Twitter</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="size-4" />
                <span className="text-muted-foreground">LinkedIn</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Button variant="outline">Get in touch</Button>
              <span className="text-muted-foreground">Call: +1 (120) 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Email: support@agency.com</span>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-16">
          <p className="text-muted-foreground text-center text-sm">
            &copy; {new Date().getFullYear()} Agency Name. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Footer };

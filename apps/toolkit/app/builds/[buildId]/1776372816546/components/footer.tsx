"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <section className="dark bg-muted text-foreground">
      <div className="container">
        <footer className="grid items-end gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Shop Name
                </h1>
                <p className="text-muted-foreground max-w-[10rem] tracking-tight">
                  Brief description of the feature and its benefits
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-muted-foreground text-sm">Quick Links</h2>
                <nav className="grid items-start gap-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Services
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-muted-foreground text-sm">Contact Us</h2>
              <p className="text-muted-foreground text-sm">
                123 Main Street, Cityville
              </p>
              <p className="text-muted-foreground text-sm">+1 (123) 456-7890</p>
              <p className="text-muted-foreground text-sm">
                support@shopname.com
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-muted-foreground text-sm">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-itype-foreground"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Separator className="bg-muted-foreground/20" />
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              A
            </div>
            <span className="hidden font-semibold text-foreground sm:inline">
              Acme
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex gap-2"
              asChild
            >
              <a href="#">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 md:hidden hover:bg-accent"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-border/40 bg-background/95 px-4 py-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="default" size="sm" className="w-full gap-2 mt-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

export { Navbar };

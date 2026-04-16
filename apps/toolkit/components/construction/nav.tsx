"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="sticky top-0 z-50 bg-background">
      <div className="container">
        <nav className="bg-background flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background text-foreground">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src="/placeholder.svg"
                          alt="logo"
                          className="h-8 w-auto"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <Button variant="ghost" size="lg" className="w-full">
                        Home
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" size="lg" className="w-full">
                        About
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" size="lg" className="w-full">
                        Services
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" size="lg" className="w-full">
                        Projects
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" size="lg" className="w-full">
                        Safety
                      </Button>
                    </li>
                  </ul>
                  <div className="mt-4 md:mt-0">
                    <Button size="lg">Get a Quote</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
        </nav>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              alt="logo"
              className="h-8 w-auto"
            />
          </div>

          <ul className="flex gap-6">
            <li>
              <Button variant="ghost" size="lg">
                Home
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="lg">
                About
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="lg">
                Services
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="lg">
                Projects
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="lg">
                Safety
              </Button>
            </li>
          </ul>

          <div className="ml-auto">
            <Button size="lg">Get a Quote</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };

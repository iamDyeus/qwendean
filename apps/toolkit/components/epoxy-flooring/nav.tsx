"use client"
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full bg-background">
      <nav
        className={`w-full ${
          isScrolled
            ? "fixed top-0 z-50 border-b bg-background/90 backdrop-blur-sm border-gray-100"
            : "sticky top-20 z-50"
        }`}
      >
        <div className=" flex h-16 flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/placeholder.svg"
              className="h-6 w-6"
              alt="logo"
            />
            <h1 className="text-lg font-bold tracking-tighter">
              FloorTech Industrial
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-4 lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Concrete Flooring</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Marble Flooring</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Tile Flooring</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Concrete Coatings</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Polished Concrete</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Industrial Flooring</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Interior Design</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Exterior Design</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Commercial Projects</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Process</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Timeline</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">FAQ</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Tools</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Blog</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Gallery</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Whitepaper</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <a href="#">Case Studies</a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Phone Number */}
          <a
            href="tel:+91-1234567890"
            className="flex items-center gap-1 text-sm font-medium tracking-tighter"
          >
            <Phone className="size-4" />
            Call for a Site Quote: +91-1234567890
          </a>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-lg">
                    FloorTech Industrial
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 p-4">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Explore Solutions</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Concrete Flooring</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Marble Flooring</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Tile Flooring</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Concrete Coatings</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Polished Concrete</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Industrial Flooring</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Interior Design</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Exterior Design</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Commercial Projects</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Process</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Timeline</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">FAQ</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Tools</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Blog</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Gallery</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Whitepaper</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                              <a href="#">Case Studies</a>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <a
                    href="tel:+91-1234567890"
                    className="mt-4 flex items-center gap-1 text-sm font-medium tracking-tighter"
                  >
                    <Phone className="size-4" />
                    Call for a Site Quote: +91-1234567890
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              variant={isScrolled ? "default" : "outline"}
              className="h-12 w-fit rounded-full px-4 text-lg"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </nav>
    </section>
  );
}

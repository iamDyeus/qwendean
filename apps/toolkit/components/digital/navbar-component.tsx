"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <a href="#" className="text-xl font-bold">
            Digital Agency Name
          </a>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Login
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center rounded-full"
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <ul className="flex flex-col gap-6">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };



"use client";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const links = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <section className="sticky top-0 z-50">
      <div className="relative h-20 overflow-hidden">
        <div className="bg-background/80 backdrop-blur-lg border-b"></div>
        <div className="relative h-full">
          <div className="container flex h-full items-center justify-between px-4 md:px-8">
            <a href="#" className="flex items-center space-x-2">
              <img
                src="/placeholder.svg"
                alt="logo"
                className="h-6 w-auto"
              />
            </a>
            <nav className="hidden space-x-4 md:flex">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button className="rounded-full">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
"use client";

import { Twitter, Facebook, Instagram, Github, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "License", href: "#" },
    ],
    Resources: [
      { label: "Docs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API", href: "#" },
      { label: "Support", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-border/40 bg-background">
      <div className="container py-12 md:py-16 lg:py-20">
        {/* Footer Content */}
        <div className="grid gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                A
              </div>
              <span className="font-semibold text-foreground">Acme</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Build amazing interfaces with modern design components.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/40" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Acme Corp. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

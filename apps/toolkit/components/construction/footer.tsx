import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Twitter,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/placeholder.svg"
                alt="logo"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">Concrete</span>
            </div>
            <p className="text-muted-foreground text-lg">
              Brief description of the feature and its benefits
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Quick Links</h2>
              <ul className="text-muted-foreground space-y-4">
                <li className="hover:text-foreground font-medium">
                  <a href="#">Home</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">About</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">Projects</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Services</h2>
              <ul className="text-muted-foreground space-y-4">
                <li className="hover:text-foreground font-medium">
                  <a href="#">Residential</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">Commercial</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">Renovation</a>
                </li>
                <li className="hover:text-foreground font-medium">
                  <a href="#">Infrastructure</a>
                </li>
              </ul>
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact</h2>
              <ul className="text-muted-foreground space-y-4">
                <li className="text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  +1 123 456 789
                </li>
                <li className="text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  example@example.com
                </li>
                <li className="text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  123 Main St, City
                </li>
              </ul>
            </div>
            <div className="bg-muted/5 rounded-xl p-6">
              <h2 className="mb-4 text-xl font-semibold">Follow Us</h2>
              <ul className="text-muted-foreground space-y-4 flex flex-row gap-5">
                <li>
                  <a href="#" className="hover:text-foreground">
                    <Facebook className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    <Instagram className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 Concrete Construction. All rights reserved.
            </p>
            <ul className="text-muted-foreground text-sm">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer };

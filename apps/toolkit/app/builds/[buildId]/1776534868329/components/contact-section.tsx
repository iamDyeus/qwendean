"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLIFrameElement>(null);

  const handleScrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="py-32"
    >
      <div className="container">
        <motion.div
          ref={containerRef}
          className="flex flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <MapPin className="size-4" />
                <h2 className="text-3xl font-medium">Contact Us</h2>
              </div>
              <Separator />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="bg-muted flex size-full items-center justify-center rounded-lg">
                  <iframe
                    ref={mapRef}
                    className="h-full w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.997563469168!2d76.99397697560522!3d13.336885077647376!2m3!1f888.5548684987231!2f-10.87597209701958!3f-12.200437152515313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb97274721573a9%3A0x65984158749b2405!2sBharat Forge%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1703225469107!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-muted flex size-full items-center justify-center rounded-lg">
                  <iframe
                    className="h-full w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.997563469168!2d76.99397697560522!3d13.336885077647376!2m3!1f888.5548684987231!2f-10.87597209701958!3f-12.200437152515313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb97274721573a9%3A0x65984158749b2405!2sBharat Forge%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1703225469107!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-muted flex items-center gap-3 rounded-lg p-5">
              <div className="flex size-10 shrink-0 items-center justify-center">
                <MapPin className="size-4" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-lg font-medium">
                  Bharat Forge, Bangalore
                </h3>
                <p className="text-muted-foreground text-sm">
                  123 Street, City, State 12345
                </p>
              </div>
            </div>
            <div className="bg-muted flex items-center gap-3 rounded-lg p-5">
              <div className="flex size-10 shrink-0 items-center justify-center">
                <MapPin className="size-4" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-lg font-medium">
                  123 Main Street, City, State 12345
                </h3>
                <p className="text-muted-foreground text-sm">
                  United States
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Contact };

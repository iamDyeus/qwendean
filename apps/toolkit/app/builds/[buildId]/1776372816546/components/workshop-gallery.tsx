"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "/images/repair-1.jpg",
  "/images/repair-2.jpg",
  "/images/repair-3.jpg",
  "/images/repair-4.jpg",
  "/images/repair-5.jpg",
  "/images/repair-6.jpg",
  "/images/repair-7.jpg",
  "/images/repair-8.jpg",
  "/images/repair-9.jpg",
  "/images/repair-10.jpg",
  "/images/repair-11.jpg",
  "/images/repair-12.jpg",
];

const Gallery = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveImage(index);
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    setActiveIndex(0);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Our Work
        </h2>
        <div className="gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <Card
              key={index}
              onClick={() => openLightbox(index)}
              className="cursor-pointer overflow-hidden border-2 border-primary"
            >
              <CardContent className="p-0">
                <img
                  src={image}
                  alt={`Workshop repair ${index + 1}`}
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {activeImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-auto"
          >
            <div className="flex justify-end pr-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center justify-center h-screen">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={images[activeIndex]}
                  alt={`Large view of workshop repair ${activeIndex + 1}`}
                  className="max-w-full max-h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
"use client";

import { Card } from "@/components/ui/card";

const galleryData = [
  {
    id: "product-1",
    name: "Summer Bloom Bouquet",
    price: 299,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "product-2",
    name: "Autumn Harvest Arrangement",
    price: 349,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "product-3",
    name: "Winter Wonderland Display",
    price: 429,
    imageUrl: "/placeholder.svg",
  },
];

const Gallery = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((product, index) => (
            <Card key={product.id} className="flex flex-col">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mb-4 rounded-md"
              />
              <div className="text-sm font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">
                $ {product.price}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery };
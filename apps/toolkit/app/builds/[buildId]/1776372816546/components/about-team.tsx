import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const mechanics = [
    {
      name: "John Doe",
      role: "Lead Mechanic",
      certifications: ["ASE Master", "Wartner Master"],
      image: "/placeholder.svg",
    },
    {
      name: "Jane Smith",
      role: "Mechanic",
      certifications: ["ASE", "Wartner"],
      image: "/placeholder.svg",
    },
    {
      name: "Mike Johnson",
      role: "Mechanic",
      certifications: ["ASE", "Wartner"],
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <h2 className="text-3xl font-medium">About Our Shop</h2>
        <p className="text-muted-foreground mt-3">
          Brief description of the feature and its benefits
        </p>
        <Separator className="my-12" />

        {/* Team Section */}
        <h3 className="text-2xl font-medium">Our Team</h3>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {mechanics.map((mechanic, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={mechanic.image}
                    alt={`${mechanic.name}'s portrait`}
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </CardHeader>
              <div className="px-6 py-3">
                <h4 className="text-lg font-semibold">{mechanic.name}</h4>
                <p className="text-muted-foreground">{mechanic.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mechanic.certifications.map((cert, certIndex) => (
                    <Badge key={certIndex} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
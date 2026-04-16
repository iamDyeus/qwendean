"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Contact7Props {
  heading?: string;
  address?: string;
  addressLabel?: string;
  phone?: string;
  phoneLabel?: string;
  buttonText?: string;
  buttonUrl?: string;
  description?: string;
  inputs?: Array<{
    label: string;
    placeholder: string;
    type: "text" | "email" | "number";
  }>;
}

const Contact = ({
  heading = "Ready to Schedule Your Repair?",
  address = "123 Auto Care Lane, Mechanicsburg, PA 17534",
  addressLabel = "Address",
  phone = "(555) 123-4567",
  phoneLabel = "Phone Number",
  buttonText = "Request a Call Back",
  buttonUrl = "#",
  description = "Need your car fixed? Book an appointment with our certified mechanics today!",
  inputs = [
    { label: "Name", placeholder: "Your Name", type: "text" },
    { label: "Phone Number", placeholder: "(555) 123-4567", type: "text" },
    { label: "Car Make/Model", placeholder: "e.g. Toyota Camry", type: "text" },
    { label: "Issue Description", placeholder: "e.g. engine trouble", type: "text" },
  ],
}: Contact7Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically add logic to handle form submission
    console.log("Form submitted:", new FormData(e.target as HTMLFormElement));
    // After submission, you might reset the form or show a success message
  };

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{heading}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{addressLabel}</span>
              <span className="text-muted-foreground">{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{phoneLabel}</span>
              <a
                href={`tel:${phone}`}
                className="text-primary font-bold"
                aria-label={`Call ${phone}`}
              >
                {phone}
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {inputs.map((input, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`input-${index}`}>{input.label}</Label>
                <Input
                  id={`input-${index}`}
                  placeholder={input.placeholder}
                  type={input.type}
                  required
                />
              </div>
            ))}
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Contact };
import { Check } from "lucide-react";

const Safety = () => {
  return (
    <section className="py-32">
      <div className="container">
        <h1 className="mb-10 text-center text-4xl font-semibold lg:text-5xl">
          Safety First
        </h1>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-video">
            <img
              src="/placeholder.svg"
              alt="Safety"
              className="h-full w-full rounded-lg object-cover grayscale opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
              <h2 className="text-4xl font-semibold">
                Certified Engineers, Always
              </h2>
              <p className="text-lg">
                Every project is overseen by certified engineers, ensuring that
                all work meets the highest standards of safety and quality.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">
              Compliant with Industry Regulations
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Compliance with OSHA standards</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Regular safety audits and inspections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Training for all personnel</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Emergency response protocols in place</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Use of certified safety equipment</span>
              </li>
            </ul>
          </div>
          <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Strict On-Site Safety</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Secure fencing and signage around work areas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Continuous monitoring of hazardous conditions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Emergency exits and evacuation routes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Regular safety briefings and check-ins</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Strict adherence to safety protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Safety };

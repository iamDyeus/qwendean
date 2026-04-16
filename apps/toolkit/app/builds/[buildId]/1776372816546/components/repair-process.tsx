
import { Book, Car, CircleDashed, CircleDot, CircleSlash, Compass, Zap } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: <Car className="h-6 w-6" />,
      title: "Book Appointment",
      description:
        "Book your appointment online in minutes. Choose a date and time that works best for you.",
    },
    {
      number: "02",
      icon: <Compass className="h-6 w-6" />,
      title: "Diagnostic & Quote",
      description:
        "Our certified technicians will diagnose your vehicle and provide a detailed quote.",
    },
    {
      number: "03",
      icon: <Zap className="h-6 w-6" />,
      title: "Repair & Service",
      description:
        "We'll schedule your repairs and service as soon &nbsp;soon as possible.",
    },
    {
      number: "04",
      icon: <CircleSlash className="h-6 w-6" />,
      title: "Final Inspection & Payment",
      description:
        "We'll inspect your vehicle and process your payment. You're all set to go!",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-2"
                style={{ flex: index < 2 ? "0 0 25%" : "0 0 15%" }}
              >
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary">
                  <p className="text-lg font-medium">{step.number}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Process };

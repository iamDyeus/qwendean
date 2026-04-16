import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";

const Faq = () => {
  const faqData = [
    {
      id: "faq-1",
      question: "How do I track my order?",
      answer:
        "You can track your order by using the order ID, which you receive via email and SMS, and entering it into our website or app.",
    },
    {
      id: "faq-2",
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery. Please contact our customer support for assistance with returns and exchanges.",
    },
    {
      id: "faq-3",
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free shipping on all orders above Rs. 2500.",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full" defaultValue="faq-1">
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b last:border-b"
              >
                <AccordionTrigger className="text-xl font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq };
```

This component a react component that displays a list of frequently asked questions (faqs) using an accordion layout. each faq item features a question trigger that, when clicked, expands to reveal the corresponding answer. it leverages the shadcn/ui accordion component for its structure and functionality, providing an interactive and accessible way to present information.

Key features:
- Includes styling and responsive design
- Features smooth animations and transitions

This component follows modern React patterns and best practices for building maintainable and reusable UI components.
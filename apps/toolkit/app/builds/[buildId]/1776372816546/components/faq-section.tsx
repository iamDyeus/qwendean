
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="faq-1">
        <AccordionTrigger>What is your pricing?</AccordionTrigger>
        <AccordionContent>
          We offer flexible pricing plans to suit your needs. Our standard rate is $50 per hour, with discounted rates available for extended bookings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>What is your service area?</AccordionTrigger>
        <AccordionContent>
          We serve a wide range of clients across the metropolitan area, including downtown, uptown, and suburban locations. We can accommodate your specific needs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>How do I book an appointment?</AccordionTrigger>
        <AccordionContent>
          You can book an appointment by visiting our website and selecting your preferred date and time, or you can call us directly at (123) 456-7890.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export { Faq }

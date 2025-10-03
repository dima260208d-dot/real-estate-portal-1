import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A] animate-on-scroll">Частые вопросы</h2>
        <Accordion type="single" collapsible className="space-y-4 animate-on-scroll">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-lg px-6 border-l-4 border-l-[#FF6600]">
              <AccordionTrigger className="text-left font-semibold hover:text-[#FF6600]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

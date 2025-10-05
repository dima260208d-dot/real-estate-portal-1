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
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground animate-on-scroll">Частые вопросы</h2>
        <Accordion type="single" collapsible className="space-y-4 animate-on-scroll">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className={`bg-white rounded-lg px-6 border-l-4 ${i % 2 === 0 ? 'border-l-primary' : 'border-l-secondary'}`}>
              <AccordionTrigger className={`text-left font-semibold ${i % 2 === 0 ? 'hover:text-primary' : 'hover:text-secondary'}`}>
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
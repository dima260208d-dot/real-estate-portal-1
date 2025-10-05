import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-primary/40 to-secondary/35 z-10" />
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg')] bg-cover bg-center" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in flex justify-center">
          <img 
            src="https://cdn.poehali.dev/files/d2d90979-b709-401b-b1fb-c6ca6c3f85f0.jpeg" 
            alt="ЮР недвижимость - Юрист и риэлтор" 
            className="w-full max-w-xl h-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] mix-blend-multiply brightness-150"
          />
        </div>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400 text-white drop-shadow-lg">
          Юрист и риэлтор для эффективного решения Ваших задач
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in animation-delay-600">
          <Button size="lg" onClick={onConsultationClick} className="bg-primary hover:bg-primary/90">
            Продать квартиру
          </Button>
          <Button size="lg" onClick={onConsultationClick} className="bg-secondary hover:bg-secondary/90 hover:scale-105 border-2 border-white transition-all duration-300 hover:shadow-lg hover:shadow-secondary/50">
            Бесплатная консультация
          </Button>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Наши услуги
          </Button>
        </div>
      </div>
    </section>
  );
}
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Logo from './Logo';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/60 to-secondary/55 z-10" />
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg')] bg-cover bg-center" />
      <div className="absolute top-8 right-8 z-30 animate-fade-in">
        <img 
          src="https://cdn.poehali.dev/files/5ff42783-4fa7-42c0-9af3-ea6eeaa9dd47.png" 
          alt="ЮР недвижимость - Юрист Риэлтор" 
          className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl"
        />
      </div>
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 animate-fade-in tracking-tight">
          <span className="bg-gradient-to-r from-orange-200 via-orange-400 to-orange-700 bg-clip-text text-transparent animate-glow-pulse">
            ЮР недвижимость
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400 text-white/80 drop-shadow-lg">
          Система услуг юриста и риэлтора для эффективного решения Ваших задач
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
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
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in flex justify-center relative w-full -mt-32">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="absolute animate-sparkle-1 text-base md:text-xl">✨</div>
            <div className="absolute animate-sparkle-2 text-base md:text-xl">⭐</div>
            <div className="absolute animate-sparkle-3 text-base md:text-xl">✨</div>
            <div className="absolute animate-sparkle-4 text-base md:text-xl">💫</div>
            <div className="absolute animate-sparkle-5 text-base md:text-xl">⭐</div>
            <div className="absolute animate-sparkle-6 text-base md:text-xl">✨</div>
          </div>
          <div className="relative z-10 inline-block">
            <img 
              src="https://cdn.poehali.dev/files/5ff42783-4fa7-42c0-9af3-ea6eeaa9dd47.png" 
              alt="ЮР недвижимость - Юрист Риэлтор" 
              className="h-16 md:h-28 w-auto object-contain animate-logo-glow transition-all duration-700 hover:scale-110 cursor-pointer grayscale brightness-200"
              style={{ maxWidth: '80vw' }}
            />
          </div>
        </div>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400 text-white/80 drop-shadow-lg">
          Система услуг для эффективного решения Ваших задач
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
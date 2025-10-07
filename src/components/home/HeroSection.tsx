import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Logo from './Logo';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-primary/30 to-secondary/25 z-10" />
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg')] bg-cover bg-center brightness-110" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in flex justify-center relative w-full -mt-20">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="absolute animate-sparkle-1 text-base md:text-xl">✨</div>
            <div className="absolute animate-sparkle-2 text-base md:text-xl">⭐</div>
            <div className="absolute animate-sparkle-3 text-base md:text-xl">✨</div>
            <div className="absolute animate-sparkle-4 text-base md:text-xl">💫</div>
            <div className="absolute animate-sparkle-5 text-base md:text-xl">⭐</div>
            <div className="absolute animate-sparkle-6 text-base md:text-xl">✨</div>
          </div>
          <div className="relative z-10 inline-block bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/20">
            <img 
              src="https://cdn.poehali.dev/files/5ff42783-4fa7-42c0-9af3-ea6eeaa9dd47.png" 
              alt="ЮР недвижимость - Юрист Риэлтор" 
              className="h-20 md:h-32 w-auto object-contain animate-logo-glow transition-all duration-700 hover:scale-105 cursor-pointer brightness-[1.5] contrast-[1.3]"
              style={{ 
                maxWidth: '80vw', 
                filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.7))' 
              }}
            />
          </div>
        </div>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400 text-white/80 drop-shadow-lg mt-24">
          Система услуг для эффективного решения Ваших задач
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in animation-delay-600 mt-12">
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
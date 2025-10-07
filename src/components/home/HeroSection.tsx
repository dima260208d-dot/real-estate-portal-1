import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Logo from './Logo';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/60 to-secondary/50 z-10" />
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg')] bg-cover bg-center brightness-75" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in flex justify-center relative w-full mt-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="absolute animate-sparkle-1 text-xl md:text-2xl">✨</div>
            <div className="absolute animate-sparkle-2 text-xl md:text-2xl">⭐</div>
            <div className="absolute animate-sparkle-3 text-xl md:text-2xl">✨</div>
            <div className="absolute animate-sparkle-4 text-xl md:text-2xl">💫</div>
            <div className="absolute animate-sparkle-5 text-xl md:text-2xl">⭐</div>
            <div className="absolute animate-sparkle-6 text-xl md:text-2xl">✨</div>
          </div>
          <div className="relative z-10 inline-block bg-white/20 backdrop-blur-lg px-10 py-5 rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.3)] border-2 border-white/40">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white animate-logo-glow transition-all duration-700 hover:scale-105 cursor-pointer tracking-tight" style={{ 
              filter: 'drop-shadow(0 0 60px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 0 15px rgba(255,215,0,0.5))',
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)'
            }}>
              ЮР недвижимость
            </h1>
          </div>
        </div>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400 text-white/80 drop-shadow-lg mt-24">
          Система услуг юриста и риэлтора для эффективного решения Ваших задач
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
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
        <div className="mb-6 flex justify-center relative w-full mt-8">
          <div className="relative z-10 inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              ЮР недвижимость
            </h1>
          </div>
        </div>
        <p className="text-lg md:text-xl mb-8 text-white/80 drop-shadow-lg mt-24">
          Система услуг юриста и риэлтора для эффективного решения Ваших задач
        </p>
        <div className="flex gap-4 justify-center flex-wrap mt-12">
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
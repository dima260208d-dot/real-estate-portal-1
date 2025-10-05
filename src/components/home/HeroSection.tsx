import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-primary/75 to-secondary/65 z-10" />
      <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/d93a2567-5b9a-442b-8975-7a64fd411351.jpg')] bg-cover bg-center" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">ЮР недвижимость</h1>
        <h2 className="text-2xl md:text-3xl mb-4 animate-fade-in animation-delay-200">
          Профессионализм в квадратах
        </h2>
        <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400">
          Юрист и риэлтор для эффективного решения Ваших задач
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in animation-delay-600">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <a href="tel:+79805557580" className="flex items-center gap-2">
              <Icon name="Phone" size={20} />
              Позвонить
            </a>
          </Button>
          <Button size="lg" onClick={onConsultationClick} className="bg-secondary hover:bg-secondary/90 border-2 border-white">
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
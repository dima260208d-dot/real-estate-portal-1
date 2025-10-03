import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onConsultationClick: () => void;
}

export default function HeroSection({ onConsultationClick }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/85 via-[#FF6600]/75 to-[#FF8833]/65 z-10" />
      <div className="absolute inset-0 bg-[url('/img/952939ad-8b7d-4630-b375-5b90f91be222.jpg')] bg-cover bg-center" />
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">ЮР Недвижимость</h1>
        <h2 className="text-2xl md:text-3xl mb-4 animate-fade-in animation-delay-200">
          Юрист Риэлтор Недвижимость
        </h2>
        <p className="text-lg md:text-xl mb-4 animate-fade-in animation-delay-400">
          Опытные специалисты на рынке недвижимости Воронежа
        </p>
        <p className="text-base md:text-lg mb-8 animate-fade-in animation-delay-500 italic">
          Делаем процесс продажи и покупки недвижимости простым и понятным для каждого
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in animation-delay-600">
          <Button size="lg" asChild className="bg-white text-[#FF6600] hover:bg-gray-100">
            <a href="tel:+79805557580" className="flex items-center gap-2">
              <Icon name="Phone" size={20} />
              Позвонить
            </a>
          </Button>
          <Button size="lg" onClick={onConsultationClick} className="bg-[#FF6600]/90 text-white hover:bg-[#FF6600] border-2 border-white">
            Бесплатная консультация
          </Button>
          <Button size="lg" className="bg-white text-[#FF6600] hover:bg-gray-100" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Наши услуги
          </Button>
        </div>
      </div>
    </section>
  );
}

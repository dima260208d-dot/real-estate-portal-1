import { useState, useEffect } from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import AboutUs from '@/components/home/AboutUs';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';

import StepsSection from '@/components/home/StepsSection';
import ApplicationForm from '@/components/home/ApplicationForm';
import FAQSection from '@/components/home/FAQSection';
import ContactsSection from '@/components/home/ContactsSection';
import Footer from '@/components/home/Footer';
import ServiceModal from '@/components/home/ServiceModal';
import ChatBot from '@/components/ChatBot';


const services = [
  { id: 'sale', title: 'Продать квартиру', icon: 'Home', description: 'Поможем быстро и выгодно продать вашу недвижимость' },
  { id: 'buy', title: 'Купить недвижимость', icon: 'Key', description: 'Подберем идеальный вариант под ваши требования' },
  { id: 'mortgage', title: 'Оформление ипотеки', icon: 'CreditCard', description: 'Одобрение ипотеки в ведущих банках' },
  { id: 'legal', title: 'Юридическое сопровождение', icon: 'Scale', description: 'Полная юридическая чистота сделки' },
  { id: 'rent', title: 'Сдать квартиру', icon: 'Building', description: 'Поиск надежных арендаторов' },
  { id: 'insurance', title: 'Страхование ипотеки', icon: 'Shield', description: 'Выгодные условия страхования' },
  { id: 'pledge', title: 'Деньги под залог', icon: 'Wallet', description: 'Быстрое получение средств под залог недвижимости' },
  { id: 'valuation', title: 'Оценить недвижимость', icon: 'Calculator', description: 'Профессиональная оценка объекта' },
  { id: 'contract', title: 'Оформить договор купли-продажи', icon: 'FileText', description: 'Юридически грамотное составление договоров' },
  { id: 'newbuilding', title: 'Новостройки без комиссии', icon: 'Building2', description: 'Прямые продажи от застройщиков' }
];

const faqs = [
  { q: 'Сколько стоят Ваши услуги по продаже квартиры?', a: 'Стоимость зависит от типа и сложности сделки. В среднем комиссия составляет 2% от стоимости продажи. Оплата услуг исключительно по факту сделки. Консультация всегда бесплатная. Оставьте заявку или позвоните для более точного расчета.' },
  { q: 'Сколько по времени длится продажа квартиры?', a: 'По нашему опыту, при наличии качественной рекламы, оперативных показов, знании тонкостей рынка недвижимости,- срок продажи квартиры в среднем составляет 2 месяца. Кроме того, необходимо понимать, что каждая сделка индивидуальна, со своими нюансами, документами и людьми.' },
  { q: 'Нужен ли юрист при покупке квартиры?', a: 'Да, юридическое сопровождение обязательно! Это защитит вас от рисков потери денег или утраты права собственности.' },
  { q: 'Какие документы нужны для ипотеки?', a: 'Паспорт, справка о доходах 2-НДФЛ, трудовая книжка/договор, СНИЛС. Полный список зависит от банка.' },
  { q: 'Проверяете ли вы юридическую чистоту квартиры?', a: 'Да! Мы проверяем: историю собственников, обременения, долги, законность перепланировок, права третьих лиц, предбанкротное состояние, банкротство и мн.др.' },
  { q: 'Работаете ли вы с материнским капиталом?', a: 'Да, помогаем оформить покупку с использованием маткапитала, сопровождаем все этапы.' },
  { q: 'Какие типы страхования вы предлагаете?', a: 'Мы предлагаем различные типы страхования: жизнь и здоровье, имущество, титульное страхование, а также комплексные программы.' }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onApplicationClick={scrollToForm} />
      <HeroSection onConsultationClick={scrollToForm} />
      <AboutUs />
      <WhyChooseUs />
      <ServicesSection services={services} onServiceClick={handleServiceClick} />
      <Testimonials />
      <StepsSection />
      <ApplicationForm services={services} />
      <FAQSection faqs={faqs} />
      <ContactsSection />
      <Footer />
      <ChatBot />
      <ServiceModal isOpen={isOpen} onOpenChange={setIsOpen} selectedService={selectedService} />
    </div>
  );
}
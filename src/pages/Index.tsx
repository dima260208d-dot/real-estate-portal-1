import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const services = [
  { id: 'sale', title: 'Продажа квартиры', icon: 'Home', description: 'Поможем быстро и выгодно продать вашу недвижимость' },
  { id: 'buy', title: 'Покупка недвижимости', icon: 'Key', description: 'Подберем идеальный вариант под ваши требования' },
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
  { q: 'Сколько стоят ваши услуги?', a: 'Стоимость услуг зависит от типа сделки. Консультация всегда бесплатная. Позвоните нам для расчета точной стоимости.' },
  { q: 'Как долго длится сделка купли-продажи?', a: 'В среднем 2-4 недели с момента подачи документов до получения выписки из ЕГРН. Мы ускоряем процесс благодаря опыту.' },
  { q: 'Нужен ли юрист при покупке квартиры?', a: 'Да, юридическое сопровождение обязательно! Это защитит вас от рисков: обременений, долгов, незаконных перепланировок.' },
  { q: 'Какие документы нужны для ипотеки?', a: 'Паспорт, справка о доходах 2-НДФЛ, трудовая книжка/договор, СНИЛС. Полный список зависит от банка.' },
  { q: 'Проверяете ли вы юридическую чистоту квартиры?', a: 'Да! Мы проверяем: историю собственников, обременения, долги, законность перепланировок, права третьих лиц.' },
  { q: 'Работаете ли вы с материнским капиталом?', a: 'Да, помогаем оформить покупку с использованием маткапитала, сопровождаем все этапы.' }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const isWorkingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 20;
  };

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setFormData({ ...formData, service: service.title });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Необходимо согласие на обработку данных');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 15 минут!');
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        setAgreed(false);
      } else {
        toast.error('Ошибка отправки заявки. Попробуйте позже.');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
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
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР Недвижимость" className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">ЮР Недвижимость</h1>
              <p className="text-xs text-gray-500">Юрист Риэлтор Недвижимость</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <a href="#services" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">Услуги</a>
            <a href="#faq" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">FAQ</a>
            <a href="#contacts" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">Контакты</a>
            <Button onClick={scrollToForm} className="bg-[#FF6600] hover:bg-[#FF7720] text-white">
              Подать заявку
            </Button>
            <Button variant="outline" className="border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white" onClick={() => window.location.href = '/login'}>
              Вход
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/85 via-[#FF6600]/75 to-[#FF8833]/65 z-10" />
        <div className="absolute inset-0 bg-[url('/img/952939ad-8b7d-4630-b375-5b90f91be222.jpg')] bg-cover bg-center" />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">ЮР Недвижимость</h1>
          <h2 className="text-2xl md:text-3xl mb-4 animate-fade-in animation-delay-200">
            Юрист Риэлтор Недвижимость
          </h2>
          <p className="text-lg md:text-xl mb-8 animate-fade-in animation-delay-400">
            Ваш надежный партнер на рынке недвижимости Воронежа. Полный цикл услуг с 2010 года.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in animation-delay-600">
            <Button size="lg" asChild className="bg-white text-[#FF6600] hover:bg-gray-100">
              <a href="tel:+79805557580" className="flex items-center gap-2">
                <Icon name="Phone" size={20} />
                Позвонить
              </a>
            </Button>
            <Button size="lg" onClick={scrollToForm} className="bg-[#FF6600]/90 text-white hover:bg-[#FF6600] border-2 border-white">
              Бесплатная консультация
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#FF6600]" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Наши услуги
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A] animate-on-scroll">Почему выбирают нас?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'ShieldCheck', title: 'Юридическая чистота', text: 'Все сделки проходят юридическую экспертизу' },
              { icon: 'Briefcase', title: 'Полный комплекс', text: 'От оценки до получения ключей в одном месте' },
              { icon: 'Award', title: 'Опыт 14+ лет', text: 'Более 5000 успешных сделок с 2010 года' },
              { icon: 'Clock', title: 'Работаем 24/7', text: 'Принимаем заявки онлайн в любое время' }
            ].map((item, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll border-t-4 border-t-[#FF6600]">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#FF6600] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A] animate-on-scroll">Наши услуги</h2>
          <p className="text-center text-gray-600 mb-16 animate-on-scroll">Полный спектр услуг на рынке недвижимости</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, i) => (
              <Card
                key={service.id}
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FF6600] animate-on-scroll group"
                onClick={() => handleServiceClick(service)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-[#FF6600]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#FF6600] transition-colors">
                    <Icon name={service.icon} size={28} className="text-[#FF6600] group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A] animate-on-scroll">5 простых шагов</h2>
          <div className="max-w-4xl mx-auto">
            {[
              { icon: 'MessageSquare', title: 'Заявка и консультация', text: 'Оставляете заявку, мы перезваниваем и консультируем бесплатно' },
              { icon: 'Search', title: 'Подбор вариантов', text: 'Подбираем лучшие объекты под ваши требования' },
              { icon: 'FileCheck', title: 'Юридическая проверка', text: 'Проверяем чистоту сделки и согласовываем условия' },
              { icon: 'PenTool', title: 'Оформление сделки', text: 'Оформляем все документы и проводим расчеты' },
              { icon: 'KeyRound', title: 'Получение ключей', text: 'Регистрируем сделку и передаем ключи' }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 mb-8 animate-on-scroll">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">{step.title}</h3>
                  <p className="text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A] animate-on-scroll">Оставьте заявку</h2>
          <p className="text-center text-gray-600 mb-8 animate-on-scroll">Мы перезвоним в течение 15 минут!</p>
          <Card className="animate-on-scroll shadow-xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">ФИО *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="service">Услуга *</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Детали заявки</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Опишите вашу ситуацию, пожелания, бюджет..."
                    rows={4}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                  <Label htmlFor="agree" className="text-sm cursor-pointer">
                    Я согласен на обработку персональных данных
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-[#FF6600] hover:bg-[#FF7720] text-white" size="lg">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A] animate-on-scroll">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4 animate-on-scroll">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-lg px-6 border-l-4 border-l-[#FF6600]">
                <AccordionTrigger className="text-left font-semibold hover:text-[#FF6600]">
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

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A] animate-on-scroll">Наши контакты</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 animate-on-scroll">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Phone" className="text-[#FF6600]" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+79805557580" className="text-xl font-semibold text-[#FF6600] hover:underline">
                    +7 980 555 75 80
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Mail" className="text-[#FF6600]" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:yur.nedv@mail.com" className="text-xl font-semibold text-[#FF6600] hover:underline">
                    yur.nedv@mail.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="MapPin" className="text-[#FF6600]" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Московский проспект, д. 114 В, офис 200</p>
                  <p className="text-gray-600">Воронеж</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Clock" className="text-[#FF6600]" />
                    График работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-2">Ежедневно с 10:00 до 20:00</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isWorkingHours() ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={isWorkingHours() ? 'text-green-600' : 'text-red-600'}>
                      {isWorkingHours() ? 'Сейчас открыто' : 'Сейчас закрыто'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Мы в соцсетях</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a
                      href="https://vk.com/yur.nedv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <span className="text-white text-xl font-bold">VK</span>
                    </a>
                    <a
                      href="https://t.me/yur_nedv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Icon name="Send" className="text-white" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР Недвижимость" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-bold text-lg">ЮР Недвижимость</h3>
                  <p className="text-xs text-gray-400">С 2010 года</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Полный комплекс услуг на рынке недвижимости Воронежа</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2 text-sm">
                <a href="#services" className="block text-gray-400 hover:text-[#FF6600] transition-colors">Услуги</a>
                <a href="#faq" className="block text-gray-400 hover:text-[#FF6600] transition-colors">FAQ</a>
                <a href="#contacts" className="block text-gray-400 hover:text-[#FF6600] transition-colors">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+7 980 555 75 80</p>
                <p>yur.nedv@mail.com</p>
                <div className="flex gap-3 mt-4">
                  <a href="https://vk.com/yur.nedv" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6600] transition-colors">VK</a>
                  <a href="https://t.me/yur_nedv" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6600] transition-colors">Telegram</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© ЮР Недвижимость, 2024. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedService && <Icon name={selectedService.icon} className="text-[#FF6600]" size={32} />}
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="modal-name">ФИО *</Label>
              <Input
                id="modal-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div>
              <Label htmlFor="modal-phone">Телефон *</Label>
              <Input
                id="modal-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div>
              <Label htmlFor="modal-email">Email *</Label>
              <Input
                id="modal-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <Label htmlFor="modal-message">Детали услуги</Label>
              <Textarea
                id="modal-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите подробнее о вашей ситуации..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="modal-agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
              <Label htmlFor="modal-agree" className="text-sm cursor-pointer">
                Я согласен на обработку персональных данных
              </Label>
            </div>
            <Button type="submit" className="w-full bg-[#FF6600] hover:bg-[#FF7720] text-white" size="lg">
              Заказать услугу
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
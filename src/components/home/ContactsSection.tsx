import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const isWorkingHours = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 20;
  };

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground animate-on-scroll">Наши контакты</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 animate-on-scroll">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+79805557580" className="text-xl font-semibold text-primary hover:underline">
                  +7 980 555 75 80
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Mail" className="text-secondary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:yur.nedv@mail.ru" className="text-xl font-semibold text-secondary hover:underline">
                  yur.nedv@mail.ru
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Московский пр-т, д. 114 В, офис 200</p>
                <p className="text-gray-600">Воронеж</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon name="Clock" className="text-secondary" />
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
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span className="text-white text-xl font-bold">VK</span>
                  </a>
                  <a
                    href="https://t.me/yur_nedv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/50"
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
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

export default function MobileApp() {
  const features = [
    {
      icon: 'Home',
      title: 'Поиск недвижимости',
      description: 'Просматривайте объявления и подбирайте квартиры прямо в приложении'
    },
    {
      icon: 'Bell',
      title: 'Push-уведомления',
      description: 'Получайте мгновенные уведомления об изменении статуса заявки'
    },
    {
      icon: 'MessageCircle',
      title: 'Чат со специалистом',
      description: 'Общайтесь с персональным менеджером в любое время'
    },
    {
      icon: 'CreditCard',
      title: 'Онлайн-оплата',
      description: 'Оплачивайте услуги безопасно прямо из приложения'
    },
    {
      icon: 'FileText',
      title: 'Личный кабинет',
      description: 'Следите за статусом заявок и храните все документы в одном месте'
    },
    {
      icon: 'Phone',
      title: 'Быстрая связь',
      description: 'Звоните специалистам в один клик без ввода номера'
    }
  ];

  const screenshots = [
    {
      title: 'Главный экран',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    },
    {
      title: 'Личный кабинет',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    },
    {
      title: 'Чат',
      image: 'https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg'
    }
  ];

  const handleDownloadIOS = () => {
    window.open('https://apps.apple.com', '_blank');
  };

  const handleDownloadAndroid = () => {
    window.open('https://play.google.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onApplicationClick={() => {}} />
      
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Мобильное приложение <span className="text-primary">ЮР недвижимость</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Управляйте недвижимостью, отслеживайте сделки и общайтесь со специалистами прямо с телефона
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-black/90 text-white px-8"
                  onClick={handleDownloadIOS}
                >
                  <Icon name="Apple" size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Загрузить в</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </Button>
                
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                  onClick={handleDownloadAndroid}
                >
                  <Icon name="Smartphone" size={24} className="mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Доступно в</div>
                    <div className="text-base font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">4.8</span>
                  <span>рейтинг</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Download" size={18} className="text-primary" />
                  <span className="font-semibold">10,000+</span>
                  <span>установок</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="aspect-[9/19] bg-gray-900 rounded-3xl overflow-hidden border-8 border-gray-900">
                  <img 
                    src="https://cdn.poehali.dev/files/7d330913-0577-479e-bd95-ea105020552c.jpeg"
                    alt="Приложение ЮР недвижимость"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Возможности приложения
            </h2>
            <p className="text-xl text-gray-600">
              Всё необходимое для работы с недвижимостью в одном приложении
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Скриншоты приложения
            </h2>
            <p className="text-xl text-gray-600">
              Простой и понятный интерфейс
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[9/19] bg-gray-900 rounded-3xl overflow-hidden border-8 border-gray-900 shadow-xl group-hover:shadow-2xl transition-shadow">
                  <img 
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center mt-4 font-semibold text-gray-700">{screenshot.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Скачайте приложение прямо сейчас
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Начните управлять недвижимостью удобнее уже сегодня
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-black hover:bg-black/90 text-white px-8"
              onClick={handleDownloadIOS}
            >
              <Icon name="Apple" size={24} className="mr-3" />
              <div className="text-left">
                <div className="text-xs">Загрузить в</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-gray-900 px-8"
              onClick={handleDownloadAndroid}
            >
              <Icon name="Smartphone" size={24} className="mr-3" />
              <div className="text-left">
                <div className="text-xs">Доступно в</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Icon name="Shield" size={40} className="mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold text-lg mb-2">Безопасность</h3>
                <p className="text-sm opacity-80">Все данные защищены и зашифрованы</p>
              </div>
              <div>
                <Icon name="Zap" size={40} className="mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold text-lg mb-2">Быстрота</h3>
                <p className="text-sm opacity-80">Мгновенный доступ ко всем функциям</p>
              </div>
              <div>
                <Icon name="Heart" size={40} className="mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold text-lg mb-2">Удобство</h3>
                <p className="text-sm opacity-80">Интуитивный интерфейс для всех</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

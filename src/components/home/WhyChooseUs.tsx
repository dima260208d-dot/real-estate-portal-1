import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function WhyChooseUs() {
  const features = [
    { icon: 'TrendingUp', title: 'Мы продаем Вашу квартиру, а не мечты', text: 'Не рисуем воздушные замки, а даем честную рыночную цену и реальный план продаж' },
    { icon: 'Shield', title: 'Берем на себя ваш стресс, как свой', text: 'Каждая сделка — это нервный марафон: реклама, звонки, показы, торги, банк, регистрация. Наша работа — быть вашим щитом' },
    { icon: 'Eye', title: 'Мы видим на три шага вперед', text: '«Подводные камни» есть в каждой второй сделке. Наш опыт — это ваш зонтик, который раскрывается до начала дождя' },
    { icon: 'FileCheck', title: 'Работаем с полной прозрачностью', text: 'Вы в курсе каждого шага. Отчеты о показах, все контакты с покупателями. Вы не будете месяц гадать «ну как там?»' }
  ];

  return (
    <section className="py-20 bg-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white animate-on-scroll">Почему выбирают нас— и остаются на годы</h2>
        <p className="text-center text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-on-scroll">
          Юрист и риэлтор для эффективного решения Ваших задач
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <Card key={i} className="text-center hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-on-scroll border-t-4 border-t-secondary">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/50">
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
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function WhyChooseUs() {
  const features = [
    { icon: 'ShieldCheck', title: 'Юридическая чистота', text: 'Все сделки проходят юридическую экспертизу' },
    { icon: 'Briefcase', title: 'Полный комплекс', text: 'От оценки до получения ключей в одном месте' },
    { icon: 'Award', title: 'Опытные специалисты', text: 'Более 5000 успешных сделок в Воронеже' },
    { icon: 'Clock', title: 'Работаем 24/7', text: 'Принимаем заявки онлайн в любое время' }
  ];

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A] animate-on-scroll">Почему выбирают нас?</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
          Юрист и риэлтор для эффективного решения Ваших задач
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
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
  );
}
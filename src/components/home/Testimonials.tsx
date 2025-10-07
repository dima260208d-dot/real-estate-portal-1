import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Клиент',
      service: 'Покупка квартиры',
      rating: 5,
      text: 'Огромное спасибо риэлтору Ольге Коваленко из ЮР недвижимость! Помогла найти идеальную квартиру в центре города. Особенно порадовало что все документы проверены вдоль и поперек. Спасибо.',
      date: '07.10.2025'
    },
    {
      name: 'Мария Соколова',
      service: 'Покупка квартиры',
      rating: 5,
      text: 'Огромное спасибо команде ЮР недвижимость! Помогли найти идеальную квартиру в центре города. Особенно порадовало юридическое сопровождение — все документы проверили до мелочей. Чувствовала себя в безопасности на всех этапах сделки.',
      date: '15.09.2024'
    },
    {
      name: 'Алексей Петров',
      service: 'Продажа квартиры',
      rating: 5,
      text: 'Продавал квартиру впервые и очень волновался. Ребята взяли всё на себя: от оценки до поиска покупателей. Продали за месяц по хорошей цене! Профессионалы своего дела, рекомендую!',
      date: '02.10.2024'
    },
    {
      name: 'Елена Иванова',
      service: 'Оформление ипотеки',
      rating: 5,
      text: 'Не верила, что мне одобрят ипотеку с моими доходами. Специалисты ЮР недвижимость помогли правильно оформить все документы, подобрали выгодную программу в банке. Теперь я — счастливая обладательница своей квартиры!',
      date: '20.09.2024'
    },
    {
      name: 'Дмитрий Козлов',
      service: 'Юридическое сопровождение',
      rating: 5,
      text: 'Обратился за юридической консультацией по наследственной недвижимости. Запутанная ситуация была решена быстро и грамотно. Отличные юристы, знают все нюансы законодательства!',
      date: '10.10.2024'
    },
    {
      name: 'Ольга Смирнова',
      service: 'Сдача квартиры в аренду',
      rating: 5,
      text: 'Помогли найти надёжных арендаторов для моей квартиры. Составили грамотный договор, провели все проверки. Теперь спокойно получаю доход от сдачи в аренду. Спасибо за профессионализм!',
      date: '28.09.2024'
    },
    {
      name: 'Сергей Николаев',
      service: 'Покупка коммерческой недвижимости',
      rating: 5,
      text: 'Искал помещение под бизнес. Специалисты подобрали несколько отличных вариантов, помогли с проверкой документов и торгом. Сделка прошла чисто, без единой проблемы. Профи!',
      date: '05.10.2024'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">
            Отзывы наших клиентов
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Мы ценим доверие каждого клиента и гордимся результатами нашей работы
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-shadow animate-on-scroll"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={18} />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.service}</p>
                      </div>
                      <div className="text-xs text-gray-400">{testimonial.date}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center animate-on-scroll">
            <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-xl">
              <Icon name="MessageCircle" className="text-primary" size={24} />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Хотите оставить отзыв?</p>
                <p className="text-sm text-gray-600">Напишите нам на yur.nedv@mail.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
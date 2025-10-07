import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ReviewForm from '@/components/ReviewForm';

export default function Testimonials() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const testimonials = [
    {
      name: 'Александр',
      service: 'Покупка квартиры',
      rating: 5,
      text: 'Ольга настоящий профессионал своего дела. Несмотря на очень сложную ситуацию с покупкой квартиры, множество подводных камней и постоянно меняющиеся обстоятельства, Оля всегда была на связи, помогла решить все вопросы и провела нас через все этапы покупки квартиры. Тот самый случай, когда все отзывы абсолютно честные и рейтинг 5.0 оправдан на 100%. Если когда-то решимся на покупку ещё одной квартиры в Воронеже, то только с Олей.',
      date: '02.12.2024'
    },
    {
      name: 'Алёна',
      service: 'Сопровождение сделки',
      rating: 5,
      text: 'Ольга Коваленко - Лучший риэлтор которого я встречала! ❤️‍🔥 Оперативная работа риэлтора на высшем уровне, знает как достать нужные справки быстрее и по умному. Ольга - отличный специалист и человек, сама предложила отвести и привести по всем нужным местам по сборке документов «не за деньги». С ней просто и легко в общении, может расположить к себе людей своей харизмой и оптимизмом. Спасибо Вам большое 💫🍀',
      date: '13.07.2025'
    },
    {
      name: 'Светлана Д.',
      service: 'Покупка квартиры',
      rating: 5,
      text: 'Огромное спасибо риэлтору Ольге Коваленко из ЮР недвижимость! Помогла найти идеальную квартиру в центре города. Особенно порадовало что все документы проверены вдоль и поперек. Спасибо.',
      date: '07.10.2025'
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
            Отзывы клиентов
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Отзывы на сайте из официальных источников: Авито, Яндекс
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
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              size="lg"
              className="gap-2"
            >
              <Icon name="MessageCircle" size={20} />
              {showReviewForm ? 'Скрыть форму' : 'Оставить отзыв'}
            </Button>
          </div>

          {showReviewForm && (
            <div className="mt-8 animate-on-scroll">
              <ReviewForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
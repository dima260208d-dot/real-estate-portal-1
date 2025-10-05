import Icon from '@/components/ui/icon';

export default function AboutUs() {
  const stats = [
    { value: '500+', label: 'Успешных сделок', icon: 'HandshakeIcon' },
    { value: '12+', label: 'Лет опыта', icon: 'Award' },
    { value: '98%', label: 'Довольных клиентов', icon: 'ThumbsUp' },
    { value: '24/7', label: 'Поддержка', icon: 'Clock' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">О нас</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Профессиональная команда юристов и риэлторов с многолетним опытом работы на рынке недвижимости
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12 items-center">
            <div className="animate-on-scroll">
              <img 
                src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" 
                alt="ЮР недвижимость" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>

            <div className="space-y-6 animate-on-scroll">
              <h3 className="text-3xl font-bold text-gray-900">
                ЮР недвижимость — Профессионализм в квадратах
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Мы — команда профессионалов, объединяющая юридическую экспертизу и глубокое понимание рынка недвижимости. 
                Наша миссия — делать сделки с недвижимостью простыми, безопасными и выгодными для наших клиентов.
              </p>

              <p className="text-gray-700 leading-relaxed">
                За годы работы мы помогли сотням семей найти дом мечты, продать недвижимость на выгодных условиях 
                и юридически грамотно оформить все документы. Наш комплексный подход позволяет решать любые задачи 
                с недвижимостью под ключ.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Юридическая безопасность</h4>
                    <p className="text-gray-600 text-sm">Полное сопровождение сделки от проверки документов до регистрации</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Экспертиза рынка</h4>
                    <p className="text-gray-600 text-sm">Актуальная аналитика и оценка недвижимости в Воронеже</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Индивидуальный подход</h4>
                    <p className="text-gray-600 text-sm">Решения, учитывающие ваши потребности и возможности</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow animate-on-scroll"
              >
                <Icon name={stat.icon} className="mx-auto mb-3 text-primary" size={40} />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

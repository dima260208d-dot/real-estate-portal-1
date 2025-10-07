import Icon from '@/components/ui/icon';

export default function AboutUs() {
  const stats = [
    { value: '900+', label: 'Успешных сделок', icon: 'HandshakeIcon' },
    { value: 'С 2012', label: 'Года опыта', icon: 'Award' },
    { value: '98%', label: 'Довольных клиентов', icon: 'ThumbsUp' },
    { value: 'Всегда', label: 'На связи', icon: 'Clock' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">О нас</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Делаем процесс продажи и покупки недвижимости простым и понятным для каждого
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
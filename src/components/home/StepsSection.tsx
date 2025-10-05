export default function StepsSection() {
  const steps = [
    { icon: 'MessageSquare', title: 'Оценка и консультация', text: 'Определяем реальную цену продажи, обсуждаем стратегию продажи' },
    { icon: 'Camera', title: 'Подготовка к продаже', text: 'Профессиональные фото, составление объявления и размещение на всех площадках' },
    { icon: 'Users', title: 'Показы и переговоры', text: 'Проводим показы, фильтруем покупателей и торгуемся за максимальную цену' },
    { icon: 'FileCheck', title: 'Юридическое сопровождение', text: 'Проверяем документы, готовим договор и обеспечиваем безопасность сделки' },
    { icon: 'CheckCircle', title: 'Получение денег', text: 'Регистрируем сделку в Росреестре и передаем Вам деньги' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground animate-on-scroll">5 простых шагов</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 mb-8 animate-on-scroll group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-primary group-hover:shadow-lg group-hover:shadow-primary/50' : 'bg-secondary group-hover:shadow-lg group-hover:shadow-secondary/50'} rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 group-hover:scale-110`}>
                  {i + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
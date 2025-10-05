export default function StepsSection() {
  const steps = [
    { icon: 'MessageSquare', title: 'Заявка и консультация', text: 'Оставляете заявку, мы перезваниваем и консультируем бесплатно' },
    { icon: 'Search', title: 'Подбор вариантов', text: 'Подбираем лучшие объекты под ваши требования' },
    { icon: 'FileCheck', title: 'Юридическая проверка', text: 'Проверяем чистоту сделки и согласовываем условия' },
    { icon: 'PenTool', title: 'Оформление сделки', text: 'Оформляем все документы и проводим расчеты' },
    { icon: 'KeyRound', title: 'Получение ключей', text: 'Регистрируем сделку и передаем ключи' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground animate-on-scroll">5 простых шагов</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 mb-8 animate-on-scroll">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
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
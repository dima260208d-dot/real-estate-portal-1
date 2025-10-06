import Icon from '@/components/ui/icon';

export default function GuaranteeSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center animate-on-scroll shadow-lg">
            <Icon name="CheckCircle" className="mx-auto mb-6 text-primary" size={56} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Гарантия организации сделки как себе
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Все наши специалисты имеют соответствующее образование и опыт работы. 
              Мы несём полную ответственность за организацию каждой сделки.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={20} />
                <span className="font-medium">Проверенные специалисты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={20} />
                <span className="font-medium">Страхование сделок</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={20} />
                <span className="font-medium">Официальные документы</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

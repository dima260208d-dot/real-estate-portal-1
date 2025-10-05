import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const certificates = [
    {
      title: 'Свидетельство о регистрации ООО',
      description: 'ООО «ЮрИЭлТи» ИНН 3662311194',
      icon: 'FileCheck',
      type: 'document'
    },
    {
      title: 'Членство в РГР',
      description: 'Российская Гильдия Риэлторов',
      icon: 'Award',
      type: 'membership'
    },
    {
      title: 'Лицензия юриста',
      description: 'Право на оказание юридических услуг',
      icon: 'Scale',
      type: 'license'
    },
    {
      title: 'Сертификат риэлтора',
      description: 'Квалификация специалиста по недвижимости',
      icon: 'Home',
      type: 'certificate'
    },
    {
      title: 'Страхование ответственности',
      description: 'Полис профессиональной ответственности',
      icon: 'Shield',
      type: 'insurance'
    },
    {
      title: 'Партнёр банков',
      description: 'Аккредитация в ведущих банках России',
      icon: 'Building',
      type: 'partnership'
    }
  ];

  const achievements = [
    {
      year: '2012',
      title: 'Основание компании',
      description: 'Начало работы на рынке недвижимости Воронежа'
    },
    {
      year: '2015',
      title: 'Членство в РГР',
      description: 'Вступление в Российскую Гильдию Риэлторов'
    },
    {
      year: '2018',
      title: '300+ сделок',
      description: 'Преодолена отметка в 300 успешных сделок'
    },
    {
      year: '2024',
      title: '500+ сделок',
      description: 'Более 500 довольных клиентов по всей России'
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 animate-on-scroll">
            Сертификаты и лицензии
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-on-scroll">
            Наша деятельность подтверждена всеми необходимыми документами и лицензиями
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {certificates.map((cert, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-on-scroll cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon name={cert.icon} className="text-primary" size={32} />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {cert.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center animate-on-scroll">
            <Icon name="CheckCircle" className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              Гарантия юридической чистоты
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-4">
              Все наши специалисты имеют соответствующее образование и опыт работы. 
              Мы несём полную ответственность за юридическую чистоту каждой сделки.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={16} />
                <span>Проверенные специалисты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={16} />
                <span>Страхование сделок</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" className="text-green-500" size={16} />
                <span>Официальные документы</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
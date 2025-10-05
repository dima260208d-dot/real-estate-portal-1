import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  price: string;
  area: string;
  rooms: string;
  floor: string;
  address: string;
  description: string;
  image: string;
  type: 'квартира' | 'дом' | 'участок';
}

const properties: Property[] = [
  {
    id: 1,
    title: '2-комнатная квартира в центре',
    price: '8 500 000 ₽',
    area: '65 м²',
    rooms: '2 комнаты',
    floor: '5/9 этаж',
    address: 'ул. Ленина, 45',
    description: 'Просторная квартира с ремонтом, панорамные окна, развитая инфраструктура',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    type: 'квартира'
  },
  {
    id: 2,
    title: '3-комнатная квартира с видом на парк',
    price: '12 000 000 ₽',
    area: '95 м²',
    rooms: '3 комнаты',
    floor: '12/16 этаж',
    address: 'пр. Победы, 120',
    description: 'Современный ЖК, дизайнерский ремонт, панорамное остекление',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    type: 'квартира'
  },
  {
    id: 3,
    title: 'Загородный дом с участком',
    price: '18 500 000 ₽',
    area: '200 м²',
    rooms: '5 комнат',
    floor: '2 этажа',
    address: 'КП "Зеленая долина"',
    description: 'Дом из кирпича, 10 соток земли, баня, гараж на 2 авто',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    type: 'дом'
  },
  {
    id: 4,
    title: 'Студия в новостройке',
    price: '4 200 000 ₽',
    area: '32 м²',
    rooms: 'студия',
    floor: '7/17 этаж',
    address: 'ЖК "Современник"',
    description: 'Отличный вариант для инвестиций, сдается под ключ',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    type: 'квартира'
  }
];

export default function PropertyListings() {
  const [selectedType, setSelectedType] = useState<'все' | 'квартира' | 'дом' | 'участок'>('все');

  const filteredProperties = selectedType === 'все' 
    ? properties 
    : properties.filter(p => p.type === selectedType);

  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-on-scroll">
          <h2 className="text-4xl font-bold text-foreground mb-4">Доска объявлений</h2>
          <p className="text-gray-600 text-lg">Актуальные предложения по продаже недвижимости</p>
        </div>

        <div className="flex justify-center gap-3 mb-8 flex-wrap animate-on-scroll">
          <Button 
            variant={selectedType === 'все' ? 'default' : 'outline'}
            onClick={() => setSelectedType('все')}
            className={selectedType === 'все' ? 'bg-primary hover:bg-primary/90' : ''}
          >
            Все
          </Button>
          <Button 
            variant={selectedType === 'квартира' ? 'default' : 'outline'}
            onClick={() => setSelectedType('квартира')}
            className={selectedType === 'квартира' ? 'bg-primary hover:bg-primary/90' : ''}
          >
            Квартиры
          </Button>
          <Button 
            variant={selectedType === 'дом' ? 'default' : 'outline'}
            onClick={() => setSelectedType('дом')}
            className={selectedType === 'дом' ? 'bg-primary hover:bg-primary/90' : ''}
          >
            Дома
          </Button>
          <Button 
            variant={selectedType === 'участок' ? 'default' : 'outline'}
            onClick={() => setSelectedType('участок')}
            className={selectedType === 'участок' ? 'bg-primary hover:bg-primary/90' : ''}
          >
            Участки
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-on-scroll">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-white">
                  {property.type}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary whitespace-nowrap">{property.price}</div>
                </div>
                <CardDescription className="flex items-center gap-2 text-gray-500 mt-2">
                  <Icon name="MapPin" size={16} />
                  {property.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Площадь</div>
                    <div className="font-semibold">{property.area}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Комнаты</div>
                    <div className="font-semibold">{property.rooms}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Этаж</div>
                    <div className="font-semibold">{property.floor}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Узнать подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
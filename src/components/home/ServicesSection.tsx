import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

export default function ServicesSection({ services, onServiceClick }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground animate-on-scroll">Наши услуги</h2>
        <p className="text-center text-gray-600 mb-16 animate-on-scroll">Полный спектр услуг на рынке недвижимости</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card
              key={service.id}
              className={`cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${i % 2 === 0 ? 'hover:border-primary hover:shadow-primary/20' : 'hover:border-secondary hover:shadow-secondary/20'} animate-on-scroll group`}
              onClick={() => onServiceClick(service)}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-14 h-14 ${i % 2 === 0 ? 'bg-primary/10 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/50' : 'bg-secondary/10 group-hover:bg-secondary group-hover:shadow-lg group-hover:shadow-secondary/50'} rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110`}>
                  <Icon name={service.icon} size={28} className={`${i % 2 === 0 ? 'text-primary' : 'text-secondary'} group-hover:text-white transition-colors`} />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
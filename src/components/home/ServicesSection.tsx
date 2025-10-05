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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, i) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary animate-on-scroll group"
              onClick={() => onServiceClick(service)}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                  <Icon name={service.icon} size={28} className="text-primary group-hover:text-white transition-colors" />
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
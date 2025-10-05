import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  { value: 'sale', label: 'Продажа квартиры', price: 'от 2%' },
  { value: 'buy', label: 'Покупка недвижимости', price: 'от 50 000 ₽' },
  { value: 'mortgage', label: 'Оформление ипотеки', price: 'от 30 000 ₽' },
  { value: 'legal', label: 'Юридическое сопровождение', price: 'от 25 000 ₽' },
  { value: 'rent', label: 'Аренда квартиры', price: 'от 15 000 ₽' },
  { value: 'insurance', label: 'Страхование ипотеки', price: 'по запросу' },
  { value: 'valuation', label: 'Оценка недвижимости', price: 'от 5 000 ₽' },
  { value: 'contract', label: 'Договор купли-продажи', price: 'от 10 000 ₽' }
];

export default function PaymentForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    service: '',
    amount: '',
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.service || !formData.amount || !formData.name || !formData.email || 
        !formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    // Здесь должна быть интеграция с платежной системой
    toast({
      title: "Платеж обрабатывается",
      description: "Ваш платеж будет обработан в ближайшее время. Мы отправим подтверждение на вашу почту."
    });

    // Сброс формы
    setFormData({
      service: '',
      amount: '',
      name: '',
      email: '',
      phone: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white" id="payment-form">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-2 border-primary/10">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CreditCard" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Оплата услуг</CardTitle>
            <CardDescription className="text-base mt-2">
              Безопасная оплата банковской картой
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Выбор услуги */}
              <div className="space-y-2">
                <Label htmlFor="service">Услуга *</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label} - {service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Сумма */}
              <div className="space-y-2">
                <Label htmlFor="amount">Сумма к оплате (₽) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Контактные данные */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Контактные данные</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО *</Label>
                    <Input
                      id="name"
                      placeholder="Иванов Иван Иванович"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Данные карты */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Данные банковской карты</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        if (formatted.replace(/\s/g, '').length <= 16) {
                          handleInputChange('cardNumber', formatted);
                        }
                      }}
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Срок действия *</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="ММ/ГГ"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          const formatted = formatExpiry(e.target.value);
                          if (formatted.length <= 5) {
                            handleInputChange('cardExpiry', formatted);
                          }
                        }}
                        maxLength={5}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardCVC">CVC/CVV *</Label>
                      <Input
                        id="cardCVC"
                        type="password"
                        placeholder="123"
                        value={formData.cardCVC}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            handleInputChange('cardCVC', value);
                          }
                        }}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка оплаты */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-6"
                >
                  <Icon name="Lock" size={20} className="mr-2" />
                  Оплатить {formData.amount && `${formData.amount} ₽`}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  <Icon name="Shield" size={16} className="inline mr-1" />
                  Защищенное соединение. Данные карты не сохраняются
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

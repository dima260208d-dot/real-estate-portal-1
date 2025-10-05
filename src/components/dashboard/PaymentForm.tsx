import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    amount: '',
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
    
    if (!formData.amount || !formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
      toast.error('Заполните все поля');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Укажите корректную сумму');
      return;
    }

    toast.success('Платеж обрабатывается', {
      description: 'Ваш платеж будет обработан в ближайшее время'
    });

    setFormData({
      amount: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVC: ''
    });
  };

  return (
    <Card className="shadow-xl border-2 border-primary/10">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CreditCard" size={32} className="text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Оплата услуг</CardTitle>
        <CardDescription className="text-base mt-2">
          Безопасная оплата банковской картой
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Сумма к оплате (₽) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Введите сумму"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              min="0"
              step="0.01"
              className="text-lg"
            />
          </div>

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
  );
}

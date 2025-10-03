import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: Service | null;
}

export default function ServiceModal({ isOpen, onOpenChange, selectedService }: ServiceModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: selectedService?.title || '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Необходимо согласие на обработку данных');
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      const applicationData = {
        ...formData,
        service: selectedService?.title || formData.service,
        user_id: user?.user_id || null
      };

      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 15 минут!');
        onOpenChange(false);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        setAgreed(false);
      } else {
        toast.error('Ошибка отправки заявки. Попробуйте позже.');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {selectedService && <Icon name={selectedService.icon} className="text-[#FF6600]" size={32} />}
            {selectedService?.title}
          </DialogTitle>
          <DialogDescription>
            {selectedService?.description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="modal-name">ФИО *</Label>
            <Input
              id="modal-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Иванов Иван Иванович"
            />
          </div>
          <div>
            <Label htmlFor="modal-phone">Телефон *</Label>
            <Input
              id="modal-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          <div>
            <Label htmlFor="modal-email">Email *</Label>
            <Input
              id="modal-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <Label htmlFor="modal-message">Детали услуги</Label>
            <Textarea
              id="modal-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Расскажите подробнее о вашей ситуации..."
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="modal-agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="modal-agree" className="text-sm cursor-pointer">
              Я согласен на обработку персональных данных
            </Label>
          </div>
          <Button type="submit" className="w-full bg-[#FF6600] hover:bg-[#FF7720] text-white" size="lg">
            Заказать услугу
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: 'Консультация',
        message: formData.message || 'Запрос на консультацию',
        status: 'new'
      };

      const response = await fetch('https://functions.poehali.dev/680c3b01-9d4e-4dee-a366-4c371d7942aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Получить консультацию</h2>
          <p className="text-gray-600">
            Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Ваше имя *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Телефон *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (___) ___-__-__"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.ru"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Сообщение
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Расскажите, чем мы можем помочь..."
              rows={4}
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" className="mr-2 h-4 w-4" />
                Отправить заявку
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">
              политикой конфиденциальности
            </a>
            {' '}и{' '}
            <a href="/personal-data-consent" className="text-primary hover:underline">
              обработкой персональных данных
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    text: ''
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
        phone: '',
        email: 'review@yur-nedv.ru',
        service: `Отзыв: ${formData.service}`,
        message: `Оценка: ${rating}/5\n\n${formData.text}`,
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
          title: 'Спасибо за отзыв!',
          description: 'Ваш отзыв отправлен и будет опубликован после модерации.',
        });
        setFormData({ name: '', service: '', text: '' });
        setRating(5);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить отзыв. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Оставить отзыв</CardTitle>
          <p className="text-center text-gray-600 text-sm">
            Поделитесь впечатлениями о работе с нами
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Ваша оценка *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Icon
                      name="Star"
                      size={32}
                      className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

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
              <label htmlFor="service" className="block text-sm font-medium mb-2">
                Какой услугой воспользовались? *
              </label>
              <Input
                id="service"
                name="service"
                type="text"
                required
                value={formData.service}
                onChange={handleChange}
                placeholder="Покупка квартиры"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium mb-2">
                Ваш отзыв *
              </label>
              <Textarea
                id="text"
                name="text"
                required
                value={formData.text}
                onChange={handleChange}
                placeholder="Расскажите о вашем опыте работы с нами..."
                rows={6}
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
                  Отправить отзыв
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Отзыв будет опубликован после проверки модератором
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewForm;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loginRegex = /^[a-zA-Z0-9_-]+$/;
    if (!loginRegex.test(formData.username)) {
      toast.error('Логин может содержать только латинские буквы, цифры, дефис и подчеркивание');
      return;
    }

    if (formData.username.length < 3) {
      toast.error('Логин должен быть не менее 3 символов');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e2acb26b-07e7-4439-8683-620e06ed06ef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          register: true
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify({
          user_id: data.user_id,
          username: data.username,
          role: data.role
        }));
        toast.success('Регистрация успешна! Перенаправляем в личный кабинет...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        toast.error(data.error || 'Ошибка регистрации');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6600]/10 via-white to-[#FF8833]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" 
              alt="ЮР Недвижимость" 
              className="w-20 h-20 rounded-full"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
          <CardDescription>Создайте личный кабинет клиента</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Только латинские буквы и цифры"
                disabled={loading}
                minLength={3}
              />
              <p className="text-xs text-gray-500 mt-1">Минимум 3 символа, латинские буквы, цифры, дефис и подчеркивание</p>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Не менее 6 символов"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Повторите пароль"
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#FF6600] hover:bg-[#FF7720] text-white" 
              size="lg"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <a href="/login" className="text-[#FF6600] hover:underline font-semibold">
                Войти
              </a>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/'}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться на сайт
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
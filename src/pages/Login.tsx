import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e2acb26b-07e7-4439-8683-620e06ed06ef', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Вход выполнен успешно!');
        window.location.href = '/dashboard';
      } else {
        toast.error('Неверный логин или пароль');
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
              alt="ЮР недвижимость" 
              className="w-20 h-20 rounded-full"
            />
          </div>
          <CardTitle className="text-3xl font-bold">ЮР недвижимость</CardTitle>
          <CardDescription>Вход в личный кабинет</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#FF6600] hover:bg-[#FF7720] text-white" 
              size="lg"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Нет аккаунта?{' '}
              <a href="/register" className="text-[#FF6600] hover:underline font-semibold">
                Зарегистрироваться
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
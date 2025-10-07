import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'specialist';
  timestamp: Date;
}

export default function ClientSupport() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTime, setCallbackTime] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я ваш персональный специалист. Чем могу помочь?',
      sender: 'specialist',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) {
      toast.error('Укажите номер телефона');
      return;
    }
    toast.success('Заявка принята!', {
      description: 'Мы перезвоним вам в ближайшее время'
    });
    setCallbackPhone('');
    setCallbackTime('');
    setIsCallbackOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'client',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const autoReply: Message = {
        id: messages.length + 2,
        text: 'Спасибо за ваше сообщение! Специалист ответит в ближайшее время.',
        sender: 'specialist',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Headphones" className="text-primary" />
            Поддержка и связь
          </CardTitle>
          <CardDescription>
            Нужна помощь? Закажите звонок или напишите в чат
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => setIsCallbackOpen(true)}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Icon name="Phone" size={20} className="mr-2" />
            Заказать звонок
          </Button>
          
          <Button 
            onClick={() => setIsChatOpen(true)}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary/10"
            size="lg"
          >
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Написать специалисту
          </Button>

          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Работаем: Пн-Пт 9:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:yur.nedv@mail.ru" className="text-primary hover:underline">
                  yur.nedv@mail.ru
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Phone" className="text-primary" />
              Заказать обратный звонок
            </DialogTitle>
            <DialogDescription>
              Укажите удобное время, и мы вам перезвоним
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCallbackSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Удобное время (необязательно)</Label>
              <Input
                id="time"
                type="text"
                placeholder="Например: сегодня после 15:00"
                value={callbackTime}
                onChange={(e) => setCallbackTime(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                Заказать звонок
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCallbackOpen(false)}
              >
                Отмена
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Icon name="MessageCircle" className="text-primary" />
              Чат со специалистом
            </DialogTitle>
            <DialogDescription>
              Ответим на ваши вопросы в рабочее время
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'client'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'client' ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Textarea
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Нажмите Enter для отправки, Shift+Enter для новой строки
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
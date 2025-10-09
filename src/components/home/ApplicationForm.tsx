import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  title: string;
}

interface ApplicationFormProps {
  services: Service[];
}

export default function ApplicationForm({ services }: ApplicationFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Необходимо согласие на обработку данных');
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      setUploading(true);
      let uploadedFileUrls: string[] = [];

      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
              resolve(base64);
            };
            reader.readAsDataURL(file);
          });
        });
        
        uploadedFileUrls = await Promise.all(uploadPromises);
      }

      const filesText = uploadedFileUrls.length > 0 
        ? `\n\nПрикрепленные файлы (${files.length}):\n${files.map((f, i) => `${i + 1}. ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n')}\n\nBase64 данные:\n${uploadedFileUrls.map((data, i) => `Файл ${i + 1}: ${data.substring(0, 100)}...`).join('\n')}`
        : '';

      const applicationData = {
        ...formData,
        message: formData.message + filesText,
        user_id: user?.user_id || null
      };
      
      setUploading(false);

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
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        setFiles([]);
        setAgreed(false);
      } else {
        toast.error('Ошибка отправки заявки. Попробуйте позже.');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  return (
    <section id="application-form" className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-white animate-on-scroll">Оставить заявку</h2>
        <p className="text-center text-gray-300 mb-8 animate-on-scroll">Перезвоним Вам в течение 15 мин. в рабочее время</p>
        <Card className="animate-on-scroll shadow-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">ФИО *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <Label htmlFor="service">Услуга *</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Детали заявки</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Опишите вашу ситуацию, пожелания, бюджет..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="files">Прикрепить файлы (фото, документы)</Label>
                <div className="mt-2">
                  <label htmlFor="files" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Icon name="Upload" className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-sm text-gray-600">Нажмите для загрузки или перетащите файлы</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF до 10MB</p>
                    </div>
                  </label>
                  <input
                    id="files"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || []);
                      setFiles([...files, ...newFiles]);
                    }}
                  />
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center gap-2">
                            <Icon name="File" size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="agree" 
                  checked={agreed} 
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agree" className="text-sm cursor-pointer leading-relaxed">
                  Я согласен на обработку персональных данных в соответствии с{' '}
                  <Link to="/personal-data-consent" className="text-primary hover:underline" target="_blank">
                    Политикой обработки персональных данных
                  </Link>
                  {' '}и{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
                    Политикой конфиденциальности
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={uploading}>
                {uploading ? 'Загрузка файлов...' : 'Отправить заявку'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
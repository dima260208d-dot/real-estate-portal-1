import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const serviceOptions: Record<string, { label: string; type: 'select' | 'checkbox' | 'input'; options?: string[]; placeholder?: string }[]> = {
  mortgage: [
    { label: 'Сумма кредита', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Срок кредита', type: 'select', options: ['до 10 лет', '10-15 лет', '15-20 лет', '20-30 лет'] },
    { label: 'Первоначальный взнос', type: 'select', options: ['менее 10%', '10-20%', '20-30%', 'более 30%'] },
    { label: 'Есть одобренная ипотека', type: 'checkbox' },
    { label: 'Нужна помощь с подбором банка', type: 'checkbox' }
  ],
  buy: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Бюджет', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Район', type: 'input', placeholder: 'Укажите желаемый район' },
    { label: 'Покупка с использованием ипотеки', type: 'checkbox' },
    { label: 'Рассматриваю новостройки', type: 'checkbox' }
  ],
  sale: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Желаемая цена', type: 'input', placeholder: 'Укажите желаемую стоимость' },
    { label: 'Срочная продажа', type: 'checkbox' },
    { label: 'Есть обременения', type: 'checkbox' },
    { label: 'Нужна помощь с оценкой', type: 'checkbox' }
  ],
  legal: [
    { label: 'Тип сделки', type: 'select', options: ['Покупка', 'Продажа', 'Дарение', 'Наследство', 'Другое'] },
    { label: 'Проверка юридической чистоты', type: 'checkbox' },
    { label: 'Сопровождение сделки', type: 'checkbox' },
    { label: 'Составление договоров', type: 'checkbox' },
    { label: 'Регистрация в Росреестре', type: 'checkbox' }
  ],
  rent: [
    { label: 'Тип недвижимости', type: 'select', options: ['Квартира', 'Дом', 'Коммерческая'] },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Желаемая арендная плата', type: 'input', placeholder: 'Укажите желаемую сумму в месяц' },
    { label: 'Нужна помощь с поиском арендаторов', type: 'checkbox' },
    { label: 'Нужен договор аренды', type: 'checkbox' }
  ],
  insurance: [
    { label: 'Тип страхования', type: 'select', options: ['Ипотека', 'Титул', 'Имущество', 'Комплексное'] },
    { label: 'Сумма страхования', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Срок страхования', type: 'select', options: ['1 год', '3 года', '5 лет', 'На весь срок ипотеки'] },
    { label: 'Есть действующая ипотека', type: 'checkbox' }
  ],
  pledge: [
    { label: 'Сумма займа', type: 'select', options: ['до 500 тыс ₽', '500 тыс - 1 млн ₽', '1-3 млн ₽', 'более 3 млн ₽'] },
    { label: 'Срок займа', type: 'select', options: ['до 6 месяцев', '6-12 месяцев', '1-2 года', 'более 2 лет'] },
    { label: 'Тип залога', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Есть обременения на объект', type: 'checkbox' },
    { label: 'Срочно нужны деньги', type: 'checkbox' }
  ],
  valuation: [
    { label: 'Тип объекта', type: 'select', options: ['Квартира', 'Дом', 'Участок', 'Коммерческая'] },
    { label: 'Цель оценки', type: 'select', options: ['Для продажи', 'Для ипотеки', 'Для залога', 'Для наследства', 'Другое'] },
    { label: 'Срочная оценка (1-2 дня)', type: 'checkbox' },
    { label: 'Нужен официальный отчет', type: 'checkbox' }
  ],
  contract: [
    { label: 'Тип договора', type: 'select', options: ['Купли-продажи', 'Дарения', 'Мены', 'Другой'] },
    { label: 'Стороны сделки', type: 'select', options: ['Физ. лица', 'Физ. и юр. лицо', 'Юр. лица'] },
    { label: 'Нужна регистрация в Росреестре', type: 'checkbox' },
    { label: 'Требуется нотариальное заверение', type: 'checkbox' },
    { label: 'Сделка с использованием ипотеки', type: 'checkbox' }
  ],
  newbuilding: [
    { label: 'Застройщик', type: 'input', placeholder: 'Укажите застройщика, если знаете' },
    { label: 'Количество комнат', type: 'select', options: ['Студия', '1 комната', '2 комнаты', '3 комнаты', '4+ комнаты'] },
    { label: 'Бюджет', type: 'select', options: ['до 3 млн ₽', '3-5 млн ₽', '5-10 млн ₽', 'более 10 млн ₽'] },
    { label: 'Срок сдачи', type: 'select', options: ['Сдан', 'До 6 месяцев', '6-12 месяцев', '1-2 года', 'Не важно'] },
    { label: 'Покупка с использованием ипотеки', type: 'checkbox' },
    { label: 'Рассматриваю квартиры с отделкой', type: 'checkbox' }
  ]
};

export default function ServiceModal({ isOpen, onOpenChange, selectedService }: ServiceModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: selectedService?.title || '',
    message: ''
  });
  const [serviceDetails, setServiceDetails] = useState<Record<string, string | boolean>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setServiceDetails({});
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Необходимо согласие на обработку данных');
      return;
    }

    try {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      const detailsText = Object.entries(serviceDetails)
        .filter(([_, value]) => value)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return `✓ ${key}`;
          }
          return `${key}: ${value}`;
        })
        .join('\n');

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

      const fullMessage = detailsText 
        ? `${detailsText}\n\n${formData.message || ''}${filesText}`.trim()
        : `${formData.message}${filesText}`;
      
      setUploading(false);
      
      const applicationData = {
        ...formData,
        service: selectedService?.title || formData.service,
        message: fullMessage,
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
        setServiceDetails({});
        setFiles([]);
        setAgreed(false);
      } else {
        toast.error('Ошибка отправки заявки. Попробуйте позже.');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  const currentOptions = selectedService ? serviceOptions[selectedService.id] || [] : [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {selectedService && <Icon name={selectedService.icon} className="text-primary" size={32} />}
            {selectedService?.title}
          </DialogTitle>
          <DialogDescription>
            {selectedService?.description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {currentOptions.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-sm text-gray-700">Детали услуги:</h3>
              {currentOptions.map((option, index) => (
                <div key={index}>
                  {option.type === 'select' ? (
                    <div>
                      <Label className="text-sm">{option.label}</Label>
                      <Select
                        value={serviceDetails[option.label] as string || ''}
                        onValueChange={(value) => setServiceDetails({ ...serviceDetails, [option.label]: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Выберите вариант" />
                        </SelectTrigger>
                        <SelectContent>
                          {option.options?.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : option.type === 'input' ? (
                    <div>
                      <Label className="text-sm">{option.label}</Label>
                      <Input
                        className="mt-1"
                        value={serviceDetails[option.label] as string || ''}
                        onChange={(e) => setServiceDetails({ ...serviceDetails, [option.label]: e.target.value })}
                        placeholder={option.placeholder}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`option-${index}`}
                        checked={serviceDetails[option.label] as boolean || false}
                        onCheckedChange={(checked) => setServiceDetails({ ...serviceDetails, [option.label]: checked as boolean })}
                      />
                      <Label htmlFor={`option-${index}`} className="text-sm cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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
            <Label htmlFor="modal-message">Дополнительные пожелания</Label>
            <Textarea
              id="modal-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Расскажите подробнее о вашей ситуации..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="modal-files">Прикрепить файлы</Label>
            <div className="mt-2">
              <label htmlFor="modal-files" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <Icon name="Upload" className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-xs text-gray-600">Фото, документы (PNG, JPG, PDF)</p>
                </div>
              </label>
              <input
                id="modal-files"
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
                <div className="mt-2 space-y-1">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="File" size={14} className="text-gray-400" />
                        <span className="text-gray-700 truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="modal-agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="modal-agree" className="text-sm cursor-pointer">
              Я согласен на обработку персональных данных
            </Label>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={uploading}>
            {uploading ? 'Загрузка файлов...' : 'Заказать услугу'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
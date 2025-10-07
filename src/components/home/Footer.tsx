
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-12 w-auto object-contain" />
            </div>
            <div className="mt-4">
              <iframe src="https://yandex.ru/sprav/widget/rating-badge/158777231552?type=rating&theme=dark" width="150" height="50" frameBorder="0" title="Рейтинг Яндекс"></iframe>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Продать квартиру</a>
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Купить недвижимость</a>
              <Link to="/app" className="block text-gray-400 hover:text-primary transition-colors">Мобильное приложение</Link>
              <a href="#faq" className="block text-gray-400 hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="block text-gray-400 hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+79805557580" className="hover:text-primary transition-colors">+7 980 555 75 80</a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:yur.nedv@mail.ru" className="hover:text-primary transition-colors">yur.nedv@mail.ru</a>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <p>г. Воронеж, Московский пр-т, д. 114 В, офис 200</p>
              </div>
              <div className="flex gap-3 mt-4 pt-2">
                <a href="https://vk.com/yur.nedv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={16} />
                  VK
                </a>
                <a href="https://t.me/yur_nedv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Icon name="Send" size={16} />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-3">© ЮР недвижимость, 2024. Все права защищены.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
              <Link to="/user-agreement" className="hover:text-primary transition-colors">Пользовательское соглашение</Link>
              <Link to="/personal-data-consent" className="hover:text-primary transition-colors">Согласие на обработку данных</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
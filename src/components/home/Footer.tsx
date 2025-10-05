import VisitorCounter from '@/components/VisitorCounter';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР недвижимость" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold text-lg">ЮР недвижимость</h3>
                <p className="text-sm text-gray-400">Профессионализм в квадратах</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Юрист и риэлтор для эффективного решения задач</p>
            <div className="mt-4">
              <iframe src="https://yandex.ru/sprav/widget/rating-badge/158777231552?type=rating&theme=dark" width="150" height="50" frameBorder="0" title="Рейтинг Яндекс"></iframe>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Продать квартиру</a>
              <a href="#services" className="block text-gray-400 hover:text-primary transition-colors">Купить недвижимость</a>
              <a href="#faq" className="block text-gray-400 hover:text-primary transition-colors">FAQ</a>
              <a href="#contacts" className="block text-gray-400 hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>+7 980 555 75 80</p>
              <p>yur.nedv@mail.ru</p>
              <p>г. Воронеж, Московский пр-т, д. 114 В, офис 200</p>
              <div className="flex gap-3 mt-4">
                <a href="https://vk.com/yur.nedv" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">VK</a>
                <a href="https://t.me/yur_nedv" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 text-sm text-gray-400">
            <div className="text-center md:text-left flex-1">
              <p>© ЮР недвижимость, 2024. Все права защищены.</p>
              <p className="mt-1">ООО «ЮрИЭлТи», ИНН 3662311194</p>
              <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link>
                <Link to="/user-agreement" className="hover:text-primary transition-colors">Пользовательское соглашение</Link>
                <Link to="/personal-data-consent" className="hover:text-primary transition-colors">Согласие на обработку данных</Link>
              </div>
            </div>
            <div className="relative mx-auto md:mx-0">
              <VisitorCounter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
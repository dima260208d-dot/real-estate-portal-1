import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onApplicationClick: () => void;
}

export default function Header({ onApplicationClick }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b-2 border-[#FF6600] shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР Недвижимость" className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">ЮР Недвижимость</h1>
            <p className="text-xs text-gray-500">Юрист Риэлтор Недвижимость</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-4 items-center">
          <a href="#services" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">Услуги</a>
          <a href="#faq" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">FAQ</a>
          <a href="#contacts" className="text-[#1A1A1A] hover:text-[#FF6600] transition-colors">Контакты</a>
          <Button onClick={onApplicationClick} className="bg-[#FF6600] hover:bg-[#FF7720] text-white">
            Подать заявку
          </Button>
          <Button variant="outline" className="border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white" onClick={() => window.location.href = '/login'}>
            Вход
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Icon name="Menu" size={24} />
        </Button>
      </div>
    </header>
  );
}

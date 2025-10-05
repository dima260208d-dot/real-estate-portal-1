import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onApplicationClick: () => void;
}

export default function Header({ onApplicationClick }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-black backdrop-blur-sm border-b-2 border-primary shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР недвижимость" className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-xl font-bold text-white">ЮР недвижимость</h1>
            <p className="text-xs text-secondary">Профессионализм в квадратах</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-4 items-center">
          <a href="#services" className="text-white hover:text-primary transition-colors">Услуги</a>
          <a href="#faq" className="text-white hover:text-primary transition-colors">FAQ</a>
          <a href="#contacts" className="text-white hover:text-primary transition-colors">Контакты</a>
          <Button onClick={onApplicationClick} className="bg-primary hover:bg-primary/90">
            Подать заявку
          </Button>
          <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/50" onClick={handleAuthClick}>
            {isLoggedIn ? 'Личный кабинет' : 'Вход'}
          </Button>
        </nav>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-primary shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <a 
              href="#services" 
              className="text-white hover:text-primary transition-colors py-2 border-b border-gray-700"
              onClick={closeMobileMenu}
            >
              Услуги
            </a>
            <a 
              href="#faq" 
              className="text-white hover:text-primary transition-colors py-2 border-b border-gray-700"
              onClick={closeMobileMenu}
            >
              FAQ
            </a>
            <a 
              href="#contacts" 
              className="text-white hover:text-primary transition-colors py-2 border-b border-gray-700"
              onClick={closeMobileMenu}
            >
              Контакты
            </a>
            <Button 
              onClick={() => {
                onApplicationClick();
                closeMobileMenu();
              }} 
              className="bg-primary hover:bg-primary/90 w-full"
            >
              Подать заявку
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/50 w-full" 
              onClick={handleAuthClick}
            >
              {isLoggedIn ? 'Личный кабинет' : 'Вход'}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
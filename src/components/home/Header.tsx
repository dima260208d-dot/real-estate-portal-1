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
          <img src="https://cdn.poehali.dev/files/855a0bef-af1c-4794-9913-95fb0e695be8.png" alt="ЮР недвижимость" className="h-12 w-auto object-contain" />
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
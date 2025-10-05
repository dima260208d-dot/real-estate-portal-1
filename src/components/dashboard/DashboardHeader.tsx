import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'director' | 'client';
}

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" 
            alt="ЮР недвижимость" 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground">Личный кабинет</h1>
            <p className="text-xs text-gray-500">
              {user?.role === 'director' ? 'Директор' : user?.role === 'admin' ? 'Администратор' : 'Клиент'} ({user?.username})
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild title="На сайт">
            <a href="/">
              <Icon name="Home" size={20} />
            </a>
          </Button>
          <Button variant="outline" size="icon" onClick={onLogout} className="text-red-600 hover:text-red-700" title="Выйти">
            <Icon name="LogOut" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}

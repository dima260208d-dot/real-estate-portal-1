import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

interface DashboardStatsProps {
  applications: Application[];
}

export default function DashboardStats({ applications }: DashboardStatsProps) {
  const stats = {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    in_progress: applications.filter(app => app.status === 'in_progress').length,
    completed: applications.filter(app => app.status === 'completed').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Всего заявок</CardTitle>
          <Icon name="FileText" size={20} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Новые</CardTitle>
          <Icon name="AlertCircle" size={20} className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">В работе</CardTitle>
          <Icon name="Clock" size={20} className="text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500">{stats.in_progress}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
          <Icon name="CheckCircle" size={20} className="text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
        </CardContent>
      </Card>
    </div>
  );
}

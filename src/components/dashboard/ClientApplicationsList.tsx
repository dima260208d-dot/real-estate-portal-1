import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

interface ClientApplicationsListProps {
  applications: Application[];
}

const getStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; className: string }> = {
    new: { label: 'Новая', className: 'bg-blue-500 hover:bg-blue-600' },
    in_progress: { label: 'В работе', className: 'bg-yellow-500 hover:bg-yellow-600' },
    completed: { label: 'Выполнена', className: 'bg-green-500 hover:bg-green-600' },
  };
  const variant = variants[status] || variants.new;
  return <Badge className={variant.className}>{variant.label}</Badge>;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function ClientApplicationsList({ applications }: ClientApplicationsListProps) {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Мои заявки</h2>
        <p className="text-gray-600">История ваших обращений и их статус</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>История заявок</CardTitle>
              <CardDescription>Ваши обращения в компанию</CardDescription>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/">
                <Icon name="Plus" size={16} className="mr-2" />
                Новая заявка
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" size={40} className="text-primary" />
              </div>
              <p className="text-gray-600 mb-4">У вас пока нет заявок</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="/">
                  <Icon name="Home" size={16} className="mr-2" />
                  Подать заявку на сайте
                </a>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Сообщение</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="whitespace-nowrap">{formatDate(app.created_at)}</TableCell>
                      <TableCell className="font-medium">{app.service}</TableCell>
                      <TableCell className="max-w-xs truncate">{app.message || '—'}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

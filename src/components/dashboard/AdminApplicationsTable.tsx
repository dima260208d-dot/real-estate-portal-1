import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

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

interface AdminApplicationsTableProps {
  applications: Application[];
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onUpdateStatus: (appId: number, newStatus: string) => void;
  onOpenDetails: (app: Application) => void;
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

export default function AdminApplicationsTable({ 
  applications, 
  statusFilter, 
  onStatusFilterChange, 
  onUpdateStatus,
  onOpenDetails 
}: AdminApplicationsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const exportToExcel = () => {
    const statusLabels: Record<string, string> = {
      new: 'Новая',
      in_progress: 'В работе',
      completed: 'Выполнена'
    };

    const dataForExport = applications.map(app => ({
      'ID': app.id,
      'Дата создания': formatDate(app.created_at),
      'ФИО': app.name,
      'Телефон': app.phone,
      'Email': app.email,
      'Услуга': app.service,
      'Сообщение': app.message || '—',
      'Статус': statusLabels[app.status] || app.status,
      'Обновлено': formatDate(app.updated_at)
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Заявки');

    const colWidths = [
      { wch: 6 },
      { wch: 18 },
      { wch: 25 },
      { wch: 16 },
      { wch: 25 },
      { wch: 30 },
      { wch: 50 },
      { wch: 15 },
      { wch: 18 }
    ];
    worksheet['!cols'] = colWidths;

    const fileName = `Заявки_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    toast.success('Файл Excel успешно сохранен');
  };

  const filteredApplications = applications.filter(app => {
    const query = searchQuery.toLowerCase();
    return (
      app.id.toString().includes(query) ||
      app.name.toLowerCase().includes(query) ||
      app.phone.includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.service.toLowerCase().includes(query) ||
      (app.message && app.message.toLowerCase().includes(query))
    );
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <CardTitle>Заявки клиентов</CardTitle>
            <CardDescription>Архив всех заявок с сайта</CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Поиск по заявкам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 w-64"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>
            <Button 
              variant="outline" 
              onClick={exportToExcel}
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт в Excel
            </Button>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все заявки</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="completed">Выполнены</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>ФИО</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Сообщение</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {searchQuery ? 'Заявки не найдены' : 'Заявок пока нет'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow 
                    key={app.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => onOpenDetails(app)}
                  >
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(app.created_at)}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>
                      <a 
                        href={`tel:${app.phone}`} 
                        className="text-[#FF6600] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {app.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`mailto:${app.email}`} 
                        className="text-[#FF6600] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {app.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{app.service}</TableCell>
                    <TableCell className="max-w-xs truncate">{app.message || '—'}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={app.status}
                        onValueChange={(value) => onUpdateStatus(app.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Новая</SelectItem>
                          <SelectItem value="in_progress">В работе</SelectItem>
                          <SelectItem value="completed">Выполнена</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import PaymentForm from '@/components/dashboard/PaymentForm';

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

interface User {
  user_id: number;
  username: string;
  role: 'admin' | 'director' | 'client';
}

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/login';
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async (status?: string) => {
    try {
      let url = 'https://functions.poehali.dev/60f48b27-a9ec-4e24-bf65-2f0b68248028';
      const params = new URLSearchParams();
      
      if (user?.role === 'client' && user.user_id) {
        params.append('user_id', user.user_id.toString());
      }
      
      if (status && status !== 'all') {
        params.append('status', status);
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setApplications(data.applications || []);
      }
    } catch (error) {
      toast.error('Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/818732d3-a7b7-4290-ba1a-c68264f1df79', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          application_id: appId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        toast.success('Статус обновлен');
        fetchApplications(statusFilter === 'all' ? undefined : statusFilter);
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp({ ...selectedApp, status: newStatus as 'new' | 'in_progress' | 'completed' });
        }
      }
    } catch (error) {
      toast.error('Ошибка обновления статуса');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

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

  const openApplicationDetails = (app: Application) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600] mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" 
              alt="ЮР недвижимость" 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">Личный кабинет</h1>
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
            <Button variant="outline" size="icon" onClick={handleLogout} className="text-red-600 hover:text-red-700" title="Выйти">
              <Icon name="LogOut" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {user?.role === 'client' ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Личный кабинет</h2>
              <p className="text-gray-600">Управление заявками и оплата услуг</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Оплата услуг</h3>
                <PaymentForm />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Статистика</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Всего заявок</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#1A1A1A]">{applications.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">В работе</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-yellow-600">
                        {applications.filter(a => a.status === 'in_progress').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Выполнены</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">
                        {applications.filter(a => a.status === 'completed').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>История заявок</CardTitle>
                    <CardDescription>Ваши обращения в компанию</CardDescription>
                  </div>
                  <Button asChild className="bg-[#FF6600] hover:bg-[#FF7720]">
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
                    <div className="w-20 h-20 bg-[#FF6600]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileText" size={40} className="text-[#FF6600]" />
                    </div>
                    <p className="text-gray-600 mb-4">У вас пока нет заявок</p>
                    <Button asChild className="bg-[#FF6600] hover:bg-[#FF7720]">
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
        ) : (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Всего заявок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#1A1A1A]">{applications.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Новые</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {applications.filter(a => a.status === 'new').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">В работе</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {applications.filter(a => a.status === 'in_progress').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Выполнены</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {applications.filter(a => a.status === 'completed').length}
                  </div>
                </CardContent>
              </Card>
            </div>

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
                    <Select value={statusFilter} onValueChange={(value) => {
                      setStatusFilter(value);
                      fetchApplications(value === 'all' ? undefined : value);
                    }}>
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
                            onClick={() => openApplicationDetails(app)}
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
                                onValueChange={(value) => updateStatus(app.id, value)}
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
          </>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Icon name="FileText" className="text-[#FF6600]" size={28} />
              Заявка #{selectedApp?.id}
            </DialogTitle>
            <DialogDescription>
              Полная информация о заявке
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">ID заявки</div>
                  <div className="font-semibold text-lg">#{selectedApp.id}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Статус</div>
                  <div>{getStatusBadge(selectedApp.status)}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Дата создания</div>
                <div className="font-semibold">{formatDate(selectedApp.created_at)}</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Последнее обновление</div>
                <div className="font-semibold">{formatDate(selectedApp.updated_at)}</div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3 text-[#1A1A1A]">Контактная информация</h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">ФИО клиента</div>
                    <div className="font-semibold">{selectedApp.name}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Телефон</div>
                    <a href={`tel:${selectedApp.phone}`} className="font-semibold text-[#FF6600] hover:underline flex items-center gap-2">
                      <Icon name="Phone" size={16} />
                      {selectedApp.phone}
                    </a>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a href={`mailto:${selectedApp.email}`} className="font-semibold text-[#FF6600] hover:underline flex items-center gap-2">
                      <Icon name="Mail" size={16} />
                      {selectedApp.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3 text-[#1A1A1A]">Детали заявки</h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Услуга</div>
                    <div className="font-semibold text-lg">{selectedApp.service}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">Сообщение</div>
                    <div className="whitespace-pre-wrap text-gray-800">
                      {selectedApp.message || 'Сообщение отсутствует'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex gap-3">
                <Select
                  value={selectedApp.status}
                  onValueChange={(value) => updateStatus(selectedApp.id, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новая</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="completed">Выполнена</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
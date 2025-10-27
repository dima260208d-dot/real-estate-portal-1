import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import PaymentForm from '@/components/dashboard/PaymentForm';
import ClientSupport from '@/components/dashboard/ClientSupport';
import FileUpload from '@/components/dashboard/FileUpload';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ApplicationsFilter from '@/components/dashboard/ApplicationsFilter';
import ApplicationsTable from '@/components/dashboard/ApplicationsTable';
import ApplicationDetailsDialog from '@/components/dashboard/ApplicationDetailsDialog';

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

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    fetchApplications(status === 'all' ? undefined : status);
  };

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
    <>
      <Helmet>
        <title>Личный кабинет — ЮР недвижимость</title>
        <meta name="description" content="Личный кабинет клиента ЮР недвижимость — управление заявками, оплата услуг, загрузка документов и связь со специалистом" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-[#F5F5F5]">
        <DashboardHeader user={user} onLogout={handleLogout} />

        <main className="container mx-auto px-4 py-8">
          {user?.role !== 'client' && <DashboardStats applications={applications} />}

          <Card>
            <CardHeader>
              <CardTitle>Мои заявки</CardTitle>
              <CardDescription>
                {user?.role === 'client' 
                  ? 'Управляйте своими заявками и отслеживайте их статус'
                  : 'Все заявки клиентов'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationsFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                onExportExcel={exportToExcel}
                showExport={user?.role === 'admin' || user?.role === 'director'}
              />

              <div className="overflow-x-auto">
                <ApplicationsTable
                  applications={filteredApplications}
                  user={user}
                  onStatusChange={updateStatus}
                  onOpenDetails={openApplicationDetails}
                />
              </div>
            </CardContent>
          </Card>

          {user?.role === 'client' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <PaymentForm />
              <ClientSupport />
            </div>
          )}

          {user?.role === 'client' && (
            <div className="mt-8">
              <FileUpload userId={user.user_id} />
            </div>
          )}
        </main>

        <ApplicationDetailsDialog
          application={selectedApp}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          user={user}
          onStatusChange={updateStatus}
        />
      </div>
    </>
  );
}

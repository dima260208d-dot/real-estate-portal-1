import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  url: string;
  applicationId?: number;
  applicationTitle?: string;
}

interface Application {
  id: number;
  service: string;
  created_at: string;
}

interface FileUploadProps {
  applications: Application[];
}

export default function FileUpload({ applications }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Байт';
    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('image')) return 'Image';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'Table';
    if (type.includes('zip') || type.includes('rar')) return 'Archive';
    return 'File';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    await processFiles(Array.from(selectedFiles));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const processFiles = async (fileList: File[]) => {
    if (!selectedApplicationId) {
      toast.error('Выберите заявку', {
        description: 'Необходимо указать к какой заявке прикрепить файлы'
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = fileList.filter(file => {
      if (file.size > maxSize) {
        toast.error(`Файл ${file.name} слишком большой`, {
          description: 'Максимальный размер файла 10 МБ'
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const selectedApp = applications.find(app => app.id.toString() === selectedApplicationId);

    // Симуляция загрузки файла
    for (const file of validFiles) {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        url: URL.createObjectURL(file),
        applicationId: selectedApp?.id,
        applicationTitle: selectedApp?.service
      };

      setFiles(prev => [...prev, newFile]);
      
      toast.success(`Файл ${file.name} загружен`, {
        description: `Прикреплён к заявке #${selectedApp?.id}`
      });
    }
  };

  const handleDelete = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      URL.revokeObjectURL(file.url);
      setFiles(prev => prev.filter(f => f.id !== id));
      toast.success('Файл удалён');
    }
  };

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
    toast.success('Файл загружен');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Upload" className="text-primary" />
          Мои документы
        </CardTitle>
        <CardDescription>
          Загружайте документы, договоры и фотографии недвижимости
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="application-select">Выберите заявку *</Label>
          <Select value={selectedApplicationId} onValueChange={setSelectedApplicationId}>
            <SelectTrigger>
              <SelectValue placeholder="К какой заявке прикрепить файлы?" />
            </SelectTrigger>
            <SelectContent>
              {applications.length === 0 ? (
                <SelectItem value="no-apps" disabled>
                  У вас пока нет заявок
                </SelectItem>
              ) : (
                applications.map((app) => (
                  <SelectItem key={app.id} value={app.id.toString()}>
                    #{app.id} - {app.service}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {!selectedApplicationId && (
            <p className="text-sm text-gray-500">
              Сначала выберите заявку, затем загрузите файлы
            </p>
          )}
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : selectedApplicationId
              ? 'border-gray-300 hover:border-primary/50'
              : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
          }`}
          onDragOver={selectedApplicationId ? handleDragOver : undefined}
          onDragLeave={selectedApplicationId ? handleDragLeave : undefined}
          onDrop={selectedApplicationId ? handleDrop : undefined}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                Перетащите файлы сюда
              </p>
              <p className="text-sm text-gray-500">
                или нажмите кнопку ниже для выбора файлов
              </p>
            </div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Button 
                type="button" 
                className="bg-primary hover:bg-primary/90" 
                asChild
                disabled={!selectedApplicationId}
              >
                <span>
                  <Icon name="FolderOpen" size={18} className="mr-2" />
                  Выбрать файлы
                </span>
              </Button>
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar,.xls,.xlsx"
                disabled={!selectedApplicationId}
              />
            </Label>
            <p className="text-xs text-gray-400">
              Поддерживаются: PDF, DOC, DOCX, JPG, PNG, ZIP, XLS (до 10 МБ)
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Загруженные файлы ({files.length})
              </h3>
              {files.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    files.forEach(f => URL.revokeObjectURL(f.url));
                    setFiles([]);
                    toast.success('Все файлы удалены');
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить все
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getFileIcon(file.type) as any} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                    </p>
                    {file.applicationId && (
                      <p className="text-xs text-primary font-medium mt-1">
                        Заявка #{file.applicationId}: {file.applicationTitle}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(file)}
                      title="Скачать"
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(file.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Удалить"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Пока нет загруженных файлов</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
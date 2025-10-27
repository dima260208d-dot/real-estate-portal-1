import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ApplicationsFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onExportExcel: () => void;
  showExport: boolean;
}

export default function ApplicationsFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onExportExcel,
  showExport
}: ApplicationsFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск по ID, ФИО, телефону, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Все статусы" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="new">Новые</SelectItem>
          <SelectItem value="in_progress">В работе</SelectItem>
          <SelectItem value="completed">Выполнено</SelectItem>
        </SelectContent>
      </Select>
      {showExport && (
        <Button 
          onClick={onExportExcel} 
          variant="outline"
          className="w-full md:w-auto"
        >
          <Icon name="Download" size={18} className="mr-2" />
          Экспорт в Excel
        </Button>
      )}
    </div>
  );
}

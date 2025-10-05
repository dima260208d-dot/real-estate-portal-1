import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

export default function VisitorCounter() {
  const [visitCount, setVisitCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const totalKey = 'site_total_visits';
    const todayKey = 'site_today_visits';
    const dateKey = 'site_visit_date';
    
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem(dateKey);
    
    let total = parseInt(localStorage.getItem(totalKey) || '1250', 10);
    let todayVisits = 0;
    
    if (lastVisitDate === today) {
      todayVisits = parseInt(localStorage.getItem(todayKey) || '0', 10);
    } else {
      localStorage.setItem(dateKey, today);
      localStorage.setItem(todayKey, '0');
    }
    
    const hasVisited = sessionStorage.getItem('visited');
    
    if (!hasVisited) {
      total += 1;
      todayVisits += 1;
      
      localStorage.setItem(totalKey, total.toString());
      localStorage.setItem(todayKey, todayVisits.toString());
      sessionStorage.setItem('visited', 'true');
    }
    
    setVisitCount(total);
    setTodayCount(todayVisits);
  }, []);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-primary/30">
      <div className="flex items-center gap-3">
        <Icon name="Users" size={20} className="text-primary" />
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Всего:</span>
            <span className="font-bold text-primary">{visitCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Сегодня:</span>
            <span className="font-bold text-secondary">{todayCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
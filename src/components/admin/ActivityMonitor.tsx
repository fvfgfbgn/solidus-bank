
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

type Activity = {
  id: string;
  employeeId: string;
  type: "login" | "client" | "edit" | "call" | "message";
  description: string;
  timestamp: Date;
};

// Generate mock activities
const generateMockActivities = (employees: any[]): Activity[] => {
  const activities: Activity[] = [];
  const activityTypes = ["login", "client", "edit", "call", "message"];
  const descriptions = {
    login: ["Вход в систему", "Выход из системы"],
    client: ["Просмотр клиентской базы", "Изменение данных клиента", "Добавление нового клиента"],
    edit: ["Редактирование профиля", "Обновление информации", "Изменение настроек"],
    call: ["Звонок клиенту", "Входящий звонок", "Конференц-связь с клиентом"],
    message: ["Отправлено сообщение", "Получено сообщение", "Групповое сообщение"]
  };

  // Current time
  const now = new Date();
  
  // Generate 50 random activities over the past 24 hours
  for (let i = 0; i < 50; i++) {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)] as Activity["type"];
    const description = descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
    
    // Random time in the past 24 hours
    const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    
    activities.push({
      id: `act-${i}`,
      employeeId: employee.id,
      type,
      description,
      timestamp
    });
  }
  
  // Sort by timestamp, most recent first
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const ActivityMonitor: React.FC = () => {
  const { employees } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>("all");
  
  useEffect(() => {
    // Generate mock activities initially
    setActivities(generateMockActivities(employees));
    
    // Set up interval to add new activities occasionally
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        employeeId: employees[Math.floor(Math.random() * employees.length)].id,
        type: ["login", "client", "edit", "call", "message"][Math.floor(Math.random() * 5)] as Activity["type"],
        description: "Новое действие в системе",
        timestamp: new Date()
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 49)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [employees]);
  
  // Get filtered activities
  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(activity => activity.employeeId === filter);
  
  // Get employee name by ID
  const getEmployeeName = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.name : "Неизвестный сотрудник";
  };
  
  // Format timestamp
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getActivityBadge = (type: Activity["type"]) => {
    switch (type) {
      case "login":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">Вход</Badge>;
      case "client":
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Клиент</Badge>;
      case "edit":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">Изменение</Badge>;
      case "call":
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 hover:bg-purple-50">Звонок</Badge>;
      case "message":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50">Сообщение</Badge>;
      default:
        return <Badge variant="outline">Другое</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Мониторинг активности</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Выберите сотрудника" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все сотрудники</SelectItem>
              {employees.map(employee => (
                <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.slice(0, 15).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                {getActivityBadge(activity.type)}
                <div>
                  <p className="font-medium">{getEmployeeName(activity.employeeId)}</p>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </div>
              </div>
              <div className="text-right text-muted-foreground text-sm">
                {formatTime(activity.timestamp)}
              </div>
            </div>
          ))}
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Нет активности для отображения</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

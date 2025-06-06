
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeManagement } from "@/components/admin/EmployeeManagement";
import { ActivityMonitor } from "@/components/admin/ActivityMonitor";
import { SecretData } from "@/components/admin/SecretData";
import { MarketAnalytics } from "@/components/MarketAnalytics";
import { BankStatistics } from "@/components/admin/BankStatistics";
import { InternalCommunications } from "@/components/admin/InternalCommunications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  TrendingUp,
  Settings,
  Bell,
  Database
} from "lucide-react";

export default function AdminPanel() {
  const { user, isAuthenticated, employees } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect non-admins
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.canAccessSecretData).length,
    totalAdmins: employees.filter(emp => emp.role === "admin").length,
    pendingTasks: 5,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                  Панель администратора
                </h1>
                <p className="text-xl text-slate-600">
                  Добро пожаловать, {user?.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Администратор
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 bg-white shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100">
                <BarChart3 className="h-4 w-4 mr-2" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="employees" className="data-[state=active]:bg-blue-100">
                <Users className="h-4 w-4 mr-2" />
                Сотрудники
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-blue-100">
                <Activity className="h-4 w-4 mr-2" />
                Активность
              </TabsTrigger>
              <TabsTrigger value="communications" className="data-[state=active]:bg-blue-100">
                <MessageSquare className="h-4 w-4 mr-2" />
                Коммуникации
              </TabsTrigger>
              <TabsTrigger value="statistics" className="data-[state=active]:bg-blue-100">
                <Database className="h-4 w-4 mr-2" />
                Статистика
              </TabsTrigger>
              <TabsTrigger value="secret" className="data-[state=active]:bg-blue-100">
                <Shield className="h-4 w-4 mr-2" />
                Секретные данные
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-100">
                <TrendingUp className="h-4 w-4 mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Всего сотрудников
                          </p>
                          <p className="text-3xl font-bold text-blue-600">
                            {stats.totalEmployees}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Активных сотрудников
                          </p>
                          <p className="text-3xl font-bold text-green-600">
                            {stats.activeEmployees}
                          </p>
                        </div>
                        <Activity className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Администраторов
                          </p>
                          <p className="text-3xl font-bold text-purple-600">
                            {stats.totalAdmins}
                          </p>
                        </div>
                        <Shield className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Ожидающие задачи
                          </p>
                          <p className="text-3xl font-bold text-orange-600">
                            {stats.pendingTasks}
                          </p>
                        </div>
                        <Bell className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Последние действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Новый сотрудник добавлен</p>
                          <p className="text-sm text-muted-foreground">2 минуты назад</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Секретный доступ предоставлен</p>
                          <p className="text-sm text-muted-foreground">15 минут назад</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Системное обновление завершено</p>
                          <p className="text-sm text-muted-foreground">1 час назад</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="employees">
              <EmployeeManagement />
            </TabsContent>
            
            <TabsContent value="activity">
              <ActivityMonitor />
            </TabsContent>
            
            <TabsContent value="communications">
              <InternalCommunications />
            </TabsContent>
            
            <TabsContent value="statistics">
              <BankStatistics />
            </TabsContent>
            
            <TabsContent value="secret">
              <SecretData />
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="space-y-6">
                <MarketAnalytics />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

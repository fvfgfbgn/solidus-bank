
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientManagement } from "@/components/employee/ClientManagement";
import { Communications } from "@/components/employee/Communications";
import { SecretData } from "@/components/admin/SecretData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Users, 
  MessageSquare, 
  Shield, 
  MessageCircle,
  Settings,
  Clock
} from "lucide-react";
import { InternalCommunications } from "@/components/admin/InternalCommunications";

export default function EmployeePanel() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect non-employees
  if (!isAuthenticated || user?.role !== "employee") {
    return <Navigate to="/" />;
  }

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
                  Рабочий кабинет сотрудника
                </h1>
                <p className="text-xl text-slate-600">
                  Добро пожаловать, {user?.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  Сотрудник
                </Badge>
                {user?.canAccessSecretData && (
                  <Badge variant="default" className="bg-amber-100 text-amber-800">
                    Секретный доступ
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </Button>
              </div>
            </div>
          </div>
          
          {/* Status Card */}
          <div className="mb-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {user?.name}
                </CardTitle>
                <CardDescription>
                  {user?.canAccessSecretData 
                    ? "Сотрудник с доступом к секретным данным" 
                    : "Сотрудник без доступа к секретным данным"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Добро пожаловать в рабочий кабинет. Пожалуйста, не забудьте выйти из системы по окончании работы.
                  </AlertDescription>
                </Alert>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Активные клиенты
                        </p>
                        <p className="text-2xl font-bold text-blue-900">12</p>
                      </div>
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700">
                          Сообщения сегодня
                        </p>
                        <p className="text-2xl font-bold text-green-900">8</p>
                      </div>
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-700">
                          Задач на сегодня
                        </p>
                        <p className="text-2xl font-bold text-orange-900">5</p>
                      </div>
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 bg-white shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100">
                Обзор
              </TabsTrigger>
              <TabsTrigger value="clients" className="data-[state=active]:bg-blue-100">
                <Users className="h-4 w-4 mr-2" />
                Клиенты
              </TabsTrigger>
              <TabsTrigger value="communications" className="data-[state=active]:bg-blue-100">
                <MessageSquare className="h-4 w-4 mr-2" />
                Коммуникации с клиентами
              </TabsTrigger>
              <TabsTrigger value="internal" className="data-[state=active]:bg-blue-100">
                <MessageCircle className="h-4 w-4 mr-2" />
                Внутренние коммуникации
              </TabsTrigger>
              {user?.canAccessSecretData && (
                <TabsTrigger value="secret" className="data-[state=active]:bg-blue-100">
                  <Shield className="h-4 w-4 mr-2" />
                  Секретные данные
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Последние действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium">Новый клиент добавлен</p>
                          <p className="text-sm text-muted-foreground">10 минут назад</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <div>
                          <p className="font-medium">Сообщение отправлено клиенту</p>
                          <p className="text-sm text-muted-foreground">25 минут назад</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <div>
                          <p className="font-medium">Звонок клиенту выполнен</p>
                          <p className="text-sm text-muted-foreground">1 час назад</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setActiveTab("clients")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Управление клиентами
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setActiveTab("communications")}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Написать клиенту
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setActiveTab("internal")}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Внутренние сообщения
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="clients">
              <ClientManagement />
            </TabsContent>
            
            <TabsContent value="communications">
              <Communications />
            </TabsContent>
            
            <TabsContent value="internal">
              <InternalCommunications />
            </TabsContent>
            
            {user?.canAccessSecretData && (
              <TabsContent value="secret">
                <SecretData />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus,
  Bell,
  MessageCircle,
  Download,
  Settings,
  Shield,
  HelpCircle,
  MapPin,
  Phone
} from "lucide-react";
import { AccountsCards } from "@/components/client/AccountsCards";
import { TransactionHistory } from "@/components/client/TransactionHistory";
import { TransferMoney } from "@/components/client/TransferMoney";
import { Support } from "@/components/client/Support";
import { ProfileSettings } from "@/components/client/ProfileSettings";
import { SecuritySettings } from "@/components/client/SecuritySettings";

const ClientDashboard = () => {
  // Mock data - в реальном приложении будет получаться из API
  const userBalance = "156 750.00";
  const recentTransactions = [
    { id: 1, type: "income", amount: "5000.00", description: "Зарплата", date: "2024-01-15" },
    { id: 2, type: "expense", amount: "1250.00", description: "Продуктовый магазин", date: "2024-01-14" },
    { id: 3, type: "expense", amount: "850.00", description: "Коммунальные услуги", date: "2024-01-13" },
  ];

  const notifications = [
    { id: 1, title: "Пополнение счета", message: "Ваш счет пополнен на 5000 ₽", time: "2 часа назад" },
    { id: 2, title: "Заявка обработана", message: "Заявка на открытие карты одобрена", time: "1 день назад" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Заголовок и быстрые действия */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
              
              {/* Текущий баланс */}
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Общий баланс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {userBalance} ₽
                  </div>
                </CardContent>
              </Card>

              {/* Быстрые действия */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button className="flex items-center gap-2 h-auto py-4">
                  <Plus className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Пополнить</div>
                    <div className="text-xs opacity-80">счет</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                  <ArrowUpRight className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Перевести</div>
                    <div className="text-xs opacity-80">деньги</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                  <CreditCard className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Открыть</div>
                    <div className="text-xs opacity-80">новый счёт</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Уведомления */}
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border-l-4 border-blue-500 pl-3">
                      <div className="font-semibold text-sm">{notification.title}</div>
                      <div className="text-xs text-gray-600">{notification.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Последние операции */}
          <Card>
            <CardHeader>
              <CardTitle>Последние операции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      {transaction.type === "income" ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-semibold">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}{transaction.amount} ₽
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Основные функции */}
          <Tabs defaultValue="accounts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="accounts" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Счета и карты
              </TabsTrigger>
              <TabsTrigger value="transfers" className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Переводы
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Поддержка
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Безопасность
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Информация
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts">
              <AccountsCards />
            </TabsContent>

            <TabsContent value="transfers">
              <TransferMoney />
            </TabsContent>

            <TabsContent value="support">
              <Support />
            </TabsContent>

            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                      <Download className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">Скачать выписки</div>
                        <div className="text-xs opacity-70">PDF документы</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                      <MapPin className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">Найти отделение</div>
                        <div className="text-xs opacity-70">Карта и контакты</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Тарифы и условия</h4>
                    <p className="text-sm text-gray-600">
                      Актуальная информация о тарифах на банковские услуги
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientDashboard;

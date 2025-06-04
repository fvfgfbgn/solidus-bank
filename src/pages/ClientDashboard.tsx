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
  HelpCircle
} from "lucide-react";
import { AccountsCards } from "@/components/client/AccountsCards";
import { TransactionHistory } from "@/components/client/TransactionHistory";
import { TransferMoney } from "@/components/client/TransferMoney";
import { Support } from "@/components/client/Support";
import { ProfileSettings } from "@/components/client/ProfileSettings";
import { SecuritySettings } from "@/components/client/SecuritySettings";
import { useClient } from "@/contexts/ClientContext";

const ClientDashboard = () => {
  const { clientData, addTransaction, addAccount, addCard } = useClient();

  const handleTopUp = () => {
    const amount = prompt("Введите сумму пополнения:");
    if (amount && !isNaN(Number(amount))) {
      addTransaction({
        type: 'income',
        amount: Number(amount),
        description: 'Пополнение счета',
        category: 'Пополнение'
      });
    }
  };

  const handleTransfer = () => {
    // Переключаемся на вкладку переводов
    const transferTab = document.querySelector('[value="transfers"]') as HTMLElement;
    if (transferTab) {
      transferTab.click();
    }
  };

  const handleOpenProduct = () => {
    const productTypes = [
      '1. Сберегательный счет (0.5% годовых)',
      '2. Депозитный счет (4.5% годовых)', 
      '3. Валютный счет (USD)',
      '4. Дебетовая карта',
      '5. Кредитная карта (лимит 100,000 ₽)'
    ];
    
    const choice = prompt(`Выберите продукт для открытия:\n${productTypes.join('\n')}\n\nВведите номер (1-5):`);
    
    if (choice && !isNaN(Number(choice)) && Number(choice) >= 1 && Number(choice) <= 5) {
      const choiceNum = Number(choice);
      
      if (choiceNum <= 3) {
        // Открываем счет
        const accountTypes = ['Сберегательный счет', 'Депозитный счет', 'Валютный счет'];
        const currencies = ['RUB', 'RUB', 'USD'];
        
        addAccount({
          type: accountTypes[choiceNum - 1],
          balance: 0,
          currency: currencies[choiceNum - 1],
          status: 'active'
        });
        
        addTransaction({
          type: 'income',
          amount: 0,
          description: `Открыт ${accountTypes[choiceNum - 1]}`,
          category: 'Банковские операции'
        });
      } else {
        // Заказываем карту
        const cardTypes = ['Дебетовая карта', 'Кредитная карта'];
        const cardType = cardTypes[choiceNum - 4];
        
        addCard({
          type: cardType,
          balance: cardType === 'Кредитная карта' ? 0 : clientData.balance,
          expiryDate: new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU').slice(3),
          status: 'active',
          ...(cardType === 'Кредитная карта' && { creditLimit: 100000 })
        });
        
        addTransaction({
          type: 'income',
          amount: 0,
          description: `Заказана ${cardType}`,
          category: 'Банковские операции'
        });
      }
      
      // Переключаемся на вкладку продуктов
      const accountsTab = document.querySelector('[value="accounts"]') as HTMLElement;
      if (accountsTab) {
        accountsTab.click();
      }
    }
  };

  const notifications = [
    { id: 1, title: "Добро пожаловать!", message: "Ваш счет успешно создан", time: "Сегодня" },
    { id: 2, title: "Безопасность", message: "Рекомендуем настроить двухфакторную аутентификацию", time: "1 день назад" },
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
                  <div className="text-3xl font-bold text-blue-600">
                    {clientData.balance.toLocaleString('ru-RU')} ₽
                  </div>
                </CardContent>
              </Card>

              {/* Быстрые действия */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  onClick={handleTopUp}
                  className="flex items-center gap-2 h-auto py-4 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Пополнить</div>
                    <div className="text-xs opacity-80">счет</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={handleTransfer}
                  variant="outline" 
                  className="flex items-center gap-2 h-auto py-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <ArrowUpRight className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Перевести</div>
                    <div className="text-xs opacity-80">деньги</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={handleOpenProduct}
                  variant="outline" 
                  className="flex items-center gap-2 h-auto py-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <CreditCard className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Открыть</div>
                    <div className="text-xs opacity-80">продукт</div>
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
                {clientData.transactions.slice(0, 3).map((transaction) => (
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
                      {transaction.type === "income" ? "+" : "-"}{transaction.amount.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Основные функции */}
          <Tabs defaultValue="accounts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="accounts" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Продукты
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
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientDashboard;

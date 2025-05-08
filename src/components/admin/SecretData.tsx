
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const SecretData: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cross-border");

  // Mock data for different sections
  const crossBorderData = [
    { id: "tr-1", date: "07.05.2025", amount: "1,450,000 USD", sender: "Bank of America", receiver: "Solidus Bank", status: "Выполнен" },
    { id: "tr-2", date: "05.05.2025", amount: "870,000 EUR", sender: "Solidus Bank", receiver: "Deutsche Bank", status: "В обработке" },
    { id: "tr-3", date: "03.05.2025", amount: "2,100,000 USD", sender: "Solidus Bank", receiver: "ICBC", status: "Выполнен" },
    { id: "tr-4", date: "01.05.2025", amount: "540,000 GBP", sender: "HSBC", receiver: "Solidus Bank", status: "Выполнен" },
  ];

  const swiftData = [
    { id: "sw-1", message: "MT103", sender: "BOFAUS3N", receiver: "SOLURUXX", reference: "REF2025050704", date: "07.05.2025" },
    { id: "sw-2", message: "MT202", sender: "SOLURUXX", receiver: "DEUTDEFF", reference: "REF2025050511", date: "05.05.2025" },
    { id: "sw-3", message: "MT103", sender: "SOLURUXX", receiver: "ICBKCNBJ", reference: "REF2025050315", date: "03.05.2025" },
    { id: "sw-4", message: "MT202", sender: "HSBCGB2L", receiver: "SOLURUXX", reference: "REF2025050121", date: "01.05.2025" },
  ];

  const exchangeData = [
    { id: "ex-1", date: "07.05.2025", exchange: "MOEX", instrument: "USD/RUB", volume: "15,000,000", price: "89.74", status: "Исполнен" },
    { id: "ex-2", date: "06.05.2025", exchange: "NYSE", instrument: "AAPL", volume: "5,000", price: "178.30 USD", status: "Исполнен" },
    { id: "ex-3", date: "05.05.2025", exchange: "LSE", instrument: "FTSE 100 Futures", volume: "200", price: "8,234.5 GBP", status: "Исполнен" },
    { id: "ex-4", date: "04.05.2025", exchange: "MOEX", instrument: "EUR/RUB", volume: "10,000,000", price: "97.63", status: "Исполнен" },
  ];

  const cardData = [
    { id: "cd-1", date: "08.05.2025", cardNumber: "4*** **** **** 5678", amount: "12,500 ₽", merchant: "Yandex.Market", location: "Москва, RU", status: "Одобрено" },
    { id: "cd-2", date: "07.05.2025", cardNumber: "5*** **** **** 1234", amount: "35,000 ₽", merchant: "Ozon", location: "Москва, RU", status: "Одобрено" },
    { id: "cd-3", date: "07.05.2025", cardNumber: "4*** **** **** 9012", amount: "1,200 EUR", merchant: "Booking.com", location: "Амстердам, NL", status: "Отклонено" },
    { id: "cd-4", date: "06.05.2025", cardNumber: "5*** **** **** 3456", amount: "8,750 ₽", merchant: "Aeroflot", location: "Москва, RU", status: "Одобрено" },
  ];

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Внимание: Секретная информация</AlertTitle>
        <AlertDescription>
          Эта секция содержит конфиденциальную информацию. Доступ ограничен.
          Передача данных третьим лицам запрещена.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Секретные данные и транзакции</CardTitle>
          <CardDescription>
            Доступ к защищенной информации для авторизованного персонала
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="cross-border">Трансграничные переводы</TabsTrigger>
              <TabsTrigger value="swift">SWIFT</TabsTrigger>
              <TabsTrigger value="exchange">Межбиржевые операции</TabsTrigger>
              <TabsTrigger value="card">Карточные транзакции</TabsTrigger>
            </TabsList>

            <TabsContent value="cross-border" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Отправитель</TableHead>
                    <TableHead>Получатель</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crossBorderData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.sender}</TableCell>
                      <TableCell>{transaction.receiver}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="swift" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тип сообщения</TableHead>
                    <TableHead>Отправитель BIC</TableHead>
                    <TableHead>Получатель BIC</TableHead>
                    <TableHead>Референс</TableHead>
                    <TableHead>Дата</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {swiftData.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-mono text-xs">{message.id}</TableCell>
                      <TableCell>{message.message}</TableCell>
                      <TableCell>{message.sender}</TableCell>
                      <TableCell>{message.receiver}</TableCell>
                      <TableCell>{message.reference}</TableCell>
                      <TableCell>{message.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="exchange" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Биржа</TableHead>
                    <TableHead>Инструмент</TableHead>
                    <TableHead>Объем</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchangeData.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell className="font-mono text-xs">{operation.id}</TableCell>
                      <TableCell>{operation.date}</TableCell>
                      <TableCell>{operation.exchange}</TableCell>
                      <TableCell>{operation.instrument}</TableCell>
                      <TableCell>{operation.volume}</TableCell>
                      <TableCell>{operation.price}</TableCell>
                      <TableCell>{operation.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="card" className="border rounded-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Номер карты</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Продавец</TableHead>
                    <TableHead>Локация</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cardData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.cardNumber}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>{transaction.location}</TableCell>
                      <TableCell>{transaction.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, PieChart } from "@/components/ui/charts";

export const BankStatistics: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");

  // Имитируем данные для различных разделов статистики
  const userActivityData = [
    { date: "01.05.2025", newUsers: 15, activeUsers: 120, transactions: 450, sessionTime: 12.4 },
    { date: "02.05.2025", newUsers: 12, activeUsers: 135, transactions: 478, sessionTime: 11.5 },
    { date: "03.05.2025", newUsers: 18, activeUsers: 142, transactions: 512, sessionTime: 13.2 },
    { date: "04.05.2025", newUsers: 22, activeUsers: 156, transactions: 543, sessionTime: 12.8 },
    { date: "05.05.2025", newUsers: 17, activeUsers: 148, transactions: 487, sessionTime: 12.1 },
    { date: "06.05.2025", newUsers: 23, activeUsers: 162, transactions: 532, sessionTime: 13.7 },
    { date: "07.05.2025", newUsers: 28, activeUsers: 175, transactions: 578, sessionTime: 14.2 },
    { date: "08.05.2025", newUsers: 25, activeUsers: 180, transactions: 562, sessionTime: 13.5 },
    { date: "09.05.2025", newUsers: 20, activeUsers: 172, transactions: 534, sessionTime: 12.9 },
  ];

  const transactionStats = [
    { date: "01.05.2025", volume: 5450000, count: 890, avgSize: 6123.59, successRate: 99.1 },
    { date: "02.05.2025", volume: 4980000, count: 823, avgSize: 6050.42, successRate: 98.7 },
    { date: "03.05.2025", volume: 6230000, count: 967, avgSize: 6442.60, successRate: 99.5 },
    { date: "04.05.2025", volume: 6780000, count: 1024, avgSize: 6621.09, successRate: 99.3 },
    { date: "05.05.2025", volume: 5890000, count: 932, avgSize: 6319.74, successRate: 99.0 },
    { date: "06.05.2025", volume: 7120000, count: 1089, avgSize: 6538.10, successRate: 99.4 },
    { date: "07.05.2025", volume: 7650000, count: 1156, avgSize: 6617.64, successRate: 99.6 },
    { date: "08.05.2025", volume: 7320000, count: 1102, avgSize: 6642.46, successRate: 99.2 },
    { date: "09.05.2025", volume: 6890000, count: 1045, avgSize: 6593.30, successRate: 99.5 },
  ];

  const clientSegments = [
    { segment: "Розничные клиенты", count: 15420, percentage: 76.8, growth: 3.2 },
    { segment: "Малый и средний бизнес", count: 3180, percentage: 15.8, growth: 5.7 },
    { segment: "Корпоративные клиенты", count: 845, percentage: 4.2, growth: 2.1 },
    { segment: "VIP-клиенты", count: 630, percentage: 3.1, growth: 7.4 },
    { segment: "Государственные организации", count: 25, percentage: 0.1, growth: 0.0 },
  ];

  const productPerformance = [
    { product: "Дебетовые карты", volume: 12500000, users: 9850, growth: 4.5, satisfaction: 4.2 },
    { product: "Кредитные карты", volume: 8750000, users: 6420, growth: 3.8, satisfaction: 3.9 },
    { product: "Ипотека", volume: 256000000, users: 2340, growth: 5.2, satisfaction: 4.3 },
    { product: "Потребительские кредиты", volume: 78400000, users: 5680, growth: 2.1, satisfaction: 4.0 },
    { product: "Автокредиты", volume: 45600000, users: 1870, growth: 1.5, satisfaction: 4.1 },
    { product: "Вклады", volume: 186000000, users: 7450, growth: 3.3, satisfaction: 4.4 },
    { product: "Инвестиции", volume: 92300000, users: 3210, growth: 7.8, satisfaction: 4.0 },
    { product: "Переводы", volume: 34500000, users: 11240, growth: 6.3, satisfaction: 4.5 },
  ];

  // Данные для графиков
  const userActivityChartData = [
    { name: "01.05", активные: 120, новые: 15 },
    { name: "02.05", активные: 135, новые: 12 },
    { name: "03.05", активные: 142, новые: 18 },
    { name: "04.05", активные: 156, новые: 22 },
    { name: "05.05", активные: 148, новые: 17 },
    { name: "06.05", активные: 162, новые: 23 },
    { name: "07.05", активные: 175, новые: 28 },
    { name: "08.05", активные: 180, новые: 25 },
    { name: "09.05", активные: 172, новые: 20 },
  ];

  const transactionChartData = [
    { name: "01.05", объем: 5.45 },
    { name: "02.05", объем: 4.98 },
    { name: "03.05", объем: 6.23 },
    { name: "04.05", объем: 6.78 },
    { name: "05.05", объем: 5.89 },
    { name: "06.05", объем: 7.12 },
    { name: "07.05", объем: 7.65 },
    { name: "08.05", объем: 7.32 },
    { name: "09.05", объем: 6.89 },
  ];

  const segmentChartData = [
    { name: "Розничные", value: 76.8 },
    { name: "МСБ", value: 15.8 },
    { name: "Корпоративные", value: 4.2 },
    { name: "VIP", value: 3.1 },
    { name: "Гос. орг.", value: 0.1 },
  ];

  const productPerformanceChartData = [
    { name: "Дебетовые", объем: 12.5 },
    { name: "Кредитные", объем: 8.75 },
    { name: "Ипотека", объем: 25.6 },
    { name: "Потреб. кредиты", объем: 7.84 },
    { name: "Автокредиты", объем: 4.56 },
    { name: "Вклады", объем: 18.6 },
    { name: "Инвестиции", объем: 9.23 },
    { name: "Переводы", объем: 3.45 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Статистика банка</CardTitle>
          <CardDescription>Анализ активности и эффективности</CardDescription>
        </div>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity">
          <TabsList className="mb-6">
            <TabsTrigger value="activity">Активность пользователей</TabsTrigger>
            <TabsTrigger value="transactions">Транзакции</TabsTrigger>
            <TabsTrigger value="segments">Сегменты клиентов</TabsTrigger>
            <TabsTrigger value="products">Эффективность продуктов</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-6">
            <div className="h-72">
              <AreaChart 
                data={userActivityChartData} 
                index="name"
                categories={["активные", "новые"]}
                colors={["blue", "green"]}
                yAxisWidth={40}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
                showGridLines={true}
                autoMinValue={true}
                startEndOnly={false}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Новые пользователи</TableHead>
                  <TableHead>Активные пользователи</TableHead>
                  <TableHead>Транзакции</TableHead>
                  <TableHead>Среднее время сессии (мин)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userActivityData.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.newUsers}</TableCell>
                    <TableCell>{day.activeUsers}</TableCell>
                    <TableCell>{day.transactions}</TableCell>
                    <TableCell>{day.sessionTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <div className="h-72">
              <BarChart 
                data={transactionChartData}
                index="name"
                categories={["объем"]}
                colors={["blue"]}
                yAxisWidth={40}
                showLegend={false}
                showTooltip={true}
                showXAxis={true}
                showYAxis={true}
                showGridLines={true}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Объем (₽)</TableHead>
                  <TableHead>Количество</TableHead>
                  <TableHead>Средний размер (₽)</TableHead>
                  <TableHead>Успешность (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionStats.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{new Intl.NumberFormat('ru-RU').format(day.volume)}</TableCell>
                    <TableCell>{day.count}</TableCell>
                    <TableCell>{new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(day.avgSize)}</TableCell>
                    <TableCell>{day.successRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="segments" className="space-y-6">
            <div className="h-72 flex justify-center">
              <PieChart 
                data={segmentChartData}
                category="value"
                index="name"
                colors={["blue", "green", "red", "purple", "yellow"]}
                showTooltip={true}
                showLegend={true}
                valueFormatter={(value) => `${value}%`}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сегмент</TableHead>
                  <TableHead>Количество клиентов</TableHead>
                  <TableHead>Доля (%)</TableHead>
                  <TableHead>Рост (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientSegments.map((segment) => (
                  <TableRow key={segment.segment}>
                    <TableCell>{segment.segment}</TableCell>
                    <TableCell>{new Intl.NumberFormat('ru-RU').format(segment.count)}</TableCell>
                    <TableCell>{segment.percentage}%</TableCell>
                    <TableCell className={segment.growth > 0 ? "text-green-600" : "text-red-600"}>
                      {segment.growth > 0 ? "+" : ""}{segment.growth}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-6">
            <div className="h-72">
              <BarChart 
                data={productPerformanceChartData}
                index="name"
                categories={["объем"]}
                colors={["indigo"]}
                yAxisWidth={40}
                showLegend={false}
                showTooltip={true}
                showXAxis={true}
                showYAxis={true}
                showGridLines={true}
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Продукт</TableHead>
                  <TableHead>Объем (₽)</TableHead>
                  <TableHead>Пользователи</TableHead>
                  <TableHead>Рост (%)</TableHead>
                  <TableHead>Удовлетворенность</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productPerformance.map((product) => (
                  <TableRow key={product.product}>
                    <TableCell>{product.product}</TableCell>
                    <TableCell>{new Intl.NumberFormat('ru-RU').format(product.volume)}</TableCell>
                    <TableCell>{new Intl.NumberFormat('ru-RU').format(product.users)}</TableCell>
                    <TableCell className={product.growth > 0 ? "text-green-600" : "text-red-600"}>
                      {product.growth > 0 ? "+" : ""}{product.growth}%
                    </TableCell>
                    <TableCell>{product.satisfaction} / 5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

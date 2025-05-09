
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, PieChart } from "@/components/ui/charts";

// Данные по валютному рынку
const currencyData = [
  { date: "Янв", usd: 90.5, eur: 98.7, cny: 12.8 },
  { date: "Фев", usd: 91.2, eur: 99.4, cny: 12.9 },
  { date: "Мар", usd: 92.6, eur: 100.8, cny: 13.1 },
  { date: "Апр", usd: 91.3, eur: 99.6, cny: 12.8 },
  { date: "Май", usd: 89.7, eur: 97.8, cny: 12.6 },
  { date: "Июн", usd: 88.2, eur: 96.1, cny: 12.3 },
  { date: "Июл", usd: 87.5, eur: 95.3, cny: 12.1 },
  { date: "Авг", usd: 86.8, eur: 94.6, cny: 12.0 },
  { date: "Сен", usd: 85.7, eur: 93.2, cny: 11.8 },
];

// Данные по фондовому рынку
const stockData = [
  { date: "Янв", index: 3200 },
  { date: "Фев", index: 3150 },
  { date: "Мар", index: 3050 },
  { date: "Апр", index: 3180 },
  { date: "Май", index: 3340 },
  { date: "Июн", index: 3420 },
  { date: "Июл", index: 3520 },
  { date: "Авг", index: 3610 },
  { date: "Сен", index: 3680 },
];

// Данные по объемам торгов
const volumeData = [
  { year: "2020", stocks: 78.5, bonds: 45.7, derivatives: 22.3, currency: 265.8 },
  { year: "2021", stocks: 91.2, bonds: 53.4, derivatives: 28.6, currency: 289.7 },
  { year: "2022", stocks: 68.4, bonds: 49.8, derivatives: 24.2, currency: 312.5 },
  { year: "2023", stocks: 82.7, bonds: 56.9, derivatives: 31.1, currency: 345.2 },
  { year: "2024", stocks: 97.3, bonds: 62.8, derivatives: 36.5, currency: 378.4 },
];

// Данные по структуре рынка облигаций
const bondData = [
  { name: "ОФЗ", value: 45.2 },
  { name: "Корпоративные облигации", value: 38.7 },
  { name: "Муниципальные облигации", value: 5.3 },
  { name: "Еврооблигации", value: 10.8 }
];

// Данные по межбанковскому рынку
const interBankData = [
  { date: "Янв", overnight: 16.2, week: 16.4, month: 16.7 },
  { date: "Фев", overnight: 16.3, week: 16.5, month: 16.8 },
  { date: "Мар", overnight: 16.5, week: 16.7, month: 17.0 },
  { date: "Апр", overnight: 16.4, week: 16.6, month: 16.9 },
  { date: "Май", overnight: 16.3, week: 16.5, month: 16.8 },
  { date: "Июн", overnight: 16.0, week: 16.2, month: 16.5 },
  { date: "Июл", overnight: 15.8, week: 16.0, month: 16.3 },
  { date: "Авг", overnight: 15.7, week: 15.9, month: 16.2 },
  { date: "Сен", overnight: 15.5, week: 15.7, month: 16.0 },
];

export default function FinancialStats() {
  const [yearFilter, setYearFilter] = useState("2024");
  const [periodFilter, setPeriodFilter] = useState("ytd");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Финансовая статистика</h1>
          <p className="text-muted-foreground mb-8">Статистика финансовых рынков и операций</p>
          
          <Tabs defaultValue="currency">
            <TabsList className="mb-8">
              <TabsTrigger value="currency">Валютный рынок</TabsTrigger>
              <TabsTrigger value="stock">Фондовый рынок</TabsTrigger>
              <TabsTrigger value="bond">Рынок облигаций</TabsTrigger>
              <TabsTrigger value="interbank">Межбанковский рынок</TabsTrigger>
              <TabsTrigger value="volumes">Объемы торгов</TabsTrigger>
            </TabsList>
            
            <TabsContent value="currency" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Валютный рынок</h2>
                  <p className="text-muted-foreground">Динамика курсов основных валют</p>
                </div>
                
                <div className="flex gap-4">
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Год" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ytd">С начала года</SelectItem>
                      <SelectItem value="1m">1 месяц</SelectItem>
                      <SelectItem value="3m">3 месяца</SelectItem>
                      <SelectItem value="6m">6 месяцев</SelectItem>
                      <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Динамика курсов валют в 2024 году</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart
                      data={currencyData}
                      index="date"
                      categories={["usd", "eur", "cny"]}
                      colors={["#2563eb", "#10b981", "#f59e0b"]}
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                      <span className="text-sm">USD/RUB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">EUR/RUB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm">CNY/RUB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">USD/RUB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">85,70 ₽</div>
                      <div className="text-sm text-green-600 flex items-center">
                        -5,3% YTD
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Минимум (52 нед.)</div>
                        <div className="font-medium">84,20 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Максимум (52 нед.)</div>
                        <div className="font-medium">96,80 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Волатильность (30 дн.)</div>
                        <div className="font-medium">1,12%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">EUR/RUB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">93,20 ₽</div>
                      <div className="text-sm text-green-600 flex items-center">
                        -5,6% YTD
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Минимум (52 нед.)</div>
                        <div className="font-medium">91,50 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Максимум (52 нед.)</div>
                        <div className="font-medium">105,40 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Волатильность (30 дн.)</div>
                        <div className="font-medium">1,25%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">CNY/RUB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">11,80 ₽</div>
                      <div className="text-sm text-green-600 flex items-center">
                        -7,8% YTD
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Минимум (52 нед.)</div>
                        <div className="font-medium">11,60 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Максимум (52 нед.)</div>
                        <div className="font-medium">13,80 ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Волатильность (30 дн.)</div>
                        <div className="font-medium">0,95%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Структура торгов на валютном рынке (III кв. 2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Объем торгов по валютным парам</h3>
                      <div className="h-64">
                        <PieChart
                          data={[
                            { name: "USD/RUB", value: 68.4 },
                            { name: "EUR/RUB", value: 18.7 },
                            { name: "CNY/RUB", value: 10.5 },
                            { name: "Другие пары", value: 2.4 }
                          ]}
                          index="name"
                          category="value"
                        />
                      </div>
                    </div>
                    
                    <div className="self-center">
                      <h3 className="text-lg font-semibold mb-4">Среднедневной объем торгов</h3>
                      <div className="overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Инструмент</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Объем (млрд ₽)</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Изменение к II кв.</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm">Спот</td>
                              <td className="px-4 py-3 text-sm font-medium">825,4</td>
                              <td className="px-4 py-3 text-sm text-green-600">+5,2%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm">Своп</td>
                              <td className="px-4 py-3 text-sm font-medium">1 258,7</td>
                              <td className="px-4 py-3 text-sm text-green-600">+3,8%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm">Форвард</td>
                              <td className="px-4 py-3 text-sm font-medium">67,2</td>
                              <td className="px-4 py-3 text-sm text-green-600">+2,1%</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm">Опционы</td>
                              <td className="px-4 py-3 text-sm font-medium">42,8</td>
                              <td className="px-4 py-3 text-sm text-green-600">+8,5%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stock" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Фондовый рынок</h2>
                  <p className="text-muted-foreground">Динамика индексов и активность торгов</p>
                </div>
                
                <div className="flex gap-4">
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ytd">С начала года</SelectItem>
                      <SelectItem value="1m">1 месяц</SelectItem>
                      <SelectItem value="3m">3 месяца</SelectItem>
                      <SelectItem value="6m">6 месяцев</SelectItem>
                      <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Динамика индекса MOEX в 2024 году</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart
                      data={stockData}
                      index="date"
                      categories={["index"]}
                      colors={["#2563eb"]}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Индекс MOEX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">3 680</div>
                      <div className="text-sm text-green-600 flex items-center">
                        +15,0% YTD
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Минимум (52 нед.)</div>
                        <div className="font-medium">3 050</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Максимум (52 нед.)</div>
                        <div className="font-medium">3 700</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Волатильность (30 дн.)</div>
                        <div className="font-medium">12,5%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Индекс РТС</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">1 340</div>
                      <div className="text-sm text-green-600 flex items-center">
                        +21,8% YTD
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Минимум (52 нед.)</div>
                        <div className="font-medium">1 050</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Максимум (52 нед.)</div>
                        <div className="font-medium">1 360</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Волатильность (30 дн.)</div>
                        <div className="font-medium">14,2%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Объем торгов акциями</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">97,3 млрд ₽</div>
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      +17,7% к аналогичному периоду 2023 года
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Количество сделок</div>
                        <div className="font-medium">4,2 млн</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Количество активных инвесторов</div>
                        <div className="font-medium">27,5 млн</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Количество эмитентов</div>
                        <div className="font-medium">248</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Структура торгов акциями по секторам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart
                        data={[
                          { name: "Нефть и газ", value: 34.8 },
                          { name: "Финансы", value: 23.5 },
                          { name: "Металлургия", value: 15.2 },
                          { name: "Потребительский", value: 8.7 },
                          { name: "Телекоммуникации", value: 7.4 },
                          { name: "Электроэнергетика", value: 5.8 },
                          { name: "Другие", value: 4.6 }
                        ]}
                        index="name"
                        category="value"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Топ-5 компаний по капитализации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Компания</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Тикер</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Капитализация (млрд ₽)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Изменение YTD</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Газпром</td>
                            <td className="px-4 py-3 text-sm">GAZP</td>
                            <td className="px-4 py-3 text-sm">6 420</td>
                            <td className="px-4 py-3 text-sm text-green-600">+12,5%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Сбербанк</td>
                            <td className="px-4 py-3 text-sm">SBER</td>
                            <td className="px-4 py-3 text-sm">5 850</td>
                            <td className="px-4 py-3 text-sm text-green-600">+28,6%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Роснефть</td>
                            <td className="px-4 py-3 text-sm">ROSN</td>
                            <td className="px-4 py-3 text-sm">4 720</td>
                            <td className="px-4 py-3 text-sm text-green-600">+8,3%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Лукойл</td>
                            <td className="px-4 py-3 text-sm">LKOH</td>
                            <td className="px-4 py-3 text-sm">4 450</td>
                            <td className="px-4 py-3 text-sm text-green-600">+15,9%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm font-medium">Норильский никель</td>
                            <td className="px-4 py-3 text-sm">GMKN</td>
                            <td className="px-4 py-3 text-sm">3 680</td>
                            <td className="px-4 py-3 text-sm text-red-600">-3,7%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bond" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Рынок облигаций</h2>
                  <p className="text-muted-foreground">Доходность и структура рынка облигаций</p>
                </div>
                
                <div className="flex gap-4">
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ytd">С начала года</SelectItem>
                      <SelectItem value="1m">1 месяц</SelectItem>
                      <SelectItem value="3m">3 месяца</SelectItem>
                      <SelectItem value="6m">6 месяцев</SelectItem>
                      <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Кривая доходности ОФЗ (30.09.2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart
                      data={[
                        { tenor: "6M", yield: 12.5 },
                        { tenor: "1Y", yield: 12.8 },
                        { tenor: "2Y", yield: 13.2 },
                        { tenor: "3Y", yield: 13.5 },
                        { tenor: "5Y", yield: 13.9 },
                        { tenor: "7Y", yield: 14.1 },
                        { tenor: "10Y", yield: 14.3 },
                        { tenor: "15Y", yield: 14.5 },
                        { tenor: "20Y", yield: 14.6 }
                      ]}
                      index="tenor"
                      categories={["yield"]}
                      colors={["#2563eb"]}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Структура рынка облигаций (III кв. 2024)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart
                        data={bondData}
                        index="name"
                        category="value"
                        colors={["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"]}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Доходность корпоративных облигаций по рейтингам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={[
                          { rating: "AAA", yield: 14.2 },
                          { rating: "AA", yield: 14.8 },
                          { rating: "A", yield: 15.5 },
                          { rating: "BBB", yield: 16.3 },
                          { rating: "BB", yield: 17.8 },
                          { rating: "B", yield: 19.5 }
                        ]}
                        index="rating"
                        categories={["yield"]}
                        colors={["#2563eb"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Первичные размещения облигаций</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Эмитент</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Тип облигаций</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Дата размещения</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Объем (млрд ₽)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Срок (лет)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Доходность (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Минфин</td>
                          <td className="px-4 py-3 text-sm">ОФЗ 26242</td>
                          <td className="px-4 py-3 text-sm">28.09.2024</td>
                          <td className="px-4 py-3 text-sm">35,0</td>
                          <td className="px-4 py-3 text-sm">7</td>
                          <td className="px-4 py-3 text-sm">14,1</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Газпром</td>
                          <td className="px-4 py-3 text-sm">Корп. облигации</td>
                          <td className="px-4 py-3 text-sm">22.09.2024</td>
                          <td className="px-4 py-3 text-sm">15,0</td>
                          <td className="px-4 py-3 text-sm">5</td>
                          <td className="px-4 py-3 text-sm">14,5</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Сбербанк</td>
                          <td className="px-4 py-3 text-sm">Субординированные</td>
                          <td className="px-4 py-3 text-sm">15.09.2024</td>
                          <td className="px-4 py-3 text-sm">12,0</td>
                          <td className="px-4 py-3 text-sm">10</td>
                          <td className="px-4 py-3 text-sm">15,2</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Москва</td>
                          <td className="px-4 py-3 text-sm">Муниципальные</td>
                          <td className="px-4 py-3 text-sm">12.09.2024</td>
                          <td className="px-4 py-3 text-sm">8,5</td>
                          <td className="px-4 py-3 text-sm">3</td>
                          <td className="px-4 py-3 text-sm">13,8</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">РЖД</td>
                          <td className="px-4 py-3 text-sm">Корп. облигации</td>
                          <td className="px-4 py-3 text-sm">05.09.2024</td>
                          <td className="px-4 py-3 text-sm">10,0</td>
                          <td className="px-4 py-3 text-sm">7</td>
                          <td className="px-4 py-3 text-sm">14,7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interbank" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Межбанковский рынок</h2>
                  <p className="text-muted-foreground">Ставки и объемы на межбанковском рынке</p>
                </div>
                
                <div className="flex gap-4">
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Год" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Динамика ставок межбанковского рынка в 2024 году</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart
                      data={interBankData}
                      index="date"
                      categories={["overnight", "week", "month"]}
                      colors={["#2563eb", "#10b981", "#f59e0b"]}
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                      <span className="text-sm">Овернайт</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">1 неделя</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm">1 месяц</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">RUONIA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">15,52%</div>
                      <div className="text-sm text-red-600 flex items-center">
                        -0,18 п.п. за день
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Объем сделок</div>
                        <div className="font-medium">847,2 млрд ₽</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Ключевая ставка</div>
                        <div className="font-medium">16,00%</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Спред к ключевой</div>
                        <div className="font-medium">-0,48 п.п.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">MosPrime (3M)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-baseline">
                      <div className="text-3xl font-bold">16,24%</div>
                      <div className="text-sm text-green-600 flex items-center">
                        +0,03 п.п. за день
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Последнее обновление: 30.09.2024
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>MosPrime (1M)</div>
                        <div className="font-medium">16,14%</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>MosPrime (6M)</div>
                        <div className="font-medium">16,38%</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Спред к ключевой</div>
                        <div className="font-medium">+0,24 п.п.</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Операции РЕПО с ЦБ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,73 трлн ₽</div>
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      +125,4 млрд ₽ за день
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <div>Средневзвешенная ставка</div>
                        <div className="font-medium">16,05%</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Срок</div>
                        <div className="font-medium">1 день</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div>Количество участников</div>
                        <div className="font-medium">195</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Объемы торгов на денежном рынке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={[
                        { month: "Янв", repo: 32.8, swap: 18.5, deposit: 12.3, credit: 8.2 },
                        { month: "Фев", repo: 34.2, swap: 19.1, deposit: 12.8, credit: 8.5 },
                        { month: "Мар", repo: 33.7, swap: 18.9, deposit: 12.6, credit: 8.4 },
                        { month: "Апр", repo: 35.1, swap: 19.7, deposit: 13.1, credit: 8.7 },
                        { month: "Май", repo: 36.8, swap: 20.6, deposit: 13.7, credit: 9.2 },
                        { month: "Июн", repo: 38.4, swap: 21.5, deposit: 14.3, credit: 9.6 },
                        { month: "Июл", repo: 39.2, swap: 22.0, deposit: 14.7, credit: 9.8 },
                        { month: "Авг", repo: 40.5, swap: 22.7, deposit: 15.1, credit: 10.1 },
                        { month: "Сен", repo: 41.8, swap: 23.4, deposit: 15.6, credit: 10.4 }
                      ]}
                      index="month"
                      categories={["repo", "swap", "deposit", "credit"]}
                      colors={["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"]}
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                      <span className="text-sm">РЕПО</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">Валютные свопы</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm">Депозитные операции</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
                      <span className="text-sm">Кредитные операции</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Объемы торгов (трлн ₽)
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="volumes" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Объемы торгов на финансовых рынках</h2>
                  <p className="text-muted-foreground">Динамика объемов торгов по основным сегментам рынка</p>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Годовые объемы торгов по сегментам рынка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart
                      data={volumeData}
                      index="year"
                      categories={["stocks", "bonds", "derivatives", "currency"]}
                      colors={["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"]}
                    />
                  </div>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                      <span className="text-sm">Акции</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">Облигации</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm">Деривативы</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
                      <span className="text-sm">Валютный рынок</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Объемы торгов (трлн ₽)
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Структура объема торгов (2024)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart
                        data={[
                          { name: "Акции", value: 97.3 },
                          { name: "Облигации", value: 62.8 },
                          { name: "Деривативы", value: 36.5 },
                          { name: "Валютный рынок", value: 378.4 },
                          { name: "Денежный рынок", value: 176.5 },
                          { name: "Товарный рынок", value: 12.8 }
                        ]}
                        index="name"
                        category="value"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Темпы прироста объемов торгов (2024/2023, %)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart
                        data={[
                          { market: "Акции", growth: 17.7 },
                          { market: "Облигации", growth: 10.4 },
                          { market: "Деривативы", growth: 17.4 },
                          { market: "Валютный", growth: 9.6 },
                          { market: "Денежный", growth: 12.8 },
                          { market: "Товарный", growth: 15.3 }
                        ]}
                        index="market"
                        categories={["growth"]}
                        colors={["#2563eb"]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Объемы торгов по месяцам 2024 года</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Рынок</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Янв</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Фев</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Мар</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Апр</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Май</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Июн</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Июл</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Авг</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Сен</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Акции</td>
                          <td className="px-4 py-3 text-sm">9.2</td>
                          <td className="px-4 py-3 text-sm">9.5</td>
                          <td className="px-4 py-3 text-sm">10.1</td>
                          <td className="px-4 py-3 text-sm">10.4</td>
                          <td className="px-4 py-3 text-sm">10.8</td>
                          <td className="px-4 py-3 text-sm">11.2</td>
                          <td className="px-4 py-3 text-sm">11.5</td>
                          <td className="px-4 py-3 text-sm">11.9</td>
                          <td className="px-4 py-3 text-sm">12.7</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Облигации</td>
                          <td className="px-4 py-3 text-sm">6.1</td>
                          <td className="px-4 py-3 text-sm">6.3</td>
                          <td className="px-4 py-3 text-sm">6.5</td>
                          <td className="px-4 py-3 text-sm">6.7</td>
                          <td className="px-4 py-3 text-sm">6.9</td>
                          <td className="px-4 py-3 text-sm">7.1</td>
                          <td className="px-4 py-3 text-sm">7.4</td>
                          <td className="px-4 py-3 text-sm">7.7</td>
                          <td className="px-4 py-3 text-sm">8.1</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Валютный рынок</td>
                          <td className="px-4 py-3 text-sm">37.2</td>
                          <td className="px-4 py-3 text-sm">38.1</td>
                          <td className="px-4 py-3 text-sm">39.5</td>
                          <td className="px-4 py-3 text-sm">40.7</td>
                          <td className="px-4 py-3 text-sm">41.8</td>
                          <td className="px-4 py-3 text-sm">42.6</td>
                          <td className="px-4 py-3 text-sm">43.9</td>
                          <td className="px-4 py-3 text-sm">45.2</td>
                          <td className="px-4 py-3 text-sm">49.4</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Деривативы</td>
                          <td className="px-4 py-3 text-sm">3.4</td>
                          <td className="px-4 py-3 text-sm">3.6</td>
                          <td className="px-4 py-3 text-sm">3.7</td>
                          <td className="px-4 py-3 text-sm">3.9</td>
                          <td className="px-4 py-3 text-sm">4.1</td>
                          <td className="px-4 py-3 text-sm">4.3</td>
                          <td className="px-4 py-3 text-sm">4.4</td>
                          <td className="px-4 py-3 text-sm">4.5</td>
                          <td className="px-4 py-3 text-sm">4.6</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Объемы торгов (трлн ₽)
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
}

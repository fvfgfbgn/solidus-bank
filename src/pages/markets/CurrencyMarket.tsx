
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyTable } from "@/components/CurrencyTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Sample historical data for USD rate
const USD_HISTORY = [
  { date: "01.04", rate: 90.53 },
  { date: "02.04", rate: 90.21 },
  { date: "03.04", rate: 89.85 },
  { date: "04.04", rate: 90.12 },
  { date: "05.04", rate: 90.45 },
  { date: "06.04", rate: 90.32 },
  { date: "07.04", rate: 90.08 },
  { date: "08.04", rate: 89.95 },
  { date: "09.04", rate: 89.64 },
  { date: "10.04", rate: 89.42 },
  { date: "11.04", rate: 89.51 },
  { date: "12.04", rate: 89.78 },
  { date: "13.04", rate: 89.89 },
  { date: "14.04", rate: 90.15 },
  { date: "15.04", rate: 90.33 },
  { date: "16.04", rate: 90.24 },
  { date: "17.04", rate: 90.05 },
  { date: "18.04", rate: 89.97 },
  { date: "19.04", rate: 89.86 },
  { date: "20.04", rate: 89.75 },
  { date: "21.04", rate: 89.65 },
  { date: "22.04", rate: 89.82 },
  { date: "23.04", rate: 89.93 },
  { date: "24.04", rate: 90.05 },
  { date: "25.04", rate: 89.98 },
  { date: "26.04", rate: 89.87 },
  { date: "27.04", rate: 89.92 },
  { date: "28.04", rate: 90.01 },
  { date: "29.04", rate: 89.94 },
  { date: "30.04", rate: 89.84 },
  { date: "01.05", rate: 89.76 },
  { date: "02.05", rate: 89.65 },
  { date: "03.05", rate: 89.71 },
  { date: "04.05", rate: 89.75 },
  { date: "05.05", rate: 89.74 },
];

// Sample historical data for EUR rate
const EUR_HISTORY = [
  { date: "01.04", rate: 97.92 },
  { date: "02.04", rate: 97.65 },
  { date: "03.04", rate: 97.43 },
  { date: "04.04", rate: 97.58 },
  { date: "05.04", rate: 97.82 },
  { date: "06.04", rate: 97.76 },
  { date: "07.04", rate: 97.61 },
  { date: "08.04", rate: 97.52 },
  { date: "09.04", rate: 97.35 },
  { date: "10.04", rate: 97.21 },
  { date: "11.04", rate: 97.34 },
  { date: "12.04", rate: 97.55 },
  { date: "13.04", rate: 97.67 },
  { date: "14.04", rate: 97.84 },
  { date: "15.04", rate: 97.95 },
  { date: "16.04", rate: 97.88 },
  { date: "17.04", rate: 97.72 },
  { date: "18.04", rate: 97.65 },
  { date: "19.04", rate: 97.57 },
  { date: "20.04", rate: 97.48 },
  { date: "21.04", rate: 97.42 },
  { date: "22.04", rate: 97.56 },
  { date: "23.04", rate: 97.65 },
  { date: "24.04", rate: 97.73 },
  { date: "25.04", rate: 97.69 },
  { date: "26.04", rate: 97.61 },
  { date: "27.04", rate: 97.65 },
  { date: "28.04", rate: 97.72 },
  { date: "29.04", rate: 97.68 },
  { date: "30.04", rate: 97.59 },
  { date: "01.05", rate: 97.54 },
  { date: "02.05", rate: 97.47 },
  { date: "03.05", rate: 97.52 },
  { date: "04.05", rate: 97.58 },
  { date: "05.05", rate: 97.63 },
];

export default function CurrencyMarket() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  
  const chartConfig = {
    rate: {
      label: "Курс",
      theme: {
        light: "#4682B4",
        dark: "#4682B4",
      },
    },
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Валютный рынок</h1>
          <p className="text-muted-foreground mb-8">Официальные курсы иностранных валют</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="current">Текущие курсы</TabsTrigger>
              <TabsTrigger value="dynamics">Динамика курсов</TabsTrigger>
              <TabsTrigger value="calculator">Валютный калькулятор</TabsTrigger>
              <TabsTrigger value="archive">Архив</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="pt-6">
              <CurrencyTable />
            </TabsContent>
            
            <TabsContent value="dynamics" className="pt-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Выберите валюту:</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCurrency("USD")}
                    className={`px-4 py-2 border rounded-md ${selectedCurrency === "USD" ? "bg-solidus-steel-blue text-white" : "bg-white"}`}
                  >
                    USD (Доллар США)
                  </button>
                  <button 
                    onClick={() => setSelectedCurrency("EUR")}
                    className={`px-4 py-2 border rounded-md ${selectedCurrency === "EUR" ? "bg-solidus-steel-blue text-white" : "bg-white"}`}
                  >
                    EUR (Евро)
                  </button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedCurrency === "USD" ? "Доллар США" : "Евро"} (₽)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={selectedCurrency === "USD" ? USD_HISTORY : EUR_HISTORY}
                        >
                          <XAxis 
                            dataKey="date" 
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                            domain={
                              selectedCurrency === "USD" 
                                ? ['auto', 'auto']
                                : ['auto', 'auto']
                            }
                          />
                          <Tooltip />
                          <Line
                            name="rate"
                            type="monotone" 
                            dataKey="rate"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                    <div>01.04.2025</div>
                    <div>05.05.2025</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calculator" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Валютный калькулятор</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Из валюты:</label>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <select className="p-2 border rounded-md">
                          <option value="RUB">RUB - Российский рубль</option>
                          <option value="USD">USD - Доллар США</option>
                          <option value="EUR">EUR - Евро</option>
                          <option value="GBP">GBP - Фунт стерлингов</option>
                          <option value="JPY">JPY - Японская иена</option>
                          <option value="CNY">CNY - Китайский юань</option>
                          <option value="CHF">CHF - Швейцарский франк</option>
                        </select>
                        <input 
                          type="number" 
                          className="p-2 border rounded-md"
                          placeholder="Сумма"
                          defaultValue={100}
                        />
                      </div>
                      
                      <label className="block text-sm font-medium mb-2">В валюту:</label>
                      <div className="grid grid-cols-2 gap-4">
                        <select className="p-2 border rounded-md" defaultValue="USD">
                          <option value="RUB">RUB - Российский рубль</option>
                          <option value="USD">USD - Доллар США</option>
                          <option value="EUR">EUR - Евро</option>
                          <option value="GBP">GBP - Фунт стерлингов</option>
                          <option value="JPY">JPY - Японская иена</option>
                          <option value="CNY">CNY - Китайский юань</option>
                          <option value="CHF">CHF - Швейцарский франк</option>
                        </select>
                        <input 
                          type="number" 
                          className="p-2 border rounded-md bg-muted/50"
                          readOnly
                          value="1.11"
                        />
                      </div>
                      
                      <button className="mt-6 w-full bg-solidus-steel-blue text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
                        Рассчитать
                      </button>
                    </div>
                    
                    <div className="border-l pl-8 hidden md:block">
                      <h3 className="font-semibold mb-4">Информация по расчету</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Курсы валют для расчета соответствуют официальным курсам
                        Solidus Bank на 05.05.2025.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">USD/RUB</span>
                          <span className="font-medium">89.74 ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">EUR/RUB</span>
                          <span className="font-medium">97.63 ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">GBP/RUB</span>
                          <span className="font-medium">114.15 ₽</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="archive" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Архив курсов валют</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Валюта:</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="USD">USD - Доллар США</option>
                        <option value="EUR">EUR - Евро</option>
                        <option value="GBP">GBP - Фунт стерлингов</option>
                        <option value="JPY">JPY - Японская иена</option>
                        <option value="CNY">CNY - Китайский юань</option>
                        <option value="CHF">CHF - Швейцарский франк</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Период:</label>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="date" className="p-2 border rounded-md" />
                        <input type="date" className="p-2 border rounded-md" />
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-solidus-steel-blue text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
                    Показать
                  </button>
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Выберите валюту и период для получения архивных данных
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Методика расчета курсов иностранных валют</h2>
            <Card>
              <CardContent className="prose max-w-none py-6">
                <p>
                  Официальные курсы иностранных валют по отношению к рублю устанавливаются 
                  Solidus Bank ежедневно (по рабочим дням) на основе котировок межбанковского 
                  валютного рынка.
                </p>
                <p>
                  Курс доллара США к рублю рассчитывается на основе данных о сделках 
                  "доллар-рубль", заключенных на торгах Московской биржи. Сглаженный средний 
                  курс сделок рассчитывается как среднее арифметическое средневзвешенных курсов 
                  покупки-продажи.
                </p>
                <p>
                  Курсы других иностранных валют к рублю определяются на основе официального 
                  курса доллара США к рублю и котировок данных валют к доллару США на 
                  международных валютных рынках.
                </p>
                <h3 className="text-lg font-semibold mt-4">Время публикации курсов</h3>
                <p>
                  Официальные курсы валют устанавливаются ежедневно (по рабочим дням) и публикуются 
                  на сайте Solidus Bank не позднее 15:00 по московскому времени и вступают в силу 
                  на следующий календарный день.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

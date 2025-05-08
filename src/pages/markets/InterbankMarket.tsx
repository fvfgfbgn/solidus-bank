
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample interbank rates data
const interbankRatesData = [
  { date: "08.05.24", overnight: 8.22, week1: 8.26, month1: 8.35, month3: 8.43, month6: 8.56, year1: 8.68 },
  { date: "07.05.24", overnight: 8.21, week1: 8.24, month1: 8.34, month3: 8.45, month6: 8.57, year1: 8.70 },
  { date: "06.05.24", overnight: 8.25, week1: 8.27, month1: 8.36, month3: 8.44, month6: 8.55, year1: 8.71 },
  { date: "03.05.24", overnight: 8.23, week1: 8.26, month1: 8.35, month3: 8.42, month6: 8.54, year1: 8.69 },
  { date: "02.05.24", overnight: 8.20, week1: 8.25, month1: 8.34, month3: 8.43, month6: 8.53, year1: 8.67 },
];

// Sample historical interbank rates data
const historicalRatesData = [
  { month: "Май", year: "2023", rate: 7.25 },
  { month: "Июн", year: "2023", rate: 7.30 },
  { month: "Июл", year: "2023", rate: 7.35 },
  { month: "Авг", year: "2023", rate: 7.45 },
  { month: "Сен", year: "2023", rate: 7.60 },
  { month: "Окт", year: "2023", rate: 7.85 },
  { month: "Ноя", year: "2023", rate: 8.05 },
  { month: "Дек", year: "2023", rate: 8.30 },
  { month: "Янв", year: "2024", rate: 8.40 },
  { month: "Фев", year: "2024", rate: 8.35 },
  { month: "Мар", year: "2024", rate: 8.30 },
  { month: "Апр", year: "2024", rate: 8.25 },
  { month: "Май", year: "2024", rate: 8.20 },
];

// Sample market participants data
const participantsData = [
  { id: 1, name: "Сбербанк", category: "Крупнейший", volume: 152.7, share: 22.4, rating: "AA+" },
  { id: 2, name: "ВТБ", category: "Крупнейший", volume: 98.3, share: 14.5, rating: "AA" },
  { id: 3, name: "Газпромбанк", category: "Крупнейший", volume: 67.9, share: 10.0, rating: "AA-" },
  { id: 4, name: "Альфа-Банк", category: "Крупный", volume: 54.2, share: 8.0, rating: "A+" },
  { id: 5, name: "Россельхозбанк", category: "Крупный", volume: 41.8, share: 6.1, rating: "A" },
  { id: 6, name: "Промсвязьбанк", category: "Крупный", volume: 37.5, share: 5.5, rating: "A" },
  { id: 7, name: "ФК Открытие", category: "Крупный", volume: 31.9, share: 4.7, rating: "A-" },
  { id: 8, name: "МКБ", category: "Средний", volume: 24.6, share: 3.6, rating: "BBB+" },
  { id: 9, name: "Райффайзенбанк", category: "Средний", volume: 19.8, share: 2.9, rating: "A-" },
  { id: 10, name: "Росбанк", category: "Средний", volume: 18.2, share: 2.7, rating: "A-" },
];

// Sample transaction volume data
const volumeData = [
  { month: "Май", year: "2023", volume: 525.3 },
  { month: "Июн", year: "2023", volume: 542.1 },
  { month: "Июл", year: "2023", volume: 561.8 },
  { month: "Авг", year: "2023", volume: 578.2 },
  { month: "Сен", year: "2023", volume: 589.5 },
  { month: "Окт", year: "2023", volume: 601.2 },
  { month: "Ноя", year: "2023", volume: 615.7 },
  { month: "Дек", year: "2023", volume: 630.4 },
  { month: "Янв", year: "2024", volume: 605.8 },
  { month: "Фев", year: "2024", volume: 618.2 },
  { month: "Мар", year: "2024", volume: 630.5 },
  { month: "Апр", year: "2024", volume: 645.3 },
  { month: "Май", year: "2024", volume: 657.9 },
];

// Sample distribution of interbank loans by term
const loanTermData = [
  { term: "Овернайт", share: 58.3 },
  { term: "До 1 недели", share: 19.7 },
  { term: "1-4 недели", share: 11.5 },
  { term: "1-3 месяца", share: 6.4 },
  { term: "3-6 месяцев", share: 2.9 },
  { term: "6-12 месяцев", share: 0.9 },
  { term: "Свыше 1 года", share: 0.3 },
];

export default function InterbankMarket() {
  const [timeframe, setTimeframe] = useState("month");
  const [rateType, setRateType] = useState("overnight");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Межбанковский рынок</h1>
          <p className="text-muted-foreground mb-8">Данные о состоянии межбанковского рынка</p>
          
          <Tabs defaultValue="rates" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="rates">Ставки</TabsTrigger>
              <TabsTrigger value="volume">Объемы торгов</TabsTrigger>
              <TabsTrigger value="participants">Участники рынка</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rates">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Текущие ставки межбанковского рынка</CardTitle>
                  <CardDescription>
                    По данным на {interbankRatesData[0].date}, % годовых
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="bg-muted text-muted-foreground">
                          <th className="p-3 text-left">Срок</th>
                          {interbankRatesData.map((day) => (
                            <th key={day.date} className="p-3 text-right">{day.date}</th>
                          ))}
                          <th className="p-3 text-right">Изменение</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={interbankRatesData[0].overnight > interbankRatesData[1].overnight ? "bg-red-50" : "bg-green-50"}>
                          <td className="p-3 font-medium">Овернайт</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.overnight}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].overnight > interbankRatesData[1].overnight ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].overnight - interbankRatesData[1].overnight).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">1 неделя</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.week1}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].week1 > interbankRatesData[1].week1 ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].week1 - interbankRatesData[1].week1).toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="p-3 font-medium">1 месяц</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.month1}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].month1 > interbankRatesData[1].month1 ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].month1 - interbankRatesData[1].month1).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">3 месяца</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.month3}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].month3 > interbankRatesData[1].month3 ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].month3 - interbankRatesData[1].month3).toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="p-3 font-medium">6 месяцев</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.month6}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].month6 > interbankRatesData[1].month6 ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].month6 - interbankRatesData[1].month6).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">1 год</td>
                          {interbankRatesData.map((day) => (
                            <td key={day.date} className="p-3 text-right">{day.year1}</td>
                          ))}
                          <td className={`p-3 text-right ${interbankRatesData[0].year1 > interbankRatesData[1].year1 ? "text-red-500" : "text-green-500"}`}>
                            {(interbankRatesData[0].year1 - interbankRatesData[1].year1).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>Динамика ставок межбанковского рынка</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="rateType">Тип ставки:</Label>
                        <Select value={rateType} onValueChange={setRateType}>
                          <SelectTrigger id="rateType" className="w-[180px]">
                            <SelectValue placeholder="Выберите тип ставки" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="overnight">Овернайт</SelectItem>
                            <SelectItem value="week1">1 неделя</SelectItem>
                            <SelectItem value="month1">1 месяц</SelectItem>
                            <SelectItem value="month3">3 месяца</SelectItem>
                            <SelectItem value="month6">6 месяцев</SelectItem>
                            <SelectItem value="year1">1 год</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Изменения ставок в годовом выражении (%)
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalRatesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickFormatter={(value, index) => {
                          return historicalRatesData[index].month + " " + historicalRatesData[index].year;
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis domain={[7, 9]} />
                      <Tooltip 
                        formatter={(value) => [value + "%", "Ставка"]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        name="Ставка межбанковского рынка" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={{ r: 5 }} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение кредитов по срокам</CardTitle>
                    <CardDescription>
                      Структура межбанковского рынка по срокам кредитов
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={loanTermData}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 40,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="term" type="category" width={100} />
                        <Tooltip formatter={(value) => [value + "%", "Доля"]} />
                        <Bar dataKey="share" fill="#8884d8">
                          {loanTermData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${280 - index * 15}, 70%, 70%)`} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Спреды к ключевой ставке</CardTitle>
                    <CardDescription>
                      Отклонение рыночных ставок от ключевой ставки Банка России
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Ставка MIACR (овернайт)</span>
                          <Badge variant={interbankRatesData[0].overnight - 8.5 > 0 ? "destructive" : "default"}>
                            {((interbankRatesData[0].overnight - 8.5) > 0 ? "+" : "") + (interbankRatesData[0].overnight - 8.5).toFixed(2) + " п.п."}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${(interbankRatesData[0].overnight - 8.5) > 0 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${Math.abs((interbankRatesData[0].overnight - 8.5) * 20)}%`, minWidth: "5%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Ставка MIACR (1 неделя)</span>
                          <Badge variant={interbankRatesData[0].week1 - 8.5 > 0 ? "destructive" : "default"}>
                            {((interbankRatesData[0].week1 - 8.5) > 0 ? "+" : "") + (interbankRatesData[0].week1 - 8.5).toFixed(2) + " п.п."}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${(interbankRatesData[0].week1 - 8.5) > 0 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${Math.abs((interbankRatesData[0].week1 - 8.5) * 20)}%`, minWidth: "5%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Ставка MIACR (1 месяц)</span>
                          <Badge variant={interbankRatesData[0].month1 - 8.5 > 0 ? "destructive" : "default"}>
                            {((interbankRatesData[0].month1 - 8.5) > 0 ? "+" : "") + (interbankRatesData[0].month1 - 8.5).toFixed(2) + " п.п."}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${(interbankRatesData[0].month1 - 8.5) > 0 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${Math.abs((interbankRatesData[0].month1 - 8.5) * 20)}%`, minWidth: "5%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Ставка MIACR (3 месяца)</span>
                          <Badge variant={interbankRatesData[0].month3 - 8.5 > 0 ? "destructive" : "default"}>
                            {((interbankRatesData[0].month3 - 8.5) > 0 ? "+" : "") + (interbankRatesData[0].month3 - 8.5).toFixed(2) + " п.п."}
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${(interbankRatesData[0].month3 - 8.5) > 0 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${Math.abs((interbankRatesData[0].month3 - 8.5) * 20)}%`, minWidth: "5%" }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Текущая ключевая ставка: <span className="font-medium">8.50%</span></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="volume">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Объем торгов</CardTitle>
                    <CardDescription>За последний торговый день</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold">657.9</span>
                      <span className="text-xl ml-1">млрд ₽</span>
                      <div className="flex items-center justify-center mt-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                        <span>+1.9%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">По сравнению с предыдущим днем</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Среднемесячный объем</CardTitle>
                    <CardDescription>За май 2024 г.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold">638.0</span>
                      <span className="text-xl ml-1">млрд ₽</span>
                      <div className="flex items-center justify-center mt-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                        <span>+3.1%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">По сравнению с предыдущим месяцем</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Количество сделок</CardTitle>
                    <CardDescription>За последний торговый день</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <span className="text-4xl font-bold">1,428</span>
                      <div className="flex items-center justify-center mt-2 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
                        <span>-2.3%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">По сравнению с предыдущим днем</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Динамика объема торгов</CardTitle>
                    <CardDescription>Ежемесячный объем сделок на межбанковском рынке (млрд ₽)</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Выберите период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">За месяц</SelectItem>
                        <SelectItem value="quarter">За квартал</SelectItem>
                        <SelectItem value="year">За год</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={volumeData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickFormatter={(value, index) => {
                          return volumeData[index].month + " " + volumeData[index].year;
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis domain={[500, 700]} />
                      <Tooltip 
                        formatter={(value) => [`${value} млрд ₽`, "Объем"]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="volume" 
                        name="Объем торгов" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Структура рынка по валюте сделок</CardTitle>
                    <CardDescription>Распределение объема торгов по валюте</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { currency: "Рубль", share: 83.5 },
                          { currency: "Доллар США", share: 10.8 },
                          { currency: "Евро", share: 4.3 },
                          { currency: "Юань", share: 1.2 },
                          { currency: "Другие", share: 0.2 }
                        ]}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 80,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="currency" type="category" width={80} />
                        <Tooltip formatter={(value) => [`${value}%`, "Доля"]} />
                        <Bar dataKey="share" fill="#8884d8">
                          <Cell fill="#8884d8" />
                          <Cell fill="#83a6ed" />
                          <Cell fill="#8dd1e1" />
                          <Cell fill="#82ca9d" />
                          <Cell fill="#a4de6c" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Структура рынка по типу сделок</CardTitle>
                    <CardDescription>Распределение объема торгов по типу сделок</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { type: "Необеспеченные кредиты", share: 72.3 },
                          { type: "РЕПО", share: 24.8 },
                          { type: "Валютные свопы", share: 2.5 },
                          { type: "Другие", share: 0.4 }
                        ]}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 120,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="type" type="category" width={120} />
                        <Tooltip formatter={(value) => [`${value}%`, "Доля"]} />
                        <Bar dataKey="share" fill="#82ca9d">
                          <Cell fill="#82ca9d" />
                          <Cell fill="#a4de6c" />
                          <Cell fill="#d0ed57" />
                          <Cell fill="#ffc658" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="participants">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Основные участники межбанковского рынка</CardTitle>
                  <CardDescription>Банки с наибольшим объемом операций на рынке МБК</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">№</TableHead>
                        <TableHead>Наименование банка</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead className="text-right">Объем операций (млрд ₽)</TableHead>
                        <TableHead className="text-right">Доля рынка (%)</TableHead>
                        <TableHead className="text-right">Кредитный рейтинг</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participantsData.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{participant.id}</TableCell>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>{participant.category}</TableCell>
                          <TableCell className="text-right">{participant.volume.toFixed(1)}</TableCell>
                          <TableCell className="text-right">{participant.share.toFixed(1)}</TableCell>
                          <TableCell className="text-right">{participant.rating}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Концентрация рынка</CardTitle>
                    <CardDescription>Доля крупнейших участников в общем объеме операций</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ТОП-3 банка</span>
                          <span className="font-bold">46.9%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "46.9%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ТОП-5 банков</span>
                          <span className="font-bold">61.0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "61.0%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ТОП-10 банков</span>
                          <span className="font-bold">80.4%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80.4%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Другие банки</span>
                          <span className="font-bold">19.6%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "19.6%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика участников рынка</CardTitle>
                    <CardDescription>Общие данные об участниках межбанковского рынка</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Общее число участников</div>
                        <div className="text-3xl font-bold">248</div>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Активных участников</div>
                        <div className="text-3xl font-bold">183</div>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Средний срок операций</div>
                        <div className="text-3xl font-bold">3.2 дня</div>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Средняя сумма сделки</div>
                        <div className="text-3xl font-bold">460 млн ₽</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Требования к участникам рынка</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Наличие лицензии Solidus Bank на осуществление банковских операций</li>
                        <li>Членство в системе обязательного страхования вкладов</li>
                        <li>Соблюдение обязательных нормативов ликвидности</li>
                        <li>Наличие открытых корреспондентских счетов</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

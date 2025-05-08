
import React from "react";
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
} from "recharts";

// Sample inflation data for visualization
const inflationData = [
  { month: "Янв", year: "2023", cpi: 4.3, foodInflation: 5.7, nonFoodInflation: 3.8, servicesInflation: 3.5 },
  { month: "Фев", year: "2023", cpi: 4.2, foodInflation: 5.3, nonFoodInflation: 3.9, servicesInflation: 3.4 },
  { month: "Мар", year: "2023", cpi: 4.5, foodInflation: 5.9, nonFoodInflation: 4.0, servicesInflation: 3.6 },
  { month: "Апр", year: "2023", cpi: 4.7, foodInflation: 6.1, nonFoodInflation: 4.1, servicesInflation: 3.8 },
  { month: "Май", year: "2023", cpi: 4.8, foodInflation: 6.3, nonFoodInflation: 4.2, servicesInflation: 4.0 },
  { month: "Июн", year: "2023", cpi: 5.0, foodInflation: 6.6, nonFoodInflation: 4.5, servicesInflation: 4.1 },
  { month: "Июл", year: "2023", cpi: 5.3, foodInflation: 7.0, nonFoodInflation: 4.6, servicesInflation: 4.2 },
  { month: "Авг", year: "2023", cpi: 5.5, foodInflation: 7.4, nonFoodInflation: 4.8, servicesInflation: 4.3 },
  { month: "Сен", year: "2023", cpi: 5.6, foodInflation: 7.5, nonFoodInflation: 4.9, servicesInflation: 4.5 },
  { month: "Окт", year: "2023", cpi: 5.8, foodInflation: 7.6, nonFoodInflation: 5.1, servicesInflation: 4.7 },
  { month: "Ноя", year: "2023", cpi: 5.7, foodInflation: 7.5, nonFoodInflation: 4.9, servicesInflation: 4.6 },
  { month: "Дек", year: "2023", cpi: 5.5, foodInflation: 7.2, nonFoodInflation: 4.8, servicesInflation: 4.5 },
  { month: "Янв", year: "2024", cpi: 5.3, foodInflation: 7.0, nonFoodInflation: 4.7, servicesInflation: 4.3 },
  { month: "Фев", year: "2024", cpi: 5.1, foodInflation: 6.8, nonFoodInflation: 4.5, servicesInflation: 4.2 },
  { month: "Мар", year: "2024", cpi: 4.9, foodInflation: 6.5, nonFoodInflation: 4.3, servicesInflation: 4.0 },
];

// Regional inflation data
const regionalData = [
  { region: "Центральный ФО", inflation: 4.8 },
  { region: "Северо-Западный ФО", inflation: 4.6 },
  { region: "Южный ФО", inflation: 4.9 },
  { region: "Северо-Кавказский ФО", inflation: 5.1 },
  { region: "Приволжский ФО", inflation: 4.7 },
  { region: "Уральский ФО", inflation: 4.5 },
  { region: "Сибирский ФО", inflation: 5.0 },
  { region: "Дальневосточный ФО", inflation: 5.3 },
];

export default function Inflation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Инфляция</h1>
          <p className="text-muted-foreground mb-8">Динамика и анализ инфляционных процессов</p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Обзор инфляции</TabsTrigger>
              <TabsTrigger value="dynamics">Динамика цен</TabsTrigger>
              <TabsTrigger value="regional">Региональная инфляция</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Текущие показатели инфляции</CardTitle>
                    <CardDescription>По данным на {inflationData[inflationData.length - 1].month} {inflationData[inflationData.length - 1].year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Индекс потребительских цен (ИПЦ):</span>
                        <span className="font-bold text-xl">{inflationData[inflationData.length - 1].cpi}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Продовольственная инфляция:</span>
                        <span className="font-bold text-lg">{inflationData[inflationData.length - 1].foodInflation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Непродовольственная инфляция:</span>
                        <span className="font-bold text-lg">{inflationData[inflationData.length - 1].nonFoodInflation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Инфляция услуг:</span>
                        <span className="font-bold text-lg">{inflationData[inflationData.length - 1].servicesInflation}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Целевой показатель</CardTitle>
                    <CardDescription>Инфляция в среднесрочной перспективе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-5xl font-bold mb-4">4.0%</div>
                      <p className="text-center text-muted-foreground">
                        Solidus Bank стремится поддерживать годовую инфляцию вблизи 4% в среднесрочной перспективе.
                        Это способствует устойчивому экономическому росту и защите доходов населения.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Факторы инфляции</CardTitle>
                  <CardDescription>Ключевые факторы, влияющие на динамику цен</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Проинфляционные факторы</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Повышение спроса на потребительском рынке</li>
                        <li>Рост издержек производителей</li>
                        <li>Сокращение предложения отдельных товаров</li>
                        <li>Влияние внешнеэкономических факторов</li>
                        <li>Инфляционные ожидания населения и бизнеса</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">Дезинфляционные факторы</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Умеренно жесткая денежно-кредитная политика</li>
                        <li>Улучшение логистических цепочек поставок</li>
                        <li>Стабилизация цен на мировых товарных рынках</li>
                        <li>Увеличение предложения продовольственных товаров</li>
                        <li>Укрепление национальной валюты</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dynamics">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика инфляции</CardTitle>
                  <CardDescription>Изменение показателей в годовом выражении (%)</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={inflationData}
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
                          return inflationData[index].month + " " + inflationData[index].year;
                        }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          const labels = {
                            cpi: "ИПЦ",
                            foodInflation: "Продовольственные товары",
                            nonFoodInflation: "Непродовольственные товары",
                            servicesInflation: "Услуги"
                          };
                          return [value + "%", labels[name as keyof typeof labels]];
                        }}
                      />
                      <Legend 
                        formatter={(value) => {
                          const labels = {
                            cpi: "ИПЦ",
                            foodInflation: "Продовольственные товары",
                            nonFoodInflation: "Непродовольственные товары",
                            servicesInflation: "Услуги"
                          };
                          return labels[value as keyof typeof labels];
                        }}
                      />
                      <Line type="monotone" dataKey="cpi" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="foodInflation" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="nonFoodInflation" stroke="#ffc658" />
                      <Line type="monotone" dataKey="servicesInflation" stroke="#ff8042" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Инфляционные ожидания</CardTitle>
                    <CardDescription>Ожидания населения и бизнеса</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Ожидания населения</span>
                          <span className="font-medium">8.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{width: '82%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Ожидания бизнеса</span>
                          <span className="font-medium">6.4%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '64%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Прогноз профессиональных аналитиков</span>
                          <span className="font-medium">5.1%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '51%'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Анализ структуры инфляции</CardTitle>
                    <CardDescription>Вклад компонентов за текущий год</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={inflationData.filter(d => d.year === "2024")}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="foodInflation"
                          name="Продовольственные товары" 
                          stroke="#82ca9d" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="nonFoodInflation" 
                          name="Непродовольственные товары"
                          stroke="#ffc658" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="servicesInflation"
                          name="Услуги" 
                          stroke="#ff8042" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="regional">
              <Card>
                <CardHeader>
                  <CardTitle>Региональная инфляция</CardTitle>
                  <CardDescription>Показатели инфляции по федеральным округам (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground">
                        <tr>
                          <th className="p-4">Федеральный округ</th>
                          <th className="p-4">Общая инфляция (%)</th>
                          <th className="p-4">Отклонение от среднего</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionalData.map((region, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                            <td className="p-4 font-medium">{region.region}</td>
                            <td className="p-4">{region.inflation}</td>
                            <td className="p-4">
                              <div className="flex items-center">
                                {region.inflation > 4.9 ? (
                                  <div className="text-red-500 flex items-center">
                                    <span className="mr-1">+{(region.inflation - 4.9).toFixed(1)}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                                  </div>
                                ) : region.inflation < 4.9 ? (
                                  <div className="text-green-500 flex items-center">
                                    <span className="mr-1">{(region.inflation - 4.9).toFixed(1)}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
                                  </div>
                                ) : (
                                  <div className="text-muted-foreground">0.0</div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Факторы региональных различий</CardTitle>
                  <CardDescription>Причины различий в показателях инфляции по регионам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Экономические факторы</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Различия в структуре региональной экономики</li>
                          <li>Уровень конкуренции на локальных рынках</li>
                          <li>Уровень доходов и покупательной способности населения</li>
                          <li>Транспортные издержки и логистика</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Административные факторы</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Региональная политика ценообразования</li>
                          <li>Различия в тарифах на услуги ЖКХ</li>
                          <li>Местное налоговое регулирование</li>
                          <li>Особенности потребительской корзины</li>
                        </ul>
                      </div>
                    </div>
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

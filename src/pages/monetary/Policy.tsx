
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Minus, Download, Calendar, Target } from "lucide-react";

export default function MonetaryPolicy() {
  const keyRateHistory = [
    { month: "Янв", rate: 15.5 },
    { month: "Фев", rate: 15.5 },
    { month: "Мар", rate: 16.0 },
    { month: "Апр", rate: 16.0 },
    { month: "Май", rate: 16.0 },
    { month: "Июн", rate: 15.5 },
  ];

  const inflationData = [
    { month: "Янв", target: 4.0, actual: 7.2 },
    { month: "Фев", rate: 7.1 },
    { month: "Мар", rate: 7.3 },
    { month: "Апр", rate: 7.1 },
    { month: "Май", rate: 7.0 },
    { month: "Июн", rate: 6.8 },
  ];

  const keyRateDecisions = [
    { 
      date: "05.05.2025", 
      decision: "Сохранить", 
      rate: "16.00%", 
      change: 0,
      rationale: "Снижение инфляции до 7.0% позволяет сохранить текущий уровень ставки" 
    },
    { 
      date: "01.04.2025", 
      decision: "Сохранить", 
      rate: "16.00%", 
      change: 0,
      rationale: "Стабилизация инфляционных показателей на фоне внешних рисков" 
    },
    { 
      date: "01.03.2025", 
      decision: "Повысить", 
      rate: "16.00%", 
      change: 0.5,
      rationale: "Ускорение инфляции требует ужесточения денежно-кредитной политики" 
    },
    { 
      date: "01.02.2025", 
      decision: "Сохранить", 
      rate: "15.50%", 
      change: 0,
      rationale: "Мониторинг инфляционной динамики в условиях волатильности" 
    },
  ];

  const monetaryTools = [
    {
      name: "Ключевая ставка",
      description: "Основной инструмент денежно-кредитной политики Solidus Bank",
      current: "16.00%",
      impact: "Высокий",
      mechanism: "Влияет на стоимость заимствований в экономике"
    },
    {
      name: "Нормативы обязательных резервов",
      description: "Регулирование объема ликвидности в банковской системе",
      current: "8.0%",
      impact: "Средний",
      mechanism: "Ограничивает кредитные возможности банков"
    },
    {
      name: "Операции РЕПО",
      description: "Краткосрочное управление ликвидностью банковского сектора",
      current: "Активные",
      impact: "Средний",
      mechanism: "Предоставление/изъятие ликвидности на короткие сроки"
    },
    {
      name: "Валютные интервенции",
      description: "Воздействие на динамику валютного курса при необходимости",
      current: "По мере необходимости",
      impact: "Низкий",
      mechanism: "Стабилизация курса в критических ситуациях"
    }
  ];

  const upcomingMeetings = [
    { date: "29.05.2025", time: "13:30", topic: "Решение по ключевой ставке" },
    { date: "19.06.2025", time: "13:30", topic: "Решение по ключевой ставке" },
    { date: "24.07.2025", time: "13:30", topic: "Решение по ключевой ставке" },
  ];

  const chartConfig = {
    rate: {
      label: "Ключевая ставка",
      color: "#2563eb",
    },
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "Повысить": return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "Снизить": return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDecisionBadge = (decision: string) => {
    const variant = decision === "Повысить" ? "destructive" : 
                   decision === "Снизить" ? "default" : "secondary";
    return <Badge variant={variant}>{decision}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Денежно-кредитная политика</h1>
            <p className="text-muted-foreground">Основные направления и инструменты денежно-кредитной политики Solidus Bank</p>
          </div>
          
          {/* Текущее состояние */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-blue-600 mb-2">16.00%</CardTitle>
                <p className="text-sm text-muted-foreground">Ключевая ставка</p>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="mb-2">Действует с 01.03.2025</Badge>
                <p className="text-sm text-muted-foreground">Следующее заседание: 29.05.2025</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-orange-600 mb-2">7.0%</CardTitle>
                <p className="text-sm text-muted-foreground">Текущая инфляция</p>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="outline" className="mb-2">Апрель 2025</Badge>
                <p className="text-sm text-muted-foreground">Цель: 4.0%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-green-600 mb-2">Сдерживающая</CardTitle>
                <p className="text-sm text-muted-foreground">Позиция ДКП</p>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="default" className="mb-2">Активная</Badge>
                <p className="text-sm text-muted-foreground">Направлена на снижение инфляции</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="tools">Инструменты</TabsTrigger>
              <TabsTrigger value="decisions">Решения</TabsTrigger>
              <TabsTrigger value="transmission">Трансмиссия</TabsTrigger>
              <TabsTrigger value="calendar">Календарь</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Цели денежно-кредитной политики
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Поддержание ценовой стабильности</div>
                          <div className="text-sm text-muted-foreground">Инфляция вблизи 4% в среднесрочной перспективе</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Обеспечение финансовой стабильности</div>
                          <div className="text-sm text-muted-foreground">Устойчивость банковской системы</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Развитие платежной системы</div>
                          <div className="text-sm text-muted-foreground">Безопасность и эффективность расчетов</div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Динамика ключевой ставки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={keyRateHistory}>
                            <XAxis dataKey="month" />
                            <YAxis domain={[15, 17]} />
                            <Tooltip />
                            <Line 
                              type="stepAfter"
                              dataKey="rate" 
                              stroke="#2563eb" 
                              strokeWidth={2}
                              dot={{ r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Режим инфляционного таргетирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">4%</div>
                      <div className="text-sm text-muted-foreground">Цель по инфляции</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-2">±1%</div>
                      <div className="text-sm text-muted-foreground">Допустимый коридор</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2-3 года</div>
                      <div className="text-sm text-muted-foreground">Горизонт таргетирования</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Solidus Bank проводит политику инфляционного таргетирования, стремясь поддерживать 
                    годовую инфляцию вблизи 4% в среднесрочной перспективе. Этот режим обеспечивает 
                    ценовую стабильность и создает условия для устойчивого экономического роста.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-6">
              <div className="grid gap-4">
                {monetaryTools.map((tool, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                          <p className="text-muted-foreground mb-2">{tool.description}</p>
                          <p className="text-sm text-gray-600">{tool.mechanism}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-medium text-lg mb-1">{tool.current}</div>
                          <Badge variant={
                            tool.impact === "Высокий" ? "default" : 
                            tool.impact === "Средний" ? "secondary" : "outline"
                          }>
                            {tool.impact} эффект
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Процентный коридор</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span>Кредиты overnight</span>
                      <span className="font-bold">17.00%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <span className="font-semibold">Ключевая ставка</span>
                      <span className="font-bold text-blue-600">16.00%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span>Депозиты overnight</span>
                      <span className="font-bold">15.00%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Процентный коридор формирует границы колебаний ставок денежного рынка. 
                    Ширина коридора составляет ±1 п.п. от ключевой ставки.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="decisions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История решений по ключевой ставке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyRateDecisions.map((decision, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground min-w-[80px]">{decision.date}</div>
                          <div className="flex items-center gap-2">
                            {getDecisionIcon(decision.decision)}
                            {getDecisionBadge(decision.decision)}
                          </div>
                          {decision.change !== 0 && (
                            <Badge variant="outline">
                              {decision.change > 0 ? '+' : ''}{decision.change} п.п.
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{decision.rate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">Обоснование последнего решения:</h4>
                    <p className="text-sm text-muted-foreground">
                      {keyRateDecisions[0].rationale}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transmission" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Механизм трансмиссии денежно-кредитной политики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold mb-2">1. Ключевая ставка</div>
                      <div className="text-sm text-muted-foreground">Изменение стоимости денег</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold mb-2">2. Банковские ставки</div>
                      <div className="text-sm text-muted-foreground">Корректировка процентных ставок</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="font-semibold mb-2">3. Спрос и предложение</div>
                      <div className="text-sm text-muted-foreground">Влияние на экономическую активность</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="font-semibold mb-2">4. Инфляция</div>
                      <div className="text-sm text-muted-foreground">Изменение уровня цен</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Каналы трансмиссии:</h3>
                    <div className="grid gap-4">
                      <div className="p-3 border-l-4 border-blue-500 bg-blue-50/50">
                        <strong>Процентный канал:</strong> Изменение ключевой ставки влияет на ставки по кредитам и депозитам
                      </div>
                      <div className="p-3 border-l-4 border-green-500 bg-green-50/50">
                        <strong>Кредитный канал:</strong> Воздействие на объем кредитования в экономике
                      </div>
                      <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50/50">
                        <strong>Валютный канал:</strong> Влияние на обменный курс и внешнюю торговлю
                      </div>
                      <div className="p-3 border-l-4 border-red-500 bg-red-50/50">
                        <strong>Канал ожиданий:</strong> Формирование инфляционных ожиданий экономических агентов
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Календарь заседаний Совета директоров
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">{meeting.date}</div>
                          <Badge variant="outline">{meeting.time}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{meeting.topic}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium mb-2">График публикации решений:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Решение публикуется в день заседания в 13:30</li>
                      <li>• Пресс-релиз с обоснованием - в тот же день</li>
                      <li>• Доклад о денежно-кредитной политике - в течение 2 недель</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Документы и материалы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-between">
                      <span>Доклад о денежно-кредитной политике (Q1 2025)</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Основные направления ДКП на 2025-2027 годы</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Пресс-релиз от 05.05.2025</span>
                      <Download className="w-4 h-4" />
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
}

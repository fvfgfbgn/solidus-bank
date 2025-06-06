
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function MonetaryPolicy() {
  const keyRateDecisions = [
    { date: "05.05.2025", decision: "Сохранить", rate: "16.00%", rationale: "Снижение инфляции" },
    { date: "01.04.2025", decision: "Сохранить", rate: "16.00%", rationale: "Стабилизация показателей" },
    { date: "01.03.2025", decision: "Повысить", rate: "16.00%", rationale: "Ускорение инфляции" },
    { date: "01.02.2025", decision: "Сохранить", rate: "15.50%", rationale: "Мониторинг динамики" },
    { date: "01.01.2025", decision: "Сохранить", rate: "15.50%", rationale: "Праздничный период" },
  ];

  const monetaryTools = [
    {
      name: "Ключевая ставка",
      description: "Основной инструмент денежно-кредитной политики",
      current: "16.00%",
      impact: "Высокий"
    },
    {
      name: "Нормативы обязательных резервов",
      description: "Регулирование ликвидности банковской системы",
      current: "8.0%",
      impact: "Средний"
    },
    {
      name: "Операции РЕПО",
      description: "Краткосрочное регулирование ликвидности",
      current: "Активные",
      impact: "Средний"
    },
    {
      name: "Валютные интервенции",
      description: "Воздействие на валютный курс",
      current: "По необходимости",
      impact: "Низкий"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Денежно-кредитная политика</h1>
          <p className="text-muted-foreground mb-8">Основные направления и инструменты денежно-кредитной политики Solidus Bank</p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="tools">Инструменты</TabsTrigger>
              <TabsTrigger value="decisions">Решения</TabsTrigger>
              <TabsTrigger value="transmission">Трансмиссия</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Основные цели</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Поддержание ценовой стабильности</div>
                          <div className="text-sm text-muted-foreground">Инфляция вблизи 4% в среднесрочной перспективе</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Обеспечение финансовой стабильности</div>
                          <div className="text-sm text-muted-foreground">Устойчивость банковской системы</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Развитие платежной системы</div>
                          <div className="text-sm text-muted-foreground">Безопасность и эффективность расчетов</div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium">Защита интересов вкладчиков</div>
                          <div className="text-sm text-muted-foreground">Контроль деятельности кредитных организаций</div>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Текущая позиция</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">Сдерживающая</div>
                        <p className="text-sm text-muted-foreground">Денежно-кредитная политика</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Ключевая ставка</span>
                          <span className="font-medium">16.00%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Инфляция (текущая)</span>
                          <span className="font-medium">7.0%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Инфляция (цель)</span>
                          <span className="font-medium">4.0%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Реальная ставка</span>
                          <span className="font-medium">9.0%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Режим инфляционного таргетирования</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Solidus Bank проводит политику инфляционного таргетирования, стремясь 
                    поддерживать годовую инфляцию вблизи 4% в среднесрочной перспективе. 
                    Этот режим обеспечивает ценовую стабильность и создает условия для 
                    устойчивого экономического роста.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">4%</div>
                      <div className="text-sm text-muted-foreground">Цель по инфляции</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">±1%</div>
                      <div className="text-sm text-muted-foreground">Допустимый коридор</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2-3 года</div>
                      <div className="text-sm text-muted-foreground">Горизонт таргетирования</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-6">
              <div className="grid gap-4">
                {monetaryTools.map((tool, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{tool.name}</h3>
                          <p className="text-muted-foreground mt-1">{tool.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-medium">{tool.current}</div>
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
            </TabsContent>
            
            <TabsContent value="decisions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История решений по ключевой ставке</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyRateDecisions.map((decision, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">{decision.date}</div>
                          <Badge variant={decision.decision === "Повысить" ? "destructive" : "secondary"}>
                            {decision.decision}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{decision.rate}</div>
                          <div className="text-sm text-muted-foreground">{decision.rationale}</div>
                        </div>
                      </div>
                    ))}
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="font-semibold">1. Ключевая ставка</div>
                        <div className="text-sm text-muted-foreground mt-2">Изменение стоимости денег</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold">2. Банковские ставки</div>
                        <div className="text-sm text-muted-foreground mt-2">Корректировка процентных ставок</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="font-semibold">3. Спрос и предложение</div>
                        <div className="text-sm text-muted-foreground mt-2">Влияние на экономическую активность</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="font-semibold">4. Инфляция</div>
                        <div className="text-sm text-muted-foreground mt-2">Изменение уровня цен</div>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3>Каналы трансмиссии:</h3>
                      <ul>
                        <li><strong>Процентный канал:</strong> Изменение ключевой ставки влияет на ставки по кредитам и депозитам</li>
                        <li><strong>Кредитный канал:</strong> Воздействие на объем кредитования в экономике</li>
                        <li><strong>Валютный канал:</strong> Влияние на обменный курс и внешнюю торговлю</li>
                        <li><strong>Канал ожиданий:</strong> Формирование инфляционных ожиданий экономических агентов</li>
                      </ul>
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

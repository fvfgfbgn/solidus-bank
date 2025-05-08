
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function MonetaryPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Денежно-кредитная политика</h1>
          <p className="text-muted-foreground mb-8">Принципы и инструменты денежно-кредитной политики</p>
          
          <Tabs defaultValue="principles" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="principles">Принципы</TabsTrigger>
              <TabsTrigger value="instruments">Инструменты</TabsTrigger>
              <TabsTrigger value="decisions">Решения</TabsTrigger>
              <TabsTrigger value="projections">Прогнозы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="principles">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Цели денежно-кредитной политики</CardTitle>
                  <CardDescription>Стратегические ориентиры Solidus Bank</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-muted/30 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Основная цель</h3>
                        <p className="text-lg">Защита и обеспечение устойчивости рубля</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Ценовая стабильность</h4>
                          <p className="text-sm text-muted-foreground">Поддержание устойчиво низкой инфляции</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">Финансовая стабильность</h4>
                          <p className="text-sm text-muted-foreground">Устойчивость финансового сектора</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-lg font-semibold mb-2">Целевые ориентиры</h3>
                      <div className="flex items-center p-3 bg-green-100/50 rounded-md">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                          <span className="text-lg font-bold">4%</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Цель по инфляции</h4>
                          <p className="text-sm text-muted-foreground">Поддержание инфляции вблизи 4% в среднесрочной перспективе</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-blue-100/50 rounded-md">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                          <span className="text-lg font-bold">₽</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Режим ДКП</h4>
                          <p className="text-sm text-muted-foreground">Таргетирование инфляции в условиях плавающего валютного курса</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-amber-100/50 rounded-md">
                        <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mr-4">
                          <span className="text-lg font-bold">%</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Основной инструмент</h4>
                          <p className="text-sm text-muted-foreground">Ключевая ставка процента</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Принципы денежно-кредитной политики</CardTitle>
                  <CardDescription>Базовые принципы разработки и реализации монетарной политики</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Приоритет основной цели</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Монетарная политика Solidus Bank опирается на принцип приоритета достижения основной цели — 
                          защиты и обеспечения устойчивости рубля посредством поддержания ценовой стабильности. 
                          Этот принцип означает, что при возникновении конфликта между достижением цели по инфляции 
                          и другими экономическими целями приоритет отдаётся обеспечению ценовой стабильности.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Режим таргетирования инфляции</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Solidus Bank реализует денежно-кредитную политику в рамках режима таргетирования инфляции. 
                          Ключевыми элементами этого режима являются: публичное объявление количественной цели по инфляции, 
                          принятие решений на основе прогноза динамики экономики и инфляции, информационная открытость действий Банка.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Управление ожиданиями</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Solidus Bank придаёт большое значение управлению инфляционными ожиданиями населения и бизнеса. 
                          Для этого Банк регулярно публикует свои оценки и прогнозы по инфляции, разъясняет причины 
                          отклонения фактической инфляции от целевого уровня и меры, направленные на возвращение инфляции к цели.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Плавающий валютный курс</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Важным принципом монетарной политики Банка является свободное курсообразование. 
                          Режим плавающего валютного курса способствует адаптации экономики к изменяющимся внешним 
                          условиям и позволяет Solidus Bank проводить независимую денежно-кредитную политику, 
                          направленную на обеспечение ценовой стабильности.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Информационная открытость</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          Solidus Bank придерживается принципа информационной открытости в области денежно-кредитной политики. 
                          Регулярное, полное и своевременное информирование о целях, принципах, мерах и результатах 
                          проводимой политики повышает доверие к действиям Банка и способствует формированию предсказуемой 
                          экономической среды для всех участников экономических отношений.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="instruments">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Основные инструменты</CardTitle>
                    <CardDescription>Ключевые инструменты монетарной политики</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Ключевая ставка</h3>
                          <Badge variant="outline">Основной инструмент</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Процентная ставка, по которой Solidus Bank предоставляет кредиты коммерческим банкам и принимает от них депозиты.
                        </p>
                        <div className="bg-muted p-3 rounded text-center">
                          <span className="block text-sm text-muted-foreground">Текущее значение</span>
                          <span className="text-2xl font-bold">8.5%</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Операции на открытом рынке</h3>
                        <p className="text-sm text-muted-foreground">
                          Покупка и продажа ценных бумаг с целью регулирования ликвидности в банковском секторе.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Обязательные резервные требования</h3>
                        <p className="text-sm text-muted-foreground">
                          Установление нормативов обязательных резервов кредитных организаций.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Дополнительные инструменты</CardTitle>
                    <CardDescription>Инструменты регулирования и поддержания финансовой стабильности</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 border-b">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-lg">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Валютные интервенции</h4>
                          <p className="text-sm text-muted-foreground">
                            Покупка или продажа иностранной валюты на внутреннем рынке для поддержания финансовой стабильности.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 border-b">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-lg">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Кредитные аукционы</h4>
                          <p className="text-sm text-muted-foreground">
                            Предоставление ликвидности банкам на аукционной основе на различные сроки.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 border-b">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-lg">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Депозитные операции</h4>
                          <p className="text-sm text-muted-foreground">
                            Привлечение средств от кредитных организаций для абсорбирования избыточной ликвидности.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-700 text-lg">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Макропруденциальные меры</h4>
                          <p className="text-sm text-muted-foreground">
                            Инструменты регулирования, направленные на поддержание устойчивости финансовой системы.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Процентный коридор</CardTitle>
                  <CardDescription>Система процентных ставок по операциям Solidus Bank</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[200px] w-full">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                      {/* Верхняя граница коридора */}
                      <div className="absolute top-[20%] left-0 w-full">
                        <div className="border-t-2 border-dashed border-blue-400 w-full"></div>
                        <div className="flex justify-between px-4 mt-2">
                          <span className="text-sm font-medium">Ставка по кредитам overnight</span>
                          <span className="text-sm font-bold">9.50%</span>
                        </div>
                      </div>
                      
                      {/* Ключевая ставка */}
                      <div className="absolute top-[50%] left-0 w-full">
                        <div className="border-t-2 border-blue-600 w-full"></div>
                        <div className="bg-blue-600 text-white px-3 py-1 rounded absolute left-[50%] top-[-15px] transform -translate-x-1/2">
                          Ключевая ставка: 8.50%
                        </div>
                      </div>
                      
                      {/* Нижняя граница коридора */}
                      <div className="absolute bottom-[20%] left-0 w-full">
                        <div className="border-t-2 border-dashed border-blue-400 w-full"></div>
                        <div className="flex justify-between px-4 mt-2">
                          <span className="text-sm font-medium">Ставка по депозитам overnight</span>
                          <span className="text-sm font-bold">7.50%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>
                      Процентный коридор формирует границы колебаний ставок денежного рынка. 
                      Верхняя граница определяется ставками по кредитам Банка, нижняя — ставками по депозитам. 
                      Ширина коридора составляет ±1 п.п. от ключевой ставки.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="decisions">
              <Card>
                <CardHeader>
                  <CardTitle>История решений по ключевой ставке</CardTitle>
                  <CardDescription>Изменения ставки за последние годы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-muted text-muted-foreground text-left">
                          <th className="p-4 whitespace-nowrap">Дата изменения</th>
                          <th className="p-4 whitespace-nowrap">Размер ключевой ставки</th>
                          <th className="p-4 whitespace-nowrap">Изменение</th>
                          <th className="p-4 whitespace-nowrap">Обоснование</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap">15.03.2024</td>
                          <td className="p-4 whitespace-nowrap font-medium">8.50%</td>
                          <td className="p-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-amber-500">Без изменений</Badge>
                          </td>
                          <td className="p-4">Сохранение умеренно жесткой денежно-кредитной политики для возвращения инфляции к цели</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap">16.02.2024</td>
                          <td className="p-4 whitespace-nowrap font-medium">8.50%</td>
                          <td className="p-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-green-500">-0.50 п.п.</Badge>
                          </td>
                          <td className="p-4">Снижение инфляционных рисков и стабилизация инфляционных ожиданий</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap">15.12.2023</td>
                          <td className="p-4 whitespace-nowrap font-medium">9.00%</td>
                          <td className="p-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-amber-500">Без изменений</Badge>
                          </td>
                          <td className="p-4">Поддержание достаточно жестких денежно-кредитных условий для ограничения инфляционных рисков</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap">27.10.2023</td>
                          <td className="p-4 whitespace-nowrap font-medium">9.00%</td>
                          <td className="p-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-red-500">+2.00 п.п.</Badge>
                          </td>
                          <td className="p-4">Предотвращение устойчивого отклонения инфляции вверх от цели и дальнейшего роста инфляционных ожиданий</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap">15.09.2023</td>
                          <td className="p-4 whitespace-nowrap font-medium">7.00%</td>
                          <td className="p-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-red-500">+1.00 п.п.</Badge>
                          </td>
                          <td className="p-4">Ускорение инфляции и рост инфляционных ожиданий</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Процедура принятия решений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Сбор и анализ данных</h4>
                            <p className="text-sm text-muted-foreground">
                              Анализ широкого спектра макроэкономической информации, внутренних и внешних факторов.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Прогнозная модель</h4>
                            <p className="text-sm text-muted-foreground">
                              Построение макроэкономических прогнозов с использованием современных экономических моделей.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Заседание Совета директоров</h4>
                            <p className="text-sm text-muted-foreground">
                              Обсуждение экономической ситуации и вариантов денежно-кредитной политики.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">4</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Принятие решения</h4>
                            <p className="text-sm text-muted-foreground">
                              Голосование членов Совета директоров по вопросу о ключевой ставке.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">5</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Объявление решения</h4>
                            <p className="text-sm text-muted-foreground">
                              Публикация пресс-релиза о принятом решении и его обоснование.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">6</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Пресс-конференция</h4>
                            <p className="text-sm text-muted-foreground">
                              Разъяснение принятого решения и ответы на вопросы СМИ.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">7</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Доклад о ДКП</h4>
                            <p className="text-sm text-muted-foreground">
                              Публикация расширенного доклада с экономическим анализом и прогнозами.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <span className="text-blue-700 text-sm">8</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Мониторинг эффектов</h4>
                            <p className="text-sm text-muted-foreground">
                              Оценка влияния принятого решения на экономику и рынки.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    <p>Совет директоров Solidus Bank принимает решения по ключевой ставке 8 раз в год в соответствии с заранее объявленным графиком.</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="projections">
              <Card>
                <CardHeader>
                  <CardTitle>Макроэкономические прогнозы</CardTitle>
                  <CardDescription>Среднесрочные прогнозы основных макроэкономических показателей</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-muted text-muted-foreground text-left">
                          <th className="p-4 whitespace-nowrap">Показатель</th>
                          <th className="p-4 whitespace-nowrap">2024</th>
                          <th className="p-4 whitespace-nowrap">2025</th>
                          <th className="p-4 whitespace-nowrap">2026</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap font-medium">Инфляция (%, на конец года)</td>
                          <td className="p-4 whitespace-nowrap">4.5-5.0</td>
                          <td className="p-4 whitespace-nowrap">4.0-4.5</td>
                          <td className="p-4 whitespace-nowrap">4.0</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap font-medium">Рост ВВП (%, год к году)</td>
                          <td className="p-4 whitespace-nowrap">2.0-2.5</td>
                          <td className="p-4 whitespace-nowrap">1.5-2.0</td>
                          <td className="p-4 whitespace-nowrap">1.8-2.3</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap font-medium">Денежная масса М2 (%, прирост)</td>
                          <td className="p-4 whitespace-nowrap">10-12</td>
                          <td className="p-4 whitespace-nowrap">8-10</td>
                          <td className="p-4 whitespace-nowrap">7-9</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 whitespace-nowrap font-medium">Средняя ключевая ставка (%)</td>
                          <td className="p-4 whitespace-nowrap">7.5-8.5</td>
                          <td className="p-4 whitespace-nowrap">6.5-7.5</td>
                          <td className="p-4 whitespace-nowrap">5.5-6.5</td>
                        </tr>
                        <tr>
                          <td className="p-4 whitespace-nowrap font-medium">Кредитование экономики (%, прирост)</td>
                          <td className="p-4 whitespace-nowrap">9-12</td>
                          <td className="p-4 whitespace-nowrap">8-11</td>
                          <td className="p-4 whitespace-nowrap">7-10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Прогнозы пересматриваются ежеквартально и публикуются в Докладе о денежно-кредитной политике.
                  </p>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Сценарии развития экономики</CardTitle>
                    <CardDescription>Варианты макроэкономических сценариев</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <h3 className="font-semibold">Базовый сценарий</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Предполагает постепенное восстановление внешнего спроса, стабилизацию цен на энергоносители 
                          и отсутствие новых санкционных ограничений. Инфляция возвращается к целевому уровню к 2026 году.
                        </p>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <h3 className="font-semibold">Сценарий с повышенной инфляцией</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Учитывает возможность более сильного роста потребительского спроса и ускорения роста издержек. 
                          Потребует более жесткой денежно-кредитной политики для возвращения инфляции к цели.
                        </p>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <h3 className="font-semibold">Рисковый сценарий</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Предполагает существенное ухудшение внешних условий, включая новые санкционные ограничения 
                          и снижение цен на экспортируемые товары. Может привести к более глубокому снижению экономической активности.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Факторы неопределенности</CardTitle>
                    <CardDescription>Ключевые риски для прогноза</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">Геополитические риски</h4>
                        <div className="flex items-center">
                          <div className="h-2 bg-red-500 rounded-md w-[75%]"></div>
                          <span className="ml-2 text-sm">Высокие</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Бюджетная политика</h4>
                        <div className="flex items-center">
                          <div className="h-2 bg-amber-500 rounded-md w-[60%]"></div>
                          <span className="ml-2 text-sm">Средние</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Мировой спрос</h4>
                        <div className="flex items-center">
                          <div className="h-2 bg-amber-500 rounded-md w-[50%]"></div>
                          <span className="ml-2 text-sm">Средние</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Цены на энергоносители</h4>
                        <div className="flex items-center">
                          <div className="h-2 bg-amber-500 rounded-md w-[55%]"></div>
                          <span className="ml-2 text-sm">Средние</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Инфляционные ожидания</h4>
                        <div className="flex items-center">
                          <div className="h-2 bg-amber-500 rounded-md w-[65%]"></div>
                          <span className="ml-2 text-sm">Выше среднего</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <p className="text-sm text-muted-foreground">
                        Совокупность факторов неопределенности требует регулярного пересмотра прогнозов и
                        корректировки денежно-кредитной политики в ответ на изменяющиеся условия.
                      </p>
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


import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define interfaces for our bond data types
interface GovBondData {
  id: string;
  name: string;
  maturity: string;
  coupon: number;
  yield: number;
  price: number;
  change: number;
}

interface CorpBondData {
  id: string;
  name: string;
  issuer: string;
  rating: string;
  maturity: string;
  coupon: number;
  yield: number;
  price: number;
  change: number;
}

// Sample government bonds data
const govBondsData: GovBondData[] = [
  { id: "ОФЗ 26230", name: "ОФЗ-ПД 26230", maturity: "16.03.2039", coupon: 7.70, yield: 9.05, price: 89.79, change: -0.15 },
  { id: "ОФЗ 26223", name: "ОФЗ-ПД 26223", maturity: "28.02.2024", coupon: 6.50, yield: 8.98, price: 99.15, change: 0.03 },
  { id: "ОФЗ 26222", name: "ОФЗ-ПД 26222", maturity: "16.10.2024", coupon: 7.10, yield: 8.92, price: 98.27, change: -0.05 },
  { id: "ОФЗ 26224", name: "ОФЗ-ПД 26224", maturity: "23.05.2029", coupon: 6.90, yield: 9.01, price: 87.40, change: -0.12 },
  { id: "ОФЗ 26227", name: "ОФЗ-ПД 26227", maturity: "17.07.2024", coupon: 7.40, yield: 8.96, price: 98.65, change: 0.08 },
  { id: "ОФЗ 26229", name: "ОФЗ-ПД 26229", maturity: "12.11.2025", coupon: 7.15, yield: 8.99, price: 95.94, change: -0.02 },
  { id: "ОФЗ 26228", name: "ОФЗ-ПД 26228", maturity: "10.04.2030", coupon: 7.65, yield: 9.08, price: 90.02, change: -0.21 },
  { id: "ОФЗ 26225", name: "ОФЗ-ПД 26225", maturity: "10.05.2034", coupon: 7.25, yield: 9.06, price: 86.31, change: -0.18 },
];

// Sample corporate bonds data
const corpBondsData: CorpBondData[] = [
  { id: "Сбер-001P-SBER20", name: "Сбер БО-001P-SBER20", issuer: "Сбербанк", rating: "AAA(RU)", maturity: "12.05.2026", coupon: 7.85, yield: 8.92, price: 99.05, change: 0.12 },
  { id: "ГТЛК-001P-19", name: "ГТЛК-001P-19", issuer: "ГТЛК", rating: "AA+(RU)", maturity: "22.03.2027", coupon: 8.10, yield: 9.15, price: 97.89, change: -0.05 },
  { id: "РЖД-001P-20R", name: "РЖД-001P-20R", issuer: "РЖД", rating: "AAA(RU)", maturity: "02.06.2028", coupon: 7.90, yield: 9.08, price: 96.74, change: 0.02 },
  { id: "Газпром-48", name: "Газпром-48", issuer: "Газпром", rating: "AAA(RU)", maturity: "23.10.2029", coupon: 8.05, yield: 9.12, price: 95.87, change: -0.08 },
  { id: "ВЭБ.РФ-25", name: "ВЭБ.РФ-25", issuer: "ВЭБ.РФ", rating: "AAA(RU)", maturity: "10.07.2025", coupon: 7.60, yield: 8.88, price: 98.32, change: 0.14 },
  { id: "РСХБ-30", name: "РСХБ-30", issuer: "Россельхозбанк", rating: "AA(RU)", maturity: "29.11.2026", coupon: 8.00, yield: 9.05, price: 97.65, change: -0.03 },
];

// Sample yield curve data
const yieldCurveData = [
  { term: "3м", yield: 8.77 },
  { term: "6м", yield: 8.85 },
  { term: "1г", yield: 8.92 },
  { term: "2г", yield: 8.98 },
  { term: "3г", yield: 9.03 },
  { term: "5г", yield: 9.08 },
  { term: "7г", yield: 9.12 },
  { term: "10г", yield: 9.18 },
  { term: "15г", yield: 9.23 },
  { term: "20г", yield: 9.27 },
];

// Sample historical yield data
const historicalYieldData = [
  { date: "05.2023", yield3y: 7.35, yield5y: 7.48, yield10y: 7.55 },
  { date: "06.2023", yield3y: 7.42, yield5y: 7.54, yield10y: 7.62 },
  { date: "07.2023", yield3y: 7.48, yield5y: 7.61, yield10y: 7.68 },
  { date: "08.2023", yield3y: 7.57, yield5y: 7.70, yield10y: 7.79 },
  { date: "09.2023", yield3y: 7.85, yield5y: 7.95, yield10y: 8.02 },
  { date: "10.2023", yield3y: 8.12, yield5y: 8.23, yield10y: 8.30 },
  { date: "11.2023", yield3y: 8.35, yield5y: 8.45, yield10y: 8.52 },
  { date: "12.2023", yield3y: 8.55, yield5y: 8.65, yield10y: 8.72 },
  { date: "01.2024", yield3y: 8.68, yield5y: 8.78, yield10y: 8.85 },
  { date: "02.2024", yield3y: 8.75, yield5y: 8.85, yield10y: 8.92 },
  { date: "03.2024", yield3y: 8.82, yield5y: 8.92, yield10y: 9.02 },
  { date: "04.2024", yield3y: 8.95, yield5y: 9.05, yield10y: 9.15 },
  { date: "05.2024", yield3y: 9.03, yield5y: 9.08, yield10y: 9.18 },
];

// Sample ownership structure data
const ownershipData = [
  { name: "Банки", value: 46.3 },
  { name: "Нерезиденты", value: 18.5 },
  { name: "Страховые компании и НПФ", value: 15.2 },
  { name: "Физические лица", value: 8.7 },
  { name: "Инвестиционные фонды", value: 6.8 },
  { name: "Другие", value: 4.5 },
];

// Sample market indicators data
const marketIndicators = [
  { name: "Объем торгов ОФЗ", value: "28.5 млрд ₽", change: 3.2 },
  { name: "Объем торгов корп. обл.", value: "15.7 млрд ₽", change: -1.8 },
  { name: "Индекс гос. обл. RGBITR", value: "624.58", change: 0.05 },
  { name: "Индекс корп. обл. RUCBITR", value: "485.32", change: -0.03 },
  { name: "Дюрация индекса гос. обл.", value: "4.8 года", change: 0.1 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function SecuritiesMarket() {
  const [bondType, setBondType] = useState<"government" | "corporate">("government");
  const [timeframe, setTimeframe] = useState("1y");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Рынок ценных бумаг</h1>
          <p className="text-muted-foreground mb-8">Информация о состоянии рынка ценных бумаг</p>
          
          <Tabs defaultValue="bonds" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="bonds">Облигации</TabsTrigger>
              <TabsTrigger value="dynamics">Доходность</TabsTrigger>
              <TabsTrigger value="market">Рыночные индикаторы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bonds">
              <div className="mb-8">
                <Tabs value={bondType} onValueChange={setBondType}>
                  <TabsList>
                    <TabsTrigger value="government">Государственные облигации</TabsTrigger>
                    <TabsTrigger value="corporate">Корпоративные облигации</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>{bondType === "government" ? "Государственные облигации" : "Корпоративные облигации"}</CardTitle>
                  <CardDescription>
                    {bondType === "government" ? 
                      "Облигации федерального займа (ОФЗ)" : 
                      "Облигации российских корпораций"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Код</TableHead>
                          <TableHead>{bondType === "corporate" && "Эмитент"}</TableHead>
                          {bondType === "corporate" && <TableHead>Рейтинг</TableHead>}
                          <TableHead>Погашение</TableHead>
                          <TableHead>Купон, %</TableHead>
                          <TableHead>Доходность, %</TableHead>
                          <TableHead>Цена, %</TableHead>
                          <TableHead>Изменение, п.п.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bondType === "government" 
                          ? govBondsData.map((bond) => (
                            <TableRow key={bond.id}>
                              <TableCell className="font-medium">{bond.name}</TableCell>
                              <TableCell>{bond.maturity}</TableCell>
                              <TableCell>{bond.coupon.toFixed(2)}</TableCell>
                              <TableCell>{bond.yield.toFixed(2)}</TableCell>
                              <TableCell>{bond.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <span className={bond.change > 0 ? "text-green-500" : bond.change < 0 ? "text-red-500" : ""}>
                                  {bond.change > 0 ? "+" : ""}{bond.change.toFixed(2)}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                          : corpBondsData.map((bond) => (
                            <TableRow key={bond.id}>
                              <TableCell className="font-medium">{bond.name}</TableCell>
                              <TableCell>{bond.issuer}</TableCell>
                              <TableCell>{bond.rating}</TableCell>
                              <TableCell>{bond.maturity}</TableCell>
                              <TableCell>{bond.coupon.toFixed(2)}</TableCell>
                              <TableCell>{bond.yield.toFixed(2)}</TableCell>
                              <TableCell>{bond.price.toFixed(2)}</TableCell>
                              <TableCell>
                                <span className={bond.change > 0 ? "text-green-500" : bond.change < 0 ? "text-red-500" : ""}>
                                  {bond.change > 0 ? "+" : ""}{bond.change.toFixed(2)}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Структура держателей {bondType === "government" ? "ОФЗ" : "корпоративных облигаций"}</CardTitle>
                    <CardDescription>Распределение по типу инвесторов, %</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ownershipData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {ownershipData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value + "%", "Доля"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Характеристики {bondType === "government" ? "ОФЗ" : "корпоративных облигаций"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Объем рынка</div>
                          <div className="text-2xl font-bold mt-1">
                            {bondType === "government" ? "17.8 трлн ₽" : "21.3 трлн ₽"}
                          </div>
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Средняя дюрация</div>
                          <div className="text-2xl font-bold mt-1">
                            {bondType === "government" ? "4.8 лет" : "3.2 года"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Средняя доходность</span>
                          <span className="font-bold">
                            {bondType === "government" ? "9.02%" : "9.15%"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: bondType === "government" ? "90.2%" : "91.5%" }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Средний купон</span>
                          <span className="font-bold">
                            {bondType === "government" ? "7.45%" : "8.05%"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: bondType === "government" ? "74.5%" : "80.5%" }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Количество выпусков в обращении</div>
                        <div className="text-2xl font-bold mt-1">
                          {bondType === "government" ? "62" : "2,354"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {bondType === "government" && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Типы государственных облигаций</CardTitle>
                    <CardDescription>Характеристики различных типов ОФЗ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>ОФЗ-ПД (с постоянным доходом)</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-2">
                            Облигации федерального займа с постоянным купонным доходом. 
                            Имеют фиксированную купонную ставку на весь срок обращения. 
                            Наиболее распространенный и ликвидный тип ОФЗ.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Доля в общем объеме: 75.3%</Badge>
                            <Badge>Срок обращения: 1-30 лет</Badge>
                            <Badge>Периодичность выплат: 2-4 раза в год</Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>ОФЗ-ПК (с переменным купоном)</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-2">
                            Облигации федерального займа с переменным купонным доходом. 
                            Купонная ставка определяется как средняя ставка RUONIA за текущий купонный период 
                            с небольшой премией или как фиксированный спред к ставке RUONIA.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Доля в общем объеме: 18.7%</Badge>
                            <Badge>Срок обращения: 1-10 лет</Badge>
                            <Badge>Периодичность выплат: 2-4 раза в год</Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>ОФЗ-ИН (с индексируемым номиналом)</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-2">
                            Облигации федерального займа с номиналом, индексируемым по уровню инфляции. 
                            Индексация номинала происходит по уровню инфляции с трехмесячным лагом. 
                            Купон рассчитывается от индексированного номинала.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Доля в общем объеме: 4.5%</Badge>
                            <Badge>Срок обращения: 5-15 лет</Badge>
                            <Badge>Периодичность выплат: 2 раза в год</Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>ОФЗ-АД (с амортизацией долга)</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-2">
                            Облигации федерального займа с амортизацией долга. 
                            Погашение номинала происходит частями в течение срока обращения облигации. 
                            Купонные выплаты рассчитываются исходя из непогашенной части номинала.
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge>Доля в общем объеме: 1.5%</Badge>
                            <Badge>Срок обращения: 3-20 лет</Badge>
                            <Badge>Периодичность выплат: 4 раза в год</Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )}
              
              {bondType === "corporate" && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Корпоративные облигации по отраслям</CardTitle>
                    <CardDescription>Распределение объема выпусков в обращении по отраслям</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { sector: "Банки и финансы", share: 35.2 },
                          { sector: "Нефть и газ", share: 22.7 },
                          { sector: "Транспорт", share: 12.5 },
                          { sector: "Металлургия", share: 8.3 },
                          { sector: "Энергетика", share: 7.6 },
                          { sector: "Телекоммуникации", share: 5.8 },
                          { sector: "Другие", share: 7.9 }
                        ]}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 150,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" unit="%" />
                        <YAxis dataKey="sector" type="category" width={150} />
                        <Tooltip formatter={(value) => [value + "%", "Доля"]} />
                        <Bar dataKey="share" fill="#8884d8">
                          <Cell fill="#0088FE" />
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                          <Cell fill="#FF8042" />
                          <Cell fill="#8884D8" />
                          <Cell fill="#82ca9d" />
                          <Cell fill="#a4de6c" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="dynamics">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Кривая доходности ОФЗ</CardTitle>
                  <CardDescription>Текущая кривая доходности государственных облигаций</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={yieldCurveData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="term" />
                      <YAxis domain={[8.5, 9.5]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [value + "%", "Доходность"]} />
                      <Line 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={{ r: 5 }} 
                        activeDot={{ r: 8 }} 
                        name="Доходность ОФЗ"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    <p>Наклон кривой (10 лет - 2 года): {(yieldCurveData[7].yield - yieldCurveData[3].yield).toFixed(2)} п.п.</p>
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Динамика доходностей ОФЗ</span>
                    <div>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Период" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1y">1 год</SelectItem>
                          <SelectItem value="2y">2 года</SelectItem>
                          <SelectItem value="3y">3 года</SelectItem>
                          <SelectItem value="5y">5 лет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardTitle>
                  <CardDescription>Изменение доходностей ОФЗ различной срочности за последний год</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalYieldData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[7, 9.5]} tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value, name) => {
                          const labels = {
                            yield3y: "3 года",
                            yield5y: "5 лет",
                            yield10y: "10 лет"
                          };
                          return [value + "%", labels[name as keyof typeof labels]];
                        }}
                      />
                      <Legend 
                        formatter={(value) => {
                          const labels = {
                            yield3y: "3 года",
                            yield5y: "5 лет",
                            yield10y: "10 лет"
                          };
                          return labels[value as keyof typeof labels];
                        }}
                      />
                      <Line type="monotone" dataKey="yield3y" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="yield5y" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="yield10y" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Спред доходности</CardTitle>
                    <CardDescription>Разница между доходностью ОФЗ и корпоративных облигаций</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Май", year: "2023", spread: 0.48 },
                          { month: "Июн", year: "2023", spread: 0.46 },
                          { month: "Июл", year: "2023", spread: 0.45 },
                          { month: "Авг", year: "2023", spread: 0.47 },
                          { month: "Сен", year: "2023", spread: 0.51 },
                          { month: "Окт", year: "2023", spread: 0.55 },
                          { month: "Ноя", year: "2023", spread: 0.58 },
                          { month: "Дек", year: "2023", spread: 0.62 },
                          { month: "Янв", year: "2024", spread: 0.60 },
                          { month: "Фев", year: "2024", spread: 0.57 },
                          { month: "Мар", year: "2024", spread: 0.52 },
                          { month: "Апр", year: "2024", spread: 0.49 },
                          { month: "Май", year: "2024", spread: 0.47 }
                        ]}
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
                            const data = [
                              { month: "Май", year: "2023" },
                              { month: "Июн", year: "2023" },
                              { month: "Июл", year: "2023" },
                              { month: "Авг", year: "2023" },
                              { month: "Сен", year: "2023" },
                              { month: "Окт", year: "2023" },
                              { month: "Ноя", year: "2023" },
                              { month: "Дек", year: "2023" },
                              { month: "Янв", year: "2024" },
                              { month: "Фев", year: "2024" },
                              { month: "Мар", year: "2024" },
                              { month: "Апр", year: "2024" },
                              { month: "Май", year: "2024" }
                            ];
                            return data[index].month + " " + data[index].year;
                          }}
                          angle={-45}
                          textAnchor="end"
                          height={50}
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [value + "%", "Кредитный спред"]} />
                        <Line 
                          type="monotone" 
                          dataKey="spread" 
                          stroke="#FF8042" 
                          strokeWidth={2} 
                          name="Кредитный спред" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Доходность к погашению по рейтингам</CardTitle>
                    <CardDescription>Средняя доходность облигаций по кредитным рейтингам</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-blue-600 rounded-sm mr-2"></span>
                            <span>AAA</span>
                          </div>
                          <span className="font-bold">9.05%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90.5%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-green-600 rounded-sm mr-2"></span>
                            <span>AA</span>
                          </div>
                          <span className="font-bold">9.32%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "93.2%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></span>
                            <span>A</span>
                          </div>
                          <span className="font-bold">9.58%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "95.8%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-amber-600 rounded-sm mr-2"></span>
                            <span>BBB</span>
                          </div>
                          <span className="font-bold">10.12%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "101.2%" }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="w-4 h-4 bg-red-600 rounded-sm mr-2"></span>
                            <span>BB и ниже</span>
                          </div>
                          <span className="font-bold">11.85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "118.5%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="market">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {marketIndicators.map((indicator, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">{indicator.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{indicator.value}</div>
                      <div className={`flex items-center mt-1 ${indicator.change > 0 ? "text-green-500" : indicator.change < 0 ? "text-red-500" : ""}`}>
                        {indicator.change > 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                        ) : indicator.change < 0 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
                        ) : null}
                        <span>{indicator.change > 0 ? "+" : ""}{indicator.change}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Объем первичных размещений</CardTitle>
                    <CardDescription>Ежемесячный объем размещений, млрд ₽</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { month: "Май", year: "2023", gov: 125.8, corp: 95.3 },
                          { month: "Июн", year: "2023", gov: 145.2, corp: 87.9 },
                          { month: "Июл", year: "2023", gov: 132.7, corp: 76.4 },
                          { month: "Авг", year: "2023", gov: 119.8, corp: 68.5 },
                          { month: "Сен", year: "2023", gov: 158.4, corp: 92.7 },
                          { month: "Окт", year: "2023", gov: 172.5, corp: 105.3 },
                          { month: "Ноя", year: "2023", gov: 165.9, corp: 115.8 },
                          { month: "Дек", year: "2023", gov: 185.3, corp: 143.2 },
                          { month: "Янв", year: "2024", gov: 142.7, corp: 83.6 },
                          { month: "Фев", year: "2024", gov: 156.8, corp: 95.4 },
                          { month: "Мар", year: "2024", gov: 178.3, corp: 120.7 },
                          { month: "Апр", year: "2024", gov: 168.5, corp: 110.3 }
                        ]}
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
                            const data = [
                              { month: "Май", year: "2023" },
                              { month: "Июн", year: "2023" },
                              { month: "Июл", year: "2023" },
                              { month: "Авг", year: "2023" },
                              { month: "Сен", year: "2023" },
                              { month: "Окт", year: "2023" },
                              { month: "Ноя", year: "2023" },
                              { month: "Дек", year: "2023" },
                              { month: "Янв", year: "2024" },
                              { month: "Фев", year: "2024" },
                              { month: "Мар", year: "2024" },
                              { month: "Апр", year: "2024" }
                            ];
                            return data[index].month + " " + data[index].year;
                          }}
                          angle={-45}
                          textAnchor="end"
                          height={50}
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} млрд ₽`, "Объем"]} />
                        <Legend />
                        <Bar dataKey="gov" name="Государственные" fill="#8884d8" stackId="a" />
                        <Bar dataKey="corp" name="Корпоративные" fill="#82ca9d" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Объем торгов на вторичном рынке</CardTitle>
                    <CardDescription>Ежедневный объем торгов, млрд ₽</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { date: "02.05.24", gov: 25.8, corp: 14.3 },
                          { date: "03.05.24", gov: 27.2, corp: 15.1 },
                          { date: "04.05.24", gov: 26.5, corp: 14.8 },
                          { date: "05.05.24", gov: 24.9, corp: 13.5 },
                          { date: "06.05.24", gov: 26.8, corp: 14.9 },
                          { date: "07.05.24", gov: 27.9, corp: 15.3 },
                          { date: "08.05.24", gov: 28.5, corp: 15.7 }
                        ]}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} млрд ₽`, "Объем"]} />
                        <Legend />
                        <Line type="monotone" dataKey="gov" name="Государственные" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="corp" name="Корпоративные" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Рыночные факторы</CardTitle>
                  <CardDescription>Факторы, оказывающие влияние на рынок облигаций</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Внутренние факторы</h3>
                      <div className="flex items-center justify-between">
                        <span>Денежно-кредитная политика</span>
                        <Badge variant="secondary">Сильное влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Бюджетная политика</span>
                        <Badge variant="secondary">Среднее влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Инфляционные ожидания</span>
                        <Badge variant="secondary">Сильное влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ликвидность банковского сектора</span>
                        <Badge variant="secondary">Среднее влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Спрос со стороны институциональных инвесторов</span>
                        <Badge variant="secondary">Среднее влияние</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Внешние факторы</h3>
                      <div className="flex items-center justify-between">
                        <span>Геополитическая ситуация</span>
                        <Badge variant="secondary">Сильное влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Цены на нефть</span>
                        <Badge variant="secondary">Среднее влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Монетарная политика ФРС США</span>
                        <Badge variant="secondary">Слабое влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Курс рубля</span>
                        <Badge variant="secondary">Среднее влияние</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Интерес иностранных инвесторов</span>
                        <Badge variant="secondary">Слабое влияние</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Оценка влияния факторов обновляется ежеквартально на основе анализа рыночных данных и экспертных оценок.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

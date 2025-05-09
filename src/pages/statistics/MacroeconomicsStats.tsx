import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, PieChart } from "@/components/ui/charts";

const gdpData = [
  { year: "2020", q1: 35000, q2: 36000, q3: 37000, q4: 38000 },
  { year: "2021", q1: 38500, q2: 39500, q3: 40500, q4: 41500 },
  { year: "2022", q1: 42000, q2: 43000, q3: 44000, q4: 45000 },
  { year: "2023", q1: 45500, q2: 46500, q3: 47500, q4: 48500 },
  { year: "2024", q1: 49000, q2: 50000, q3: 51000, q4: 52000 },
];

const inflationData = [
  { year: "2020", q1: 2.5, q2: 3.0, q3: 3.5, q4: 4.0 },
  { year: "2021", q1: 4.5, q2: 5.0, q3: 5.5, q4: 6.0 },
  { year: "2022", q1: 6.5, q2: 7.0, q3: 7.5, q4: 8.0 },
  { year: "2023", q1: 8.5, q2: 9.0, q3: 9.5, q4: 10.0 },
  { year: "2024", q1: 10.5, q2: 11.0, q3: 11.5, q4: 12.0 },
];

const budgetData = [
  { year: "2020", revenue: 15000, expenses: 16000, deficit: 1000 },
  { year: "2021", revenue: 17000, expenses: 18000, deficit: 1000 },
  { year: "2022", revenue: 19000, expenses: 20000, deficit: 1000 },
  { year: "2023", revenue: 21000, expenses: 22000, deficit: 1000 },
  { year: "2024", revenue: 23000, expenses: 24000, deficit: 1000 },
];

const externalDebtData = [
  { year: "2020", amount: 450000 },
  { year: "2021", amount: 460000 },
  { year: "2022", amount: 470000 },
  { year: "2023", amount: 480000 },
  { year: "2024", amount: 490000 },
];

const laborData = [
  { year: "2020", employment: 70000, unemployment: 5000 },
  { year: "2021", employment: 71000, unemployment: 4500 },
  { year: "2022", employment: 72000, unemployment: 4000 },
  { year: "2023", employment: 73000, unemployment: 3500 },
  { year: "2024", employment: 74000, unemployment: 3000 },
];

const MacroeconomicsStats = () => {
  const [yearFilter, setYearFilter] = useState("2024");
  const [quarterFilter, setQuarterFilter] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Макроэкономическая статистика</h1>
          <p className="text-muted-foreground mb-8">Ключевые макроэкономические показатели России</p>
          
          <Tabs defaultValue="gdp">
            <TabsList className="mb-8">
              <TabsTrigger value="gdp">ВВП</TabsTrigger>
              <TabsTrigger value="inflation">Инфляция</TabsTrigger>
              <TabsTrigger value="budget">Бюджет</TabsTrigger>
              <TabsTrigger value="external-debt">Внешний долг</TabsTrigger>
              <TabsTrigger value="labor">Рынок труда</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gdp">
              <Card>
                <CardHeader>
                  <CardTitle>ВВП России</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={gdpData}
                    index="year"
                    categories={["q1", "q2", "q3", "q4"]}
                  />
                  <div className="mt-4 flex items-center space-x-2">
                    <Select onValueChange={setYearFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выберите год" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setQuarterFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Выберите квартал" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все кварталы</SelectItem>
                        <SelectItem value="q1">1 квартал</SelectItem>
                        <SelectItem value="q2">2 квартал</SelectItem>
                        <SelectItem value="q3">3 квартал</SelectItem>
                        <SelectItem value="q4">4 квартал</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inflation">
              <Card>
                <CardHeader>
                  <CardTitle>Инфляция</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={inflationData}
                    index="year"
                    categories={["q1", "q2", "q3", "q4"]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Бюджет</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={budgetData}
                    index="year"
                    categories={["revenue", "expenses", "deficit"]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="external-debt">
              <Card>
                <CardHeader>
                  <CardTitle>Внешний долг</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={externalDebtData}
                    index="year"
                    categories={["amount"]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="labor">
              <Card>
                <CardHeader>
                  <CardTitle>Рынок труда</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={laborData}
                    index="year"
                    categories={["employment", "unemployment"]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MacroeconomicsStats;

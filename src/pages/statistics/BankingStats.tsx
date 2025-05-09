import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, PieChart } from "@/components/ui/charts";

const overviewData = [
  { name: "2021", assets: 750, liabilities: 600 },
  { name: "2022", assets: 820, liabilities: 650 },
  { name: "2023", assets: 900, liabilities: 700 },
  { name: "2024", assets: 980, liabilities: 780 },
];

const creditData = [
  { name: "Ипотека", value: 400 },
  { name: "Бизнес-кредиты", value: 300 },
  { name: "Потребительские кредиты", value: 200 },
];

const depositData = [
  { name: "Физические лица", value: 550 },
  { name: "Юридические лица", value: 450 },
];

const profitabilityData = [
  { name: "2021", roa: 2.5, roe: 15.2 },
  { name: "2022", roa: 2.8, roe: 16.5 },
  { name: "2023", roa: 3.0, roe: 17.0 },
  { name: "2024", roa: 3.2, roe: 17.5 },
];

const stabilityData = [
  { name: "2021", capitalAdequacy: 12.5 },
  { name: "2022", capitalAdequacy: 13.0 },
  { name: "2023", capitalAdequacy: 13.5 },
  { name: "2024", capitalAdequacy: 14.0 },
];

const BankingStats = () => {
  const [yearFilter, setYearFilter] = useState("2024");
  const [quarterFilter, setQuarterFilter] = useState("q3");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Банковская статистика</h1>
          <p className="text-muted-foreground mb-8">Основные показатели банковского сектора России</p>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Обзор сектора</TabsTrigger>
              <TabsTrigger value="credits">Кредитование</TabsTrigger>
              <TabsTrigger value="deposits">Депозиты</TabsTrigger>
              <TabsTrigger value="profitability">Рентабельность</TabsTrigger>
              <TabsTrigger value="stability">Финансовая устойчивость</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика активов и обязательств</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={overviewData}
                    index="name"
                    categories={["assets", "liabilities"]}
                    colors={["#3b82f6", "#ef4444"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="credits">
              <Card>
                <CardHeader>
                  <CardTitle>Структура кредитного портфеля</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={creditData}
                    index="name"
                    category="value"
                    colors={["#2563eb", "#10b981", "#ef4444"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deposits">
              <Card>
                <CardHeader>
                  <CardTitle>Структура депозитной базы</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={depositData}
                    index="name"
                    category="value"
                    colors={["#2563eb", "#10b981"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profitability">
              <Card>
                <CardHeader>
                  <CardTitle>Рентабельность банковского сектора</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={profitabilityData}
                    index="name"
                    categories={["roa", "roe"]}
                    colors={["#3b82f6", "#ef4444"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stability">
              <Card>
                <CardHeader>
                  <CardTitle>Показатели финансовой устойчивости</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={stabilityData}
                    index="name"
                    categories={["capitalAdequacy"]}
                    colors={["#3b82f6"]}
                    height={300}
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

export default BankingStats;

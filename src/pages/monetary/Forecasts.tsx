
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AreaChart } from "@/components/ui/charts";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

const forecastData = [
  { year: "2022", gdp: 150, inflation: 5.2 },
  { year: "2023", gdp: 165, inflation: 6.8 },
  { year: "2024", gdp: 180, inflation: 4.5 },
  { year: "2025", gdp: 195, inflation: 3.1 },
  { year: "2026", gdp: 210, inflation: 2.5 },
];

const inflationData = [
  { year: "2022", actual: 5.2, forecast: 5.0 },
  { year: "2023", actual: 6.8, forecast: 6.5 },
  { year: "2024", actual: 4.5, forecast: 4.8 },
  { year: "2025", actual: null, forecast: 3.0 },
  { year: "2026", actual: null, forecast: 2.5 },
];

const keyRateData = [
  { date: "2022-01", rate: 9.5 },
  { date: "2022-04", rate: 17.0 },
  { date: "2022-07", rate: 8.0 },
  { date: "2022-10", rate: 7.5 },
  { date: "2023-01", rate: 7.5 },
  { date: "2023-04", rate: 7.0 },
  { date: "2023-07", rate: 8.5 },
  { date: "2023-10", rate: 13.0 },
  { date: "2024-01", rate: 16.0 },
];

const forecastDocuments = [
  { id: 1, title: "Обзор денежно-кредитной политики", year: "2024", type: "policy" },
  { id: 2, title: "Прогноз инфляции на 2025 год", year: "2025", type: "inflation" },
  { id: 3, title: "Анализ финансовых рынков", year: "2024", type: "market" },
  { id: 4, title: "Основные направления денежно-кредитной политики", year: "2025", type: "policy" },
];

const Forecasts = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("all");
  
  const filteredDocuments = selectedDocumentType === "all"
    ? forecastDocuments
    : forecastDocuments.filter(doc => doc.type === selectedDocumentType);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Прогнозы</h1>
          <p className="text-muted-foreground mb-8">Экономические прогнозы и макроэкономические показатели</p>
          
          <Tabs defaultValue="forecasts">
            <TabsList className="mb-8">
              <TabsTrigger value="forecasts">Макропрогнозы</TabsTrigger>
              <TabsTrigger value="inflation">Инфляция</TabsTrigger>
              <TabsTrigger value="gdp">ВВП</TabsTrigger>
              <TabsTrigger value="key-rate">Ключевая ставка</TabsTrigger>
              <TabsTrigger value="documents">Документы</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forecasts">
              <Card>
                <CardHeader>
                  <CardTitle>Прогноз основных макропоказателей</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={forecastData}
                    index="year"
                    categories={["gdp", "inflation"]}
                    colors={["#3b82f6", "#ef4444"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inflation">
              <Card>
                <CardHeader>
                  <CardTitle>Прогноз инфляции</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={inflationData}
                    index="year"
                    categories={["actual", "forecast"]}
                    colors={["#10b981", "#f59e0b"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gdp">
              <Card>
                <CardHeader>
                  <CardTitle>Прогноз ВВП</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={forecastData}
                    index="year"
                    categories={["gdp"]}
                    colors={["#2563eb"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="key-rate">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика ключевой ставки</CardTitle>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={keyRateData}
                    index="date"
                    categories={["rate"]}
                    colors={["#6366f1"]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="flex items-center justify-between mb-4">
                <Select onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select onValueChange={setSelectedDocumentType}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Тип документа" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="policy">ДКП</SelectItem>
                    <SelectItem value="inflation">Инфляция</SelectItem>
                    <SelectItem value="market">Рынки</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredDocuments.map(doc => (
                  <Card key={doc.id}>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{doc.year}</Badge>
                        <Button size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Читать
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Forecasts;

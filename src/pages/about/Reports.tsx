import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search } from "lucide-react";
import { BarChart } from "@/components/ui/charts";
import { ChartContainer } from "@/components/ui/chart";
import { toast } from "@/components/ui/use-toast";

const annualReports = [
  { year: 2023, link: "#", description: "Годовой отчет за 2023 год", type: "annual" },
  { year: 2022, link: "#", description: "Годовой отчет за 2022 год", type: "annual" },
  { year: 2021, link: "#", description: "Годовой отчет за 2021 год", type: "annual" },
  { year: 2023, link: "#", description: "Квартальный отчет за 4 квартал 2023 года", type: "quarterly" },
  { year: 2023, link: "#", description: "Квартальный отчет за 3 квартал 2023 года", type: "quarterly" },
  { year: 2023, link: "#", description: "Квартальный отчет за 2 квартал 2023 года", type: "quarterly" },
  { year: 2023, link: "#", description: "Квартальный отчет за 1 квартал 2023 года", type: "quarterly" },
  { year: 2022, link: "#", description: "Отчетность по МСФО за 2022 год", type: "ifrs" },
  { year: 2021, link: "#", description: "Отчетность по МСФО за 2021 год", type: "ifrs" },
];

const financialData = [
  { name: '2020', assets: 2400, liabilities: 1398, equity: 9800 },
  { name: '2021', assets: 2210, liabilities: 9800, equity: 2500 },
  { name: '2022', assets: 2290, liabilities: 4000, equity: 3800 },
  { name: '2023', assets: 2000, liabilities: 3908, equity: 4800 },
];

const Reports = () => {
  // Define chart config for the financial data chart
  const chartConfig = {
    assets: {
      label: "Активы",
      theme: { light: "#3b82f6", dark: "#3b82f6" },
    },
    liabilities: {
      label: "Обязательства",
      theme: { light: "#ef4444", dark: "#ef4444" },
    },
    equity: {
      label: "Капитал",
      theme: { light: "#10b981", dark: "#10b981" },
    },
  };

  const handleDownloadReport = (report: typeof annualReports[0]) => {
    // Создаем содержимое отчета
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${report.description}</title>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .content { max-width: 800px; margin: 0 auto; }
          .financial-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .financial-table th, .financial-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
          .financial-table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Solidus Bank</h1>
          <h2>${report.description}</h2>
        </div>
        <div class="content">
          <h3>Основные показатели</h3>
          <table class="financial-table">
            <tr><th>Показатель</th><th>Значение (млн руб.)</th></tr>
            <tr><td>Активы</td><td>${(Math.random() * 1000000 + 500000).toFixed(0)}</td></tr>
            <tr><td>Кредитный портфель</td><td>${(Math.random() * 500000 + 300000).toFixed(0)}</td></tr>
            <tr><td>Депозиты физических лиц</td><td>${(Math.random() * 400000 + 200000).toFixed(0)}</td></tr>
            <tr><td>Собственный капитал</td><td>${(Math.random() * 100000 + 50000).toFixed(0)}</td></tr>
            <tr><td>Чистая прибыль</td><td>${(Math.random() * 20000 + 10000).toFixed(0)}</td></tr>
          </table>
          <h3>Выводы</h3>
          <p>Solidus Bank продемонстрировал стабильные результаты деятельности в ${report.year} году, подтвердив свою устойчивость и надежность.</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Solidus_Bank_${report.description.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Отчет скачан",
      description: `${report.description} успешно загружен`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Годовые отчеты</h1>
          <p className="text-muted-foreground mb-8">Финансовая отчетность и результаты деятельности Solidus Bank</p>
          
          <Tabs defaultValue="annual">
            <TabsList className="mb-8">
              <TabsTrigger value="annual">Годовые отчеты</TabsTrigger>
              <TabsTrigger value="quarterly">Квартальные отчеты</TabsTrigger>
              <TabsTrigger value="financial">Финансовые показатели</TabsTrigger>
              <TabsTrigger value="ifrs">Отчетность по МСФО</TabsTrigger>
            </TabsList>
            
            <TabsContent value="annual">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {annualReports
                  .filter(report => report.type === "annual")
                  .map((report, index) => (
                    <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">{report.year} год</CardTitle>
                        <Badge variant="secondary">
                          <FileText className="w-4 h-4 mr-2" />
                          Годовой отчет
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
                        <Button onClick={() => handleDownloadReport(report)} className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quarterly">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {annualReports
                  .filter(report => report.type === "quarterly")
                  .map((report, index) => (
                    <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">{report.year} год</CardTitle>
                        <Badge variant="secondary">
                          <FileText className="w-4 h-4 mr-2" />
                          Квартальный отчет
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
                        <Button onClick={() => handleDownloadReport(report)} className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="financial">
              <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Основные финансовые показатели</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer config={chartConfig}>
                      <BarChart 
                        data={financialData}
                        index="name"
                        categories={["assets", "liabilities", "equity"]}
                        colors={["#3b82f6", "#ef4444", "#10b981"]}
                        showGridLines={false}
                        height={300}
                      />
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ifrs">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {annualReports
                  .filter(report => report.type === "ifrs")
                  .map((report, index) => (
                    <Card key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">{report.year} год</CardTitle>
                        <Badge variant="secondary">
                          <FileText className="w-4 h-4 mr-2" />
                          Отчетность по МСФО
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
                        <Button onClick={() => handleDownloadReport(report)} className="flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
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

export default Reports;

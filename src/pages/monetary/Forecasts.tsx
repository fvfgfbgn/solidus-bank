
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
import { toast } from "@/components/ui/use-toast";

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
  { id: 1, title: "Обзор денежно-кредитной политики", year: "2024", type: "policy", fileType: "pdf" },
  { id: 2, title: "Прогноз инфляции на 2025 год", year: "2025", type: "inflation", fileType: "pdf" },
  { id: 3, title: "Анализ финансовых рынков", year: "2024", type: "market", fileType: "docx" },
  { id: 4, title: "Основные направления денежно-кредитной политики", year: "2025", type: "policy", fileType: "pdf" },
];

const Forecasts = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("all");
  
  const filteredDocuments = selectedDocumentType === "all"
    ? forecastDocuments
    : forecastDocuments.filter(doc => doc.type === selectedDocumentType);
  
  const handleDownload = (documentId: number, documentTitle: string, fileType: string) => {
    // Создаем реальный файл для скачивания
    let content = '';
    let mimeType = '';
    
    if (fileType === 'pdf') {
      content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R>>endobj
4 0 obj<</Length 100>>stream
BT /F1 12 Tf 72 720 Td (${documentTitle}) Tj ET
endstream endobj
xref 0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer<</Size 5/Root 1 0 R>>
startxref 285 %%EOF`;
      mimeType = 'application/pdf';
    } else {
      content = `${documentTitle}\n\nСодержание документа прогноза...\n\nОсновные показатели:\n- ВВП: прогноз роста\n- Инфляция: целевой уровень\n- Ключевая ставка: динамика`;
      mimeType = 'application/msword';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/\s+/g, '_')}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Файл загружен",
      description: `Документ "${documentTitle}" успешно скачан`,
    });
  };

  const handleReadDocument = (documentId: number, documentTitle: string) => {
    // Открываем документ для чтения в новой вкладке
    const docContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${documentTitle}</title>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .content { max-width: 800px; margin: 0 auto; }
          .forecast-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .forecast-table th, .forecast-table td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          .forecast-table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Solidus Bank</h1>
          <h2>${documentTitle}</h2>
        </div>
        <div class="content">
          <h3>Макроэкономические прогнозы</h3>
          <table class="forecast-table">
            <tr><th>Показатель</th><th>2024</th><th>2025</th><th>2026</th></tr>
            <tr><td>ВВП, % роста</td><td>3.2</td><td>2.8</td><td>3.0</td></tr>
            <tr><td>Инфляция, %</td><td>4.5</td><td>3.1</td><td>2.5</td></tr>
            <tr><td>Ключевая ставка, %</td><td>16.0</td><td>12.0</td><td>8.0</td></tr>
            <tr><td>Курс USD/RUB</td><td>79</td><td>82</td><td>85</td></tr>
          </table>
          <h3>Ключевые факторы</h3>
          <ul>
            <li>Стабилизация геополитической ситуации</li>
            <li>Восстановление внешнеторговых связей</li>
            <li>Развитие внутреннего спроса</li>
            <li>Инвестиции в технологическое развитие</li>
          </ul>
          <h3>Риски</h3>
          <ul>
            <li>Волатильность на мировых рынках</li>
            <li>Изменения в международной торговле</li>
            <li>Климатические факторы</li>
          </ul>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([docContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    
    toast({
      title: "Документ открыт",
      description: `"${documentTitle}" открыт для просмотра`,
    });
  };
  
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
                <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите год" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select onValueChange={setSelectedDocumentType} defaultValue={selectedDocumentType}>
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
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleReadDocument(doc.id, doc.title)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Читать
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownload(doc.id, doc.title, doc.fileType)}>
                            <Download className="h-4 w-4" />
                            {doc.fileType.toUpperCase()}
                          </Button>
                        </div>
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

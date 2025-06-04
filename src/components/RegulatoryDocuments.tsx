
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Search, Filter } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

type Document = {
  id: string;
  title: string;
  number: string;
  date: string;
  category: string;
  status: "active" | "archive";
  fileType: "pdf" | "doc" | "xlsx";
};

const DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    title: "О методике определения системно значимых кредитных организаций",
    number: "3737-Y",
    date: "05.05.2025",
    category: "Указание",
    status: "active",
    fileType: "pdf",
  },
  {
    id: "doc-2",
    title: "О порядке формирования кредитными организациями резервов на возможные потери",
    number: "590-P",
    date: "28.04.2025",
    category: "Положение",
    status: "active",
    fileType: "pdf",
  },
  {
    id: "doc-3",
    title: "О порядке расчета кредитными организациями величины рыночного риска",
    number: "511-P",
    date: "22.04.2025",
    category: "Положение",
    status: "active",
    fileType: "pdf",
  },
  {
    id: "doc-4",
    title: "О требованиях к организации систем управления рисками",
    number: "5787-Y",
    date: "15.04.2025",
    category: "Указание",
    status: "active",
    fileType: "doc",
  },
  {
    id: "doc-5",
    title: "Об обязательных нормативах и надбавках к нормативам достаточности капитала",
    number: "509-P",
    date: "10.04.2025",
    category: "Положение",
    status: "active",
    fileType: "pdf",
  },
  {
    id: "doc-6",
    title: "О порядке проведения Solidus Bank проверок деятельности кредитных организаций",
    number: "5321-Y",
    date: "05.04.2025",
    category: "Указание",
    status: "active",
    fileType: "pdf",
  },
];

export const RegulatoryDocuments: React.FC = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleViewDocument = (document: Document) => {
    // Создаем имитацию просмотра документа в новой вкладке
    const docContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${document.title}</title>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .doc-number { color: #666; font-size: 14px; }
          .content { max-width: 800px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="doc-number">${document.category} № ${document.number} от ${document.date}</div>
          <h1>${document.title}</h1>
        </div>
        <div class="content">
          <p>Настоящий документ содержит подробную информацию по теме "${document.title}".</p>
          <p>Документ вступает в силу с момента опубликования и распространяется на все кредитные организации, осуществляющие деятельность на территории Российской Федерации.</p>
          <h2>1. Общие положения</h2>
          <p>1.1. Настоящий документ разработан в соответствии с действующим законодательством Российской Федерации.</p>
          <p>1.2. Требования настоящего документа являются обязательными для исполнения.</p>
          <h2>2. Основные требования</h2>
          <p>2.1. Кредитные организации обязаны соблюдать установленные нормативы и требования.</p>
          <p>2.2. Контроль за исполнением требований осуществляется Solidus Bank.</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([docContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    
    toast({
      title: "Документ открыт",
      description: `Просмотр документа "${document.title}" в новой вкладке`,
    });
  };
  
  const handleDownloadDocument = (document: Document) => {
    // Создаем имитацию файла для скачивания
    let content = '';
    let mimeType = '';
    let fileName = '';
    
    if (document.fileType === 'pdf') {
      // Создаем простой PDF-подобный контент
      content = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
72 720 Td
(${document.title}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
285
%%EOF`;
      mimeType = 'application/pdf';
      fileName = `${document.number}_${document.date.replace(/\./g, '_')}.pdf`;
    } else if (document.fileType === 'doc') {
      content = `${document.title}\n\n${document.category} № ${document.number} от ${document.date}\n\nСодержание документа...`;
      mimeType = 'application/msword';
      fileName = `${document.number}_${document.date.replace(/\./g, '_')}.doc`;
    } else {
      content = `Название,Номер,Дата\n"${document.title}","${document.number}","${document.date}"`;
      mimeType = 'application/vnd.ms-excel';
      fileName = `${document.number}_${document.date.replace(/\./g, '_')}.xlsx`;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Файл скачан",
      description: `Документ "${document.title}" успешно загружен`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Нормативные документы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск документов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Фильтры</span>
            </Button>
          </div>
          
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleContent>
              <div className="p-4 border rounded-md bg-muted/50 mt-2 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Категория документа</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Все категории</option>
                      <option value="Указание">Указание</option>
                      <option value="Положение">Положение</option>
                      <option value="Инструкция">Инструкция</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Статус</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Все статусы</option>
                      <option value="active">Действующие</option>
                      <option value="archive">Архивные</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Дата публикации</label>
                    <div className="flex gap-2">
                      <Input type="date" className="flex-1" placeholder="С" />
                      <Input type="date" className="flex-1" placeholder="По" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="secondary" className="mr-2">Сбросить</Button>
                  <Button>Применить</Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="space-y-4">
            {DOCUMENTS.filter(doc => doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                     doc.number.toLowerCase().includes(searchQuery.toLowerCase())).map((document) => (
              <div key={document.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-muted rounded-md p-2 hidden sm:flex">
                    <FileText className="h-6 w-6 text-solidus-steel-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium text-lg">{document.title}</h3>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Badge variant="outline" className="font-normal">
                          {document.category} № {document.number}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{document.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleViewDocument(document)}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Просмотр</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleDownloadDocument(document)}
                      >
                        <Download className="h-4 w-4" />
                        <span>Скачать {document.fileType.toUpperCase()}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">Загрузить еще</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

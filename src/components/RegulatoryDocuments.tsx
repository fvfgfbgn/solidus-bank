
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
                      <Button variant="secondary" size="sm" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Просмотр</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
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


import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  url: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Solidus Bank снижает ставки по ипотеке",
    excerpt: "Банк объявил о снижении ставок по ипотечным кредитам на 0,5 процентных пунктов с 1 июня.",
    date: "08.05.2025",
    category: "Пресс-релиз",
    url: "https://cbr.ru/press/"
  },
  {
    id: "news-2",
    title: "Solidus Bank запустил новое мобильное приложение",
    excerpt: "Теперь все операции можно выполнять с помощью удобного мобильного приложения, доступного на iOS и Android.",
    date: "06.05.2025",
    category: "Технологии",
    url: "https://cbr.ru/press/"
  },
  {
    id: "news-3",
    title: "Изменения в политике обслуживания юридических лиц",
    excerpt: "С 15 мая вступают в силу новые тарифы на расчетно-кассовое обслуживание для юридических лиц.",
    date: "04.05.2025",
    category: "Обновления",
    url: "https://cbr.ru/press/"
  },
  {
    id: "news-4",
    title: "Solidus Bank выступил спонсором экономического форума",
    excerpt: "Банк принял участие в ежегодном экономическом форуме в качестве официального финансового партнера.",
    date: "02.05.2025",
    category: "События",
    url: "https://cbr.ru/press/"
  },
];

export const NewsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {NEWS_ITEMS.map((news) => (
        <Card key={news.id} className="overflow-hidden animate-fade-in">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge>{news.category}</Badge>
              <span className="text-sm text-muted-foreground">{news.date}</span>
            </div>
            <CardTitle className="text-xl">{news.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">{news.excerpt}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 flex items-center" asChild>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                Читать полностью <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

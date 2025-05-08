
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Solidus Bank снизил ставки по ипотеке",
    date: "08.05.2025",
    summary: "Банк объявил о снижении ставок по ипотечным кредитам на 0.5 процентных пункта в рамках программы поддержки молодых семей.",
  },
  {
    id: "news-2",
    title: "Запуск нового мобильного приложения",
    date: "05.05.2025",
    summary: "Solidus Bank представил обновленную версию мобильного приложения с расширенным функционалом и улучшенной безопасностью.",
  },
  {
    id: "news-3",
    title: "Аналитики банка прогнозируют стабилизацию рубля",
    date: "02.05.2025",
    summary: "По оценкам экспертов Solidus Bank, в ближайшие месяцы ожидается укрепление национальной валюты на фоне роста экспорта.",
  },
];

export const NewsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {NEWS_ITEMS.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </CardHeader>
          <CardContent>
            <p>{item.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

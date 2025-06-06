
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Sample historical key rate data
const KEY_RATE_HISTORY = [
  { date: "01.01.2024", rate: 15.00 },
  { date: "01.02.2024", rate: 15.00 },
  { date: "01.03.2024", rate: 16.00 },
  { date: "01.04.2024", rate: 16.00 },
  { date: "01.05.2024", rate: 16.00 },
  { date: "01.06.2024", rate: 15.50 },
  { date: "01.07.2024", rate: 15.50 },
  { date: "01.08.2024", rate: 15.00 },
  { date: "01.09.2024", rate: 15.00 },
  { date: "01.10.2024", rate: 15.50 },
  { date: "01.11.2024", rate: 16.00 },
  { date: "01.12.2024", rate: 16.00 },
  { date: "01.01.2025", rate: 16.00 },
  { date: "01.02.2025", rate: 16.00 },
  { date: "01.03.2025", rate: 16.00 },
  { date: "01.04.2025", rate: 16.00 },
  { date: "01.05.2025", rate: 16.00 },
];

// Schedule of upcoming key rate meetings
const UPCOMING_MEETINGS = [
  { date: "29.05.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
  { date: "19.06.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
  { date: "24.07.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
  { date: "11.09.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
  { date: "23.10.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
  { date: "13.12.2025", time: "13:30", type: "Заседание Совета директоров по ключевой ставке" },
];

// Press releases related to key rate decisions
const KEY_RATE_PRESS_RELEASES = [
  {
    date: "05.05.2025",
    title: "Совет директоров принял решение сохранить ключевую ставку на уровне 16,00% годовых",
    excerpt: "Годовая инфляция снизилась до 7,0% (после 7,3% в марте). Снижение инфляции происходит в основном за счет укрепления рубля...",
  },
  {
    date: "01.04.2025",
    title: "Совет директоров принял решение сохранить ключевую ставку на уровне 16,00% годовых",
    excerpt: "Годовая инфляция в марте повысилась до 7,3% (после 7,1% в феврале). Восстановление деловой активности замедлилось...",
  },
  {
    date: "01.03.2025",
    title: "Совет директоров принял решение повысить ключевую ставку до 16,00% годовых",
    excerpt: "Годовая инфляция в феврале повысилась до 7,1% (после 6,8% в январе). Восстановление экономической активности быстрее, чем ожидалось...",
  },
];

export default function KeyRate() {
  const chartConfig = {
    rate: {
      label: "Ключевая ставка",
      theme: {
        light: "#4682B4",
        dark: "#4682B4",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Ключевая ставка</h1>
          <p className="text-muted-foreground mb-8">Информация о ключевой ставке Solidus Bank</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Динамика ключевой ставки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={KEY_RATE_HISTORY}>
                        <XAxis 
                          dataKey="date" 
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          fontSize={12}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          fontSize={12}
                          domain={[14, 17]}
                          ticks={[14, 14.5, 15, 15.5, 16, 16.5, 17]}
                        />
                        <Tooltip />
                        <Line
                          name="rate"
                          type="stepAfter" 
                          dataKey="rate"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Текущий уровень</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-solidus-steel-blue mb-4">16,00%</div>
                  <p className="text-muted-foreground mb-2">
                    Действует с 01.03.2025
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Предыдущая ставка: 15,50%
                  </p>
                  <hr className="my-4" />
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="font-medium">Следующее заседание:</span> 29.05.2025
                    </div>
                    <div>
                      <span className="font-medium">Публикация решения:</span> 13:30
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>График заседаний</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {UPCOMING_MEETINGS.map((meeting, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{meeting.date}</span>
                        <span>{meeting.time}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{meeting.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Пресс-релизы по ключевой ставке</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {KEY_RATE_PRESS_RELEASES.map((release, index) => (
                    <div key={index}>
                      <div className="text-sm text-muted-foreground mb-1">{release.date}</div>
                      <h3 className="font-medium mb-2">{release.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{release.excerpt}</p>
                      <button className="text-sm text-solidus-steel-blue font-medium hover:underline">
                        Читать полностью
                      </button>
                      {index < KEY_RATE_PRESS_RELEASES.length - 1 && <hr className="my-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>О ключевой ставке</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Ключевая ставка Solidus Bank — основной инструмент денежно-кредитной политики. 
                Она влияет на процентные ставки по кредитам и депозитам, курс национальной валюты 
                и в целом на экономические процессы в стране.
              </p>
              <h3 className="text-lg font-semibold mt-4">Как определяется ключевая ставка</h3>
              <p>
                Совет директоров Solidus Bank принимает решения по ключевой ставке на основе макроэкономического
                прогноза, оценки рисков и анализа широкого спектра экономических показателей.
                Решения принимаются восемь раз в год в соответствии с публикуемым графиком.
              </p>
              <h3 className="text-lg font-semibold mt-4">Влияние на экономику</h3>
              <p>
                Изменение ключевой ставки является сигналом для рынка о направлении 
                денежно-кредитной политики. Повышение ставки направлено на снижение 
                инфляционного давления, а снижение ставки способствует стимулированию 
                экономической активности.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

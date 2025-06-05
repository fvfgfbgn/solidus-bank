
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Inflation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Инфляция</h1>
          <p className="text-muted-foreground mb-8">Текущие показатели и прогнозы инфляции</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Текущая инфляция</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">7.4%</div>
                  <p className="text-muted-foreground">За последние 12 месяцев</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Целевой показатель</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">4.0%</div>
                  <p className="text-muted-foreground">Среднесрочная цель</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Прогноз на год</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">5.2%</div>
                  <p className="text-muted-foreground">Прогноз на конец года</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Факторы инфляции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Проинфляционные факторы:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Рост потребительского спроса</li>
                      <li>Увеличение издержек производителей</li>
                      <li>Внешние шоки на товарных рынках</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Дезинфляционные факторы:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Жесткая денежно-кредитная политика</li>
                      <li>Стабилизация цен на энергоносители</li>
                      <li>Улучшение логистических цепочек</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Региональная инфляция</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Центральный ФО</span>
                    <span className="font-medium">7.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Северо-Западный ФО</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Южный ФО</span>
                    <span className="font-medium">7.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Приволжский ФО</span>
                    <span className="font-medium">7.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Сибирский ФО</span>
                    <span className="font-medium">7.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

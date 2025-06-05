
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Forecasts() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Прогнозы</h1>
          <p className="text-muted-foreground mb-8">Экономические прогнозы и макроэкономические показатели</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Прогноз инфляции</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>2024 год</span>
                    <span className="font-bold">5.0-5.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2025 год</span>
                    <span className="font-bold">4.0-4.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2026 год</span>
                    <span className="font-bold">4.0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Прогноз ключевой ставки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Конец 2024</span>
                    <span className="font-bold">14.0-15.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Конец 2025</span>
                    <span className="font-bold">10.0-12.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Конец 2026</span>
                    <span className="font-bold">8.0-10.0%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Макроэкономические прогнозы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Показатель</th>
                      <th className="text-right p-2">2024</th>
                      <th className="text-right p-2">2025</th>
                      <th className="text-right p-2">2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">ВВП, % роста</td>
                      <td className="text-right p-2">2.8-3.2</td>
                      <td className="text-right p-2">1.5-2.5</td>
                      <td className="text-right p-2">2.0-3.0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Инфляция, %</td>
                      <td className="text-right p-2">5.0-5.5</td>
                      <td className="text-right p-2">4.0-4.5</td>
                      <td className="text-right p-2">4.0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Курс USD/RUB</td>
                      <td className="text-right p-2">75-85</td>
                      <td className="text-right p-2">80-90</td>
                      <td className="text-right p-2">85-95</td>
                    </tr>
                    <tr>
                      <td className="p-2">Безработица, %</td>
                      <td className="text-right p-2">3.0-3.5</td>
                      <td className="text-right p-2">3.5-4.0</td>
                      <td className="text-right p-2">3.0-3.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Риски и факторы неопределенности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Основные риски:</h4>
                  <ul className="space-y-2">
                    <li>• Волатильность на мировых финансовых рынках</li>
                    <li>• Изменения в глобальной торговле</li>
                    <li>• Геополитическая неопределенность</li>
                    <li>• Климатические факторы</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Возможности:</h4>
                  <ul className="space-y-2">
                    <li>• Развитие внутреннего рынка</li>
                    <li>• Технологические инновации</li>
                    <li>• Импортозамещение</li>
                    <li>• Рост производительности труда</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

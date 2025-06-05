
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DepositRates() {
  const depositRates = [
    { type: "Сберегательный", rate: "до 8.5%", term: "от 3 мес до 3 лет", minAmount: "от 10 000 ₽" },
    { type: "Пенсионный", rate: "до 9.0%", term: "от 6 мес до 3 лет", minAmount: "от 1 000 ₽" },
    { type: "Накопительный", rate: "до 7.8%", term: "от 1 мес до 2 лет", minAmount: "от 50 000 ₽" },
    { type: "Валютный (USD)", rate: "до 3.5%", term: "от 3 мес до 1 года", minAmount: "от 1 000 $" },
    { type: "Валютный (EUR)", rate: "до 2.8%", term: "от 3 мес до 1 года", minAmount: "от 1 000 €" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Ставки по депозитам</h1>
          <p className="text-muted-foreground mb-8">Актуальные процентные ставки по депозитным продуктам</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {depositRates.map((deposit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{deposit.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Процентная ставка:</span>
                      <span className="text-lg font-bold text-green-600">{deposit.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Срок размещения:</span>
                      <span>{deposit.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Минимальная сумма:</span>
                      <span>{deposit.minAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Преимущества депозитов</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Страхование вкладов до 1 400 000 ₽</li>
                  <li>• Возможность пополнения и частичного снятия</li>
                  <li>• Автоматическая пролонгация</li>
                  <li>• Начисление процентов ежемесячно</li>
                  <li>• Досрочное расторжение без потери накопленных процентов</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Условия открытия</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Необходимые документы:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Паспорт гражданина РФ</li>
                      <li>Справка о доходах (для крупных сумм)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Способы открытия:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>В отделении банка</li>
                      <li>Через интернет-банк</li>
                      <li>Через мобильное приложение</li>
                    </ul>
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

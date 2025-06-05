
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreditRates() {
  const creditRates = [
    { type: "Потребительский кредит", rate: "от 12.5%", term: "до 5 лет", amount: "до 3 000 000 ₽" },
    { type: "Автокредит", rate: "от 8.9%", term: "до 7 лет", amount: "до 5 000 000 ₽" },
    { type: "Кредитная карта", rate: "от 19.9%", term: "до 55 дней без %", amount: "до 1 000 000 ₽" },
    { type: "Бизнес-кредит", rate: "от 10.5%", term: "до 3 лет", amount: "до 30 000 000 ₽" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Ставки по кредитам</h1>
          <p className="text-muted-foreground mb-8">Актуальные процентные ставки по кредитным продуктам</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {creditRates.map((credit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{credit.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Процентная ставка:</span>
                      <span className="text-lg font-bold text-solidus-steel-blue">{credit.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Срок кредита:</span>
                      <span>{credit.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Максимальная сумма:</span>
                      <span>{credit.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Условия предоставления кредитов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h3>Требования к заемщику:</h3>
                <ul>
                  <li>Возраст от 21 до 65 лет</li>
                  <li>Гражданство Российской Федерации</li>
                  <li>Постоянная регистрация в регионе присутствия банка</li>
                  <li>Стаж работы на последнем месте не менее 3 месяцев</li>
                </ul>
                
                <h3>Необходимые документы:</h3>
                <ul>
                  <li>Паспорт гражданина РФ</li>
                  <li>Справка о доходах (форма 2-НДФЛ или справка по форме банка)</li>
                  <li>Трудовая книжка или трудовой договор</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

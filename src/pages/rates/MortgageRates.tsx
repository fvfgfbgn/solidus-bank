
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MortgageRates() {
  const mortgagePrograms = [
    { 
      type: "Новостройка", 
      rate: "от 7.9%", 
      initialPayment: "от 15%", 
      term: "до 30 лет",
      maxAmount: "до 30 000 000 ₽"
    },
    { 
      type: "Вторичное жилье", 
      rate: "от 8.5%", 
      initialPayment: "от 20%", 
      term: "до 30 лет",
      maxAmount: "до 25 000 000 ₽"
    },
    { 
      type: "Загородная недвижимость", 
      rate: "от 9.2%", 
      initialPayment: "от 25%", 
      term: "до 25 лет",
      maxAmount: "до 15 000 000 ₽"
    },
    { 
      type: "Рефинансирование", 
      rate: "от 8.1%", 
      initialPayment: "без первоначального взноса", 
      term: "до 30 лет",
      maxAmount: "до 20 000 000 ₽"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Ипотечные ставки</h1>
          <p className="text-muted-foreground mb-8">Актуальные процентные ставки по ипотечным программам</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {mortgagePrograms.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{program.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Процентная ставка:</span>
                      <span className="text-xl font-bold text-solidus-steel-blue">{program.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Первоначальный взнос:</span>
                      <span>{program.initialPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Срок кредита:</span>
                      <span>{program.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Максимальная сумма:</span>
                      <span>{program.maxAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Государственные программы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Семейная ипотека</h4>
                    <p className="text-sm text-muted-foreground mb-2">Для семей с детьми</p>
                    <div className="flex justify-between">
                      <span>Ставка:</span>
                      <span className="font-bold">6.0%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">IT-ипотека</h4>
                    <p className="text-sm text-muted-foreground mb-2">Для IT-специалистов</p>
                    <div className="flex justify-between">
                      <span>Ставка:</span>
                      <span className="font-bold">5.0%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Дальневосточная ипотека</h4>
                    <p className="text-sm text-muted-foreground mb-2">Для жителей ДФО</p>
                    <div className="flex justify-between">
                      <span>Ставка:</span>
                      <span className="font-bold">2.0%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Требования и документы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Требования к заемщику:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Возраст от 21 до 65 лет</li>
                      <li>Гражданство РФ</li>
                      <li>Стаж работы от 3 месяцев</li>
                      <li>Подтвержденный доход</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Необходимые документы:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Паспорт гражданина РФ</li>
                      <li>Справка о доходах</li>
                      <li>Трудовая книжка</li>
                      <li>Документы на недвижимость</li>
                      <li>Отчет об оценке объекта</li>
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

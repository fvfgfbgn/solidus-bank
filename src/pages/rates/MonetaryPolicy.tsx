
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonetaryPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Денежно-кредитная политика</h1>
          <p className="text-muted-foreground mb-8">Основные направления и инструменты денежно-кредитной политики</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Цели политики</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Поддержание ценовой стабильности</li>
                  <li>• Обеспечение устойчивости банковской системы</li>
                  <li>• Развитие финансового рынка</li>
                  <li>• Защита интересов вкладчиков и кредиторов</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Основные инструменты</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Ключевая ставка</li>
                  <li>• Нормативы обязательных резервов</li>
                  <li>• Операции на открытом рынке</li>
                  <li>• Валютные интервенции</li>
                  <li>• Рефинансирование кредитных организаций</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Принципы проведения политики</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Денежно-кредитная политика Solidus Bank основана на принципах прозрачности, 
                  предсказуемости и эффективности. Банк регулярно информирует общественность 
                  о своих решениях и их обосновании.
                </p>
                <h3>Режим инфляционного таргетирования</h3>
                <p>
                  Solidus Bank проводит политику инфляционного таргетирования, стремясь 
                  поддерживать годовую инфляцию вблизи 4% в среднесрочной перспективе. 
                  Этот режим обеспечивает ценовую стабильность и создает условия для 
                  устойчивого экономического роста.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

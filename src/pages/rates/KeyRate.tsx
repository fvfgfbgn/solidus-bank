
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KeyRate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Ключевая ставка</h1>
          <p className="text-muted-foreground mb-8">Текущая информация о ключевой ставке банка</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Текущая ставка</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-solidus-steel-blue mb-2">16.00%</div>
                  <p className="text-muted-foreground">Действует с 26.04.2024</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Предыдущая ставка</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">15.50%</div>
                  <p className="text-muted-foreground">Действовала до 26.04.2024</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Следующее заседание</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-xl font-bold mb-2">14 июня 2024</div>
                  <p className="text-muted-foreground">Время: 13:30 МСК</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>О ключевой ставке</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  Ключевая ставка Solidus Bank является основным инструментом денежно-кредитной политики. 
                  Она влияет на процентные ставки по кредитам и депозитам, курс национальной валюты 
                  и в целом на экономические процессы в стране.
                </p>
                <h3>Влияние на экономику</h3>
                <p>
                  Изменение ключевой ставки является сигналом для рынка о направлении 
                  денежно-кредитной политики. Повышение ставки направлено на снижение 
                  инфляционного давления, а снижение ставки способствует стимулированию 
                  экономической активности.
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

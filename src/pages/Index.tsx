
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Shield, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CurrencyTable } from "@/components/CurrencyTable";
import { NewsSection } from "@/components/NewsSection";
import { InterestRates } from "@/components/InterestRates";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-solidus-steel-blue to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Solidus Bank</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ваш надежный партнер в финансовом мире. Современные банковские решения 
              для физических лиц и бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-solidus-steel-blue hover:bg-gray-100">
                <Link to="/registration">Открыть счет</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-solidus-steel-blue">
                <Link to="/about">Узнать больше</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Shield className="h-12 w-12 mx-auto text-solidus-steel-blue mb-4" />
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Защита средств и данных клиентов с использованием современных технологий
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Building2 className="h-12 w-12 mx-auto text-solidus-steel-blue mb-4" />
                  <CardTitle>Надежность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Стабильная работа и высокий рейтинг надежности от ведущих агентств
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 mx-auto text-solidus-steel-blue mb-4" />
                  <CardTitle>Доходность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Конкурентные процентные ставки по депозитам и выгодные условия кредитования
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 mx-auto text-solidus-steel-blue mb-4" />
                  <CardTitle>Сервис</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Индивидуальный подход и качественное обслуживание каждого клиента
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financial Information Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Currency Rates */}
              <div>
                <CurrencyTable />
              </div>
              
              {/* Interest Rates */}
              <div>
                <InterestRates />
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <NewsSection />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-solidus-steel-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Откройте счет в Solidus Bank сегодня и получите доступ ко всем преимуществам 
              современного банкинга.
            </p>
            <Button asChild size="lg" className="bg-white text-solidus-steel-blue hover:bg-gray-100">
              <Link to="/registration">
                Открыть счет
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

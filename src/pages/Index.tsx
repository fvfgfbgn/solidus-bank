
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyTable } from "@/components/CurrencyTable";
import { InterestRates } from "@/components/InterestRates";
import { MarketAnalytics } from "@/components/MarketAnalytics";
import { NewsSection } from "@/components/NewsSection";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="solidus-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solidus Bank
              </h1>
              <p className="text-xl mb-8">
                Основа вашего будущего. Надежность, проверенная временем.
              </p>
              {!isAuthenticated && (
                <Button
                  className="bg-white text-solidus-dark-slate hover:bg-solidus-platinum px-6"
                  size="lg"
                >
                  Стать клиентом
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Market Data Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Рыночные данные</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CurrencyTable />
              <InterestRates />
            </div>
          </div>
        </section>
        
        {/* Analytics Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Аналитика</h2>
            <MarketAnalytics />
          </div>
        </section>

        {/* News Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Новости и события</h2>
              <Link to="/news" className="text-solidus-steel-blue hover:underline inline-flex items-center">
                Все новости <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <NewsSection />
          </div>
        </section>

        {/* Admin/Employee Quick Access */}
        {isAuthenticated && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                {user?.role === "admin" ? "Административная панель" : "Рабочая панель"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user?.role === "admin" ? (
                  <>
                    <Link to="/admin/employees" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Сотрудники</h3>
                      <p className="text-muted-foreground">Управление сотрудниками банка</p>
                    </Link>
                    <Link to="/admin/activity" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Активность</h3>
                      <p className="text-muted-foreground">Мониторинг действий сотрудников</p>
                    </Link>
                    <Link to="/admin/secret" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Секретная информация</h3>
                      <p className="text-muted-foreground">Доступ к защищенной информации</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/clients" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Клиенты</h3>
                      <p className="text-muted-foreground">Управление базой клиентов</p>
                    </Link>
                    <Link to="/communications" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Коммуникации</h3>
                      <p className="text-muted-foreground">Звонки и консультации</p>
                    </Link>
                    {user?.canAccessSecretData && (
                      <Link to="/secret" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-xl mb-2">Секретная информация</h3>
                        <p className="text-muted-foreground">Доступ к защищенной информации</p>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

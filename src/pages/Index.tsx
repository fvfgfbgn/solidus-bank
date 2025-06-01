
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CurrencyTable } from "@/components/CurrencyTable";
import { InterestRates } from "@/components/InterestRates";
import { MarketAnalytics } from "@/components/MarketAnalytics";
import { NewsSection } from "@/components/NewsSection";
import { FinancialStabilityIndicators } from "@/components/FinancialStabilityIndicators";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, BarChart3, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
                <Link to="/registration">
                  <Button
                    className="bg-white text-solidus-dark-slate hover:bg-solidus-platinum px-6"
                    size="lg"
                  >
                    Стать клиентом
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Important Links Section */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/key-rate" className="flex items-center p-4 rounded-md hover:bg-muted transition-colors">
                <div>
                  <div className="text-sm text-muted-foreground">Ключевая ставка</div>
                  <div className="text-xl font-bold text-solidus-steel-blue">16.00%</div>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Link>
              <Link to="/inflation" className="flex items-center p-4 rounded-md hover:bg-muted transition-colors">
                <div>
                  <div className="text-sm text-muted-foreground">Инфляция</div>
                  <div className="text-xl font-bold text-solidus-steel-blue">7.50%</div>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Link>
              <Link to="/currency/usd" className="flex items-center p-4 rounded-md hover:bg-muted transition-colors">
                <div>
                  <div className="text-sm text-muted-foreground">USD</div>
                  <div className="text-xl font-bold text-solidus-steel-blue">89.74 ₽</div>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Link>
              <Link to="/currency/eur" className="flex items-center p-4 rounded-md hover:bg-muted transition-colors">
                <div>
                  <div className="text-sm text-muted-foreground">EUR</div>
                  <div className="text-xl font-bold text-solidus-steel-blue">97.63 ₽</div>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
              </Link>
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
        
        {/* Financial Stability Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Финансовая стабильность</h2>
              <Link to="/financial-stability" className="text-solidus-steel-blue hover:underline inline-flex items-center">
                Подробнее <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <FinancialStabilityIndicators />
          </div>
        </section>
        
        {/* Analytics Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Аналитика</h2>
              <Link to="/analytics" className="text-solidus-steel-blue hover:underline inline-flex items-center">
                Все отчеты <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <MarketAnalytics />
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Аналитические материалы</CardTitle>
                    <CardDescription>Последние исследования и отчеты</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted transition-colors">
                        <BarChart3 className="h-10 w-10 text-solidus-steel-blue" />
                        <div>
                          <h3 className="font-medium">Обзор финансового сектора</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Анализ текущей ситуации в финансовом секторе и перспективы развития
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>05.05.2025</span>
                            <span className="mx-2">•</span>
                            <span>PDF, 2.5 МБ</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted transition-colors">
                        <BarChart3 className="h-10 w-10 text-solidus-steel-blue" />
                        <div>
                          <h3 className="font-medium">Доклад о денежно-кредитной политике</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Оценка перспектив развития экономической ситуации и денежно-кредитной политики
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>02.05.2025</span>
                            <span className="mx-2">•</span>
                            <span>PDF, 3.8 МБ</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted transition-colors">
                        <BarChart3 className="h-10 w-10 text-solidus-steel-blue" />
                        <div>
                          <h3 className="font-medium">Обзор финансовой стабильности</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Анализ рисков финансовой стабильности и их оценка
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>28.04.2025</span>
                            <span className="mx-2">•</span>
                            <span>PDF, 4.2 МБ</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted transition-colors">
                        <BarChart3 className="h-10 w-10 text-solidus-steel-blue" />
                        <div>
                          <h3 className="font-medium">Региональная экономика</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Информационно-аналитические материалы об экономическом положении регионов
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>25.04.2025</span>
                            <span className="mx-2">•</span>
                            <span>PDF, 5.1 МБ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-12">
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
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                {user?.role === "admin" ? "Административная панель" : "Рабочая панель"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user?.role === "admin" ? (
                  <>
                    <Link to="/admin" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Сотрудники</h3>
                      <p className="text-muted-foreground">Управление сотрудниками банка</p>
                    </Link>
                    <Link to="/admin" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Активность</h3>
                      <p className="text-muted-foreground">Мониторинг действий сотрудников</p>
                    </Link>
                    <Link to="/admin" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
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
                    <Link to="/clients" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-xl mb-2">Коммуникации</h3>
                      <p className="text-muted-foreground">Звонки и консультации</p>
                    </Link>
                    {user?.canAccessSecretData && (
                      <Link to="/clients" className="block p-6 rounded-lg border hover:shadow-md transition-shadow">
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
        
        {/* Services Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Услуги Solidus Bank</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Для физических лиц</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/personal/accounts" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Банковские счета
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/personal/deposits" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Вклады и депозиты
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/personal/loans" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Кредиты и займы
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/personal/cards" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Платежные карты
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/personal" className="text-solidus-steel-blue hover:underline mt-2 block">
                        Все услуги для физических лиц
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Для юридических лиц</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/business/accounts" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Расчетные счета
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/business/loans" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Кредитование
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/business/foreign" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Внешнеэкономическая деятельность
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/business/factoring" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Факторинг
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/business" className="text-solidus-steel-blue hover:underline mt-2 block">
                        Все услуги для бизнеса
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Для финансовых организаций</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/services/financial/correspondent" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Корреспондентские счета
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/financial/interbank" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Межбанковское кредитование
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/financial/custody" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Депозитарные услуги
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/financial/clearing" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Клиринговые услуги
                      </Link>
                    </li>
                    <li>
                      <Link to="/services/financial" className="text-solidus-steel-blue hover:underline mt-2 block">
                        Все услуги для финансовых организаций
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Исследования и аналитика</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/research/economics" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Экономические исследования
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/markets" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Анализ финансовых рынков
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/statistics" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Статистические данные
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/reports" className="hover:underline flex items-center gap-1">
                        <ChevronRight className="h-3 w-3" />
                        Публикации и отчеты
                      </Link>
                    </li>
                    <li>
                      <Link to="/research" className="text-solidus-steel-blue hover:underline mt-2 block">
                        Вся аналитика и исследования
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

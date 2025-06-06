
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { NewsSection } from "@/components/NewsSection";
import { InterestRates } from "@/components/InterestRates";
import { CurrencyTable } from "@/components/CurrencyTable";
import { MarketAnalytics } from "@/components/MarketAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Building2, TrendingUp, Lock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <MainNavigation />
      
      {/* Hero Section with Admin Access */}
      <section className="solidus-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Solidus Bank
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Надёжная финансовая система для современной экономики. 
                Стабильность, инновации и профессиональное управление.
              </p>
              
              {/* Quick Access Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/registration">
                  <Button size="lg" variant="secondary" className="bg-white text-slate-800 hover:bg-blue-50">
                    Регистрация клиента
                  </Button>
                </Link>
                <Link to="/client">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                    Вход для клиентов
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Admin & Employee Access Panel */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Служебный доступ
              </h3>
              <p className="text-blue-100 mb-4 text-sm">
                Панель для администраторов и сотрудников банка
              </p>
              
              <div className="space-y-3">
                <Link to="/admin" className="block">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-slate-800">
                    <Shield className="h-4 w-4 mr-2" />
                    Админпанель
                  </Button>
                </Link>
                <Link to="/employee" className="block">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-slate-800">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Кабинет сотрудника
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 p-3 bg-blue-900/30 rounded text-xs">
                <p className="font-medium mb-1">Тестовые данные для входа:</p>
                <p>Админ: admin / 0000</p>
                <p>Сотрудник: employee1 / password</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Ключевые направления деятельности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Денежно-кредитная политика</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Управление ключевой ставкой и инфляционными процессами
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Банковский надзор</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Регулирование и контроль банковской системы
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Финансовая стабильность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Обеспечение устойчивости финансовой системы
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-slate-800">Защита прав потребителей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  Контроль соблюдения прав клиентов банков
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Data */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Процентные ставки</h2>
              <InterestRates />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Валютные курсы</h2>
              <CurrencyTable />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Рыночная аналитика</h2>
          <MarketAnalytics />
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Новости и события</h2>
          <NewsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
}

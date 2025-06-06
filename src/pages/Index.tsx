
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MainNavigation } from "@/components/MainNavigation";
import { NewsSection } from "@/components/NewsSection";
import { InterestRates } from "@/components/InterestRates";
import { CurrencyTable } from "@/components/CurrencyTable";
import { MarketAnalytics } from "@/components/MarketAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Building2, TrendingUp, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleClientAccess = () => {
    if (isAuthenticated && user?.role === "client") {
      navigate("/client");
    } else {
      navigate("/registration");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="solidus-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solidus Bank
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Надёжная финансовая система для современной экономики. 
              Стабильность, инновации и профессиональное управление.
            </p>
            
            {/* Single Client Access Button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-slate-800 hover:bg-blue-50 text-lg px-8 py-4"
                onClick={handleClientAccess}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                {isAuthenticated && user?.role === "client" ? "Личный кабинет" : "Стать клиентом"}
              </Button>
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

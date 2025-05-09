import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/ui/charts";

const Structure = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Структура</h1>
          <p className="text-muted-foreground mb-8">Организационная структура Solidus Bank</p>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Общая информация</TabsTrigger>
              <TabsTrigger value="departments">Департаменты</TabsTrigger>
              <TabsTrigger value="branches">Региональная сеть</TabsTrigger>
              <TabsTrigger value="management">Схема управления</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Общая информация о структуре банка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Solidus Bank имеет сложную организационную структуру, включающую различные департаменты и филиалы.</p>
                  <ul>
                    <li>Центральный офис: Москва</li>
                    <li>Региональные филиалы: 50+ городов</li>
                    <li>Департаменты: Кредитный, Инвестиционный, IT, HR и др.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="departments">
              <Card>
                <CardHeader>
                  <CardTitle>Основные департаменты</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li>Кредитный департамент: Выдача кредитов юридическим и физическим лицам.</li>
                    <li>Инвестиционный департамент: Управление инвестициями и ценными бумагами.</li>
                    <li>IT департамент: Обеспечение работы информационных систем и технологий.</li>
                    <li>HR департамент: Управление персоналом и кадровой политикой.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="branches">
              <Card>
                <CardHeader>
                  <CardTitle>Региональная сеть</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Solidus Bank имеет широкую сеть филиалов по всей России.</p>
                  <ul>
                    <li>Москва: 10+ филиалов</li>
                    <li>Санкт-Петербург: 5+ филиалов</li>
                    <li>Другие регионы: Филиалы в крупных городах</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="management">
              <Card>
                <CardHeader>
                  <CardTitle>Схема управления</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Схема управления банком включает совет директоров, правление и различные комитеты.</p>
                  <AreaChart
                    data={[
                      { name: "Совет директоров", value: 10 },
                      { name: "Правление", value: 8 },
                      { name: "Комитеты", value: 12 },
                    ]}
                    index="name"
                    categories={["value"]}
                    colors={["#3b82f6"]}
                    showLegend={false}
                    showTooltip={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Structure;


import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsSection } from "@/components/NewsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

export default function PressCenter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Пресс-центр</h1>
          <p className="text-muted-foreground mb-8">Новости, интервью, публикации и мероприятия</p>
          
          <Tabs defaultValue="news">
            <TabsList className="mb-8">
              <TabsTrigger value="news">Новости</TabsTrigger>
              <TabsTrigger value="events">Мероприятия</TabsTrigger>
              <TabsTrigger value="press">Пресс-релизы</TabsTrigger>
              <TabsTrigger value="interviews">Интервью</TabsTrigger>
              <TabsTrigger value="media">Медиа</TabsTrigger>
            </TabsList>
            
            <TabsContent value="news">
              <NewsSection />
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">15 мая 2025, 10:00</div>
                    <CardTitle>Итоги заседания Наблюдательного совета</CardTitle>
                    <CardDescription>Москва, Головной офис Solidus Bank</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Заседание Наблюдательного совета по вопросам финансовой стабильности и развития банковского сектора.
                    </p>
                    <Button variant="link" className="p-0 mt-4 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Подробнее <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">22 мая 2025, 14:00</div>
                    <CardTitle>Международный финансовый форум</CardTitle>
                    <CardDescription>Санкт-Петербург, Экспофорум</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Ежегодный международный форум с участием представителей ведущих финансовых организаций.
                    </p>
                    <Button variant="link" className="p-0 mt-4 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Подробнее <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="press">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">08.05.2025</div>
                    <CardTitle>Solidus Bank принял участие в разработке мер по стабилизации финансового рынка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Solidus Bank в сотрудничестве с другими финансовыми институтами разработал комплекс мер, направленных на обеспечение стабильности финансового рынка в условиях глобальной нестабильности.
                    </p>
                    <Button variant="link" className="p-0 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Читать полностью <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">05.05.2025</div>
                    <CardTitle>О решениях Совета директоров Solidus Bank по вопросам денежно-кредитной политики</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Совет директоров Solidus Bank принял решение сохранить ключевую ставку на уровне 16,00% годовых. Текущие темпы роста цен остаются умеренными. Инфляционные ожидания стабилизировались.
                    </p>
                    <Button variant="link" className="p-0 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Читать полностью <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="interviews">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">06.05.2025</div>
                    <CardTitle>Интервью с Председателем Solidus Bank о перспективах финансового рынка</CardTitle>
                    <CardDescription>Российская газета</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Председатель Solidus Bank рассказал о текущем состоянии финансового рынка, прогнозах на ближайшее время и планируемых мерах по обеспечению экономической стабильности.
                    </p>
                    <Button variant="link" className="p-0 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Читать интервью <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="media">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <img src="https://via.placeholder.com/400x225" alt="Фото события" className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg">Ежегодное собрание акционеров</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">05.05.2025</div>
                    <Button variant="link" className="p-0 mt-2 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Смотреть галерею <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <img src="https://via.placeholder.com/400x225" alt="Фото события" className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg">Пресс-конференция руководства банка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">03.05.2025</div>
                    <Button variant="link" className="p-0 mt-2 flex items-center" asChild>
                      <a href="https://cbr.ru/press/" target="_blank" rel="noopener noreferrer">
                        Смотреть запись <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

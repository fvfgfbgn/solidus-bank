
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-8">
        <div className="container px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <div className="text-6xl font-bold mb-6 text-gray-800">404</div>
              <CardTitle className="text-3xl">Страница не найдена</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground mx-auto text-center">
                Запрашиваемая страница не существует или была перемещена.
              </p>
              
              <div className="space-y-4 bg-muted/50 p-4 rounded-md">
                <h3 className="font-medium text-xl">Возможные причины:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Введен неверный URL-адрес</li>
                  <li>Страница была перемещена или удалена</li>
                  <li>Вы перешли по недействительной ссылке</li>
                </ul>
              </div>
              
              <div className="space-y-4 bg-muted/50 p-4 rounded-md">
                <h3 className="font-medium text-xl">Что можно сделать:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Проверить правильность введенного адреса</li>
                  <li>Вернуться на главную страницу</li>
                  <li>Перейти к разделу с основной информацией</li>
                  <li>Воспользоваться поиском по сайту</li>
                </ul>
              </div>
              
              <div className="pt-4 flex justify-center gap-4 flex-wrap">
                <Button asChild size="lg">
                  <Link to="/">На главную</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                  Назад
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

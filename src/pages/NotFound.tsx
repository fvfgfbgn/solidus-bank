
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-8">
        <div className="container px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 text-gray-800">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Страница не найдена</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Запрашиваемая страница не существует или была перемещена. 
            Пожалуйста, проверьте URL или вернитесь на главную страницу.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link to="/">На главную</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              Назад
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Ошибка: Попытка доступа к несуществующему маршруту:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 rounded-lg bg-white shadow-md max-w-md">
        <h1 className="text-6xl font-bold text-solidus-dark-slate mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Упс! Страница не найдена</p>
        <p className="text-gray-500 mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

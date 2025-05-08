
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function MainNavigation() {
  return (
    <NavigationMenu className="mx-auto hidden md:flex">
      <NavigationMenuList>
        {/* About Bank section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>О банке</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
              <Link 
                to="/about" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">История банка</div>
                <div className="text-sm text-muted-foreground">
                  История и основные этапы развития Solidus Bank
                </div>
              </Link>
              <Link 
                to="/management" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Руководство</div>
                <div className="text-sm text-muted-foreground">
                  Структура и руководящий состав банка
                </div>
              </Link>
              <Link 
                to="/structure" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Структура</div>
                <div className="text-sm text-muted-foreground">
                  Организационная структура Solidus Bank
                </div>
              </Link>
              <Link 
                to="/reports" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Годовые отчеты</div>
                <div className="text-sm text-muted-foreground">
                  Финансовая отчетность Solidus Bank
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Monetary Policy section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Денежно-кредитная политика</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
              <Link 
                to="/key-rate" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Ключевая ставка</div>
                <div className="text-sm text-muted-foreground">
                  Информация о ключевой ставке Solidus Bank
                </div>
              </Link>
              <Link 
                to="/inflation" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Инфляция</div>
                <div className="text-sm text-muted-foreground">
                  Динамика инфляционных процессов
                </div>
              </Link>
              <Link 
                to="/monetary-policy" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Политика и инструменты</div>
                <div className="text-sm text-muted-foreground">
                  Инструменты денежно-кредитной политики
                </div>
              </Link>
              <Link 
                to="/forecasts" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Прогнозы</div>
                <div className="text-sm text-muted-foreground">
                  Экономические прогнозы и аналитика
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Financial Markets section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Финансовые рынки</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
              <Link 
                to="/markets/currency" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Валютный рынок</div>
                <div className="text-sm text-muted-foreground">
                  Информация о валютных операциях
                </div>
              </Link>
              <Link 
                to="/markets/securities" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Рынок ценных бумаг</div>
                <div className="text-sm text-muted-foreground">
                  Данные о рынке ценных бумаг
                </div>
              </Link>
              <Link 
                to="/markets/interbank" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Межбанковский рынок</div>
                <div className="text-sm text-muted-foreground">
                  Информация о межбанковском рынке
                </div>
              </Link>
              <Link 
                to="/markets/statistics" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Статистика</div>
                <div className="text-sm text-muted-foreground">
                  Статистические данные по финансовым рынкам
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Statistics section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Статистика</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
              <Link 
                to="/statistics/macroeconomics" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Макроэкономическая статистика</div>
                <div className="text-sm text-muted-foreground">
                  Ключевые макроэкономические показатели
                </div>
              </Link>
              <Link 
                to="/statistics/banking" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Банковская статистика</div>
                <div className="text-sm text-muted-foreground">
                  Статистические данные по банковскому сектору
                </div>
              </Link>
              <Link 
                to="/statistics/financial" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Финансовая статистика</div>
                <div className="text-sm text-muted-foreground">
                  Статистика финансовых рынков и операций
                </div>
              </Link>
              <Link 
                to="/statistics/payment" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
              >
                <div className="font-medium">Платежная статистика</div>
                <div className="text-sm text-muted-foreground">
                  Данные по платежным системам и операциям
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Direct links */}
        <NavigationMenuItem>
          <Link to="/press-center">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Пресс-центр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/regulations">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Нормативные акты
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

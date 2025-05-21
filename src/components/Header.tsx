import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropDownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Menu, Search, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { MainNavigation } from "./MainNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const success = await login(username, password);
      if (success) {
        setIsLoginDialogOpen(false);
        setUsername("");
        setPassword("");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Поиск",
      description: `Поиск по запросу: "${searchQuery}"`,
    });
    setIsSearchDialogOpen(false);
  };

  return (
    <header className="bg-solidus-dark-blue text-black shadow-md">
      {/* Верхний заголовок с логотипом и авторизацией */}
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-textsolidus-platinum items solidus-dark-slate flex items-center justify-center font-bold text-lg"></div>
              <div>
                <div className="font-bold text-xl">Банк Solidus</div>
                <div className="text-xs text-solidus-platinum opacity-80">
                  Основа вашего будущего
                </div>
              </div>
            </Link>

            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="px-4 py-2 hover:bg-accent rounded-md text-black">Главная</Link>
                  <Link to="/about" className="px-4 py-2 hover:bg-accent rounded-md text-black">О банке</Link>
                  <Link to="/monetary-policy" className="px-4 py-2 hover:bg-accent rounded-md text-black">Денежно-кредитная политика</Link>
                  <Link to="/financial-markets" className="px-4 py-2 hover:bg-accent rounded-md text-black">Финансовые рынки</Link>
                  <Link to="/statistics" className="px-4 py-2 hover:bg-accent rounded-md text-black">Статистика</Link>
                  <Link to="/press-center" className="px-4 py-2 hover:bg-accent rounded-md text-black">Пресс-центр</Link>
                  <Link to="/regulations" className="px-4 py-2 hover:bg-accent rounded-md text-black">Нормативные акты</Link>
                  
                  {isAuthenticated && user?.role === "admin" && (
                    <Link to="/admin" className="px-4 py-2 hover:bg-accent rounded-md text-black">Панель администратора</Link>
                  )}
                  
                  {isAuthenticated && user?.role === "employee" && (
                    <Link to="/clients" className="px-4 py-2 hover:bg-accent rounded-md text-black">Клиенты</Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Desktop navigation */}
            <MainNavigation />
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="text-black border-black hover:bg-black hover:text-white transition-all"
              onClick={() => setIsSearchDialogOpen(true)}
            >
              <Search className="h-5 w-5 mr-2" />
              Поиск
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white transition-all">
                    <User  className="h-5 w-5 mr-2" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast({
                    title: "Профиль пользователя",
                    description: "Функция в разработке"
                  })}>
                    <User Cog className="h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-500" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsLoginDialogOpen(true)}
                className="text-black border-black hover:bg-black hover:text-white transition-all"
              >
                <User  className="h-5 w-5 mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Авторизация</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите имя пользователя"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Для администратора: логин - admin, пароль - 0000
                <br />
                Для сотрудников: пароль - password
              </div>
            </div>
            <Button onClick={handleLogin} disabled={isLoggingIn} className="text-black">
              {isLoggingIn ? "Вход..." : "Войти"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Поиск по сайту</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="search">Поисковый запрос</Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите поисковый запрос"
              />
            </div>
            <Button type="submit" className="text-black">Найти</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

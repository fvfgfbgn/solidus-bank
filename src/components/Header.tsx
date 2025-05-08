
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, UserCog, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const Header = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

  return (
    <header className="bg-solidus-dark-slate text-white shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-solidus-platinum text-solidus-dark-slate flex items-center justify-center font-bold text-lg">S</div>
              <div>
                <div className="font-bold text-xl">Solidus Bank</div>
                <div className="text-xs text-solidus-platinum opacity-80">
                  Основа вашего будущего
                </div>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/currency" className="hover:text-solidus-platinum transition-colors">Курсы валют</Link>
              <Link to="/rates" className="hover:text-solidus-platinum transition-colors">Ставки</Link>
              <Link to="/analytics" className="hover:text-solidus-platinum transition-colors">Аналитика</Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link to="/admin" className="hover:text-solidus-platinum transition-colors">Панель администратора</Link>
              )}
              {isAuthenticated && user?.role === "employee" && (
                <Link to="/clients" className="hover:text-solidus-platinum transition-colors">Клиенты</Link>
              )}
            </nav>
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-solidus-platinum">
                  <User className="h-5 w-5 mr-2" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => toast({
                  title: "Профиль пользователя",
                  description: "Функция в разработке"
                })}>
                  <UserCog className="h-4 w-4" />
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
              variant="ghost"
              onClick={() => setIsLoginDialogOpen(true)}
              className="text-solidus-platinum"
            >
              <User className="h-5 w-5 mr-2" />
              Войти
            </Button>
          )}
        </div>
      </div>

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
                Для администратора: логин - 0000, пароль - admin
                <br />
                Для сотрудников: пароль - password
              </div>
            </div>
            <Button onClick={handleLogin} disabled={isLoggingIn}>
              {isLoggingIn ? "Вход..." : "Войти"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

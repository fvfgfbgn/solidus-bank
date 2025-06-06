
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, Menu, X, Shield, UserCheck, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [loginType, setLoginType] = useState<"admin" | "employee" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleServiceLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      setIsServiceDialogOpen(false);
      setUsername("");
      setPassword("");
      if (loginType === "admin") {
        navigate("/admin");
      } else if (loginType === "employee") {
        navigate("/employee");
      }
    }
  };

  const openServiceDialog = (type: "admin" | "employee") => {
    setLoginType(type);
    setIsServiceDialogOpen(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-solidus-steel-blue">
            Solidus Bank
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" 
                  ? "text-solidus-steel-blue" 
                  : "text-gray-700 hover:text-solidus-steel-blue"
              }`}
            >
              Главная
            </Link>

            {/* Курсы валют */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('currency')}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.includes('/currency') || location.pathname.includes('/markets')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Курсы валют
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'currency' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <Link
                      to="/markets/currency"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Валютный рынок
                    </Link>
                    <Link
                      to="/markets/securities"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Рынок ценных бумаг
                    </Link>
                    <Link
                      to="/markets/interbank"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Межбанковский рынок
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Ставки */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('rates')}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.includes('/monetary')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Ставки
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'rates' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <Link
                      to="/monetary/key-rate"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Ключевая ставка
                    </Link>
                    <Link
                      to="/monetary/policy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Денежно-кредитная политика
                    </Link>
                    <Link
                      to="/monetary/inflation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Инфляция
                    </Link>
                    <Link
                      to="/monetary/forecasts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Прогнозы
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Аналитика */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('analytics')}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname.includes('/statistics') || location.pathname.includes('/analytics')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Аналитика
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'analytics' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <Link
                      to="/statistics/banking"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Банковская статистика
                    </Link>
                    <Link
                      to="/statistics/macroeconomics"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Макроэкономическая статистика
                    </Link>
                    <Link
                      to="/statistics/financial"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Финансовая статистика
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Другие разделы */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('other')}
                className="text-sm font-medium text-gray-700 hover:text-solidus-steel-blue transition-colors flex items-center gap-1"
              >
                Еще
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'other' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      О банке
                    </Link>
                    <Link
                      to="/regulations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Нормативные документы
                    </Link>
                    <Link
                      to="/press"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdowns}
                    >
                      Пресс-центр
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Добро пожаловать, {user?.name}
                </span>
                {user?.role === "admin" && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Админ панель
                    </Button>
                  </Link>
                )}
                {user?.role === "employee" && (
                  <Link to="/employee">
                    <Button variant="outline" size="sm">
                      Рабочая панель
                    </Button>
                  </Link>
                )}
                {user?.role === "client" && (
                  <Link to="/client">
                    <Button variant="outline" size="sm">
                      Личный кабинет
                    </Button>
                  </Link>
                )}
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Выйти
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Lock className="h-4 w-4 mr-1" />
                      Служебный вход
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Служебный доступ</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline"
                          onClick={() => openServiceDialog("admin")}
                          className="flex items-center justify-center"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Админ
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => openServiceDialog("employee")}
                          className="flex items-center justify-center"
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Сотрудник
                        </Button>
                      </div>
                      
                      {loginType && (
                        <form onSubmit={handleServiceLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Имя пользователя</Label>
                            <Input
                              id="username"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Введите имя пользователя"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                              id="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Введите пароль"
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => {
                              setLoginType(null);
                              setUsername("");
                              setPassword("");
                            }}>
                              Назад
                            </Button>
                            <Button type="submit">
                              Войти как {loginType === "admin" ? "администратор" : "сотрудник"}
                            </Button>
                          </div>
                        </form>
                      )}
                      
                      {!loginType && (
                        <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
                          <p className="font-medium mb-1">Тестовые данные для входа:</p>
                          <p>Админ: admin / 0000</p>
                          <p>Сотрудник: employee1 / password</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                to="/markets/currency"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Курсы валют
              </Link>
              <Link
                to="/monetary/key-rate"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ставки
              </Link>
              <Link
                to="/statistics/banking"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Аналитика
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О банке
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={closeDropdowns}
        />
      )}
    </header>
  );
};

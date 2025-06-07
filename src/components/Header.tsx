import React, { useState, useRef, useEffect } from "react";
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
  
  // Refs for hover delay
  const aboutRef = useRef<HTMLDivElement>(null);
  const monetaryRef = useRef<HTMLDivElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const statisticsRef = useRef<HTMLDivElement>(null);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    logout();
  };

  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 800); // Увеличил задержку до 800ms для удобства
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

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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

            {/* О банке */}
            <div 
              className="relative"
              ref={aboutRef}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                  location.pathname.includes('/about')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                О банке
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'about' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-xl z-50 py-3"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/about"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">История банка</div>
                    <div className="text-sm text-gray-500 mt-1">Основные этапы развития</div>
                  </Link>
                  <Link
                    to="/about/management"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Руководство</div>
                    <div className="text-sm text-gray-500 mt-1">Руководящий состав</div>
                  </Link>
                  <Link
                    to="/about/structure"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Структура</div>
                    <div className="text-sm text-gray-500 mt-1">Организационная структура</div>
                  </Link>
                  <Link
                    to="/about/reports"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Годовые отчеты</div>
                    <div className="text-sm text-gray-500 mt-1">Финансовая отчетность</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Денежно-кредитная политика */}
            <div 
              className="relative"
              ref={monetaryRef}
              onMouseEnter={() => handleMouseEnter('monetary')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                  location.pathname.includes('/monetary')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Денежно-кредитная политика
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'monetary' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-xl z-50 py-3"
                  onMouseEnter={() => handleMouseEnter('monetary')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/monetary/key-rate"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Ключевая ставка</div>
                    <div className="text-sm text-gray-500 mt-1">Текущая ключевая ставка</div>
                  </Link>
                  <Link
                    to="/monetary/policy"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Политика и инструменты</div>
                    <div className="text-sm text-gray-500 mt-1">Инструменты ДКП</div>
                  </Link>
                  <Link
                    to="/monetary/inflation"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Инфляция</div>
                    <div className="text-sm text-gray-500 mt-1">Динамика инфляции</div>
                  </Link>
                  <Link
                    to="/monetary/forecasts"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Прогнозы</div>
                    <div className="text-sm text-gray-500 mt-1">Экономические прогнозы</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Финансовые рынки */}
            <div 
              className="relative"
              ref={marketsRef}
              onMouseEnter={() => handleMouseEnter('markets')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                  location.pathname.includes('/markets')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Финансовые рынки
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'markets' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-xl z-50 py-3"
                  onMouseEnter={() => handleMouseEnter('markets')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/markets/currency"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Валютный рынок</div>
                    <div className="text-sm text-gray-500 mt-1">Курсы валют</div>
                  </Link>
                  <Link
                    to="/markets/securities"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Рынок ценных бумаг</div>
                    <div className="text-sm text-gray-500 mt-1">Ценные бумаги</div>
                  </Link>
                  <Link
                    to="/markets/interbank"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Межбанковский рынок</div>
                    <div className="text-sm text-gray-500 mt-1">Межбанковские операции</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Статистика */}
            <div 
              className="relative"
              ref={statisticsRef}
              onMouseEnter={() => handleMouseEnter('statistics')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                  location.pathname.includes('/statistics')
                    ? "text-solidus-steel-blue" 
                    : "text-gray-700 hover:text-solidus-steel-blue"
                }`}
              >
                Статистика
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === 'statistics' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-md shadow-xl z-50 py-3"
                  onMouseEnter={() => handleMouseEnter('statistics')}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/statistics/banking"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Банковская статистика</div>
                    <div className="text-sm text-gray-500 mt-1">Данные банковского сектора</div>
                  </Link>
                  <Link
                    to="/statistics/macroeconomics"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Макроэкономическая статистика</div>
                    <div className="text-sm text-gray-500 mt-1">Макроэкономические показатели</div>
                  </Link>
                  <Link
                    to="/statistics/financial"
                    className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-solidus-steel-blue transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="font-medium">Финансовая статистика</div>
                    <div className="text-sm text-gray-500 mt-1">Финансовые рынки</div>
                  </Link>
                </div>
              )}
            </div>

            {/* Прямые ссылки */}
            <Link
              to="/press-center"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/press-center" 
                  ? "text-solidus-steel-blue" 
                  : "text-gray-700 hover:text-solidus-steel-blue"
              }`}
            >
              Пресс-центр
            </Link>

            <Link
              to="/regulations"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/regulations" 
                  ? "text-solidus-steel-blue" 
                  : "text-gray-700 hover:text-solidus-steel-blue"
              }`}
            >
              Нормативные акты
            </Link>
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
                to="/about"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О банке
              </Link>
              <Link
                to="/monetary/policy"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Денежно-кредитная политика
              </Link>
              <Link
                to="/markets/currency"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Финансовые рынки
              </Link>
              <Link
                to="/statistics/banking"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Статистика
              </Link>
              <Link
                to="/press-center"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Пресс-центр
              </Link>
              <Link
                to="/regulations"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-solidus-steel-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Нормативные акты
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdowns}
        />
      )}
    </header>
  );
};

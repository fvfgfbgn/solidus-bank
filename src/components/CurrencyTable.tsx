
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyService, CurrencyRate } from "@/services/currencyService";

export const CurrencyTable: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isRealData, setIsRealData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencyService = CurrencyService.getInstance();

  const loadCurrencies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Начинаем загрузку курсов валют...');
      const rates = await currencyService.getCurrentRates();
      setCurrencies(rates);
      setLastUpdateTime(new Date());
      setIsRealData(true);
      console.log('Курсы валют успешно загружены и отображены');
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
      setError('Ошибка загрузки данных');
      setIsRealData(false);
      // Показываем дефолтные данные в случае ошибки
      const defaultRates = await currencyService.getCurrentRates();
      setCurrencies(defaultRates);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Загружаем данные при первом рендере
    loadCurrencies();
    
    // Обновляем каждые 10 минут
    const updateInterval = setInterval(loadCurrencies, 10 * 60 * 1000);
    
    return () => clearInterval(updateInterval);
  }, []);

  const formattedTime = lastUpdateTime.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  if (currencies.length === 0 && isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Курсы валют</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Загрузка курсов валют...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Курсы валют</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-muted-foreground">
              Обновлено: {formattedTime}
              {isRealData && <span className="text-green-600 ml-1">(ЦБ РФ)</span>}
              {error && <span className="text-orange-600 ml-1">(офлайн)</span>}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadCurrencies}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Код</th>
                <th className="text-left py-3 px-4">Валюта</th>
                <th className="text-right py-3 px-4">Курс</th>
                <th className="text-right py-3 px-4">Изменение</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.code} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{currency.code}</td>
                  <td className="py-3 px-4">{currency.name}</td>
                  <td className="py-3 px-4 text-right font-medium">{currency.rate.toFixed(2)} ₽</td>
                  <td className={`py-3 px-4 text-right flex items-center justify-end ${
                    currency.change > 0 
                      ? "text-green-600" 
                      : currency.change < 0 
                        ? "text-red-600" 
                        : ""
                  }`}>
                    {currency.change > 0 && <ArrowUp className="h-3 w-3 mr-1" />}
                    {currency.change < 0 && <ArrowDown className="h-3 w-3 mr-1" />}
                    {currency.change.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && (
          <div className="mt-4 text-xs text-orange-600 text-center">
            {error}. Отображаются резервные данные.
          </div>
        )}
        {!isRealData && !error && (
          <div className="mt-4 text-xs text-orange-600 text-center">
            Данные могут быть неактуальными. Проверьте подключение к интернету.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

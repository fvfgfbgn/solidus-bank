
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

type Currency = {
  code: string;
  name: string;
  rate: number;
  change: number;
  previous: number;
};

const INITIAL_CURRENCIES: Currency[] = [
  { code: "USD", name: "Доллар США", rate: 89.74, change: -0.34, previous: 90.08 },
  { code: "EUR", name: "Евро", rate: 97.63, change: -0.24, previous: 97.87 },
  { code: "GBP", name: "Фунт стерлингов", rate: 114.15, change: 0.46, previous: 113.69 },
  { code: "JPY", name: "Японская иена", rate: 0.58, change: -0.01, previous: 0.59 },
  { code: "CNY", name: "Китайский юань", rate: 12.76, change: 0.05, previous: 12.71 },
  { code: "CHF", name: "Швейцарский франк", rate: 102.36, change: -0.18, previous: 102.54 },
];

// Function to generate updated currency rates
const generateUpdatedRates = (currencies: Currency[]): Currency[] => {
  return currencies.map(currency => {
    const changeAmount = (Math.random() * 0.4 - 0.2).toFixed(2);
    const newChange = parseFloat(changeAmount);
    const newRate = parseFloat((currency.rate + newChange).toFixed(2));
    
    return {
      ...currency,
      rate: newRate,
      change: newChange,
      previous: currency.rate
    };
  });
};

export const CurrencyTable: React.FC = () => {
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrencies(generateUpdatedRates);
      setLastUpdateTime(new Date());
    }, 30000);
    
    return () => clearInterval(updateInterval);
  }, []);

  // Format the last update time
  const formattedTime = lastUpdateTime.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Курсы валют</span>
          <span className="text-sm font-normal text-muted-foreground">
            Обновлено: {formattedTime}
          </span>
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
      </CardContent>
    </Card>
  );
};


import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

type Rate = {
  id: string;
  name: string;
  value: number;
  change: number;
  previous: number;
};

const INITIAL_RATES: Rate[] = [
  { id: "key", name: "Ключевая ставка", value: 16.0, change: 0, previous: 16.0 },
  { id: "overnight", name: "Овернайт", value: 16.25, change: 0.25, previous: 16.0 },
  { id: "deposit", name: "Депозиты - 1 неделя", value: 14.75, change: -0.25, previous: 15.0 },
  { id: "mortgage", name: "Ипотека", value: 12.80, change: 0.10, previous: 12.7 },
  { id: "consumer", name: "Потребительские", value: 17.90, change: 0.15, previous: 17.75 },
];

// Function to generate updated rates
const generateUpdatedRates = (rates: Rate[]): Rate[] => {
  return rates.map(rate => {
    // Key rate changes less frequently, so we'll just adjust others
    if (rate.id === "key") {
      return rate;
    }
    
    const changeAmount = (Math.random() * 0.2 - 0.1).toFixed(2);
    const newChange = parseFloat(changeAmount);
    const newValue = parseFloat((rate.value + newChange).toFixed(2));
    
    return {
      ...rate,
      value: newValue,
      change: newChange,
      previous: rate.value
    };
  });
};

export const InterestRates: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>(INITIAL_RATES);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRates(generateUpdatedRates);
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
          <span>Процентные ставки</span>
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
                <th className="text-left py-3 px-4">Тип ставки</th>
                <th className="text-right py-3 px-4">Значение, %</th>
                <th className="text-right py-3 px-4">Изменение</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{rate.name}</td>
                  <td className="py-3 px-4 text-right font-medium">{rate.value.toFixed(2)}%</td>
                  <td className={`py-3 px-4 text-right flex items-center justify-end ${
                    rate.change > 0 
                      ? "text-green-600" 
                      : rate.change < 0 
                        ? "text-red-600" 
                        : ""
                  }`}>
                    {rate.change > 0 && <ArrowUp className="h-3 w-3 mr-1" />}
                    {rate.change < 0 && <ArrowDown className="h-3 w-3 mr-1" />}
                    {rate.change.toFixed(2)}
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


import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InfoCircle } from "lucide-react";

type FinancialIndicator = {
  id: string;
  name: string;
  value: number;
  targetMin: number;
  targetMax: number;
  unit: string;
  status: "good" | "warning" | "danger";
  change: number;
};

const INITIAL_INDICATORS: FinancialIndicator[] = [
  {
    id: "capital",
    name: "Достаточность капитала",
    value: 12.8,
    targetMin: 8,
    targetMax: 16,
    unit: "%",
    status: "good",
    change: 0.3,
  },
  {
    id: "liquidity",
    name: "Коэффициент ликвидности",
    value: 105.2,
    targetMin: 90,
    targetMax: 120,
    unit: "%",
    status: "good",
    change: -2.5,
  },
  {
    id: "leverage",
    name: "Финансовый леверидж",
    value: 5.7,
    targetMin: 3,
    targetMax: 8,
    unit: "x",
    status: "warning",
    change: 0.6,
  },
  {
    id: "loan-reserve",
    name: "Резерв на возможные потери",
    value: 8.9,
    targetMin: 4,
    targetMax: 10,
    unit: "%",
    status: "warning",
    change: -0.2,
  },
  {
    id: "stress-index",
    name: "Индекс финансового стресса",
    value: 2.1,
    targetMin: 0,
    targetMax: 5,
    unit: "",
    status: "good",
    change: 0.1,
  },
];

// Function to generate updated indicators
const generateUpdatedIndicators = (indicators: FinancialIndicator[]): FinancialIndicator[] => {
  return indicators.map(indicator => {
    const changeAmount = parseFloat((Math.random() * 0.4 - 0.2).toFixed(1));
    const newValue = parseFloat((indicator.value + changeAmount).toFixed(1));
    
    // Determine new status
    let newStatus: "good" | "warning" | "danger" = "good";
    if (newValue < indicator.targetMin) {
      newStatus = "danger";
    } else if (newValue > indicator.targetMax) {
      newStatus = "danger";
    } else if (
      newValue < indicator.targetMin * 1.15 || 
      newValue > indicator.targetMax * 0.85
    ) {
      newStatus = "warning";
    }
    
    return {
      ...indicator,
      value: newValue,
      status: newStatus,
      change: changeAmount,
    };
  });
};

export const FinancialStabilityIndicators: React.FC = () => {
  const [indicators, setIndicators] = useState<FinancialIndicator[]>(INITIAL_INDICATORS);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setIndicators(generateUpdatedIndicators);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Индикаторы финансовой стабильности</span>
          <span className="text-sm font-normal text-muted-foreground">
            Обновлено: {formattedTime}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {indicators.map((indicator) => (
            <div key={indicator.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(indicator.status)}`}></div>
                  <span className="font-medium">{indicator.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{indicator.value}{indicator.unit}</span>
                  <Badge variant={indicator.change >= 0 ? "default" : "destructive"}>
                    {indicator.change >= 0 ? "+" : ""}{indicator.change}{indicator.unit}
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={(indicator.value / indicator.targetMax) * 100}
                  className={`h-2 ${getProgressColor(indicator.status)}`}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0{indicator.unit}</span>
                  <div className="flex items-center gap-1">
                    <span>Целевой диапазон: {indicator.targetMin}-{indicator.targetMax}{indicator.unit}</span>
                    <InfoCircle className="h-3 w-3" />
                  </div>
                  <span>{indicator.targetMax * 2}{indicator.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

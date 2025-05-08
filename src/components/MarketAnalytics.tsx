
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

type DataPoint = {
  date: string;
  solidus: number;
  competitors: number;
};

// Generate initial data
const generateInitialData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const solidus = 100 + Math.random() * 50;
    const competitors = 85 + Math.random() * 35;
    
    data.push({
      date: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      solidus: parseFloat(solidus.toFixed(2)),
      competitors: parseFloat(competitors.toFixed(2)),
    });
  }
  
  return data;
};

// Function to update the last data point
const updateLatestData = (data: DataPoint[]): DataPoint[] => {
  const newData = [...data];
  const lastPoint = newData[newData.length - 1];
  
  // Update with slight changes
  newData[newData.length - 1] = {
    ...lastPoint,
    solidus: parseFloat((lastPoint.solidus + (Math.random() * 2 - 1)).toFixed(2)),
    competitors: parseFloat((lastPoint.competitors + (Math.random() * 2 - 1)).toFixed(2)),
  };
  
  return newData;
};

export const MarketAnalytics: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(generateInitialData());
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setData(updateLatestData);
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

  const chartConfig = {
    solidus: {
      label: "Solidus Bank",
      theme: {
        light: "#4682B4",
        dark: "#4682B4",
      },
    },
    competitors: {
      label: "Конкуренты",
      theme: {
        light: "#2F4F4F",
        dark: "#2F4F4F",
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Индекс рыночной активности</span>
          <span className="text-sm font-normal text-muted-foreground">
            Обновлено: {formattedTime}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <Tooltip />
                <Line
                  name="solidus"
                  type="monotone" 
                  dataKey="solidus"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  name="competitors" 
                  type="monotone" 
                  dataKey="competitors"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="flex justify-center mt-4 gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-solidus-steel-blue mr-2"></div>
            <span className="text-sm">Solidus Bank</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-solidus-dark-slate mr-2"></div>
            <span className="text-sm">Конкуренты</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

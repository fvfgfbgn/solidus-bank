
import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Area, 
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

interface BaseChartProps {
  data: any[];
  index: string;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  height?: number | string;
  className?: string;
}

interface CartesianChartProps extends BaseChartProps {
  categories: string[];
  yAxisWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  autoMinValue?: boolean;
  startEndOnly?: boolean;
}

interface PieChartProps extends BaseChartProps {
  category: string;
  valueFormatter?: (value: number) => string;
  innerRadius?: number;
  outerRadius?: number;
}

export const AreaChart: React.FC<CartesianChartProps> = ({
  data,
  index,
  categories,
  colors = ["#2563eb", "#10b981"],
  yAxisWidth = 40,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  autoMinValue = false,
  startEndOnly = false,
  height = "100%",
  className,
}) => {
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis 
            dataKey={index} 
            tickFormatter={startEndOnly ? (value, index) => {
              return index === 0 || index === data.length - 1 ? value : "";
            } : undefined} 
          />}
          {showYAxis && <YAxis width={yAxisWidth} domain={autoMinValue ? ['auto', 'auto'] : undefined} />}
          {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.3}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChart: React.FC<CartesianChartProps> = ({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  yAxisWidth = 40,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  height = "100%",
  className,
}) => {
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis dataKey={index} />}
          {showYAxis && <YAxis width={yAxisWidth} />}
          {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
          {showLegend && <Legend />}
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  index,
  category,
  colors = ["#2563eb", "#10b981", "#ef4444", "#f59e0b", "#6366f1"],
  showLegend = true,
  showTooltip = true,
  valueFormatter = (value) => `${value}`,
  innerRadius = 0,
  outerRadius = "80%",
  height = "100%",
  className,
}) => {
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          {showTooltip && <Tooltip formatter={(value) => valueFormatter(Number(value))} />}
          {showLegend && <Legend />}
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            label={showTooltip ? false : (entry) => entry[index]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";

export const TransactionHistory = () => {
  const transactions = [
    { id: 1, type: "income", amount: "5000.00", description: "Зарплата", date: "2024-01-15", time: "14:30" },
    { id: 2, type: "expense", amount: "1250.00", description: "Продуктовый магазин", date: "2024-01-14", time: "18:45" },
    { id: 3, type: "expense", amount: "850.00", description: "Коммунальные услуги", date: "2024-01-13", time: "09:15" },
    { id: 4, type: "income", amount: "2000.00", description: "Перевод от друга", date: "2024-01-12", time: "16:20" },
    { id: 5, type: "expense", amount: "3200.00", description: "Онлайн покупка", date: "2024-01-11", time: "12:10" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>История операций</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="flex items-center gap-3">
                {transaction.type === "income" ? (
                  <ArrowDownLeft className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <div className="font-semibold">{transaction.description}</div>
                  <div className="text-xs text-gray-500">
                    {transaction.date} в {transaction.time}
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "income" ? "+" : "-"}{transaction.amount} ₽
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">Показать еще</Button>
        </div>
      </CardContent>
    </Card>
  );
};


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import { useClient } from "@/contexts/ClientContext";

export const TransactionHistory = () => {
  const { clientData } = useClient();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>История операций</CardTitle>
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {clientData.transactions.map((transaction) => (
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
                {transaction.type === "income" ? "+" : "-"}{transaction.amount.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          ))}
        </div>
        {clientData.transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Операций пока нет
          </div>
        )}
        {clientData.transactions.length > 0 && (
          <div className="mt-4 text-center">
            <Button variant="outline" className="border-blue-200 text-blue-700">
              Показать еще
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

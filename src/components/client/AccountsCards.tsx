
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Eye, EyeOff, Lock, Plus } from "lucide-react";

export const AccountsCards = () => {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  
  const accounts = [
    {
      id: 1,
      type: "Текущий счет",
      number: "40817810123456789012",
      balance: "156750.00",
      currency: "RUB",
      status: "active"
    },
    {
      id: 2,
      type: "Сберегательный счет",
      number: "40817810987654321098",
      balance: "45230.50",
      currency: "RUB",
      status: "active"
    }
  ];

  const cards = [
    {
      id: 1,
      type: "Дебетовая карта",
      number: "1234567812345678",
      balance: "156750.00",
      expiryDate: "12/26",
      status: "active",
      blocked: false
    },
    {
      id: 2,
      type: "Кредитная карта",
      number: "8765432187654321",
      balance: "50000.00",
      creditLimit: "100000.00",
      expiryDate: "08/27",
      status: "active",
      blocked: false
    }
  ];

  const maskCardNumber = (number: string) => {
    if (showCardNumbers) return number;
    return number.slice(0, 4) + " **** **** " + number.slice(-4);
  };

  const maskAccountNumber = (number: string) => {
    if (showCardNumbers) return number;
    return "****" + number.slice(-4);
  };

  return (
    <div className="space-y-6">
      {/* Заголовок с переключателем видимости */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Мои счета и карты</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCardNumbers(!showCardNumbers)}
          className="flex items-center gap-2"
        >
          {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showCardNumbers ? "Скрыть номера" : "Показать номера"}
        </Button>
      </div>

      {/* Банковские счета */}
      <div>
        <h4 className="font-semibold mb-3">Банковские счета</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{account.type}</CardTitle>
                  <Badge variant="default">Активен</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    Номер счета: {maskAccountNumber(account.number)}
                  </div>
                  <div className="text-2xl font-bold">
                    {account.balance} ₽
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">История</Button>
                    <Button size="sm" variant="outline">Реквизиты</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Кнопка создания нового счета */}
          <Card className="border-dashed border-2 hover:border-solid hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600 text-center">
                <div className="font-semibold">Открыть новый счет</div>
                <div className="text-xs">Рублевый или валютный</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Банковские карты */}
      <div>
        <h4 className="font-semibold mb-3">Банковские карты</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Card key={card.id} className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-blue-100">{card.type}</CardTitle>
                  <CreditCard className="h-5 w-5 text-blue-200" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-lg font-mono">
                    {maskCardNumber(card.number)}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-blue-200">Действует до</div>
                      <div className="font-semibold">{card.expiryDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-blue-200">Баланс</div>
                      <div className="font-semibold">{card.balance} ₽</div>
                    </div>
                  </div>
                  {card.type === "Кредитная карта" && (
                    <div className="text-xs text-blue-200">
                      Кредитный лимит: {card.creditLimit} ₽
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="secondary">Пополнить</Button>
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-100 hover:bg-blue-700">
                      <Lock className="h-3 w-3 mr-1" />
                      Заблокировать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Кнопка заказа новой карты */}
          <Card className="border-dashed border-2 hover:border-solid hover:border-blue-300 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600 text-center">
                <div className="font-semibold">Заказать карту</div>
                <div className="text-xs">Дебетовая или кредитная</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

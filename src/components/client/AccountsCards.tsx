
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Eye, EyeOff, Lock, Plus } from "lucide-react";
import { useClient } from "@/contexts/ClientContext";

export const AccountsCards = () => {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const { clientData, addAccount, addCard, addTransaction } = useClient();

  const handleOpenAccount = () => {
    const accountTypes = ['Сберегательный счет', 'Валютный счет', 'Депозитный счет'];
    const selectedType = prompt(`Выберите тип счета:\n${accountTypes.map((type, index) => `${index + 1}. ${type}`).join('\n')}`);
    
    if (selectedType && !isNaN(Number(selectedType)) && Number(selectedType) >= 1 && Number(selectedType) <= 3) {
      const typeIndex = Number(selectedType) - 1;
      addAccount({
        type: accountTypes[typeIndex],
        balance: 0,
        currency: accountTypes[typeIndex] === 'Валютный счет' ? 'USD' : 'RUB',
        status: 'active'
      });
      
      addTransaction({
        type: 'income',
        amount: 0,
        description: `Открыт ${accountTypes[typeIndex]}`,
        category: 'Банковские операции'
      });
    }
  };

  const handleOrderCard = () => {
    const cardTypes = ['Дебетовая карта', 'Кредитная карта'];
    const selectedType = prompt(`Выберите тип карты:\n${cardTypes.map((type, index) => `${index + 1}. ${type}`).join('\n')}`);
    
    if (selectedType && !isNaN(Number(selectedType)) && Number(selectedType) >= 1 && Number(selectedType) <= 2) {
      const typeIndex = Number(selectedType) - 1;
      const newCard = {
        type: cardTypes[typeIndex],
        balance: cardTypes[typeIndex] === 'Кредитная карта' ? 0 : clientData.balance,
        expiryDate: new Date(Date.now() + 4 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU').slice(3),
        status: 'active' as const,
        ...(cardTypes[typeIndex] === 'Кредитная карта' && { creditLimit: 50000 })
      };
      
      addCard(newCard);
      
      addTransaction({
        type: 'income',
        amount: 0,
        description: `Заказана ${cardTypes[typeIndex]}`,
        category: 'Банковские операции'
      });
    }
  };

  const maskCardNumber = (number: string) => {
    if (showCardNumbers) return number.replace(/(.{4})/g, '$1 ').trim();
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
        <h3 className="text-lg font-semibold">Мои продукты</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCardNumbers(!showCardNumbers)}
          className="flex items-center gap-2 border-blue-200 text-blue-700"
        >
          {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showCardNumbers ? "Скрыть номера" : "Показать номера"}
        </Button>
      </div>

      {/* Банковские счета */}
      <div>
        <h4 className="font-semibold mb-3">Банковские счета</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientData.accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{account.type}</CardTitle>
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {account.status === 'active' ? 'Активен' : 'Заблокирован'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    Номер счета: {maskAccountNumber(account.number)}
                  </div>
                  <div className="text-2xl font-bold">
                    {account.balance.toLocaleString('ru-RU')} {account.currency === 'RUB' ? '₽' : '$'}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700">
                      История
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700">
                      Реквизиты
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Кнопка создания нового счета */}
          <Card 
            className="border-dashed border-2 border-blue-200 hover:border-solid hover:border-blue-300 transition-colors cursor-pointer"
            onClick={handleOpenAccount}
          >
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <Plus className="h-8 w-8 text-blue-400 mb-2" />
              <div className="text-sm text-blue-600 text-center">
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
          {clientData.cards.map((card) => (
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
                      <div className="font-semibold">{card.balance.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  </div>
                  {card.creditLimit && (
                    <div className="text-xs text-blue-200">
                      Кредитный лимит: {card.creditLimit.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Пополнить
                    </Button>
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
          <Card 
            className="border-dashed border-2 border-blue-200 hover:border-solid hover:border-blue-300 transition-colors cursor-pointer"
            onClick={handleOrderCard}
          >
            <CardContent className="flex flex-col items-center justify-center h-full py-8">
              <Plus className="h-8 w-8 text-blue-400 mb-2" />
              <div className="text-sm text-blue-600 text-center">
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

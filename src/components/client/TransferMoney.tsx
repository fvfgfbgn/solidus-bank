
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CreditCard, Building } from "lucide-react";

export const TransferMoney = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");

  const userAccounts = [
    { id: "1", name: "Текущий счет", number: "****789012", balance: "156,750.00" },
    { id: "2", name: "Сберегательный счет", number: "****321098", balance: "45,230.50" },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="internal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="internal">Между своими счетами</TabsTrigger>
          <TabsTrigger value="card">На карту</TabsTrigger>
          <TabsTrigger value="bank">В другой банк</TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Перевод между счетами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Со счета</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите счет" />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} {account.number} - {account.balance} ₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>На счет</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите счет" />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} {account.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Сумма перевода</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button className="w-full">Выполнить перевод</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Перевод на карту
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Со счета</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите счет" />
                  </SelectTrigger>
                  <SelectContent>
                    {userAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} {account.number} - {account.balance} ₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер карты получателя</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferAmount">Сумма перевода</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferDescription">Назначение платежа</Label>
                <Input
                  id="transferDescription"
                  placeholder="Например: за услуги"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button className="w-full">Отправить перевод</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Перевод в другой банк
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Со счета</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите счет" />
                  </SelectTrigger>
                  <SelectContent>
                    {userAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} {account.number} - {account.balance} ₽
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">ФИО получателя</Label>
                  <Input id="recipientName" placeholder="Иванов Иван Иванович" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recipientAccount">Номер счета получателя</Label>
                  <Input id="recipientAccount" placeholder="40817810123456789012" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Наименование банка</Label>
                  <Input id="bankName" placeholder="ПАО Сбербанк" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bik">БИК банка</Label>
                  <Input id="bik" placeholder="044525225" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankTransferAmount">Сумма перевода</Label>
                <Input
                  id="bankTransferAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankTransferDescription">Назначение платежа</Label>
                <Input
                  id="bankTransferDescription"
                  placeholder="Перевод денежных средств"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button className="w-full">Отправить перевод</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

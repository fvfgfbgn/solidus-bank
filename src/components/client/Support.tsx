
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Phone, Mail, HelpCircle, Send } from "lucide-react";

export const Support = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const faqItems = [
    {
      question: "Как заблокировать карту?",
      answer: "Вы можете заблокировать карту в разделе 'Счета и карты' или позвонив по телефону 8-800-123-45-67."
    },
    {
      question: "Как изменить лимиты по карте?",
      answer: "Изменить лимиты можно в настройках карты в личном кабинете или в любом отделении банка."
    },
    {
      question: "Как получить справку о счетах?",
      answer: "Справки можно получить в отделении банка или заказать через личный кабинет в разделе 'Документы'."
    },
    {
      question: "Как подключить SMS-уведомления?",
      answer: "SMS-уведомления подключаются в разделе 'Настройки' → 'Уведомления' или в отделении банка."
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Онлайн чат</TabsTrigger>
          <TabsTrigger value="request">Обращение</TabsTrigger>
          <TabsTrigger value="faq">Частые вопросы</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Чат с оператором
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <MessageCircle className="h-12 w-12 mx-auto text-gray-400" />
                  <div className="text-gray-600">
                    <p className="font-semibold">Чат с оператором</p>
                    <p className="text-sm">Время ожидания: менее 2 минут</p>
                  </div>
                  <Button>Начать чат</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Телефон</span>
                  </div>
                  <p className="text-sm text-gray-600">8-800-123-45-67</p>
                  <p className="text-xs text-gray-500">Круглосуточно, бесплатно</p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-semibold">Email</span>
                  </div>
                  <p className="text-sm text-gray-600">support@solidusbank.ru</p>
                  <p className="text-xs text-gray-500">Ответ в течение 24 часов</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Форма обращения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Тема обращения</Label>
                <Input
                  id="subject"
                  placeholder="Кратко опишите проблему"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Описание проблемы</Label>
                <Textarea
                  id="message"
                  placeholder="Подробно опишите вашу проблему или вопрос"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Отправить обращение
                </Button>
                <p className="text-xs text-gray-500">
                  Ответ придет на email в течение 24 часов
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Частые вопросы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{item.question}</h4>
                    <p className="text-sm text-gray-600">{item.answer}</p>
                  </div>
                </Card>
              ))}
              
              <div className="text-center mt-6">
                <Button variant="outline">Посмотреть все вопросы</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

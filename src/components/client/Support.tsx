
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Phone, Mail, HelpCircle, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Support = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, isUser: boolean, time: string}>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Симуляция отправки
    setTimeout(() => {
      toast({
        title: "Обращение отправлено",
        description: "Ваше обращение принято. Ответ придет на email в течение 24 часов.",
      });
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  const startChat = () => {
    setChatActive(true);
    setChatMessages([
      {
        id: '1',
        text: 'Здравствуйте! Меня зовут Анна, я оператор службы поддержки. Как я могу вам помочь?',
        isUser: false,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Симуляция ответа оператора
    setTimeout(() => {
      const responses = [
        "Понял вас. Сейчас проверю информацию...",
        "Да, я могу помочь с этим вопросом.",
        "Позвольте мне уточнить детали.",
        "Хорошо, рассмотрим ваш вопрос подробнее."
      ];
      
      const operatorMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, operatorMessage]);
    }, 1500);
  };

  const handleChatKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

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
              {!chatActive ? (
                <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MessageCircle className="h-12 w-12 mx-auto text-blue-500" />
                    <div className="text-gray-600">
                      <p className="font-semibold">Чат с оператором</p>
                      <p className="text-sm">Время ожидания: менее 2 минут</p>
                    </div>
                    <Button onClick={startChat} className="bg-blue-600 hover:bg-blue-700">
                      Начать чат
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[300px] max-h-[400px] overflow-y-auto">
                    <div className="space-y-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-3 rounded-lg ${
                            msg.isUser 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Напишите ваше сообщение..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleChatKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Телефон</span>
                  </div>
                  <p className="text-sm text-gray-600">8-800-123-45-67</p>
                  <p className="text-xs text-gray-500">Круглосуточно, бесплатно</p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-600" />
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
            <CardContent>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Тема обращения *</Label>
                  <Input
                    id="subject"
                    placeholder="Кратко опишите проблему"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Описание проблемы *</Label>
                  <Textarea
                    id="message"
                    placeholder="Подробно опишите вашу проблему или вопрос"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Отправить обращение
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500">
                    Ответ придет на email в течение 24 часов
                  </p>
                </div>
              </form>
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
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-700">{item.question}</h4>
                    <p className="text-sm text-gray-600">{item.answer}</p>
                  </div>
                </Card>
              ))}
              
              <div className="text-center mt-6">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Посмотреть все вопросы
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

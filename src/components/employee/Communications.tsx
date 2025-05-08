
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, PhoneForwarded, PhoneOff, MessageSquare, Send, Search, Clock } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isFromClient: boolean;
};

type Call = {
  id: string;
  clientName: string;
  clientPhone: string;
  duration: string;
  timestamp: Date;
  status: "completed" | "missed" | "upcoming";
};

export const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState("calls");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>("client-1");
  
  // Mock clients
  const clients = [
    { id: "client-1", name: "Алексей Иванов", lastMessage: "Добрый день! У меня вопрос по кредиту.", unread: 1 },
    { id: "client-2", name: "ООО 'ТехноСтрой'", lastMessage: "Спасибо за информацию.", unread: 0 },
    { id: "client-3", name: "Елена Петрова", lastMessage: "Когда будет готова моя карта?", unread: 3 },
    { id: "client-4", name: "Сергей Смирнов", lastMessage: "Нужна консультация по вкладам.", unread: 0 },
  ];
  
  // Mock messages for active chat
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "client-1": [
      { id: "msg-1", sender: "Алексей Иванов", content: "Добрый день! У меня вопрос по кредиту.", timestamp: new Date(Date.now() - 3600000), isFromClient: true },
      { id: "msg-2", sender: "Вы", content: "Добрый день! Какой именно вопрос вас интересует?", timestamp: new Date(Date.now() - 3500000), isFromClient: false },
      { id: "msg-3", sender: "Алексей Иванов", content: "Какие документы нужны для оформления ипотеки?", timestamp: new Date(Date.now() - 3400000), isFromClient: true },
    ],
    "client-2": [
      { id: "msg-4", sender: "ООО 'ТехноСтрой'", content: "Добрый день! Нам интересует расчётно-кассовое обслуживание для бизнеса.", timestamp: new Date(Date.now() - 86400000), isFromClient: true },
      { id: "msg-5", sender: "Вы", content: "Добрый день! Я могу рассказать о наших тарифах для юридических лиц.", timestamp: new Date(Date.now() - 86000000), isFromClient: false },
      { id: "msg-6", sender: "ООО 'ТехноСтрой'", content: "Спасибо за информацию.", timestamp: new Date(Date.now() - 85000000), isFromClient: true },
    ],
    "client-3": [
      { id: "msg-7", sender: "Елена Петрова", content: "Здравствуйте. Я подала заявку на кредитную карту неделю назад.", timestamp: new Date(Date.now() - 172800000), isFromClient: true },
      { id: "msg-8", sender: "Вы", content: "Добрый день! Сейчас проверю статус вашей заявки.", timestamp: new Date(Date.now() - 172700000), isFromClient: false },
      { id: "msg-9", sender: "Елена Петрова", content: "Когда будет готова моя карта?", timestamp: new Date(Date.now() - 172600000), isFromClient: true },
      { id: "msg-10", sender: "Елена Петрова", content: "Мне очень срочно нужно знать примерные сроки.", timestamp: new Date(Date.now() - 172500000), isFromClient: true },
      { id: "msg-11", sender: "Елена Петрова", content: "Вы можете ответить?", timestamp: new Date(Date.now() - 172400000), isFromClient: true },
    ],
  });
  
  // Mock calls
  const calls: Call[] = [
    { id: "call-1", clientName: "Алексей Иванов", clientPhone: "+7 (900) 123-4567", duration: "5:23", timestamp: new Date(Date.now() - 1800000), status: "completed" },
    { id: "call-2", clientName: "ООО 'ТехноСтрой'", clientPhone: "+7 (495) 765-4321", duration: "12:08", timestamp: new Date(Date.now() - 7200000), status: "completed" },
    { id: "call-3", clientName: "Елена Петрова", clientPhone: "+7 (912) 555-7890", duration: "", timestamp: new Date(Date.now() - 43200000), status: "missed" },
    { id: "call-4", clientName: "Новый клиент", clientPhone: "+7 (999) 888-7777", duration: "", timestamp: new Date(Date.now() + 3600000), status: "upcoming" },
  ];
  
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "Вы",
      content: message,
      timestamp: new Date(),
      isFromClient: false,
    };
    
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
    
    setMessage("");
    
    // Simulate client response after a delay
    setTimeout(() => {
      const clientName = clients.find(c => c.id === activeChat)?.name || "Клиент";
      const responses = [
        "Спасибо за информацию!",
        "Хорошо, буду ждать.",
        "Понятно, а какие еще есть варианты?",
        "Когда можно подойти в офис для оформления?",
      ];
      
      const clientResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: clientName,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isFromClient: true,
      };
      
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), clientResponse],
      }));
    }, 3000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCall = (phone: string, name: string) => {
    toast.info("Звонок", {
      description: `Выполняется звонок на номер ${phone} (${name})`,
    });
  };
  
  const getCallStatusIcon = (status: Call["status"]) => {
    switch (status) {
      case "completed":
        return <Phone className="h-4 w-4 text-green-500" />;
      case "missed":
        return <PhoneOff className="h-4 w-4 text-red-500" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };
  
  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle>Коммуникации с клиентами</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b px-4">
            <TabsList className="h-10">
              <TabsTrigger value="chats" className="data-[state=active]:bg-background">
                <MessageSquare className="h-4 w-4 mr-2" />
                Чаты
              </TabsTrigger>
              <TabsTrigger value="calls" className="data-[state=active]:bg-background">
                <Phone className="h-4 w-4 mr-2" />
                Звонки
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chats" className="h-[calc(100%-2.5rem)] m-0">
            <div className="flex h-full border-t">
              {/* Sidebar with clients */}
              <div className="w-1/3 border-r h-full flex flex-col">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Поиск клиентов..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 ${
                        activeChat === client.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveChat(client.id)}
                    >
                      <Avatar>
                        <AvatarFallback>{client.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium truncate">{client.name}</span>
                          {client.unread > 0 && (
                            <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                              {client.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm truncate">
                          {client.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat area */}
              <div className="flex-1 flex flex-col h-full">
                {activeChat ? (
                  <>
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {clients.find(c => c.id === activeChat)?.name[0] || "К"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {clients.find(c => c.id === activeChat)?.name || "Клиент"}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => 
                          handleCall("+7 (999) 123-4567", clients.find(c => c.id === activeChat)?.name || "Клиент")
                        }
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Позвонить
                      </Button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                      {messages[activeChat]?.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.isFromClient ? "justify-start" : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              msg.isFromClient
                                ? "bg-muted"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.isFromClient ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t flex gap-2">
                      <Textarea
                        placeholder="Введите сообщение..."
                        className="min-h-[2.5rem] max-h-[10rem] resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        className="h-full aspect-square"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Выберите клиента для начала общения
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calls" className="h-[calc(100%-2.5rem)] m-0 p-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Предстоящие звонки</h3>
                {calls.filter(call => call.status === "upcoming").map(call => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between border-b py-3"
                  >
                    <div className="flex items-center gap-3">
                      {getCallStatusIcon(call.status)}
                      <div>
                        <p className="font-medium">{call.clientName}</p>
                        <p className="text-sm text-muted-foreground">{call.clientPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(call.timestamp).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Button size="sm" onClick={() => handleCall(call.clientPhone, call.clientName)}>
                        <PhoneForwarded className="h-4 w-4 mr-2" />
                        Позвонить
                      </Button>
                    </div>
                  </div>
                ))}
                {calls.filter(call => call.status === "upcoming").length === 0 && (
                  <p className="text-muted-foreground py-2">Нет предстоящих звонков</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-3">История звонков</h3>
                {calls.filter(call => call.status !== "upcoming").map(call => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between border-b py-3"
                  >
                    <div className="flex items-center gap-3">
                      {getCallStatusIcon(call.status)}
                      <div>
                        <p className="font-medium">{call.clientName}</p>
                        <p className="text-sm text-muted-foreground">{call.clientPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {call.status === "completed" && <span>{call.duration}</span>}
                      <span>
                        {new Date(call.timestamp).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                        {", "}
                        {new Date(call.timestamp).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCall(call.clientPhone, call.clientName)}
                      >
                        <PhoneForwarded className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

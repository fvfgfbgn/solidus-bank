
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Send, Search, Bell, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { communicationStore } from "@/utils/communicationStore";
import { InternalMessage } from "@/types/communications";

export const InternalCommunications: React.FC = () => {
  const { user, employees } = useAuth();
  const [activeTab, setActiveTab] = useState("incoming");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"message" | "proposal" | "issue" | "announcement">("message");
  const [messages, setMessages] = useState<InternalMessage[]>([]);

  // Подписка на изменения в хранилище сообщений
  useEffect(() => {
    const updateMessages = () => {
      setMessages(communicationStore.getAllMessages());
    };

    updateMessages();
    const unsubscribe = communicationStore.subscribe(updateMessages);

    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (!title.trim() || !message.trim()) return;
    
    const newMessage: InternalMessage = {
      id: `msg-${Date.now()}`,
      sender: user?.name || "Неизвестно",
      senderId: user?.id || "unknown",
      recipient: recipient === null ? null : employees.find(e => e.id === recipient)?.name || "Все",
      recipientId: recipient,
      title: title,
      content: message,
      timestamp: new Date(),
      isRead: false,
      type: messageType
    };
    
    communicationStore.addMessage(newMessage);
    setMessage("");
    setTitle("");
    setRecipient(null);
    setMessageType("message");
    
    toast.success("Сообщение отправлено", {
      description: `Ваше сообщение успешно отправлено ${newMessage.recipient === null ? "всем сотрудникам" : newMessage.recipient}`
    });
  };
  
  const markAsRead = (messageId: string) => {
    communicationStore.markAsRead(messageId);
  };
  
  const getTypeIcon = (type: InternalMessage["type"]) => {
    switch (type) {
      case "proposal":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "issue":
        return <Bell className="h-4 w-4 text-red-500" />;
      case "announcement":
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Получаем сообщения для текущего пользователя
  const userMessages = communicationStore.getMessagesForUser(user?.id || "");
  
  // Фильтрация входящих сообщений
  const incomingMessages = userMessages.incoming.filter(msg =>
    msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Фильтрация исходящих сообщений
  const outgoingMessages = userMessages.outgoing.filter(msg =>
    msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[calc(100vh-14rem)]">
      <CardHeader>
        <CardTitle>Внутренняя коммуникация</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b px-4">
            <TabsList className="h-10">
              <TabsTrigger value="incoming" className="data-[state=active]:bg-background">
                <MessageSquare className="h-4 w-4 mr-2" />
                Входящие
                {incomingMessages.filter(msg => !msg.isRead).length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {incomingMessages.filter(msg => !msg.isRead).length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="outgoing" className="data-[state=active]:bg-background">
                <CheckCheck className="h-4 w-4 mr-2" />
                Отправленные
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-background">
                <Send className="h-4 w-4 mr-2" />
                Создать сообщение
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="incoming" className="h-[calc(100%-2.5rem)] m-0 p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск сообщений..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4 overflow-auto h-[calc(100%-3rem)]">
              {incomingMessages.length > 0 ? (
                incomingMessages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map(msg => (
                  <Card key={msg.id} className={`cursor-pointer ${!msg.isRead ? "border-primary" : ""}`} onClick={() => markAsRead(msg.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium flex items-center">
                              {getTypeIcon(msg.type)}
                              <span className="ml-1">{msg.title}</span>
                              {!msg.isRead && (
                                <span className="ml-2 bg-primary h-2 w-2 rounded-full"></span>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {msg.timestamp.toLocaleTimeString("ru-RU", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">От: {msg.sender}</p>
                          <p className="text-sm mt-2">{msg.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  У вас нет входящих сообщений
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="outgoing" className="h-[calc(100%-2.5rem)] m-0 p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск сообщений..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4 overflow-auto h-[calc(100%-3rem)]">
              {outgoingMessages.length > 0 ? (
                outgoingMessages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map(msg => (
                  <Card key={msg.id} className="cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{user?.name[0] || "У"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium flex items-center">
                              {getTypeIcon(msg.type)}
                              <span className="ml-1">{msg.title}</span>
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {msg.timestamp.toLocaleTimeString("ru-RU", {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">Кому: {msg.recipient || "Всем сотрудникам"}</p>
                          <p className="text-sm mt-2">{msg.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  У вас нет отправленных сообщений
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="h-[calc(100%-2.5rem)] m-0 p-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="recipient" className="text-sm font-medium">Получатель</label>
                <select
                  id="recipient"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={recipient || ""}
                  onChange={(e) => setRecipient(e.target.value === "" ? null : e.target.value)}
                >
                  <option value="">Все сотрудники</option>
                  {user?.role === "admin" && 
                    employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))
                  }
                  {user?.role === "employee" && (
                    <option value="admin-1">Администратор</option>
                  )}
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="messageType" className="text-sm font-medium">Тип сообщения</label>
                <select
                  id="messageType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value as any)}
                >
                  <option value="message">Обычное сообщение</option>
                  <option value="proposal">Предложение</option>
                  <option value="issue">Проблема</option>
                  {user?.role === "admin" && (
                    <option value="announcement">Объявление</option>
                  )}
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Заголовок</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите заголовок сообщения"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">Текст сообщения</label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Введите текст сообщения"
                  rows={6}
                />
              </div>
              
              <Button 
                onClick={handleSendMessage} 
                disabled={!title.trim() || !message.trim()} 
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Отправить
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

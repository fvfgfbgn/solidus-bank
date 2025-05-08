
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Phone, MessageCircle, Video, Send, UserPlus, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
  clientId: string;
};

type Call = {
  id: string;
  clientId: string;
  clientName: string;
  startTime: Date;
  duration: number | null; // in seconds, null if ongoing
  type: "incoming" | "outgoing";
  status: "missed" | "completed" | "ongoing";
};

export const Communications: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("messages");
  const [clients, setClients] = useState([
    { id: "client-1", name: "Алексей Иванов" },
    { id: "client-2", name: "ООО 'ТехноСтрой'" },
    { id: "client-3", name: "Елена Петрова" },
    { id: "client-4", name: "Сергей Смирнов" },
  ]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "client",
      content: "Здравствуйте, подскажите пожалуйста по вопросу открытия счета.",
      timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      read: true,
      clientId: "client-1"
    },
    {
      id: "msg-2",
      sender: "employee",
      content: "Добрый день! Конечно, что именно вас интересует?",
      timestamp: new Date(new Date().getTime() - 23.5 * 60 * 60 * 1000),
      read: true,
      clientId: "client-1"
    },
    {
      id: "msg-3",
      sender: "client",
      content: "Какие документы потребуются для открытия расчётного счёта для ООО?",
      timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
      read: false,
      clientId: "client-1"
    },
    {
      id: "msg-4",
      sender: "client",
      content: "Добрый день, нужна консультация по кредитным продуктам.",
      timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000),
      read: false,
      clientId: "client-3"
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [calls, setCalls] = useState<Call[]>([
    {
      id: "call-1",
      clientId: "client-1",
      clientName: "Алексей Иванов",
      startTime: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
      duration: 185,
      type: "incoming",
      status: "completed"
    },
    {
      id: "call-2",
      clientId: "client-2",
      clientName: "ООО 'ТехноСтрой'",
      startTime: new Date(new Date().getTime() - 1 * 60 * 60 * 1000),
      duration: 312,
      type: "outgoing",
      status: "completed"
    },
    {
      id: "call-3",
      clientId: "client-4",
      clientName: "Сергей Смирнов",
      startTime: new Date(new Date().getTime() - 30 * 60 * 1000),
      duration: null,
      type: "incoming",
      status: "missed"
    },
  ]);
  const [isNewCallModalOpen, setIsNewCallModalOpen] = useState(false);
  const [callClient, setCallClient] = useState("");

  // Filter messages by selected client
  const filteredMessages = selectedClient 
    ? messages.filter(msg => msg.clientId === selectedClient) 
    : [];

  // Get unread messages count by client
  const getUnreadCount = (clientId: string) => {
    return messages.filter(msg => msg.clientId === clientId && msg.sender === "client" && !msg.read).length;
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Format call duration
  const formatDuration = (seconds: number | null) => {
    if (seconds === null) return "В процессе";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "employee",
      content: newMessage,
      timestamp: new Date(),
      read: true,
      clientId: selectedClient
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    toast({
      title: "Сообщение отправлено",
      description: `Отправлено клиенту ${clients.find(c => c.id === selectedClient)?.name}`
    });
  };

  // Handle making a new call
  const handleMakeCall = () => {
    if (!callClient) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Выберите клиента для звонка"
      });
      return;
    }
    
    const client = clients.find(c => c.id === callClient);
    
    if (!client) return;
    
    const newCall: Call = {
      id: `call-${Date.now()}`,
      clientId: callClient,
      clientName: client.name,
      startTime: new Date(),
      duration: null,
      type: "outgoing",
      status: "ongoing"
    };
    
    setCalls(prev => [...prev, newCall]);
    setIsNewCallModalOpen(false);
    setCallClient("");
    
    toast({
      title: "Звонок начат",
      description: `Звоним клиенту ${client.name}`
    });
    
    // Simulate call completion after random time
    setTimeout(() => {
      setCalls(prev => prev.map(call => 
        call.id === newCall.id 
          ? { ...call, duration: Math.floor(30 + Math.random() * 300), status: "completed" }
          : call
      ));
      
      toast({
        title: "Звонок завершен",
        description: `Звонок с ${client.name} завершен`
      });
    }, 5000);
  };

  // Mark messages as read when a client is selected
  useEffect(() => {
    if (selectedClient) {
      setMessages(prev => prev.map(msg => 
        msg.clientId === selectedClient && !msg.read
          ? { ...msg, read: true }
          : msg
      ));
    }
  }, [selectedClient]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Контакты</CardTitle>
          <CardDescription>Выберите клиента для коммуникации</CardDescription>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск клиента..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {clients.map(client => (
              <Button
                key={client.id}
                variant={selectedClient === client.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedClient(client.id)}
              >
                <span className="truncate">{client.name}</span>
                {getUnreadCount(client.id) > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {getUnreadCount(client.id)}
                  </Badge>
                )}
              </Button>
            ))}
            <Button 
              variant="ghost" 
              className="w-full mt-4"
              onClick={() => toast({
                title: "Добавление клиента",
                description: "Функция в разработке"
              })}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Добавить клиента
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="messages">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Сообщения
                </TabsTrigger>
                <TabsTrigger value="calls">
                  <Phone className="h-4 w-4 mr-2" />
                  Звонки
                </TabsTrigger>
              </TabsList>
              
              <div>
                {activeTab === "messages" ? (
                  <Button 
                    size="sm" 
                    disabled={!selectedClient}
                    onClick={() => toast({
                      title: "Видео-консультация",
                      description: "Функция в разработке"
                    })}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Видео-консультация
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => setIsNewCallModalOpen(true)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Новый звонок
                  </Button>
                )}
              </div>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="messages" className="mt-0">
            {selectedClient ? (
              <div className="flex flex-col h-[400px]">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "employee" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.sender === "employee"
                              ? "bg-solidus-steel-blue text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === "employee" ? "text-blue-100" : "text-gray-500"
                          }`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Нет сообщений с этим клиентом
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="resize-none"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                Выберите клиента для просмотра сообщений
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calls" className="mt-0">
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-4">Клиент</th>
                    <th className="text-left py-2 px-4">Время</th>
                    <th className="text-left py-2 px-4">Тип</th>
                    <th className="text-left py-2 px-4">Длительность</th>
                    <th className="text-left py-2 px-4">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {calls.length > 0 ? (
                    calls.map((call) => (
                      <tr key={call.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{call.clientName}</td>
                        <td className="py-3 px-4">{formatTime(call.startTime)}</td>
                        <td className="py-3 px-4">
                          {call.type === "incoming" ? "Входящий" : "Исходящий"}
                        </td>
                        <td className="py-3 px-4">{formatDuration(call.duration)}</td>
                        <td className="py-3 px-4">
                          {call.status === "completed" && <Badge variant="outline" className="bg-green-100 text-green-800">Завершен</Badge>}
                          {call.status === "missed" && <Badge variant="outline" className="bg-red-100 text-red-800">Пропущен</Badge>}
                          {call.status === "ongoing" && <Badge variant="outline" className="bg-blue-100 text-blue-800">В процессе</Badge>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Нет записей звонков
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      <Dialog open={isNewCallModalOpen} onOpenChange={setIsNewCallModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Новый звонок</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Выберите клиента</Label>
              <select
                id="client"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={callClient}
                onChange={(e) => setCallClient(e.target.value)}
              >
                <option value="">Выберите клиента</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCallModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleMakeCall}>
              <Phone className="h-4 w-4 mr-2" />
              Позвонить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

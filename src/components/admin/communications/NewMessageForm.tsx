
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NewMessageFormProps {
  onSendMessage: (title: string, message: string, recipient: string | null, messageType: "message" | "proposal" | "issue" | "announcement") => void;
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({ onSendMessage }) => {
  const { user, employees } = useAuth();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"message" | "proposal" | "issue" | "announcement">("message");

  const handleSendMessage = () => {
    onSendMessage(title, message, recipient, messageType);
    setMessage("");
    setTitle("");
    setRecipient(null);
    setMessageType("message");
  };

  return (
    <div className="space-y-4 p-4">
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
  );
};

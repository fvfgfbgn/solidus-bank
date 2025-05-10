
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, MessageSquare } from "lucide-react";
import { InternalMessage } from "../../../types/communications";

interface MessageCardProps {
  message: InternalMessage;
  onClick?: (messageId: string) => void;
  showReadIndicator?: boolean;
}

export const MessageCard: React.FC<MessageCardProps> = ({ 
  message, 
  onClick, 
  showReadIndicator = false 
}) => {
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
  
  return (
    <Card 
      className={`cursor-pointer ${showReadIndicator && !message.isRead ? "border-primary" : ""}`} 
      onClick={() => onClick && onClick(message.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>{message.sender[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium flex items-center">
                {getTypeIcon(message.type)}
                <span className="ml-1">{message.title}</span>
                {showReadIndicator && !message.isRead && (
                  <span className="ml-2 bg-primary h-2 w-2 rounded-full"></span>
                )}
              </h4>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit"
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {showReadIndicator ? `От: ${message.sender}` : `Кому: ${message.recipient || "Всем сотрудникам"}`}
            </p>
            <p className="text-sm mt-2">{message.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

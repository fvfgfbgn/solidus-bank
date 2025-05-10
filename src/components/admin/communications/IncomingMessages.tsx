
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MessageCard } from "./MessageCard";
import { InternalMessage } from "../../../types/communications";

interface IncomingMessagesProps {
  messages: InternalMessage[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMessageClick: (messageId: string) => void;
}

export const IncomingMessages: React.FC<IncomingMessagesProps> = ({
  messages,
  searchQuery,
  onSearchChange,
  onMessageClick
}) => {
  return (
    <div className="h-[calc(100%-2.5rem)] m-0 p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск сообщений..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-4 overflow-auto h-[calc(100%-3rem)]">
        {messages.length > 0 ? (
          messages
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .map(msg => (
              <MessageCard 
                key={msg.id} 
                message={msg} 
                onClick={onMessageClick}
                showReadIndicator={true}
              />
            ))
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            У вас нет входящих сообщений
          </div>
        )}
      </div>
    </div>
  );
};

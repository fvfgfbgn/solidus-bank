
import { InternalMessage } from "../types/communications";

// Глобальное хранилище сообщений для симуляции базы данных
class CommunicationStore {
  private messages: InternalMessage[] = [
    {
      id: "msg-1",
      sender: "Иван Петров",
      senderId: "emp-1",
      recipient: "Администратор",
      recipientId: "admin-1",
      title: "Предложение по улучшению интерфейса",
      content: "Добрый день! У меня есть предложение по улучшению интерфейса системы для работы с клиентами. Предлагаю добавить возможность быстрого доступа к часто используемым функциям.",
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
      type: "proposal"
    },
    {
      id: "msg-2",
      sender: "Администратор",
      senderId: "admin-1",
      recipient: "Иван Петров",
      recipientId: "emp-1",
      title: "Ответ на предложение",
      content: "Здравствуйте! Ваше предложение принято к рассмотрению. В ближайшее время мы его реализуем.",
      timestamp: new Date(Date.now() - 2500000),
      isRead: false,
      type: "message"
    },
    {
      id: "msg-3",
      sender: "Анна Смирнова",
      senderId: "emp-2",
      recipient: "Администратор",
      recipientId: "admin-1",
      title: "Проблема с доступом к базе данных",
      content: "Добрый день! Не могу получить доступ к базе данных клиентов. Система выдает ошибку авторизации. Прошу помочь решить проблему.",
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      type: "issue"
    },
    {
      id: "msg-4",
      sender: "Администратор",
      senderId: "admin-1",
      recipient: null,
      recipientId: null,
      title: "Обновление системы",
      content: "Уважаемые коллеги! Сообщаем, что сегодня в 22:00 будет проводиться плановое обновление системы. Продолжительность работ составит примерно 2 часа.",
      timestamp: new Date(Date.now() - 900000),
      isRead: false,
      type: "announcement"
    }
  ];

  private listeners: Array<() => void> = [];

  getAllMessages(): InternalMessage[] {
    return [...this.messages];
  }

  addMessage(message: InternalMessage): void {
    this.messages.push(message);
    this.notifyListeners();
  }

  markAsRead(messageId: string): void {
    const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex !== -1) {
      this.messages[messageIndex].isRead = true;
      this.notifyListeners();
    }
  }

  getMessagesForUser(userId: string): {
    incoming: InternalMessage[];
    outgoing: InternalMessage[];
  } {
    const incoming = this.messages.filter(msg => 
      msg.recipientId === userId || (msg.recipientId === null && msg.senderId !== userId)
    );

    const outgoing = this.messages.filter(msg => 
      msg.senderId === userId
    );

    return { incoming, outgoing };
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const communicationStore = new CommunicationStore();


export type InternalMessage = {
  id: string;
  sender: string;
  senderId: string;
  recipient: string | null;
  recipientId: string | null;
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: "message" | "proposal" | "issue" | "announcement";
};

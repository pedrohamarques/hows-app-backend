type GroupChatProp = {
  id: number;
  name: string;
  messages: MessageProp[];
  createdAt: Date;
};

type MessageProp = {
  sendAt: Date;
  senderId: string;
  text: string;
  messageId: string;
};

export const chatGroups: GroupChatProp[] = [];

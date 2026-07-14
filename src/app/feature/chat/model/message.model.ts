export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  online?: boolean;
  avatarAlt?: string;
}

export interface Message {
  senderId: 'me' | 'them';
  text: string;
  time: string;
  status?: 'Read' | 'Sent';
}
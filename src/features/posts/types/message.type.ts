export type Message = {
  id: string;
  message: string;
  postedOn: Date;
  userId: number;
  userName: string;
  likeCount: number;
  likedByUser: boolean;
};

export type MessagesResponse = {
  messages: Message[];
  total: number;
  page: number;
  pageSize: number;
};

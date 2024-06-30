import { api as axios } from "@/app/lib/api";

export const sendMessageService = async (message: any) => {
  try {
    const response = await axios.post("/api/chat/message/send", message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSelectedChatService = async (chatId: string) => {
  try {
    const res = await axios.get(`/api/chat/selected/${chatId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchChatsService = async (userId: string) => {
  try {
    const res = await axios.get(`/api/chat/${userId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteChatService = async (userId: string, chatId: string) => {
  try {
    const res = await axios.delete(`/api/chat/delete/${userId}/${chatId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

import { api as axios } from "@/app/lib/api";

export const registerUserService = async (userData: {
  email: string;
  password: string;
  userName: string;
  userRole: string;
}) => {
  try {
    const response = await axios.post(`/api/auth/register`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetUserPasswordService = async (
  userId: string,
  password: string
) => {
  try {
    const res = await axios.put(`/api/user/reset/${userId}`, { password });
    return res;
  } catch (error) {
    throw error;
  }
};

export const activateUserAccountService = async (userId: string) => {
  try {
    const res = await axios.put(`/api/user/activate/${userId}`);
    return res;
  } catch (error) {
    throw error;
  }
};

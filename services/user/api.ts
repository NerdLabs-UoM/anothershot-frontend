import { api as axios } from "@/app/lib/api";

export const fetchUserByEmailService = async (email: string) => {
  try {
    const res = await axios.get(`/api/user/email/${email}`);
    return res;
  } catch (error) {
    throw error;
  }
};



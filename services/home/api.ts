import { api as axios } from "@/app/lib/api";

export const fetchHomeImageService = async () => {
  try {
    const response = await axios.get(`/api/home/feed`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const searchPhotographers = async (
  name: string | undefined,
  location: string | undefined,
  category: string | undefined
) => {
  try {
    const response = await axios.get(`/api/home/search`, {
      params: { name, location, category },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

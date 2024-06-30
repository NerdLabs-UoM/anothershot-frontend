import { api as axios } from "@/app/lib/api";

export const fetchPhotographerCategories = async () => {
  try {
    const response = await axios.get(`/api/photographer/getallcategories`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

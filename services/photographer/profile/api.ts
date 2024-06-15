import axios from 'axios';

export const getPhotographerProfile = async (photographerId: string) => {
    const response = await axios.post(`/api/v1/photographer/profile/getPhotographerProfile`, {
        photographerId,
    });
    return response.data;
}

export const updateHeroSection = async (photographerId: string) => {
    const response = await axios.post(`/api/v1/photographer/profile/updateHeroSection`, {
        photographerId,
    });
    return response.data;
}
import { useQuery } from '@tanstack/react-query';
import { getPhotographerProfile } from '@/services/photographer/profile/api';

export const useGetPhotographerProfile = (photographerId: string) => {
    return useQuery({
        queryKey: ['getPhotographerProfile', photographerId],
        queryFn: () => getPhotographerProfile(photographerId),
    })
}

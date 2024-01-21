'use server'

import axios from "axios";

interface User {
    id: string;
    userRole: string;
    name: string;
    email: string;
    status: string;
}



export const fetchData = async (page: number): Promise<User[]> => {
    try {
        const users = await axios.get<User[]>(
            `http://localhost:8000/api/admin/getallusers?page=${page}`
        );

        const mappedUsers = users.data.map((user) => ({
            id: user.id,
            userRole: user.userRole,
            name: user.name,
            email: user.email,
            status: user.status,
        }));

        return mappedUsers;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const fetchLastPage = async (): Promise<number> => {
    try {
        const lastPage = await axios.get<number>(
            `http://localhost:8000/api/admin/getlastpage`
        );
        return lastPage.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
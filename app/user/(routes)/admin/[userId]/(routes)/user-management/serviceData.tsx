"use server";

import axios from "axios";

export const fetchData = async (page: number) => {
    try {
        const users = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/getallusers?page=${page}`
        );
        return users.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

export const fetchLastPage = async (): Promise<number> => {
    try {
        const lastPage = await axios.get<number>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/getlastpage`
        );
        return lastPage.data;
    } catch (error) {
        throw new Error("Error Fetching Users");
    }
};